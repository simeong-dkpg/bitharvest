import { motion } from "framer-motion";
import { Info, ExternalLink } from "lucide-react";
import { DEFAULT_NETWORK } from "@/lib/stacks/config";

export function TestnetBanner() {
  if (DEFAULT_NETWORK !== "testnet") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-4xl mx-auto px-4 mt-8"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10">
            <Info className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <span className="font-medium text-sm">Testnet Mode</span>
            <span className="text-muted-foreground text-sm ml-2">Using Stacks Testnet</span>
          </div>
        </div>
        <a
          href="https://explorer.stacks.co/sandbox/faucet?chain=testnet"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors border border-border"
        >
          Get Testnet STX
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
