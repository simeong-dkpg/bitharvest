import { ReactNode, useCallback, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ref.current.style.setProperty("--glow-x", `${x}px`);
      ref.current.style.setProperty("--glow-y", `${y}px`);
      ref.current.style.setProperty("--glow-opacity", "1");
    },
    [prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty("--glow-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative group", className)}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-opacity": "0",
        } as React.CSSProperties
      }
    >
      {/* Spotlight glow */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: "var(--glow-opacity)",
          background:
            "radial-gradient(300px circle at var(--glow-x) var(--glow-y), hsl(24 95% 53% / 0.08), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
