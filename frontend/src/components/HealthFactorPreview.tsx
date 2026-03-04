import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface HealthFactorPreviewProps {
  current: number;
  projected: number;
  className?: string;
}

function getHFColor(value: number) {
  if (value >= 150) return "text-success";
  if (value >= 120) return "text-warning";
  return "text-destructive";
}

function getHFLabel(value: number) {
  if (value >= 150) return "Safe";
  if (value >= 120) return "Caution";
  return "Danger";
}

export function HealthFactorPreview({ current, projected, className }: HealthFactorPreviewProps) {
  const showWarning = projected < 150;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Current</p>
          <p className={cn("text-xl font-bold font-mono", getHFColor(current))}>
            <AnimatedCounter value={`${current.toFixed(0)}%`} />
          </p>
          <p className={cn("text-xs", getHFColor(current))}>{getHFLabel(current)}</p>
        </div>

        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </motion.div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Projected</p>
          <p className={cn("text-xl font-bold font-mono", getHFColor(projected))}>
            {projected === Infinity ? "∞" : <AnimatedCounter value={`${projected.toFixed(0)}%`} />}
          </p>
          <p className={cn("text-xs", getHFColor(projected))}>{getHFLabel(projected)}</p>
        </div>
      </div>

      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "rounded-lg px-4 py-3 text-sm overflow-hidden",
              projected < 120
                ? "bg-destructive/10 text-destructive border border-destructive/20"
                : "bg-warning/10 text-warning border border-warning/20"
            )}
          >
            {projected < 120
              ? "⚠️ Danger: Position will be at risk of liquidation."
              : "⚠️ Caution: Health factor is approaching the liquidation threshold."}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
