import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { VaultSkeleton } from "@/components/VaultSkeleton";
import { WalletProvider } from "@/contexts/WalletContext";
import NotFound from "./pages/NotFound";

const Index = lazy(() => import("./pages/Index"));
const VaultPage = lazy(() => import("./pages/Vault"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1" id="main-content">
              <ErrorBoundary>
                <Suspense fallback={<VaultSkeleton />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/vault" element={<VaultPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </WalletProvider>
  </QueryClientProvider>
);

export default App;
