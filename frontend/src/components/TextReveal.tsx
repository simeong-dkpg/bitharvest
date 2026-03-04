import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  mode?: "word" | "character";
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className,
  mode = "word",
  stagger = 0.04,
  as: Tag = "span",
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const items = mode === "word" ? children.split(" ") : children.split("");
  const separator = mode === "word" ? "\u00A0" : "";

  return (
    <Tag className={className} aria-label={children}>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          aria-hidden="true"
        >
          {item}{separator}
        </motion.span>
      ))}
    </Tag>
  );
}
