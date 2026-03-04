import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ChevronDown, LogOut, Copy, ExternalLink, Loader2, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from "@/hooks/useWallet";
import { DEFAULT_NETWORK } from "@/lib/stacks/config";

export function WalletButton() {
  const { isConnected, isConnecting, truncatedAddress, address, networkConfig, connect, disconnect } = useWallet();
  const [showTestnetDialog, setShowTestnetDialog] = useState(false);

  const copyAddress = () => {
    if (address) navigator.clipboard.writeText(address);
  };

  const handleConnectClick = () => {
    if (DEFAULT_NETWORK === "testnet") {
      setShowTestnetDialog(true);
    } else {
      connect();
    }
  };

  const handleProceedConnect = () => {
    setShowTestnetDialog(false);
    connect();
  };

  if (!isConnected) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            onClick={handleConnectClick}
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

        {/* Testnet Instructions Dialog */}
        <Dialog open={showTestnetDialog} onOpenChange={setShowTestnetDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Testnet Wallet Required
              </DialogTitle>
              <DialogDescription className="text-left">
                BitHarvest is currently running on <strong>Stacks Testnet</strong>. Please ensure your wallet is configured for testnet before connecting.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-secondary p-4 space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  How to switch to Testnet
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2 ml-6 list-disc">
                  <li><strong>Leather Wallet:</strong> Settings → Network → Select "Testnet"</li>
                  <li><strong>Xverse Wallet:</strong> Settings → Network → Select "Testnet"</li>
                </ul>
              </div>

              <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4">
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  <strong>Note:</strong> Testnet tokens have no real value. You can get free testnet sBTC from the faucet after connecting.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowTestnetDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleProceedConnect} className="flex-1 bg-gradient-to-r from-primary to-orange-400">
                <Wallet className="mr-2 h-4 w-4" />
                I'm Ready, Connect
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
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
