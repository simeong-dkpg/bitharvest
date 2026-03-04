import { motion } from "framer-motion";
import { TrendingUp, Landmark, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/GlowCard";
import { MagneticButton } from "@/components/MagneticButton";

interface EmptyPositionProps {
  variant: "supply" | "borrow";
  onAction?: () => void;
  className?: string;
}

export function EmptyPosition({ variant, onAction, className }: EmptyPositionProps) {
  const isSupply = variant === "supply";

  return (
    <GlowCard>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-dashed border-border/60 bg-card/50 p-8 text-center",
          "hover:border-primary/20 transition-all duration-250",
          className
        )}
      >
        <motion.div
          className={cn(
            "mx-auto mb-4 w-14 h-14 rounded-xl flex items-center justify-center",
            isSupply ? "bg-success/10" : "bg-warning/10"
          )}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {isSupply
            ? <TrendingUp className="h-7 w-7 text-success" />
            : <Landmark className="h-7 w-7 text-warning" />
          }
        </motion.div>

        <h3 className="text-lg font-semibold mb-2">
          {isSupply ? "No Supply Position" : "No Borrow Position"}
        </h3>

        <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-5">
          {isSupply
            ? "Start earning yield on your sBTC by depositing into the vault."
            : "Borrow against your collateral at competitive rates. Deposit first to enable borrowing."
          }
        </p>

        {isSupply && (
          <MagneticButton>
            <Button
              onClick={onAction}
              className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground hover:scale-[1.02] transition-transform min-touch-target group"
              aria-label="Deposit sBTC to start earning"
            >
              <ArrowDownRight className="mr-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              Deposit sBTC
            </Button>
          </MagneticButton>
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
      </motion.div>
    </GlowCard>
  );
}
