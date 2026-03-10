import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { BitHarvestLogo } from "@/components/BitHarvestLogo";

const FOOTER_LINKS = [
  { label: "Documentation", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Discord", href: "#" },
  { label: "Terms", href: "#" },
];

export function Footer() {
  return (
    <motion.footer
      className="border-t border-border/50 bg-background/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <BitHarvestLogo size="sm" animate={false} />
          <span className="text-sm text-muted-foreground">
            BitHarvest Protocol · Testnet
          </span>
        </div>

        <nav className="flex items-center gap-4" aria-label="Footer links">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <ExternalLink className="h-3 w-3" />
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </motion.footer>
  );
}
