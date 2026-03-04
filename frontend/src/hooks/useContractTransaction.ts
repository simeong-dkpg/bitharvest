/**
 * useContractTransaction - Modern Stacks Connect implementation
 * 
 * Uses request('stx_callContract', ...) from @stacks/connect v8.x
 */

import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { request } from "@stacks/connect";
import { Cl } from "@stacks/transactions";
import { toast } from "sonner";
import { CONTRACT_ERRORS, NETWORK_CONFIG, DEFAULT_NETWORK } from "@/lib/stacks/config";
import type { TransactionStep } from "@/components/TransactionModal";

interface ContractCallOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  postConditions?: any[];
  postConditionMode?: "allow" | "deny";
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

      // Build contract principal
      const contract = `${callOptions.contractAddress}.${callOptions.contractName}`;
      
      // Use the modern request API
      const result = await request("stx_callContract", {
        contract,
        functionName: callOptions.functionName,
        functionArgs: callOptions.functionArgs,
        network: DEFAULT_NETWORK,
        postConditions: callOptions.postConditions || [],
        postConditionMode: callOptions.postConditionMode || "deny",
        sponsored: false,
      });

      const id = result.txid || result.txId;
      setTxId(id);
      setStep("broadcasting");

      // Poll for confirmation or simulate delay
      setTimeout(() => {
        setStep("success");
        toast.success("Transaction submitted", {
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
      }, 2000);

    } catch (error: any) {
      console.error("Transaction error:", error);

      // User cancelled
      if (error?.message?.includes("cancel") || error?.message?.includes("rejected")) {
        setStep("input");
        return;
      }

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
