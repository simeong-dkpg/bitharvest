/**
 * WalletContext - Modern Stacks Connect implementation
 * 
 * Uses the latest @stacks/connect API (v8.x):
 * - connect() / disconnect() / isConnected()
 * - Addresses cached in localStorage for session persistence
 * - No wallet popup on page refresh
 */

import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { connect, disconnect, isConnected } from "@stacks/connect";
import type { GetAddressesResult } from "@stacks/connect";
import { DEFAULT_NETWORK, NETWORK_CONFIG, type NetworkType } from "@/lib/stacks/config";
import { toast } from "sonner";

const STORAGE_KEY = "bitharvest_wallet";

interface StoredWallet {
  address: string;
  network: NetworkType;
}

interface WalletContextValue {
  isConnected: boolean;
  isConnecting: boolean;
  address: string | null;
  truncatedAddress: string | null;
  network: NetworkType;
  networkConfig: (typeof NETWORK_CONFIG)[NetworkType];
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (network: NetworkType) => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

// Helper to find the correct address for the current network
function getAddressForNetwork(addresses: GetAddressesResult["addresses"], network: NetworkType): string | null {
  // addresses array contains Bitcoin and Stacks addresses
  // Stacks testnet: starts with ST
  // Stacks mainnet: starts with SP
  const prefix = network === "testnet" ? "ST" : "SP";
  
  for (const addr of addresses) {
    if (addr.address.startsWith(prefix)) {
      return addr.address;
    }
  }
  
  // Fallback: return any Stacks address
  for (const addr of addresses) {
    if (addr.address.startsWith("ST") || addr.address.startsWith("SP")) {
      return addr.address;
    }
  }
  
  return null;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<NetworkType>(DEFAULT_NETWORK);

  // Restore session from localStorage on mount (no wallet popup)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { address: storedAddr, network: storedNetwork } = JSON.parse(stored) as StoredWallet;
        // Verify the SDK still thinks we're connected
        if (isConnected() && storedAddr) {
          // Enforce testnet-only: reject mainnet addresses on restore
          if (DEFAULT_NETWORK === "testnet" && !storedAddr.startsWith("ST")) {
            localStorage.removeItem(STORAGE_KEY);
            disconnect();
            return;
          }
          setAddress(storedAddr);
          setNetwork(storedNetwork || DEFAULT_NETWORK);
          setIsWalletConnected(true);
        } else {
          // SDK disconnected, clear our cache
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (err) {
      console.warn("Failed to restore wallet session:", err);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      const response = await connect({
        forceWalletSelect: false, // Use last connected wallet if available
      });
      
      const addr = getAddressForNetwork(response.addresses, network);
      if (addr) {
        // Enforce testnet-only for now
        if (DEFAULT_NETWORK === "testnet" && !addr.startsWith("ST")) {
          toast.error("Mainnet wallet detected", {
            description: "Please switch your wallet to testnet mode (Settings → Network → Testnet)",
            duration: 6000,
          });
          disconnect();
          return;
        }
        
        setAddress(addr);
        setIsWalletConnected(true);
        // Persist to localStorage for session restoration
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ address: addr, network } as StoredWallet));
        toast.success("Wallet connected successfully!", {
          description: `Connected: ${addr.slice(0, 6)}...${addr.slice(-4)}`,
          duration: 4000,
        });
      } else {
        toast.error("No Stacks address found", {
          description: "Your wallet doesn't have a Stacks address configured.",
        });
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      if (error?.message !== "User cancelled") {
        toast.error("Connection failed", {
          description: error?.message || "Please try again",
          duration: 5000,
        });
      }
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting, network]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setIsWalletConnected(false);
    setAddress(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Wallet disconnected");
  }, []);

  const switchNetwork = useCallback((n: NetworkType) => {
    setNetwork(n);
    // Note: Network switching requires reconnecting to get new addresses
    // For now, just update the network state
    if (address) {
      // Update stored network
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ address, network: n } as StoredWallet));
    }
  }, [address]);

  const truncatedAddress = useMemo(() => {
    if (!address) return null;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const networkConfig = useMemo(() => NETWORK_CONFIG[network], [network]);

  const value = useMemo<WalletContextValue>(
    () => ({
      isConnected: isWalletConnected,
      isConnecting,
      address,
      truncatedAddress,
      network,
      networkConfig,
      connect: connectWallet,
      disconnect: disconnectWallet,
      switchNetwork,
    }),
    [isWalletConnected, isConnecting, address, truncatedAddress, network, networkConfig, connectWallet, disconnectWallet, switchNetwork]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
