import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BitHarvestLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  className?: string;
}

const sizes = {
  sm: { container: "h-8 w-8", icon: 32 },
  md: { container: "h-10 w-10", icon: 40 },
  lg: { container: "h-16 w-16", icon: 64 },
  xl: { container: "h-24 w-24", icon: 96 },
};

export function BitHarvestLogo({ size = "sm", animate = true, className }: BitHarvestLogoProps) {
  const s = sizes[size];
  const Wrapper = animate ? motion.div : "div";
  const animProps = animate
    ? {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring" as const, stiffness: 400, damping: 15 },
      }
    : {};

  return (
    <Wrapper
      className={cn("relative flex-shrink-0", s.container, className)}
      {...animProps}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-400/20 blur-lg scale-150 opacity-60" />
      
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative w-full h-full drop-shadow-lg"
      >
        <defs>
          {/* Main gradient */}
          <linearGradient id="logo-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          
          {/* Inner shadow gradient */}
          <linearGradient id="logo-inner" x1="60" y1="10" x2="60" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Leaf/sprout accent gradient */}
          <linearGradient id="logo-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Shine sweep */}
          <linearGradient id="logo-shine" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="40%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer shape — rounded hexagonal vault door */}
        <rect x="4" y="4" width="112" height="112" rx="28" fill="url(#logo-bg)" />
        
        {/* Inner bevel / depth layer */}
        <rect x="4" y="4" width="112" height="112" rx="28" fill="url(#logo-inner)" />
        
        {/* Subtle border ring */}
        <rect x="4" y="4" width="112" height="112" rx="28" stroke="white" strokeOpacity="0.1" strokeWidth="1" fill="none" />
        
        {/* Inner recessed panel */}
        <rect x="14" y="14" width="92" height="92" rx="20" fill="black" fillOpacity="0.12" />
        <rect x="14" y="14" width="92" height="92" rx="20" stroke="white" strokeOpacity="0.06" strokeWidth="0.5" fill="none" />

        {/* Bitcoin-style "B" with double bars */}
        <g transform="translate(60, 60)">
          {/* Top vertical bar extending above B */}
          <rect x="-8" y="-32" width="4.5" height="10" rx="2" fill="white" />
          <rect x="3.5" y="-32" width="4.5" height="10" rx="2" fill="white" />
          
          {/* Bottom vertical bar extending below B */}
          <rect x="-8" y="22" width="4.5" height="10" rx="2" fill="white" />
          <rect x="3.5" y="22" width="4.5" height="10" rx="2" fill="white" />
          
          {/* Main B body */}
          <path
            d="M-14,-22 L-14,22 L6,22 C16,22 22,16 22,10 C22,4 18,0 12,0 C17,-1 20,-5 20,-10 C20,-17 14,-22 5,-22 Z
               M-4,-14 L3,-14 C8,-14 11,-11 11,-8 C11,-5 8,-2 3,-2 L-4,-2 Z
               M-4,6 L4,6 C10,6 13,9 13,12 C13,15 10,18 4,18 L-4,18 Z"
            fill="white"
            fillRule="evenodd"
          />
        </g>

        {/* Small sprout/leaf accent — top right */}
        <g transform="translate(88, 22)">
          <path
            d="M0,12 C0,12 2,4 8,0 C8,0 6,8 0,12Z"
            fill="url(#logo-leaf)"
            opacity="0.9"
          />
          <path
            d="M2,14 C2,14 -2,6 -6,4 C-6,4 0,6 2,14Z"
            fill="url(#logo-leaf)"
            opacity="0.7"
          />
        </g>

        {/* Glass shine overlay */}
        <rect x="4" y="4" width="112" height="112" rx="28" fill="url(#logo-shine)" />
      </svg>
    </Wrapper>
  );
}
