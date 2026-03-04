import { useState, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  maxAmount?: string;
  tokenSymbol?: string;
  tokenIcon?: string;
  usdValue?: string;
  balance?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const PERCENTAGES = [25, 50, 75, 100] as const;

export function AmountInput({
  value,
  onChange,
  maxAmount,
  tokenSymbol = "sBTC",
  tokenIcon = "₿",
  usdValue,
  balance,
  label,
  disabled = false,
  className,
}: AmountInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useId();
  const usdId = `${id}-usd`;
  const balanceId = `${id}-balance`;

  const isOverBalance = maxAmount && value ? parseFloat(value) > parseFloat(maxAmount) : false;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "" || /^\d*\.?\d{0,8}$/.test(val)) {
        onChange(val);
      }
    },
    [onChange]
  );

  const handlePercentage = useCallback(
    (pct: number) => {
      if (!maxAmount) return;
      const max = parseFloat(maxAmount);
      if (isNaN(max)) return;
      const result = (max * pct) / 100;
      onChange(result.toFixed(8).replace(/\.?0+$/, ""));
    },
    [maxAmount, onChange]
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
      <motion.div
        animate={
          isFocused
            ? { boxShadow: "0 0 0 2px hsl(24 95% 53% / 0.2), 0 0 16px hsl(24 95% 53% / 0.1)" }
            : isOverBalance
            ? { boxShadow: "0 0 0 2px hsl(0 72% 51% / 0.3)" }
            : { boxShadow: "0 0 0 0px transparent" }
        }
        transition={{ duration: 0.2 }}
        className={cn(
          "rounded-xl border bg-secondary/50 p-4 transition-colors duration-200",
          isFocused ? "border-primary/50" : "border-border",
          isOverBalance && "border-destructive/50",
          disabled && "opacity-50"
        )}
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className="flex-1 bg-transparent text-2xl font-mono font-bold outline-none placeholder:text-muted-foreground/40 focus-ring rounded"
            aria-label={label || "Amount"}
            aria-describedby={`${usdId} ${balanceId}`}
            aria-invalid={isOverBalance || undefined}
          />
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <span className="text-primary font-bold">{tokenIcon}</span>
            <span className="text-sm font-semibold">{tokenSymbol}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.span
              key={usdValue || "empty"}
              id={usdId}
              className="text-xs text-muted-foreground font-mono"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {usdValue ? `≈ $${usdValue}` : "\u00A0"}
            </motion.span>
          </AnimatePresence>
          {balance && (
            <span id={balanceId} className="text-xs text-muted-foreground">
              Balance: <span className="font-mono">{balance}</span> {tokenSymbol}
            </span>
          )}
        </div>
      </motion.div>

      {maxAmount && (
        <div className="flex gap-2">
          {PERCENTAGES.map((pct, i) => (
            <motion.div
              key={pct}
              className="flex-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePercentage(pct)}
                disabled={disabled}
                className="w-full text-xs font-mono hover:bg-primary/10 hover:text-primary hover:border-primary/30 min-touch-target active:scale-95 transition-transform"
                aria-label={`Set to ${pct}%`}
              >
                {pct === 100 ? "MAX" : `${pct}%`}
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
