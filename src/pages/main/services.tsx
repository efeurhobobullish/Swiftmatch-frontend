import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "@/layouts/BottomNav";
import { ALL_SERVICES } from "@/constant/data";

export default function Services() {
  const [search, setSearch] = useState("");

  const filtered = ALL_SERVICES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-line px-6 py-4">
        <h1 className="text-lg font-bold">All Services</h1>
      </header>

      <main className="layout pt-6 space-y-6">
        <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="Search for an app..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-secondary border border-line rounded-2xl py-4 pl-12 pr-4 font-medium focus:border-main transition-all"
            />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((service, idx) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card border border-line p-4 rounded-3xl flex flex-col items-start gap-4 hover:border-main/30 hover:bg-secondary/30 transition-all group text-left"
            >
              <div className="flex justify-between w-full">
                <div className={`w-10 h-10 rounded-2xl ${service.color.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                  <service.icon size={20} className={service.color} />
                </div>
                <ArrowUpRight size={16} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h3 className="font-bold text-sm truncate w-full">{service.name}</h3>
                <p className="text-xs text-muted mt-1">From ₦{service.price}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
