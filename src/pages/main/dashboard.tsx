import { useState } from "react";
import { 
  Smartphone,
  Clock,
  Copy,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Header from "@/layouts/Header";
import BottomNav from "@/layouts/BottomNav";
import { WalletCard } from "@/components/ui";
import { useNavigate } from "react-router-dom";

interface ActiveOrder {
  id: string;
  service: string;
  country: string;
  number: string;
  status: "waiting" | "received";
  smsCode: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalNumbers] = useState(42);
  const [activeOrder] = useState<ActiveOrder | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleGetNewNumber = () => {
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-20">
      <Header />

      <main className="main pt-16 space-y-4">
        {/* Wallet Card */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <WalletCard />
        </motion.div>

        {/* Stats Section */}
        <div className="bg-card border border-line rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card border border-line shadow-sm center">
              <Smartphone size={18} />
            </div>
            <div>
              <p className="text-xs text-muted font-medium">Total Numbers</p>
              <h3 className="text-xl font-bold text-main leading-tight">{totalNumbers}</h3>
            </div>
          </div>
          <button className="bg-card border border-line px-3 py-1.5 rounded-full text-xs hover:border-primary transition-colors">
            History
          </button>
        </div>

        {/* Active Order Section */}
        <AnimatePresence>
          {activeOrder ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-line rounded-2xl p-4 relative mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-card border border-line shadow-sm center">
                      <Smartphone size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-muted text-xs font-medium uppercase tracking-wider">Active Number</p>
                      <p className="font-bold text-base">{activeOrder.service}</p>
                    </div>
                  </div>
                  <div className="bg-card px-2 py-1 rounded text-xs font-mono flex items-center gap-1 border border-line">
                    <Clock size={10} /> 14:32
                  </div>
                </div>

                <div className="bg-card border border-line border-dashed rounded-xl p-3 flex items-center justify-between mb-3">
                  <span className="text-lg font-mono font-bold tracking-wide">{activeOrder.number}</span>
                  <button 
                    onClick={() => copyToClipboard(activeOrder.number)}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Copy size={16} className="text-muted" />
                  </button>
                </div>

                <div className="center min-h-[50px]">
                  {activeOrder.status === "waiting" ? (
                    <div className="flex items-center gap-2 animate-pulse text-primary">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="font-bold text-sm">Waiting for SMS...</span>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8 }} 
                      animate={{ scale: 1 }} 
                      className="text-center"
                    >
                      <p className="text-muted text-xs uppercase font-bold tracking-widest mb-1">
                        Your Code
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-mono font-bold text-primary">
                          {activeOrder.smsCode}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(activeOrder.smsCode!)}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Empty State */
            <div className="bg-card border border-line rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary center mx-auto mb-4">
                <Smartphone size={24} className="text-muted/50" />
              </div>
              <h4 className="font-bold text-main mb-2">No Active Numbers</h4>
              <p className="text-sm text-muted mb-4">
                Get a new number to start receiving SMS messages
              </p>
              <button 
                onClick={handleGetNewNumber}
                className="btn-primary px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 text-sm"
              >
                Get New Number
              </button>
            </div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav />
    </div>
  );
}