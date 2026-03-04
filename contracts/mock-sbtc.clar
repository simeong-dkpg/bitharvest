;; Mock sBTC Token for Testing
;; SIP-010 Compliant Fungible Token
;; 
;; Deploy this if you can't get testnet sBTC from the faucet.
;; Use this token address when calling vault functions.

(impl-trait 'ST1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT.sip-010-trait-ft-standard.sip-010-trait)

;; Token Definition
(define-fungible-token mock-sbtc)

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-INSUFFICIENT-BALANCE (err u101))

;; Token metadata
(define-data-var token-name (string-ascii 32) "Mock sBTC")
(define-data-var token-symbol (string-ascii 10) "msBTC")
(define-data-var token-decimals uint u8)
(define-data-var token-uri (optional (string-utf8 256)) (some u"https://bitharvest.app/mock-sbtc"))

;; ---------------------------------------------------------
;; SIP-010 Functions
;; ---------------------------------------------------------

;; Transfer tokens
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (try! (ft-transfer? mock-sbtc amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

;; Get token name
(define-read-only (get-name)
  (ok (var-get token-name))
)

;; Get token symbol
(define-read-only (get-symbol)
  (ok (var-get token-symbol))
)

;; Get decimals
(define-read-only (get-decimals)
  (ok (var-get token-decimals))
)

;; Get balance
(define-read-only (get-balance (account principal))
  (ok (ft-get-balance mock-sbtc account))
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (ft-get-supply mock-sbtc))
)

;; Get token URI
(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

;; ---------------------------------------------------------
;; Minting Functions (For Testing)
;; ---------------------------------------------------------

;; Mint tokens to any address (only contract owner)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (ft-mint? mock-sbtc amount recipient)
  )
)

;; Faucet - anyone can mint up to 10 mock sBTC at a time
;; This simulates a testnet faucet
(define-constant MAX-FAUCET-AMOUNT u1000000000) ;; 10 sBTC (8 decimals)

(define-public (faucet (amount uint))
  (begin
    (asserts! (<= amount MAX-FAUCET-AMOUNT) (err u102))
    (ft-mint? mock-sbtc amount tx-sender)
  )
)

;; Burn tokens
(define-public (burn (amount uint))
  (begin
    (asserts! (>= (ft-get-balance mock-sbtc tx-sender) amount) ERR-INSUFFICIENT-BALANCE)
    (ft-burn? mock-sbtc amount tx-sender)
  )
)

;; ---------------------------------------------------------
;; Admin Functions
;; ---------------------------------------------------------

;; Update token URI (only owner)
(define-public (set-token-uri (new-uri (optional (string-utf8 256))))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set token-uri new-uri)
    (ok true)
  )
)
