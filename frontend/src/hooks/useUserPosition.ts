import { useQuery } from "@tanstack/react-query";
import { callReadOnly, parseClarityUint, encodePrincipal } from "@/lib/stacks/api";
import { CONTRACTS, DEFAULT_NETWORK } from "@/lib/stacks/config";

interface UserPosition {
  shares: number;
  supplyBalance: number; // sats
  maxBorrow: number;
  borrowedAmount: number;
  accruedInterest: number;
  estimatedYield: number;
  healthFactor: number;
  hasSupplyPosition: boolean;
  hasBorrowPosition: boolean;
  supplyBtc: string;
  supplyUsd: string;
  borrowBtc: string;
  borrowUsd: string;
  yieldBtc: string;
  maxBorrowBtc: string;
}

const BTC_PRICE = 65_000;

const EMPTY_POSITION: UserPosition = {
  shares: 0,
  supplyBalance: 0,
  maxBorrow: 0,
  borrowedAmount: 0,
  accruedInterest: 0,
  estimatedYield: 0,
  healthFactor: 0,
  hasSupplyPosition: false,
  hasBorrowPosition: false,
  supplyBtc: "0.00",
  supplyUsd: "0",
  borrowBtc: "0.00",
  borrowUsd: "0",
  yieldBtc: "0.00000000",
  maxBorrowBtc: "0.00",
};

function fmt(sats: number, dec = 2): string {
  return (sats / 1e8).toFixed(dec);
}

function fmtUsd(sats: number): string {
  return ((sats / 1e8) * BTC_PRICE).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

async function fetchUserPosition(address: string): Promise<UserPosition> {
  const contractId = CONTRACTS[DEFAULT_NETWORK].vault;
  const principalArg = encodePrincipal(address);

  try {
    const [sharesRes, balanceRes, maxBorrowRes, borrowRes, yieldRes] = await Promise.all([
      callReadOnly(contractId, "get-user-shares", [principalArg], DEFAULT_NETWORK),
      callReadOnly(contractId, "get-user-balance", [principalArg], DEFAULT_NETWORK),
      callReadOnly(contractId, "get-max-borrow", [principalArg], DEFAULT_NETWORK),
      callReadOnly(contractId, "get-borrow-position", [principalArg], DEFAULT_NETWORK),
      callReadOnly(contractId, "get-estimated-yield", [principalArg], DEFAULT_NETWORK),
    ]);

    const shares = sharesRes.okay && sharesRes.result ? parseClarityUint(sharesRes.result) : 0;
    const supplyBalance = balanceRes.okay && balanceRes.result ? parseClarityUint(balanceRes.result) : 0;
    const maxBorrow = maxBorrowRes.okay && maxBorrowRes.result ? parseClarityUint(maxBorrowRes.result) : 0;
    const borrowedAmount = borrowRes.okay && borrowRes.result ? parseClarityUint(borrowRes.result) : 0;
    const estimatedYield = yieldRes.okay && yieldRes.result ? parseClarityUint(yieldRes.result) : 0;

    const healthFactor = borrowedAmount > 0 ? (supplyBalance * 100) / borrowedAmount : 0;

    return {
      shares,
      supplyBalance,
      maxBorrow,
      borrowedAmount,
      accruedInterest: 0,
      estimatedYield,
      healthFactor: Math.round(healthFactor),
      hasSupplyPosition: supplyBalance > 0,
      hasBorrowPosition: borrowedAmount > 0,
      supplyBtc: fmt(supplyBalance),
      supplyUsd: fmtUsd(supplyBalance),
      borrowBtc: fmt(borrowedAmount),
      borrowUsd: fmtUsd(borrowedAmount),
      yieldBtc: fmt(estimatedYield, 8),
      maxBorrowBtc: fmt(maxBorrow),
    };
  } catch (err) {
    console.warn("Failed to fetch user position, returning empty:", err);
    return EMPTY_POSITION;
  }
}

export function useUserPosition(address: string | null) {
  return useQuery({
    queryKey: ["userPosition", address],
    queryFn: () => fetchUserPosition(address!),
    enabled: !!address,
    staleTime: 10_000,
    refetchInterval: 30_000,
    placeholderData: EMPTY_POSITION,
  });
}
