import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NetworkErrorProps {
  onRetry: () => void;
  message?: string;
}

export function NetworkError({ onRetry, message = "Unable to load protocol data" }: NetworkErrorProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(onRetry, 10_000);
    return () => clearTimeout(timer);
  }, [onRetry]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 flex items-center gap-3 mb-6"
          role="alert"
        >
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-sm text-foreground flex-1">{message}</p>
          <Button variant="ghost" size="sm" onClick={onRetry} className="gap-1.5 text-xs shrink-0">
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </Button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
