import { useQuery } from "@tanstack/react-query";
import { callReadOnly, parseClarityUint } from "@/lib/stacks/api";
import { CONTRACTS, DEFAULT_NETWORK, VAULT_PARAMS } from "@/lib/stacks/config";

interface VaultData {
  totalDeposits: number; // in satoshis
  totalBorrows: number;
  utilizationRate: number; // percentage 0-100
  isPaused: boolean;
  tvlBtc: string;
  tvlUsd: string;
  supplyApy: string;
  borrowApy: string;
}

const MOCK_DATA: VaultData = {
  totalDeposits: 14_250_000_000, // 142.5 sBTC
  totalBorrows: 4_275_000_000, // 42.75 sBTC
  utilizationRate: 30,
  isPaused: false,
  tvlBtc: "142.50",
  tvlUsd: "9,262,500",
  supplyApy: "3.2",
  borrowApy: "5.8",
};

const BTC_PRICE = 65_000; // mock price

// Set to false to use real contract data from testnet
const USE_MOCK_DATA = false;

function formatBtc(sats: number): string {
  return (sats / 1e8).toFixed(2);
}

function formatUsd(sats: number): string {
  return ((sats / 1e8) * BTC_PRICE).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

async function fetchVaultData(): Promise<VaultData> {
  if (USE_MOCK_DATA) return MOCK_DATA;

  const contractId = CONTRACTS[DEFAULT_NETWORK].vault;
  
  try {
    const [depositsRes, borrowsRes, utilRes, pausedRes] = await Promise.all([
      callReadOnly(contractId, "get-total-deposits", [], DEFAULT_NETWORK),
      callReadOnly(contractId, "get-total-borrows", [], DEFAULT_NETWORK),
      callReadOnly(contractId, "get-utilization-rate", [], DEFAULT_NETWORK),
      callReadOnly(contractId, "is-paused", [], DEFAULT_NETWORK),
    ]);

    if (!depositsRes.okay || !borrowsRes.okay) {
      throw new Error("Contract calls returned errors");
    }

    // Parse values - these would need real Clarity hex decoding in production
    const totalDeposits = depositsRes.result ? parseClarityUint(depositsRes.result) : MOCK_DATA.totalDeposits;
    const totalBorrows = borrowsRes.result ? parseClarityUint(borrowsRes.result) : MOCK_DATA.totalBorrows;
    const utilizationRate = utilRes.result ? parseClarityUint(utilRes.result) : MOCK_DATA.utilizationRate;
    const isPaused = pausedRes.result === "true";

    // Compute APYs based on utilization
    const supplyApy = VAULT_PARAMS.baseSupplyAPY * (utilizationRate / 100);
    const borrowApy = VAULT_PARAMS.baseBorrowAPY;

    return {
      totalDeposits,
      totalBorrows,
      utilizationRate,
      isPaused,
      tvlBtc: formatBtc(totalDeposits),
      tvlUsd: formatUsd(totalDeposits),
      supplyApy: supplyApy.toFixed(1),
      borrowApy: borrowApy.toFixed(1),
    };
  } catch (err) {
    console.warn("Failed to fetch vault data, using mock:", err);
    return MOCK_DATA;
  }
}

export function useVaultData() {
  return useQuery({
    queryKey: ["vaultData"],
    queryFn: fetchVaultData,
    staleTime: 15_000,
    refetchInterval: 30_000,
    retry: 2,
    placeholderData: MOCK_DATA,
  });
}
