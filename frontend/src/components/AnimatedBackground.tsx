import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  durationX: number;
  durationY: number;
  driftX: number;
  driftY: number;
}

interface AnimatedBackgroundProps {
  particleCount?: number;
  className?: string;
  subtle?: boolean;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    opacity: 0.05 + Math.random() * 0.15,
    durationX: 8 + Math.random() * 12,
    durationY: 10 + Math.random() * 15,
    driftX: 15 + Math.random() * 30,
    driftY: 15 + Math.random() * 30,
  }));
}

export function AnimatedBackground({ particleCount = 24, className, subtle = false }: AnimatedBackgroundProps) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles] = useState(() => generateParticles(particleCount));

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReduced) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Aurora blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[150px] opacity-60"
        style={{
          background: subtle
            ? "radial-gradient(circle, hsl(24 95% 53% / 0.04) 0%, transparent 70%)"
            : "radial-gradient(circle, hsl(24 95% 53% / 0.08) 0%, hsl(30 100% 60% / 0.03) 50%, transparent 70%)",
        }}
        animate={{
          x: [mousePos.x * 0.3 + "%", mousePos.x * 0.3 + 5 + "%"],
          y: [mousePos.y * 0.3 + "%", mousePos.y * 0.3 + 5 + "%"],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            x: [-p.driftX / 2, p.driftX / 2, -p.driftX / 2],
            y: [-p.driftY / 2, p.driftY / 2, -p.driftY / 2],
          }}
          transition={{
            x: { duration: p.durationX, repeat: Infinity, ease: "easeInOut" },
            y: { duration: p.durationY, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Secondary aurora */}
      {!subtle && (
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(30 100% 60% / 0.08) 0%, transparent 70%)",
            right: "10%",
            bottom: "20%",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
