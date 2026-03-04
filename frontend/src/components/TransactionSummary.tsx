import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SummaryRow {
  label: string;
  value: string;
  highlight?: "success" | "warning" | "danger" | "muted";
}

interface TransactionSummaryProps {
  rows: SummaryRow[];
  className?: string;
}

export function TransactionSummary({ rows, className }: TransactionSummaryProps) {
  const colorMap = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-destructive",
    muted: "text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("rounded-lg border border-border/50 bg-secondary/30 p-4 space-y-3 overflow-hidden", className)}
    >
      {rows.map((row, i) => (
        <motion.div
          key={i}
          className="flex items-center justify-between text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
        >
          <span className="text-muted-foreground">{row.label}</span>
          <span className={cn("font-mono font-medium", row.highlight ? colorMap[row.highlight] : "text-foreground")}>
            {row.value}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
