// Stacks network and token configuration

export const NETWORK_CONFIG = {
  testnet: {
    name: "Stacks Testnet",
    url: "https://api.testnet.hiro.so",
    explorerUrl: "https://explorer.hiro.so/?chain=testnet",
    chainId: 0x80000000,
  },
  mainnet: {
    name: "Stacks Mainnet",
    url: "https://api.hiro.so",
    explorerUrl: "https://explorer.hiro.so",
    chainId: 0x00000001,
  },
} as const;

export type NetworkType = keyof typeof NETWORK_CONFIG;

export const DEFAULT_NETWORK: NetworkType = "testnet";

// Contract addresses - DEPLOYED ON TESTNET
export const CONTRACTS = {
  testnet: {
    vault: "ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN.bitharvest-vault",
    sbtc: "ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token", // Official testnet sBTC
    mockSbtc: "ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN.mock-sbtc", // Self-service faucet
  },
  mainnet: {
    vault: "", // TBD
    sbtc: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
    mockSbtc: "", // N/A on mainnet
  },
} as const;

// Token definitions
export const TOKENS = {
  sBTC: {
    symbol: "sBTC",
    name: "sBTC",
    decimals: 8,
    icon: "₿",
  },
  msBTC: {
    symbol: "msBTC",
    name: "Mock sBTC",
    decimals: 8,
    icon: "₿",
  },
} as const;

export type TokenType = keyof typeof TOKENS;

// App details for Stacks Connect
export const APP_DETAILS = {
  name: "BitHarvest",
  icon: "/favicon.ico",
};

// Vault parameters
export const VAULT_PARAMS = {
  collateralRatio: 150, // 150%
  liquidationThreshold: 120, // 120%
  baseSupplyAPY: 3.2,
  baseBorrowAPY: 5.8,
};

// Vault function names
export const VAULT_FUNCTIONS = {
  deposit: "deposit",
  withdraw: "withdraw",
  borrow: "borrow",
  repay: "repay",
  mintMock: "mint",
} as const;

// Error code mapping
export const CONTRACT_ERRORS: Record<number, string> = {
  100: "Contract is currently paused",
  101: "Insufficient balance for this operation",
  102: "Amount must be greater than zero",
  103: "Unauthorized: you don't have permission",
  104: "Position would be under-collateralized",
  105: "No active borrow position found",
  106: "Repayment exceeds outstanding debt",
  107: "Transfer failed",
};
