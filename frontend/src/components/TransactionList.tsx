import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Landmark, RotateCcw, ExternalLink, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NETWORK_CONFIG, DEFAULT_NETWORK } from "@/lib/stacks/config";
import type { VaultTransaction, TxType } from "@/hooks/useTransactionHistory";

const TX_CONFIG: Record<TxType, { icon: typeof ArrowDownRight; label: string; color: string }> = {
  deposit: { icon: ArrowDownRight, label: "Deposit", color: "text-success" },
  withdraw: { icon: ArrowUpRight, label: "Withdraw", color: "text-primary" },
  borrow: { icon: Landmark, label: "Borrow", color: "text-warning" },
  repay: { icon: RotateCcw, label: "Repay", color: "text-blue-400" },
  unknown: { icon: Clock, label: "Transaction", color: "text-muted-foreground" },
};

interface TransactionListProps {
  transactions: VaultTransaction[];
  className?: string;
}

export function TransactionList({ transactions, className }: TransactionListProps) {
  const explorerUrl = NETWORK_CONFIG[DEFAULT_NETWORK].explorerUrl;

  if (transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("rounded-xl border border-border/50 bg-card p-8 text-center", className)}
      >
        <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">No transactions yet</p>
      </motion.div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border/50 bg-card overflow-hidden", className)}>
      <div className="px-5 py-4 border-b border-border/50">
        <h3 className="font-semibold">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-border/30">
        <AnimatePresence>
          {transactions.map((tx, i) => {
            const config = TX_CONFIG[tx.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={tx.txId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/30 hover:translate-x-0.5 transition-all duration-200"
              >
                <div className={cn("rounded-lg p-2 bg-secondary/60", config.color)}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{config.label}</p>
                  <p className="text-xs text-muted-foreground">{tx.timeAgo}</p>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="text-sm font-mono font-medium">{parseFloat(tx.amount).toFixed(4)} sBTC</p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] px-1.5 py-0",
                        tx.status === "confirmed" && "border-success/30 text-success",
                        tx.status === "pending" && "border-warning/30 text-warning animate-pulse",
                        tx.status === "failed" && "border-destructive/30 text-destructive",
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </div>

                  <a
                    href={`${explorerUrl}/txid/${tx.txId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="View on explorer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
