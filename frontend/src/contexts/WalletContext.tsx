import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { DEFAULT_NETWORK, NETWORK_CONFIG, type NetworkType } from "@/lib/stacks/config";
import { AppConfig, UserSession } from "@stacks/connect";
import { toast } from "@/hooks/use-toast";

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

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<NetworkType>(DEFAULT_NETWORK);

  // Restore session on mount
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const stxAddress = userData.profile?.stxAddress;
      const addr = stxAddress?.testnet || stxAddress?.mainnet || null;
      if (addr) {
        setAddress(addr);
        setIsConnected(true);
      }
    }
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const { showConnect } = await import("@stacks/connect");
      showConnect({
        appDetails: {
          name: "BitHarvest",
          icon: window.location.origin + "/favicon.ico",
        },
        userSession,
        onFinish: () => {
          const userData = userSession.loadUserData();
          const stxAddress = userData.profile?.stxAddress;
          const addr = stxAddress?.testnet || stxAddress?.mainnet || null;
          setAddress(addr);
          setIsConnected(true);
          setIsConnecting(false);
          toast({ title: "Wallet connected", description: addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : undefined });
        },
        onCancel: () => {
          setIsConnecting(false);
        },
      });
    } catch (error) {
      console.error("Wallet connection error:", error);
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    userSession.signUserOut();
    setIsConnected(false);
    setAddress(null);
    setIsConnecting(false);
    toast({ title: "Wallet disconnected" });
  }, []);

  const switchNetwork = useCallback((n: NetworkType) => {
    setNetwork(n);
  }, []);

  const truncatedAddress = useMemo(() => {
    if (!address) return null;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  const networkConfig = useMemo(() => NETWORK_CONFIG[network], [network]);

  const value = useMemo<WalletContextValue>(
    () => ({
      isConnected,
      isConnecting,
      address,
      truncatedAddress,
      network,
      networkConfig,
      connect,
      disconnect,
      switchNetwork,
    }),
    [isConnected, isConnecting, address, truncatedAddress, network, networkConfig, connect, disconnect, switchNetwork]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
