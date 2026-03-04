import { motion } from "framer-motion";
import { TrendingUp, Vault, Percent, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { PageWrapper, childVariants } from "@/components/layout/PageWrapper";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { MagneticButton } from "@/components/MagneticButton";
import { TextReveal } from "@/components/TextReveal";
import { GlowCard } from "@/components/GlowCard";


const Index = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="container relative py-24 md:py-32 lg:py-40">
          <motion.div variants={childVariants} className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Logo */}
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center rotate-45 mb-8 glow-orange-lg">
              <span className="text-primary-foreground font-black text-2xl -rotate-45">B</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              <TextReveal mode="word" stagger={0.06}>
                Earn Yield on Your
              </TextReveal>{" "}
              <motion.span
                className="text-gradient-accent"
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.24, duration: 0.4 }}
              >
                sBTC
              </motion.span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              The premier lending vault on Stacks. Supply sBTC, earn competitive yield,
              and borrow against your Bitcoin — all secured by smart contracts.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <MagneticButton>
                <Button
                  size="lg"
                  onClick={() => navigate("/vault")}
                  className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground font-bold text-lg px-8 hover:scale-[1.02] transition-transform glow-orange min-touch-target group"
                  aria-label="Launch the BitHarvest vault app"
                >
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-border hover:bg-secondary min-touch-target"
                  aria-label="Read the documentation"
                >
                  Read Docs
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            variants={childVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {[
              { icon: Vault, label: "Total Value Locked", value: "142.5 sBTC", subValue: "≈ $9,262,500", change: { value: "12.3%", positive: true }, delay: 0 },
              { icon: TrendingUp, label: "Supply APY", value: "3.2%", subValue: "Earn on deposits", change: { value: "0.3%", positive: true }, delay: 0.1 },
              { icon: Percent, label: "Borrow APY", value: "5.8%", subValue: "Variable rate", change: { value: "0.1%", positive: false }, delay: 0.2 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.8 + stat.delay,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                <StatCard
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  subValue={stat.subValue}
                  change={stat.change}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        variants={childVariants}
        className="container py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <GlowCard className="rounded-2xl">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-transparent pointer-events-none" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3 relative">
              Ready to start earning?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto relative">
              Connect your Stacks wallet to deposit sBTC, track your positions,
              and manage your vault in real-time.
            </p>
            <MagneticButton>
              <Button
                size="lg"
                onClick={() => navigate("/vault")}
                className="bg-gradient-to-r from-primary to-orange-400 text-primary-foreground font-semibold hover:scale-[1.02] transition-transform glow-orange relative min-touch-target"
                aria-label="Connect your wallet and begin earning"
              >
                Connect Wallet to Begin
              </Button>
            </MagneticButton>
        </div>
        </GlowCard>
      </motion.section>
    </PageWrapper>
  );
};

export default Index;
