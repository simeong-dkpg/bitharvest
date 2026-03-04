import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HealthFactorGauge } from "@/components/HealthFactorGauge";
import { GlowCard } from "@/components/GlowCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MagneticButton } from "@/components/MagneticButton";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface PositionCardProps {
  variant: "supply" | "borrow";
  icon: LucideIcon;
  amount: string;
  usdValue: string;
  apy: string;
  secondaryLabel: string;
  secondaryValue: string;
  healthFactor?: number;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  className?: string;
}

export function PositionCard({
  variant,
  icon: Icon,
  amount,
  usdValue,
  apy,
  secondaryLabel,
  secondaryValue,
  healthFactor,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}: PositionCardProps) {
  const isSupply = variant === "supply";
  const primaryLabel = primaryActionLabel || (isSupply ? "Deposit More" : "Borrow More");
  const secLabel = secondaryActionLabel || (isSupply ? "Withdraw" : "Repay");

  return (
    <GlowCard>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-border/50 bg-card p-6",
          "hover:border-primary/20 hover:shadow-[0_0_24px_hsl(24_95%_53%/0.08)] transition-all duration-250",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={cn("rounded-lg p-2.5", isSupply ? "bg-success/10" : "bg-warning/10")}>
            <Icon className={cn("h-5 w-5", isSupply ? "text-success" : "text-warning")} />
          </div>
          <div>
            <h3 className="font-semibold">{isSupply ? "Supply Position" : "Borrow Position"}</h3>
            <p className="text-xs text-muted-foreground">
              {isSupply ? "Earning yield on your deposit" : "Outstanding borrow balance"}
            </p>
          </div>
        </div>

        {/* Main amount */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono">
              <AnimatedCounter value={amount} />
            </span>
            <span className="text-sm text-muted-foreground">sBTC</span>
          </div>
          <p className="text-sm text-muted-foreground font-mono">≈ ${usdValue}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-5 p-3 rounded-lg bg-secondary/50">
          {[
            { label: isSupply ? "Supply APY" : "Borrow APY", val: apy, colored: true },
            { label: secondaryLabel, val: secondaryValue, colored: false },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={cn("text-sm font-semibold font-mono", stat.colored && (isSupply ? "text-success" : "text-warning"))}>
                {stat.val}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Health factor for borrow */}
        {!isSupply && healthFactor !== undefined && (
          <div className="mb-5">
            <HealthFactorGauge value={healthFactor} />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <MagneticButton className="flex-1">
            <Button
              onClick={onPrimaryAction}
              className={cn(
                "w-full min-touch-target group",
                isSupply
                  ? "bg-gradient-to-r from-primary to-orange-400 hover:scale-[1.02] transition-transform"
                  : "bg-gradient-to-r from-warning to-amber-400 text-warning-foreground hover:scale-[1.02] transition-transform"
              )}
              aria-label={primaryLabel}
            >
              {isSupply ? <ArrowDownRight className="mr-1 h-4 w-4 transition-transform group-hover:rotate-12" /> : <ArrowUpRight className="mr-1 h-4 w-4 transition-transform group-hover:rotate-12" />}
              {primaryLabel}
            </Button>
          </MagneticButton>
          <Button
            variant="outline"
            onClick={onSecondaryAction}
            className="flex-1 hover:bg-secondary min-touch-target"
            aria-label={secLabel}
          >
            {secLabel}
          </Button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
      </motion.div>
    </GlowCard>
  );
}
