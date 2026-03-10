import { Info, ExternalLink } from "lucide-react";
import { DEFAULT_NETWORK } from "@/lib/stacks/config";

export function TestnetBanner() {
  if (DEFAULT_NETWORK !== "testnet") return null;

  return (
    <div className="w-full border-b border-amber-500/20 bg-amber-500/[0.03]">
      <div className="container flex items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-5 h-5 rounded bg-amber-500/10">
            <Info className="h-3 w-3 text-amber-400" />
          </div>
          <span className="font-medium text-xs text-amber-400">Testnet Mode</span>
          <span className="text-muted-foreground text-xs hidden sm:inline">· Using Stacks Testnet</span>
        </div>
        <a
          href="https://explorer.stacks.co/sandbox/faucet?chain=testnet"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-xs font-medium text-amber-400 transition-colors"
        >
          Get Testnet STX
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
