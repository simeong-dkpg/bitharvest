import { useState, useMemo } from "react";
import { uintCV, contractPrincipalCV, Pc, PostConditionMode } from "@stacks/transactions";
import { AmountInput } from "@/components/AmountInput";
import { TransactionModal } from "@/components/TransactionModal";
import { TransactionSummary, type SummaryRow } from "@/components/TransactionSummary";
import { HealthFactorPreview } from "@/components/HealthFactorPreview";
import { Button } from "@/components/ui/button";
import { useContractTransaction } from "@/hooks/useContractTransaction";
import { CONTRACTS, DEFAULT_NETWORK, VAULT_FUNCTIONS, TOKENS } from "@/lib/stacks/config";

interface RepayModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string | null;
  borrowBalance?: string;
  supplyBalance?: string;
  healthFactor?: number;
  btcPrice?: number;
}

export function RepayModal({
  open,
  onOpenChange,
  address,
  borrowBalance = "0",
  supplyBalance = "0",
  healthFactor = 999,
  btcPrice = 97000,
}: RepayModalProps) {
  const [amount, setAmount] = useState("");
  const tx = useContractTransaction({ address });

  const parsedAmount = parseFloat(amount) || 0;
  const amountSats = Math.floor(parsedAmount * 10 ** TOKENS.sBTC.decimals);
  const usdValue = (parsedAmount * btcPrice).toFixed(2);
  const borrowNum = parseFloat(borrowBalance);
  const supplyNum = parseFloat(supplyBalance);
  const remainingDebt = Math.max(0, borrowNum - parsedAmount);
  const projectedHF = remainingDebt > 0 ? (supplyNum * 100) / remainingDebt : Infinity;

  const summaryRows: SummaryRow[] = useMemo(() => [
    { label: "Repay Amount", value: `${parsedAmount} sBTC` },
    { label: "Remaining Debt", value: `${remainingDebt.toFixed(8).replace(/\.?0+$/, "")} sBTC` },
    { label: "Network Fee", value: "~0.001 STX", highlight: "muted" as const },
  ], [parsedAmount, remainingDebt]);

  const handleRepay = () => {
    if (!address) return;
    
    const [contractAddress, contractName] = CONTRACTS[DEFAULT_NETWORK].vault.split(".");
    const [sbtcAddress, sbtcName] = CONTRACTS[DEFAULT_NETWORK].mockSbtc.split(".");
    
    tx.execute(() => ({
      contractAddress,
      contractName,
      functionName: VAULT_FUNCTIONS.repay,
      functionArgs: [
        uintCV(amountSats),
        contractPrincipalCV(sbtcAddress, sbtcName),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        Pc.principal(address)
          .willSendLte(amountSats + 1000000) // Buffer for interest
          .ft(`${sbtcAddress}.${sbtcName}`, "mock-sbtc"),
      ],
    }));
  };

  const handleRepayFull = () => {
    setAmount(borrowBalance);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) { setAmount(""); tx.reset(); }
    onOpenChange(isOpen);
  };

  return (
    <TransactionModal
      open={open}
      onOpenChange={handleOpenChange}
      title="Repay sBTC"
      description="Repay your outstanding borrow balance."
      step={tx.step}
      txId={tx.txId}
      errorMessage={tx.errorMessage}
      explorerUrl={tx.explorerUrl}
      onRetry={() => { tx.reset(); handleRepay(); }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Outstanding Debt</span>
          <span className="font-mono font-medium">{borrowBalance} sBTC</span>
        </div>

        <AmountInput
          value={amount}
          onChange={setAmount}
          maxAmount={borrowBalance}
          balance={borrowBalance}
          usdValue={parsedAmount > 0 ? usdValue : undefined}
          label="Amount to repay"
        />

        <Button
          variant="outline"
          size="sm"
          onClick={handleRepayFull}
          className="w-full text-xs"
        >
          Repay Full Amount
        </Button>

        {parsedAmount > 0 && (
          <>
            <HealthFactorPreview current={healthFactor} projected={projectedHF} />
            <TransactionSummary rows={summaryRows} />
          </>
        )}

        <Button
          onClick={handleRepay}
          disabled={parsedAmount <= 0 || parsedAmount > borrowNum}
          className="w-full"
        >
          Repay {parsedAmount > 0 ? `${amount} sBTC` : ""}
        </Button>
      </div>
    </TransactionModal>
  );
}
