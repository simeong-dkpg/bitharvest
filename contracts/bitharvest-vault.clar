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