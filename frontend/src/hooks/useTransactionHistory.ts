import { useQuery } from "@tanstack/react-query";
import { fetchAddressTransactions } from "@/lib/stacks/api";
import { CONTRACTS, DEFAULT_NETWORK } from "@/lib/stacks/config";
import { formatDistanceToNow } from "date-fns";

export type TxType = "deposit" | "withdraw" | "borrow" | "repay" | "unknown";

export interface VaultTransaction {
  type: TxType;
  amount: string;
  timestamp: string;
  timeAgo: string;
  status: "pending" | "confirmed" | "failed";
  txId: string;
}

const FUNCTION_TYPE_MAP: Record<string, TxType> = {
  deposit: "deposit",
  supply: "deposit",
  withdraw: "withdraw",
  borrow: "borrow",
  repay: "repay",
  "repay-borrow": "repay",
};

function parseTxType(functionName: string): TxType {
  return FUNCTION_TYPE_MAP[functionName] || "unknown";
}

function parseAmount(args?: Array<{ repr: string }>): string {
  if (!args || args.length === 0) return "0";
  const first = args[0].repr;
  // Clarity repr like "u1000000" -> 0.01 BTC
  const match = first.match(/u(\d+)/);
  if (match) return (parseInt(match[1], 10) / 1e8).toFixed(8);
  return "0";
}

async function fetchHistory(address: string): Promise<VaultTransaction[]> {
  const vaultContract = CONTRACTS[DEFAULT_NETWORK].vault;
  const rawTxs = await fetchAddressTransactions(address, DEFAULT_NETWORK, 50);

  return rawTxs
    .filter((tx) => tx.contract_call?.contract_id === vaultContract)
    .slice(0, 10)
    .map((tx) => ({
      type: parseTxType(tx.contract_call?.function_name || ""),
      amount: parseAmount(tx.contract_call?.function_args),
      timestamp: tx.burn_block_time_iso,
      timeAgo: formatDistanceToNow(new Date(tx.burn_block_time_iso), { addSuffix: true }),
      status: tx.tx_status === "success" ? "confirmed" as const : tx.tx_status === "pending" ? "pending" as const : "failed" as const,
      txId: tx.tx_id,
    }));
}

export function useTransactionHistory(address: string | null) {
  return useQuery({
    queryKey: ["txHistory", address],
    queryFn: () => fetchHistory(address!),
    enabled: !!address,
    staleTime: 30_000,
    refetchInterval: 60_000,
    placeholderData: [],
  });
}
