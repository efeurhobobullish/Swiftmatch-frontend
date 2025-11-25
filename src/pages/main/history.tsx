import { useState } from "react";
import { 
  Search, Copy, CheckCircle2, XCircle, Clock, MessageSquare, Filter 
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import BottomNav from "@/layouts/BottomNav";

// Mock History Data
const HISTORY_DATA = [
  { id: 1, service: "WhatsApp", number: "+1 (555) 012-3456", code: "882-991", status: "received", time: "2 mins ago", price: 450, country: "🇺🇸" },
  { id: 2, service: "Telegram", number: "+44 7700 900077", code: "554-112", status: "received", time: "1 hour ago", price: 350, country: "🇬🇧" },
  { id: 3, service: "PayPal", number: "+234 800 123 4567", code: null, status: "expired", time: "5 hours ago", price: 600, country: "🇳🇬" },
  { id: 4, service: "Google", number: "+1 (202) 555-0199", code: "123456", status: "received", time: "1 day ago", price: 300, country: "🇺🇸" },
  { id: 5, service: "Uber", number: "+1 (415) 555-0122", code: null, status: "refunded", time: "2 days ago", price: 250, country: "🇺🇸" },
];

export default function History() {
  const [filter, setFilter] = useState("all");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-line px-6 py-4">
        <h1 className="text-lg font-bold">My Numbers</h1>
      </header>

      <main className="layout pt-6 space-y-6">
        
        {/* Search & Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search number or service..." 
              className="w-full bg-secondary/50 rounded-xl py-3 pl-10 pr-4 text-sm focus:border-line border border-transparent transition-all"
            />
          </div>
          <button className="bg-secondary p-3 rounded-xl border border-line text-muted hover:text-main">
            <Filter size={20} />
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {HISTORY_DATA.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-line p-4 rounded-2xl shadow-sm relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg bg-secondary border border-line`}>
                     {item.country}
                   </div>
                   <div>
                     <h3 className="font-bold text-main">{item.service}</h3>
                     <p className="text-xs text-muted font-mono">{item.number}</p>
                   </div>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                  item.status === 'received' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 
                  item.status === 'expired' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                  'bg-orange-500/10 text-orange-500 border-orange-500/20'
                }`}>
                  {item.status}
                </div>
              </div>

              {/* Code Section */}
              <div className="bg-secondary/30 rounded-xl p-3 flex justify-between items-center mb-3">
                 <span className="text-xs text-muted uppercase font-bold">SMS Code:</span>
                 {item.code ? (
                   <div className="flex items-center gap-2 cursor-pointer hover:opacity-70" onClick={() => copyToClipboard(item.code!)}>
                     <span className="text-lg font-mono font-bold text-main tracking-widest">{item.code}</span>
                     <Copy size={14} className="text-muted" />
                   </div>
                 ) : (
                   <span className="text-xs text-muted italic">No code received</span>
                 )}
              </div>

              <div className="flex justify-between items-center text-xs text-muted">
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{item.time}</span>
                </div>
                <span className="font-mono">₦{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
