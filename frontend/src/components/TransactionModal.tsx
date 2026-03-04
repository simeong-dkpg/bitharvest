import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TransactionStep = "input" | "confirming" | "broadcasting" | "success" | "error";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  step: TransactionStep;
  txId?: string;
  errorMessage?: string;
  explorerUrl?: string;
  onRetry?: () => void;
  children?: ReactNode;
}

const stepVariants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
};

function OrbitSpinner() {
  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-2.5 w-2.5 rounded-full bg-primary"
          style={{ top: "50%", left: "50%", marginTop: -5, marginLeft: -5 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        >
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-primary"
            style={{ transform: `translateX(${20}px)` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function SuccessParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-success"
            style={{ top: "50%", left: "50%", marginTop: -3, marginLeft: -3 }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos(angle) * 60,
              y: Math.sin(angle) * 60,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        );
      })}
    </div>
  );
}

export function TransactionModal({
  open,
  onOpenChange,
  title,
  description,
  step,
  txId,
  errorMessage,
  explorerUrl,
  onRetry,
  children,
}: TransactionModalProps) {
  const isProcessing = step === "confirming" || step === "broadcasting";

  return (
    <Dialog open={open} onOpenChange={isProcessing ? undefined : onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "input" && (
            <motion.div key="input" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
              {children}
            </motion.div>
          )}

          {step === "confirming" && (
            <motion.div key="confirming" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center py-8 gap-4">
              <OrbitSpinner />
              <p className="text-sm text-muted-foreground">Waiting for wallet confirmation...</p>
            </motion.div>
          )}

          {step === "broadcasting" && (
            <motion.div key="broadcasting" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col items-center py-8 gap-4">
              <OrbitSpinner />
              <p className="text-sm text-muted-foreground">Broadcasting transaction...</p>
              <p className="text-xs text-muted-foreground">This may take a few moments</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center py-8 gap-4 relative"
            >
              <SuccessParticles />
              <motion.div
                className="rounded-full bg-success/10 p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              >
                <svg className="h-12 w-12 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" className="animate-draw-check" />
                </svg>
              </motion.div>
              <p className="text-lg font-semibold">Transaction Successful</p>
              {txId && explorerUrl && (
                <a
                  href={`${explorerUrl}/txid/${txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline font-mono"
                >
                  View on Explorer →
                </a>
              )}
              <Button onClick={() => onOpenChange(false)} className="mt-2 w-full min-touch-target">
                Done
              </Button>
            </motion.div>
          )}

          {step === "error" && (
            <motion.div
              key="error"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center py-8 gap-4 animate-shake"
            >
              <motion.div
                className="rounded-full bg-destructive/10 p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="h-12 w-12 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.div>
              <p className="text-lg font-semibold">Transaction Failed</p>
              <p className="text-sm text-muted-foreground text-center max-w-xs" role="alert" aria-live="assertive">
                {errorMessage || "An unexpected error occurred. Please try again."}
              </p>
              <div className="flex gap-3 w-full mt-2">
                <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 min-touch-target">
                  Cancel
                </Button>
                {onRetry && (
                  <Button onClick={onRetry} className="flex-1 min-touch-target">
                    Retry
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step indicators */}
        {isProcessing && (
          <div className="flex justify-center gap-2 pt-2" aria-live="polite" aria-label="Transaction progress">
            {(["confirming", "broadcasting"] as const).map((s) => (
              <motion.div
                key={s}
                className={cn(
                  "h-1.5 rounded-full transition-colors",
                  step === s ? "bg-primary" : "bg-muted"
                )}
                animate={{ width: step === s ? 32 : 16 }}
                transition={{ type: "spring", stiffness: 300 }}
                aria-label={`Step: ${s}`}
                role="progressbar"
                aria-valuenow={step === s ? 100 : 0}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
