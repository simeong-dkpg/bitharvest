import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface HealthFactorGaugeProps {
  value: number;
  className?: string;
}

type HealthStatus = "DANGER" | "CAUTION" | "SAFE";

function getStatus(value: number): HealthStatus {
  if (value < 120) return "DANGER";
  if (value < 150) return "CAUTION";
  return "SAFE";
}

function getStatusColor(status: HealthStatus): string {
  switch (status) {
    case "DANGER": return "text-destructive";
    case "CAUTION": return "text-warning";
    case "SAFE": return "text-success";
  }
}

function getArcColor(status: HealthStatus): string {
  switch (status) {
    case "DANGER": return "hsl(0, 72%, 51%)";
    case "CAUTION": return "hsl(45, 93%, 47%)";
    case "SAFE": return "hsl(142, 71%, 45%)";
  }
}

export function HealthFactorGauge({ value, className }: HealthFactorGaugeProps) {
  const prefersReduced = useReducedMotion();
  const status = useMemo(() => getStatus(value), [value]);
  const statusColor = getStatusColor(status);
  const arcColor = getArcColor(status);

  const clampedValue = Math.min(Math.max(value, 0), 300);
  const progress = Math.min(clampedValue / 300, 1);
  const angle = progress * 180;

  const radius = 45;
  const cx = 50;
  const cy = 55;

  const needleAngle = (180 - angle) * (Math.PI / 180);
  const needleX = cx + radius * Math.cos(needleAngle);
  const needleY = cy - radius * Math.sin(needleAngle);

  const startX = cx - radius;
  const startY = cy;
  const endAngleRad = (180 - angle) * (Math.PI / 180);
  const arcEndX = cx + radius * Math.cos(endAngleRad);
  const arcEndY = cy - radius * Math.sin(endAngleRad);
  const largeArcFlag = angle > 180 ? 1 : 0;

  // Calculate arc length for stroke animation
  const arcLength = (angle / 180) * Math.PI * radius;

  return (
    <div className={cn("flex flex-col items-center", className)} role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={300} aria-label="Health factor">
      <svg viewBox="0 0 100 60" className="w-full max-w-[160px]">
        {/* Background arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="hsl(220, 16%, 16%)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Value arc - animated draw */}
        {angle > 0 && (
          <motion.path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${arcEndX} ${arcEndY}`}
            fill="none"
            stroke={arcColor}
            strokeWidth="6"
            strokeLinecap="round"
            initial={prefersReduced ? {} : { strokeDasharray: arcLength, strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
        {/* Needle - animated swing */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke={arcColor}
          strokeWidth="2"
          strokeLinecap="round"
          initial={prefersReduced ? {} : { x2: cx - radius, y2: cy }}
          animate={{ x2: needleX, y2: needleY }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 12 }}
        />
        {/* Center dot */}
        <motion.circle
          cx={cx}
          cy={cy}
          r="3"
          fill={arcColor}
          initial={prefersReduced ? {} : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
      </svg>
      <div className="text-center -mt-1">
        <p className={cn("text-xl font-bold font-mono", statusColor)}>
          <AnimatedCounter value={`${value}%`} />
        </p>
        <p className={cn("text-xs font-semibold uppercase tracking-wider", statusColor)}>{status}</p>
      </div>
    </div>
  );
}
