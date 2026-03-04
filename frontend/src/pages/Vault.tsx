import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Vault as VaultIcon, TrendingUp, Percent, Activity, Landmark, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { PositionCard } from "@/components/PositionCard";
import { EmptyPosition } from "@/components/EmptyPosition";
import { TransactionList } from "@/components/TransactionList";
import { DepositModal } from "@/components/DepositModal";
import { WithdrawModal } from "@/components/WithdrawModal";
import { BorrowModal } from "@/components/BorrowModal";
import { RepayModal } from "@/components/RepayModal";
import { NetworkError } from "@/components/NetworkError";
import { VaultSkeleton } from "@/components/VaultSkeleton";
import { PageWrapper, childVariants } from "@/components/layout/PageWrapper";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { TextReveal } from "@/components/TextReveal";
import { GlowCard } from "@/components/GlowCard";
import { MagneticButton } from "@/components/MagneticButton";
import { useWallet } from "@/hooks/useWallet";
import { useVaultData } from "@/hooks/useVaultData";
import { useUserPosition } from "@/hooks/useUserPosition";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";

type ModalType = "deposit" | "withdraw" | "borrow" | "repay" | null;

export default function VaultPage() {
  const { isConnected, address, truncatedAddress, connect } = useWallet();
  const { data: vault, isLoading: vaultLoading, isError: vaultError, refetch: retryVault } = useVaultData();
  const { data: position } = useUserPosition(address);
  const { data: transactions = [] } = useTransactionHistory(address);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const hasSupply = position?.hasSupplyPosition ?? false;
  const hasBorrow = position?.hasBorrowPosition ?? false;
  const hasPositions = hasSupply || hasBorrow;

  const handleRetry = useCallback(() => { retryVault(); }, [retryVault]);

  if (vaultLoading && !vault) {
    return <VaultSkeleton />;
  }

    return (
    <>
      <PageWrapper>
        <section className="container py-12 md:py-16 relative" aria-live="polite">
          <AnimatedBackground subtle particleCount={12} />

          {/* Network Error */}
          {vaultError && <NetworkError onRetry={handleRetry} />}

          {/* Header */}
          <motion.div variants={childVariants} className="mb-8 relative">
            {isConnected ? (
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  <TextReveal mode="word" stagger={0.05}>Welcome back,</TextReveal>{" "}
                  <span className="text-gradient-accent font-mono">{truncatedAddress}</span>
                </h1>
                <p className="text-muted-foreground">Manage your vault positions and track performance.</p>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  <TextReveal mode="word" stagger={0.05}>Protocol Overview</TextReveal>
                </h1>
                <p className="text-muted-foreground">Live on-chain stats from the BitHarvest vault.</p>
              </div>
            )}
          </motion.div>

          {/* Protocol Stats */}
          <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" aria-live="polite">
            {(() => {
              const stats = isConnected && hasPositions
                ? [
                    <StatCard key="tvl" icon={VaultIcon} label="Total Value Locked" value={`${vault?.tvlBtc} sBTC`} subValue={`≈ $${vault?.tvlUsd}`} change={{ value: "12.3%", positive: true }} />,
                    <StatCard key="supply" icon={TrendingUp} label="Your Supply" value={`${position?.supplyBtc} sBTC`} subValue={`≈ $${position?.supplyUsd}`} />,
                    <StatCard key="borrow" icon={Landmark} label="Your Borrow" value={`${position?.borrowBtc} sBTC`} subValue={`≈ $${position?.borrowUsd}`} />,
                    <StatCard key="apy" icon={Activity} label="Net APY" value={`${vault?.supplyApy}%`} subValue="Based on your positions" change={{ value: "0.3%", positive: true }} />,
                  ]
                : [
                    <StatCard key="tvl" icon={VaultIcon} label="Total Value Locked" value={`${vault?.tvlBtc} sBTC`} subValue={`≈ $${vault?.tvlUsd}`} change={{ value: "12.3%", positive: true }} />,
                    <StatCard key="supply-apy" icon={TrendingUp} label="Supply APY" value={`${vault?.supplyApy}%`} subValue="Earn on deposits" change={{ value: "0.3%", positive: true }} />,
                    <StatCard key="borrow-apy" icon={Percent} label="Borrow APY" value={`${vault?.borrowApy}%`} subValue="Variable rate" change={{ value: "0.1%", positive: false }} />,
                    <StatCard key="util" icon={Activity} label="Utilization" value={`${vault?.utilizationRate}%`} subValue="Protocol utilization" />,
                  ];
              return stats.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                >
                  {card}
                </motion.div>
              ));
            })()}
          </motion.div>

          {/* Disconnected CTA */}
          {!isConnected && (
            <motion.div variants={childVariants}>
              <GlowCard className="rounded-2xl">
              <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent pointer-events-none" />
                <h2 className="text-2xl md:text-3xl font-bold mb-3 relative">Connect Wallet to Get Started</h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto relative">
                  Connect your Stacks wallet to deposit sBTC, manage positions, and start earning yield.
                </p>
                <MagneticButton>
                  <Button
                    size="lg"
                    onClick={connect}
                    className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground font-semibold hover:scale-[1.02] transition-transform glow-orange relative min-touch-target"
                    aria-label="Connect your Stacks wallet"
                  >
                    Connect Wallet
                  </Button>
                </MagneticButton>
              </div>
              </GlowCard>
            </motion.div>
          )}

          {/* Connected but no positions */}
          {isConnected && !hasPositions && (
            <motion.div variants={childVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, type: "spring" }}>
                <EmptyPosition variant="supply" onAction={() => setActiveModal("deposit")} />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, type: "spring" }}>
                <EmptyPosition variant="borrow" />
              </motion.div>
            </motion.div>
          )}

          {/* Connected with positions */}
          {isConnected && hasPositions && (
            <>
              <motion.div variants={childVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, type: "spring" }}>
                  {hasSupply ? (
                    <PositionCard variant="supply" icon={TrendingUp} amount={position?.supplyBtc || "0.00"} usdValue={position?.supplyUsd || "0"} apy={`${vault?.supplyApy}%`} secondaryLabel="Earned Yield" secondaryValue={`${position?.yieldBtc} sBTC`} onPrimaryAction={() => setActiveModal("deposit")} onSecondaryAction={() => setActiveModal("withdraw")} />
                  ) : (
                    <EmptyPosition variant="supply" onAction={() => setActiveModal("deposit")} />
                  )}
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, type: "spring" }}>
                  {hasBorrow ? (
                    <PositionCard variant="borrow" icon={Landmark} amount={position?.borrowBtc || "0.00"} usdValue={position?.borrowUsd || "0"} apy={`${vault?.borrowApy}%`} secondaryLabel="Max Borrow" secondaryValue={`${position?.maxBorrowBtc} sBTC`} healthFactor={position?.healthFactor} onPrimaryAction={() => setActiveModal("borrow")} onSecondaryAction={() => setActiveModal("repay")} />
                  ) : (
                    <EmptyPosition variant="borrow" />
                  )}
                </motion.div>
              </motion.div>

              <motion.div variants={childVariants}>
                <TransactionList transactions={transactions} />
              </motion.div>
            </>
          )}
        </section>
      </PageWrapper>

      {/* Transaction Modals - outside PageWrapper to avoid ref warnings */}
      <DepositModal open={activeModal === "deposit"} onOpenChange={(open) => !open && setActiveModal(null)} address={address} balance={position?.supplyBtc || "0"} currentSupply={position?.supplyBtc || "0"} supplyApy={parseFloat(vault?.supplyApy || "3.2")} />
      <WithdrawModal open={activeModal === "withdraw"} onOpenChange={(open) => !open && setActiveModal(null)} address={address} supplyBalance={position?.supplyBtc || "0"} />
      <BorrowModal open={activeModal === "borrow"} onOpenChange={(open) => !open && setActiveModal(null)} address={address} maxBorrow={position?.maxBorrowBtc || "0"} currentBorrow={position?.borrowBtc || "0"} supplyBalance={position?.supplyBtc || "0"} healthFactor={position?.healthFactor} />
      <RepayModal open={activeModal === "repay"} onOpenChange={(open) => !open && setActiveModal(null)} address={address} borrowBalance={position?.borrowBtc || "0"} supplyBalance={position?.supplyBtc || "0"} healthFactor={position?.healthFactor} />
    </>
  );
}
