import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/GlowCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subValue?: string;
  change?: { value: string; positive: boolean };
  className?: string;
}

export function StatCard({ icon: Icon, label, value, subValue, change, className }: StatCardProps) {
  return (
    <GlowCard>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-border/50 bg-card p-5",
          "hover:border-primary/30 hover:shadow-[0_0_20px_hsl(24_95%_53%/0.1)] transition-all duration-250",
          className
        )}
        role="status"
        aria-label={`${label}: ${value}`}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold font-mono tracking-tight">
              <AnimatedCounter value={value} />
            </p>
            {subValue && (
              <p className="text-xs text-muted-foreground font-mono">{subValue}</p>
            )}
          </div>
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        {change && (
          <motion.div
            className="mt-3 flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span
              className={cn(
                "text-xs font-medium font-mono",
                change.positive ? "text-success" : "text-destructive"
              )}
            >
              {change.positive ? "+" : ""}{change.value}
            </span>
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />
      </motion.div>
    </GlowCard>
  );
}
