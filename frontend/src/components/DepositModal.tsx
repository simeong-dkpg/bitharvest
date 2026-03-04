import { useState, useMemo } from "react";
import { uintCV } from "@stacks/transactions";
import { AmountInput } from "@/components/AmountInput";
import { TransactionModal } from "@/components/TransactionModal";
import { TransactionSummary, type SummaryRow } from "@/components/TransactionSummary";
import { Button } from "@/components/ui/button";
import { useContractTransaction } from "@/hooks/useContractTransaction";
import { CONTRACTS, DEFAULT_NETWORK, VAULT_FUNCTIONS, VAULT_PARAMS, TOKENS } from "@/lib/stacks/config";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string | null;
  balance?: string;
  currentSupply?: string;
  supplyApy?: number;
  sharePrice?: number;
  btcPrice?: number;
}

export function DepositModal({
  open,
  onOpenChange,
  address,
  balance = "0",
  currentSupply = "0",
  supplyApy = VAULT_PARAMS.baseSupplyAPY,
  sharePrice = 1,
  btcPrice = 97000,
}: DepositModalProps) {
  const [amount, setAmount] = useState("");

  const tx = useContractTransaction({ address });

  const parsedAmount = parseFloat(amount) || 0;
  const amountSats = Math.floor(parsedAmount * 10 ** TOKENS.sBTC.decimals);
  const usdValue = (parsedAmount * btcPrice).toFixed(2);
  const estimatedShares = sharePrice > 0 ? (parsedAmount / sharePrice).toFixed(8).replace(/\.?0+$/, "") : "0";
  const newBalance = (parseFloat(currentSupply) + parsedAmount).toFixed(8).replace(/\.?0+$/, "");

  const summaryRows: SummaryRow[] = useMemo(() => [
    { label: "Deposit Amount", value: `${parsedAmount} sBTC` },
    { label: "Est. Shares", value: estimatedShares },
    { label: "New Supply Balance", value: `${newBalance} sBTC` },
    { label: "Supply APY", value: `${supplyApy}%`, highlight: "success" as const },
    { label: "Network Fee", value: "~0.001 STX", highlight: "muted" as const },
  ], [parsedAmount, estimatedShares, newBalance, supplyApy]);

  const handleDeposit = () => {
    const [contractAddress, contractName] = CONTRACTS[DEFAULT_NETWORK].vault.split(".");
    tx.execute(() => ({
      contractAddress,
      contractName,
      functionName: VAULT_FUNCTIONS.deposit,
      functionArgs: [uintCV(amountSats)],
      postConditions: [],
    }));
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setAmount("");
      tx.reset();
    }
    onOpenChange(isOpen);
  };

  return (
    <TransactionModal
      open={open}
      onOpenChange={handleOpenChange}
      title="Deposit sBTC"
      description="Deposit sBTC into the vault to start earning yield."
      step={tx.step}
      txId={tx.txId}
      errorMessage={tx.errorMessage}
      explorerUrl={tx.explorerUrl}
      onRetry={() => { tx.reset(); handleDeposit(); }}
    >
      <div className="space-y-4">
        <AmountInput
          value={amount}
          onChange={setAmount}
          maxAmount={balance}
          balance={balance}
          usdValue={parsedAmount > 0 ? usdValue : undefined}
          label="Amount to deposit"
        />

        {parsedAmount > 0 && <TransactionSummary rows={summaryRows} />}

        <Button
          onClick={handleDeposit}
          disabled={parsedAmount <= 0 || parsedAmount > parseFloat(balance)}
          className="w-full bg-gradient-to-r from-primary to-orange-400 text-primary-foreground hover:scale-[1.02] transition-transform"
        >
          Deposit {parsedAmount > 0 ? `${amount} sBTC` : ""}
        </Button>
      </div>
    </TransactionModal>
  );
}
