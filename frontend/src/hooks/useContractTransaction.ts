import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CONTRACT_ERRORS, NETWORK_CONFIG, DEFAULT_NETWORK } from "@/lib/stacks/config";
import type { TransactionStep } from "@/components/TransactionModal";

interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  postConditions?: any[];
}

type TransactionBuilder = () => ContractCallOptions;

interface UseContractTransactionOptions {
  onSuccess?: () => void;
  invalidateKeys?: string[][];
  address?: string | null;
}

export function useContractTransaction(options: UseContractTransactionOptions = {}) {
  const [step, setStep] = useState<TransactionStep>("input");
  const [txId, setTxId] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const explorerUrl = NETWORK_CONFIG[DEFAULT_NETWORK].explorerUrl;

  const reset = useCallback(() => {
    setStep("input");
    setTxId(undefined);
    setErrorMessage(undefined);
  }, []);

  const openModal = useCallback(() => {
    reset();
    setOpen(true);
  }, [reset]);

  const execute = useCallback(async (builder: TransactionBuilder) => {
    try {
      setStep("confirming");
      const callOptions = builder();

      const { openContractCall } = await import("@stacks/connect");

      await openContractCall({
        ...callOptions,
        network: DEFAULT_NETWORK === "testnet" ? "testnet" : "mainnet",
        onFinish: (data: any) => {
          const id = data.txId || data.txid;
          setTxId(id);
          setStep("broadcasting");

          // Simulate broadcast confirmation after delay (real app would poll)
          setTimeout(() => {
            setStep("success");
            toast.success("Transaction confirmed", {
              description: id ? `TX: ${id.slice(0, 8)}...${id.slice(-6)}` : undefined,
              duration: 5000,
            });

            // Invalidate queries
            const keys = options.invalidateKeys || [];
            const defaultKeys = [
              ["vaultData"],
              ...(options.address ? [["userPosition", options.address], ["transactionHistory", options.address]] : []),
            ];
            [...defaultKeys, ...keys].forEach((key) =>
              queryClient.invalidateQueries({ queryKey: key })
            );

            options.onSuccess?.();
          }, 3000);
        },
        onCancel: () => {
          setStep("input");
        },
      });
    } catch (error: any) {
      console.error("Transaction error:", error);

      // Try to map contract error codes
      const codeMatch = error?.message?.match(/error (\d+)/i);
      const code = codeMatch ? parseInt(codeMatch[1]) : null;
      const mapped = code !== null ? CONTRACT_ERRORS[code] : null;

      setErrorMessage(mapped || error?.message || "An unexpected error occurred");
      setStep("error");

      toast.error("Transaction failed", {
        description: mapped || error?.message || "Please try again",
      });
    }
  }, [queryClient, options]);

  return {
    step,
    txId,
    errorMessage,
    explorerUrl,
    open,
    setOpen,
    openModal,
    execute,
    reset,
    setStep,
  };
}
