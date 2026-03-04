import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Vault, TrendingUp, Landmark, ArrowRight, Wallet, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { PageWrapper, childVariants } from "@/components/layout/PageWrapper";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { TextReveal } from "@/components/TextReveal";
import { GlowCard } from "@/components/GlowCard";
import { MagneticButton } from "@/components/MagneticButton";
import { useWallet } from "@/hooks/useWallet";
import { useVaultData } from "@/hooks/useVaultData";
import { useUserPosition } from "@/hooks/useUserPosition";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isConnected, address, truncatedAddress, connect } = useWallet();
  const { data: vault } = useVaultData();
  const { data: position } = useUserPosition(address);

  const hasSupply = position?.hasSupplyPosition ?? false;
  const hasBorrow = position?.hasBorrowPosition ?? false;

  return (
    <PageWrapper>
      <section className="container py-12 md:py-16 relative">
        <AnimatedBackground subtle particleCount={12} />

        {/* Header */}
        <motion.div variants={childVariants} className="mb-8">
          {isConnected ? (
            <div>
              <h1 className="text-3xl font-bold mb-1">
                <TextReveal mode="word" stagger={0.05}>Dashboard</TextReveal>
              </h1>
              <p className="text-muted-foreground">
                Welcome back, <span className="text-gradient-accent font-mono">{truncatedAddress}</span>
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-1">
                <TextReveal mode="word" stagger={0.05}>Dashboard</TextReveal>
              </h1>
              <p className="text-muted-foreground">Connect your wallet to view your positions.</p>
            </div>
          )}
        </motion.div>

        {/* Not Connected State */}
        {!isConnected && (
          <motion.div variants={childVariants}>
            <GlowCard className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Connect your Stacks wallet to view your positions, track yields, and manage your sBTC.
              </p>
              <MagneticButton>
                <Button
                  onClick={connect}
                  className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground font-bold px-8"
                >
                  Connect Wallet
                </Button>
              </MagneticButton>
            </GlowCard>
          </motion.div>
        )}

        {/* Connected State */}
        {isConnected && (
          <>
            {/* Stats Grid */}
            <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={Vault}
                label="Total Value Locked"
                value={`${vault?.tvlBtc ?? "0"} sBTC`}
                subValue={`≈ $${vault?.tvlUsd ?? "0"}`}
                change={{ value: "12.3%", positive: true }}
              />
              <StatCard
                icon={TrendingUp}
                label="Your Supply"
                value={`${position?.supplyBtc ?? "0"} sBTC`}
                subValue={`≈ $${position?.supplyUsd ?? "0"}`}
              />
              <StatCard
                icon={Landmark}
                label="Your Borrow"
                value={`${position?.borrowBtc ?? "0"} sBTC`}
                subValue={`≈ $${position?.borrowUsd ?? "0"}`}
              />
              <StatCard
                icon={Activity}
                label="Health Factor"
                value={position?.healthFactor ? String(position.healthFactor.toFixed(2)) : "∞"}
                subValue={hasSupply ? "Keep above 1.0" : "No active loans"}
              />
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={childVariants} className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <GlowCard className="p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate("/vault")}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Deposit sBTC</h3>
                      <p className="text-sm text-muted-foreground">Earn yield on your Bitcoin</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </GlowCard>

                <GlowCard className="p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate("/vault")}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Borrow sBTC</h3>
                      <p className="text-sm text-muted-foreground">Leverage your collateral</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </GlowCard>

                <GlowCard className="p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate("/vault")}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Vault className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Manage Vault</h3>
                      <p className="text-sm text-muted-foreground">Full position management</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </GlowCard>
              </div>
            </motion.div>

            {/* Position Summary */}
            {(hasSupply || hasBorrow) && (
              <motion.div variants={childVariants}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Position Summary</h2>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/vault")} className="text-primary">
                    View Details <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </div>
                <GlowCard className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Collateral</p>
                      <p className="text-lg font-semibold">{position?.supplyBtc ?? "0"} sBTC</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Borrowed</p>
                      <p className="text-lg font-semibold">{position?.borrowBtc ?? "0"} sBTC</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Net APY</p>
                      <p className="text-lg font-semibold text-green-500">+{vault?.supplyApy ?? "0"}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Health Factor</p>
                      <p className="text-lg font-semibold">{position?.healthFactor ? position.healthFactor.toFixed(2) : "∞"}</p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )}

            {/* No Positions Yet */}
            {!hasSupply && !hasBorrow && (
              <motion.div variants={childVariants}>
                <GlowCard className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Vault className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Active Positions</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Start earning yield by depositing sBTC into the vault.
                  </p>
                  <MagneticButton>
                    <Button
                      onClick={() => navigate("/vault")}
                      className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground font-bold px-8"
                    >
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </MagneticButton>
                </GlowCard>
              </motion.div>
            )}
          </>
        )}
      </section>
    </PageWrapper>
  );
}
