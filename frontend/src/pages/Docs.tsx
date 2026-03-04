import { motion } from "framer-motion";
import { 
  BookOpen, 
  Vault, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Code, 
  ExternalLink,
  ChevronRight,
  Zap,
  Coins,
  ArrowRight,
  FileCode,
  GitBranch
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageWrapper, childVariants } from "@/components/layout/PageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { CONTRACTS, DEFAULT_NETWORK, NETWORK_CONFIG } from "@/lib/stacks/config";

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
  },
  {
    id: "how-it-works",
    title: "How It Works",
    icon: Zap,
  },
  {
    id: "depositing",
    title: "Depositing",
    icon: TrendingUp,
  },
  {
    id: "borrowing",
    title: "Borrowing",
    icon: Coins,
  },
  {
    id: "risks",
    title: "Risks",
    icon: AlertTriangle,
  },
  {
    id: "contracts",
    title: "Smart Contracts",
    icon: Code,
  },
];

export default function Docs() {
  const explorerBase = "https://explorer.hiro.so/txid/";
  const explorerChain = "?chain=testnet";
  const vaultContract = CONTRACTS[DEFAULT_NETWORK].vault;
  const tokenContract = CONTRACTS[DEFAULT_NETWORK].mockSbtc;

  return (
    <PageWrapper>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.aside 
            variants={childVariants}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Documentation
              </h2>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors group"
                >
                  <section.icon className="h-4 w-4" />
                  {section.title}
                  <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main 
            variants={childVariants}
            className="lg:col-span-3 space-y-12"
          >
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                BitHarvest Documentation
              </h1>
              <p className="text-lg text-muted-foreground">
                Learn how to use the BitHarvest lending vault to earn yield on your sBTC
                and borrow against your collateral.
              </p>
            </div>

            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <GlowCard className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Overview</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground">
                    BitHarvest is a decentralized lending vault built on Stacks that enables users to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                    <li><strong className="text-foreground">Deposit sBTC</strong> to earn yield from borrowers</li>
                    <li><strong className="text-foreground">Borrow sBTC</strong> against deposited collateral</li>
                    <li><strong className="text-foreground">Withdraw</strong> deposits plus earned interest at any time</li>
                    <li><strong className="text-foreground">Repay</strong> loans to release collateral</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    All operations are trustless and secured by Clarity smart contracts on the Stacks blockchain,
                    inheriting Bitcoin's security through the Proof of Transfer consensus mechanism.
                  </p>
                </div>
              </GlowCard>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="scroll-mt-24">
              <GlowCard className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold">How It Works</h2>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="text-2xl font-bold text-primary mb-2">1</div>
                      <h3 className="font-semibold mb-1">Deposit</h3>
                      <p className="text-sm text-muted-foreground">
                        Deposit sBTC into the vault and receive shares representing your position.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="text-2xl font-bold text-primary mb-2">2</div>
                      <h3 className="font-semibold mb-1">Earn or Borrow</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn yield from borrowers, or borrow against your collateral at competitive rates.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="text-2xl font-bold text-primary mb-2">3</div>
                      <h3 className="font-semibold mb-1">Withdraw</h3>
                      <p className="text-sm text-muted-foreground">
                        Withdraw your sBTC plus accumulated interest at any time.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <h4 className="font-semibold text-amber-400 mb-2">Vault Shares</h4>
                    <p className="text-sm text-muted-foreground">
                      When you deposit, you receive vault shares proportional to your deposit relative to the 
                      total pool. As interest accrues, each share becomes worth more sBTC over time. When you 
                      withdraw, your shares are burned and you receive the underlying sBTC plus your share of 
                      earned interest.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </section>

            {/* Depositing */}
            <section id="depositing" className="scroll-mt-24">
              <GlowCard className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Depositing</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    To deposit sBTC into the vault:
                  </p>
                  <ol className="list-decimal list-inside space-y-3">
                    <li>Connect your Stacks wallet (Leather or Xverse)</li>
                    <li>Ensure your wallet is set to <strong className="text-amber-400">Testnet</strong> mode</li>
                    <li>Navigate to the <Link to="/vault" className="text-primary hover:underline">Vault page</Link></li>
                    <li>Click "Deposit" and enter the amount of sBTC</li>
                    <li>Approve the transaction in your wallet</li>
                  </ol>

                  <div className="p-4 rounded-lg bg-secondary/50 border border-border mt-4">
                    <h4 className="font-semibold text-foreground mb-2">Supply APY</h4>
                    <p className="text-sm">
                      The Supply APY is dynamic and depends on vault utilization. Higher utilization 
                      (more borrowed funds) means higher yields for depositors. Current base rate is 
                      calculated as: <code className="px-1 py-0.5 bg-black/30 rounded">baseRate × utilizationRate</code>
                    </p>
                  </div>
                </div>
              </GlowCard>
            </section>

            {/* Borrowing */}
            <section id="borrowing" className="scroll-mt-24">
              <GlowCard className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Borrowing</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    To borrow against your deposited collateral:
                  </p>
                  <ol className="list-decimal list-inside space-y-3">
                    <li>First deposit sBTC as collateral</li>
                    <li>Click "Borrow" on your position</li>
                    <li>Enter the amount to borrow (up to your max borrow limit)</li>
                    <li>Approve the transaction</li>
                  </ol>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">Collateral Factor</h4>
                      <p className="text-sm">
                        You can borrow up to <strong className="text-primary">75%</strong> of your deposited collateral value.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">Liquidation Threshold</h4>
                      <p className="text-sm">
                        If your debt exceeds <strong className="text-red-400">80%</strong> of collateral, you risk liquidation.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 mt-4">
                    <h4 className="font-semibold text-red-400 mb-2">⚠️ Health Factor</h4>
                    <p className="text-sm">
                      Always monitor your health factor. A health factor below 1.0 means your position 
                      may be liquidated. Repay debt or add collateral to improve your health factor.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </section>

            {/* Risks */}
            <section id="risks" className="scroll-mt-24">
              <GlowCard className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Risks</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Using DeFi protocols involves risks. Please understand the following before using BitHarvest:
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-1">Smart Contract Risk</h4>
                      <p className="text-sm">
                        While our contracts are designed with security in mind, smart contracts may contain bugs 
                        or vulnerabilities. Never deposit more than you can afford to lose.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-1">Liquidation Risk</h4>
                      <p className="text-sm">
                        If you borrow and your health factor drops below 1.0, your collateral may be liquidated 
                        to repay the debt plus a liquidation penalty.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-1">Utilization Risk</h4>
                      <p className="text-sm">
                        High vault utilization may temporarily prevent withdrawals until borrowers repay or 
                        new deposits are made.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mt-4">
                    <h4 className="font-semibold text-amber-400 mb-2">Testnet Notice</h4>
                    <p className="text-sm">
                      BitHarvest is currently deployed on <strong>Stacks Testnet</strong>. All tokens are 
                      test tokens with no real value. This is for testing and demonstration purposes only.
                    </p>
                  </div>
                </div>
              </GlowCard>
            </section>

            {/* Smart Contracts */}
            <section id="contracts" className="scroll-mt-24">
              <GlowCard className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Code className="h-5 w-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Smart Contracts</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    BitHarvest is powered by Clarity smart contracts deployed on Stacks {DEFAULT_NETWORK}:
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Vault className="h-4 w-4" />
                          Vault Contract
                        </h4>
                        <a
                          href={`${explorerBase}${vaultContract}${explorerChain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          View on Explorer <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded block overflow-x-auto">
                        {vaultContract}
                      </code>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <FileCode className="h-4 w-4" />
                          Mock sBTC Token
                        </h4>
                        <a
                          href={`${explorerBase}${tokenContract}${explorerChain}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          View on Explorer <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded block overflow-x-auto">
                        {tokenContract}
                      </code>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <a
                      href="https://github.com/simeong-dkpg/bitharvest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors border border-border"
                    >
                      <GitBranch className="h-4 w-4" />
                      View Source Code
                    </a>
                    <Link to="/vault">
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-orange-400">
                        Launch App <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlowCard>
            </section>
          </motion.main>
        </div>
      </div>
    </PageWrapper>
  );
}
