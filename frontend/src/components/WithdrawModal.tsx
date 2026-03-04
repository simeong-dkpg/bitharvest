import { useState, useMemo } from "react";
import { uintCV, contractPrincipalCV, Pc, PostConditionMode } from "@stacks/transactions";
import { AmountInput } from "@/components/AmountInput";
import { TransactionModal } from "@/components/TransactionModal";
import { TransactionSummary, type SummaryRow } from "@/components/TransactionSummary";
import { Button } from "@/components/ui/button";
import { useContractTransaction } from "@/hooks/useContractTransaction";
import { CONTRACTS, DEFAULT_NETWORK, VAULT_FUNCTIONS, TOKENS } from "@/lib/stacks/config";

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string | null;
  supplyBalance?: string;
  shares?: string;
  sharePrice?: number;
  btcPrice?: number;
}

export function WithdrawModal({
  open,
  onOpenChange,
  address,
  supplyBalance = "0",
  shares = "0",
  sharePrice = 1,
  btcPrice = 97000,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const tx = useContractTransaction({ address });

  const parsedAmount = parseFloat(amount) || 0;
  const usdValue = (parsedAmount * btcPrice).toFixed(2);
  const sharesToBurn = sharePrice > 0 ? (parsedAmount / sharePrice).toFixed(8).replace(/\.?0+$/, "") : "0";
  const remaining = (parseFloat(supplyBalance) - parsedAmount).toFixed(8).replace(/\.?0+$/, "");
  const sharesSats = Math.floor(parseFloat(sharesToBurn) * 10 ** TOKENS.sBTC.decimals);

  const summaryRows: SummaryRow[] = useMemo(() => [
    { label: "Withdraw Amount", value: `${parsedAmount} sBTC` },
    { label: "Shares Burned", value: sharesToBurn },
    { label: "Remaining Balance", value: `${remaining} sBTC` },
    { label: "Network Fee", value: "~0.001 STX", highlight: "muted" as const },
  ], [parsedAmount, sharesToBurn, remaining]);

  const handleWithdraw = () => {
    const [contractAddress, contractName] = CONTRACTS[DEFAULT_NETWORK].vault.split(".");
    const [sbtcAddress, sbtcName] = CONTRACTS[DEFAULT_NETWORK].mockSbtc.split(".");
    const vaultPrincipal = CONTRACTS[DEFAULT_NETWORK].vault;
    
    tx.execute(() => ({
      contractAddress,
      contractName,
      functionName: VAULT_FUNCTIONS.withdraw,
      functionArgs: [
        uintCV(sharesSats),
        contractPrincipalCV(sbtcAddress, sbtcName),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        Pc.principal(vaultPrincipal)
          .willSendGte(1)
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
      title="Withdraw sBTC"
      description="Withdraw your sBTC from the vault."
      step={tx.step}
      txId={tx.txId}
      errorMessage={tx.errorMessage}
      explorerUrl={tx.explorerUrl}
      onRetry={() => { tx.reset(); handleWithdraw(); }}
    >
      <div className="space-y-4">
        <AmountInput
          value={amount}
          onChange={setAmount}
          maxAmount={supplyBalance}
          balance={supplyBalance}
          usdValue={parsedAmount > 0 ? usdValue : undefined}
          label="Amount to withdraw"
        />
        {parsedAmount > 0 && <TransactionSummary rows={summaryRows} />}
        <Button
          onClick={handleWithdraw}
          disabled={parsedAmount <= 0 || parsedAmount > parseFloat(supplyBalance)}
          className="w-full"
          variant="outline"
        >
          Withdraw {parsedAmount > 0 ? `${amount} sBTC` : ""}
        </Button>
      </div>
    </TransactionModal>
  );
}
