import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function Digit({ digit, index }: { digit: string; index: number }) {
  const isNumber = /\d/.test(digit);

  if (!isNumber) {
    return <span>{digit}</span>;
  }

  return (
    <span className="inline-block relative overflow-hidden" style={{ width: "0.62em", height: "1.15em" }}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={`${index}-${digit}`}
          className="inline-block absolute inset-0"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const prefersReduced = useReducedMotion();
  const prevValue = useRef(value);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
    prevValue.current = value;
  }, [value]);

  if (prefersReduced) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={cn("inline-flex", className)} aria-label={value}>
      {displayValue.split("").map((char, i) => (
        <Digit key={i} digit={char} index={i} />
      ))}
    </span>
  );
}
