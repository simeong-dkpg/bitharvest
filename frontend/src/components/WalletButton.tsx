import { motion } from "framer-motion";
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/hooks/useWallet";

export function WalletButton() {
  const { isConnected, isConnecting, truncatedAddress, address, networkConfig, connect, disconnect } = useWallet();

  const copyAddress = () => {
    if (address) navigator.clipboard.writeText(address);
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={connect}
          disabled={isConnecting}
          className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground font-semibold hover:scale-[1.02] transition-all duration-150 glow-orange min-touch-target"
          aria-label={isConnecting ? "Connecting wallet" : "Connect wallet"}
        >
          {isConnecting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wallet className="mr-2 h-4 w-4" />
          )}
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-primary/30 bg-secondary hover:bg-secondary/80 font-mono text-sm group"
          aria-label={`Wallet menu - ${truncatedAddress}`}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-success mr-2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {truncatedAddress}
          <ChevronDown className="ml-2 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">Connected to</p>
          <p className="text-sm font-medium">{networkConfig.name}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`${networkConfig.explorerUrl}/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View on Explorer
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnect} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
