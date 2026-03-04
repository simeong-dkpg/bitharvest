import { useState, useMemo } from "react";
import { uintCV, contractPrincipalCV, Pc, PostConditionMode } from "@stacks/transactions";
import { AmountInput } from "@/components/AmountInput";
import { TransactionModal } from "@/components/TransactionModal";
import { TransactionSummary, type SummaryRow } from "@/components/TransactionSummary";
import { HealthFactorPreview } from "@/components/HealthFactorPreview";
import { Button } from "@/components/ui/button";
import { useContractTransaction } from "@/hooks/useContractTransaction";
import { CONTRACTS, DEFAULT_NETWORK, VAULT_FUNCTIONS, VAULT_PARAMS, TOKENS } from "@/lib/stacks/config";

interface BorrowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string | null;
  maxBorrow?: string;
  currentBorrow?: string;
  supplyBalance?: string;
  healthFactor?: number;
  btcPrice?: number;
}

export function BorrowModal({
  open,
  onOpenChange,
  address,
  maxBorrow = "0",
  currentBorrow = "0",
  supplyBalance = "0",
  healthFactor = 999,
  btcPrice = 97000,
}: BorrowModalProps) {
  const [amount, setAmount] = useState("");
  const tx = useContractTransaction({ address });

  const parsedAmount = parseFloat(amount) || 0;
  const amountSats = Math.floor(parsedAmount * 10 ** TOKENS.sBTC.decimals);
  const usdValue = (parsedAmount * btcPrice).toFixed(2);
  const currentBorrowNum = parseFloat(currentBorrow);
  const supplyNum = parseFloat(supplyBalance);
  const newBorrow = currentBorrowNum + parsedAmount;
  const projectedHF = newBorrow > 0 ? (supplyNum * 100) / newBorrow : Infinity;

  const summaryRows: SummaryRow[] = useMemo(() => [
    { label: "Borrow Amount", value: `${parsedAmount} sBTC` },
    { label: "Total Debt", value: `${newBorrow.toFixed(8).replace(/\.?0+$/, "")} sBTC` },
    { label: "Collateral Ratio", value: `${VAULT_PARAMS.collateralRatio}%` },
    { label: "Liquidation Threshold", value: `${VAULT_PARAMS.liquidationThreshold}%`, highlight: "warning" as const },
    { label: "Network Fee", value: "~0.001 STX", highlight: "muted" as const },
  ], [parsedAmount, newBorrow]);

  const handleBorrow = () => {
    const [contractAddress, contractName] = CONTRACTS[DEFAULT_NETWORK].vault.split(".");
    const [sbtcAddress, sbtcName] = CONTRACTS[DEFAULT_NETWORK].mockSbtc.split(".");
    const vaultPrincipal = CONTRACTS[DEFAULT_NETWORK].vault;
    
    tx.execute(() => ({
      contractAddress,
      contractName,
      functionName: VAULT_FUNCTIONS.borrow,
      functionArgs: [
        uintCV(amountSats),
        contractPrincipalCV(sbtcAddress, sbtcName),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        Pc.principal(vaultPrincipal)
          .willSendLte(amountSats)
          .ft(`${sbtcAddress}.${sbtcName}`, "mock-sbtc"),
      ],
    }));
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) { setAmount(""); tx.reset(); }
    onOpenChange(isOpen);
  };

  return (
    <TransactionModal
      open={open}
      onOpenChange={handleOpenChange}
      title="Borrow sBTC"
      description="Borrow against your collateral."
      step={tx.step}
      txId={tx.txId}
      errorMessage={tx.errorMessage}
      explorerUrl={tx.explorerUrl}
      onRetry={() => { tx.reset(); handleBorrow(); }}
    >
      <div className="space-y-4">
        <AmountInput
          value={amount}
          onChange={setAmount}
          maxAmount={maxBorrow}
          balance={maxBorrow}
          usdValue={parsedAmount > 0 ? usdValue : undefined}
          label="Amount to borrow"
        />

        {parsedAmount > 0 && (
          <>
            <HealthFactorPreview current={healthFactor} projected={projectedHF} />
            <TransactionSummary rows={summaryRows} />
          </>
        )}

        <Button
          onClick={handleBorrow}
          disabled={parsedAmount <= 0 || parsedAmount > parseFloat(maxBorrow) || projectedHF < VAULT_PARAMS.liquidationThreshold}
          className="w-full bg-gradient-to-r from-warning to-amber-400 text-warning-foreground hover:scale-[1.02] transition-transform"
        >
          Borrow {parsedAmount > 0 ? `${amount} sBTC` : ""}
        </Button>
      </div>
    </TransactionModal>
  );
}
