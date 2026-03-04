;; BitHarvest Vault - sBTC Lending Protocol
;; A decentralized lending vault that allows Bitcoin holders to earn yield on their sBTC
;; 
;; Features:
;; - Deposit sBTC to earn yield
;; - Borrow against sBTC collateral
;; - Automatic interest accrual
;; - Liquidation protection

;; Use testnet SIP-010 trait
(use-trait ft-trait 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait)

;; constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u1001))
(define-constant ERR-INSUFFICIENT-BALANCE (err u1002))
(define-constant ERR-INSUFFICIENT-COLLATERAL (err u1003))
(define-constant ERR-NO-DEBT (err u1004))
(define-constant ERR-TRANSFER-FAILED (err u1005))
(define-constant ERR-ZERO-AMOUNT (err u1006))
(define-constant ERR-VAULT-EMPTY (err u1007))
(define-constant ERR-EXCEEDS-MAX-BORROW (err u1008))
(define-constant ERR-POSITION-NOT-FOUND (err u1009))

;; Protocol parameters (in basis points where applicable)
(define-constant COLLATERAL-RATIO u15000) ;; 150% collateralization required
(define-constant LIQUIDATION-THRESHOLD u12000) ;; 120% triggers liquidation
(define-constant BORROW-APY u500) ;; 5% annual borrow rate
(define-constant SUPPLY-APY u300) ;; 3% annual supply yield
(define-constant BLOCKS-PER-YEAR u52560) ;; ~10 min blocks
(define-constant PROTOCOL-FEE u100) ;; 1% protocol fee on interest

;; data vars
(define-data-var total-deposits uint u0)
(define-data-var total-borrows uint u0)
(define-data-var total-shares uint u0)
(define-data-var last-update-block uint u0) ;; Initialized to 0, set on first action
(define-data-var accumulated-protocol-fees uint u0)
(define-data-var vault-paused bool false)

;; data maps
;; Tracks each user's vault shares (represents their deposit + accrued yield)
(define-map user-shares principal uint)

;; Tracks each user's borrow position
(define-map borrow-positions 
  principal 
  {
    principal-amount: uint,      ;; Original borrowed amount
    accrued-interest: uint,      ;; Interest owed
    last-update-block: uint,     ;; Last interest calculation
    collateral-locked: uint      ;; sBTC locked as collateral
  }
)

;; Tracks deposit history for yield calculation
(define-map deposit-history
  principal
  {
    total-deposited: uint,
    first-deposit-block: uint,
    last-action-block: uint
  }
)

;; =====================================
;; Read-Only Functions
;; =====================================

;; Get total deposits in the vault
(define-read-only (get-total-deposits)
  (var-get total-deposits)
)

;; Get total borrowed from the vault
(define-read-only (get-total-borrows)
  (var-get total-borrows)
)

;; Get user's share balance
(define-read-only (get-user-shares (user principal))
  (default-to u0 (map-get? user-shares user))
)

;; Get user's borrow position
(define-read-only (get-borrow-position (user principal))
  (map-get? borrow-positions user)
)

;; Calculate share value in sBTC
(define-read-only (shares-to-sbtc (shares uint))
  (let (
    (total-supply (var-get total-shares))
    (total-assets (var-get total-deposits))
  )
    (if (is-eq total-supply u0)
      shares
      (/ (* shares total-assets) total-supply)
    )
  )
)

;; Calculate sBTC value in shares
(define-read-only (sbtc-to-shares (amount uint))
  (let (
    (total-supply (var-get total-shares))
    (total-assets (var-get total-deposits))
  )
    (if (or (is-eq total-supply u0) (is-eq total-assets u0))
      amount
      (/ (* amount total-supply) total-assets)
    )
  )
)

;; Get user's withdrawable balance (shares converted to sBTC)
(define-read-only (get-user-balance (user principal))
  (shares-to-sbtc (get-user-shares user))
)

;; Calculate maximum borrowable amount for a user
(define-read-only (get-max-borrow (user principal))
  (let (
    (user-balance (get-user-balance user))
    (existing-position (get-borrow-position user))
    (current-debt (match existing-position
      pos (+ (get principal-amount pos) (get accrued-interest pos))
      u0
    ))
  )
    ;; Max borrow = (collateral * 10000 / COLLATERAL-RATIO) - current-debt
    (if (> user-balance u0)
      (let (
        (max-against-collateral (/ (* user-balance u10000) COLLATERAL-RATIO))
      )
        (if (> max-against-collateral current-debt)
          (- max-against-collateral current-debt)
          u0
        )
      )
      u0
    )
  )
)

;; Get current utilization rate (borrows / deposits in basis points)
(define-read-only (get-utilization-rate)
  (let (
    (deposits (var-get total-deposits))
    (borrows (var-get total-borrows))
  )
    (if (is-eq deposits u0)
      u0
      (/ (* borrows u10000) deposits)
    )
  )
)

;; Calculate accrued interest for a position
(define-read-only (calculate-accrued-interest (user principal))
  (match (get-borrow-position user)
    position
      (let (
        (blocks-elapsed (- stacks-block-height (get last-update-block position)))
        (principal-amt (get principal-amount position))
        (existing-interest (get accrued-interest position))
        ;; Simple interest: principal * rate * time / (blocks-per-year * 10000)
        (new-interest (/ (* (* principal-amt BORROW-APY) blocks-elapsed) (* BLOCKS-PER-YEAR u10000)))
      )
        (+ existing-interest new-interest)
      )
    u0
  )
)

;; Get estimated yield for deposits
(define-read-only (get-estimated-yield (user principal))
  (match (map-get? deposit-history user)
    history
      (let (
        (blocks-elapsed (- stacks-block-height (get last-action-block history)))
        (balance (get-user-balance user))
        ;; Simple yield calculation
        (estimated (/ (* (* balance SUPPLY-APY) blocks-elapsed) (* BLOCKS-PER-YEAR u10000)))
      )
        estimated
      )
    u0
  )
)

;; Check if vault is paused
(define-read-only (is-paused)
  (var-get vault-paused)
)

;; =====================================
;; Public Functions
;; =====================================

;; Deposit sBTC into the vault
(define-public (deposit (amount uint) (token <ft-trait>))
  (let (
    (sender tx-sender)
    (shares-to-mint (sbtc-to-shares amount))
    (current-shares (get-user-shares sender))
    (current-history (map-get? deposit-history sender))
  )
    ;; Validations
    (asserts! (not (var-get vault-paused)) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-ZERO-AMOUNT)
    
    ;; Transfer sBTC from user to vault
    (try! (contract-call? token transfer amount sender current-contract none))
    
    ;; Update state
    (var-set total-deposits (+ (var-get total-deposits) amount))
    (var-set total-shares (+ (var-get total-shares) shares-to-mint))
    (map-set user-shares sender (+ current-shares shares-to-mint))
    
    ;; Update deposit history
    (map-set deposit-history sender {
      total-deposited: (+ (match current-history h (get total-deposited h) u0) amount),
      first-deposit-block: (match current-history h (get first-deposit-block h) stacks-block-height),
      last-action-block: stacks-block-height
    })
    
    (ok shares-to-mint)
  )
)

;; Withdraw sBTC from the vault
(define-public (withdraw (shares uint) (token <ft-trait>))
  (let (
    (sender tx-sender)
    (current-shares (get-user-shares sender))
    (sbtc-amount (shares-to-sbtc shares))
    (position (get-borrow-position sender))
  )
    ;; Validations
    (asserts! (not (var-get vault-paused)) ERR-NOT-AUTHORIZED)
    (asserts! (> shares u0) ERR-ZERO-AMOUNT)
    (asserts! (>= current-shares shares) ERR-INSUFFICIENT-BALANCE)
    (asserts! (<= sbtc-amount (var-get total-deposits)) ERR-VAULT-EMPTY)
    
    ;; Check if user has outstanding borrow - ensure collateral remains sufficient
    (match position
      pos 
        (let (
          (remaining-shares (- current-shares shares))
          (remaining-value (shares-to-sbtc remaining-shares))
          (total-debt (+ (get principal-amount pos) (calculate-accrued-interest sender)))
          (required-collateral (/ (* total-debt COLLATERAL-RATIO) u10000))
        )
          (asserts! (>= remaining-value required-collateral) ERR-INSUFFICIENT-COLLATERAL)
        )
      true
    )
    
    ;; Transfer sBTC to user (with-all-assets-unsafe needed for trait-based FT transfers)
    (try! (as-contract? ((with-all-assets-unsafe))
      (try! (contract-call? token transfer sbtc-amount tx-sender sender none))))
    
    ;; Update state
    (var-set total-deposits (- (var-get total-deposits) sbtc-amount))
    (var-set total-shares (- (var-get total-shares) shares))
    (map-set user-shares sender (- current-shares shares))
    
    ;; Update deposit history
    (match (map-get? deposit-history sender)
      history
        (map-set deposit-history sender (merge history { last-action-block: stacks-block-height }))
      true
    )
    
    (ok sbtc-amount)
  )
)

;; Borrow sBTC against collateral
(define-public (borrow (amount uint) (token <ft-trait>))
  (let (
    (sender tx-sender)
    (user-balance (get-user-balance sender))
    (max-borrow (get-max-borrow sender))
    (existing-position (get-borrow-position sender))
  )
    ;; Validations
    (asserts! (not (var-get vault-paused)) ERR-NOT-AUTHORIZED)
    (asserts! (> amount u0) ERR-ZERO-AMOUNT)
    (asserts! (<= amount max-borrow) ERR-EXCEEDS-MAX-BORROW)
    (asserts! (<= amount (var-get total-deposits)) ERR-VAULT-EMPTY)
    
    ;; Transfer sBTC to borrower (with-all-assets-unsafe needed for trait-based FT transfers)
    (try! (as-contract? ((with-all-assets-unsafe))
      (try! (contract-call? token transfer amount tx-sender sender none))))
    
    ;; Update or create borrow position
    (match existing-position
      pos
        ;; Update existing position
        (let (
          (current-interest (calculate-accrued-interest sender))
        )
          (map-set borrow-positions sender {
            principal-amount: (+ (get principal-amount pos) amount),
            accrued-interest: current-interest,
            last-update-block: stacks-block-height,
            collateral-locked: user-balance
          })
        )
      ;; Create new position
      (map-set borrow-positions sender {
        principal-amount: amount,
        accrued-interest: u0,
        last-update-block: stacks-block-height,
        collateral-locked: user-balance
      })
    )
    
    ;; Update totals
    (var-set total-borrows (+ (var-get total-borrows) amount))
    
    (ok amount)
  )
)