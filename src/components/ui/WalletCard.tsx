import { Link } from "react-router-dom";
import { Gift, Wallet, Zap } from "lucide-react";
import CountUp from "react-countup";

// UPDATED IMPORT: Pointing to your hooks folder
import { useAuth } from "@/hooks/useAuth"; 

const WalletCard = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-gradient-to-b from-violet-900 to-pink-400 rounded-3xl p-5 space-y-6 shadow-xl relative overflow-hidden">
       {/* Decorative background elements */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-white font-jaro text-xl tracking-wide">
           <Zap size={24} className="fill-white" /> SWIFT
        </div>
        <p className="text-white/80 font-mono text-sm tracking-widest">**** {user?.phone?.slice(-4)}</p>
      </div>

      <div className="text-center relative z-10">
        <p className="text-white/70 text-xs uppercase font-bold tracking-wider mb-1">Total Balance</p>
        <p className="text-white text-4xl font-bold">
          <span className="text-2xl align-top mr-1">₦</span>
          <CountUp end={Number(user?.wallet)} duration={2.5} decimals={2} separator="," />
        </p>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <Link
          to="/wallet"
          className="btn shadow-lg bg-white/20 border border-white/20 text-white w-full backdrop-blur-md rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
        >
          <Wallet size={18} />
          Wallet
        </Link>
        <Link
          to="/services"
          className="btn shadow-lg bg-white/20 border border-white/20 text-white w-full backdrop-blur-md rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/30 transition-all"
        >
          <Gift size={18} />
          Services
        </Link>
      </div>
    </div>
  );
};

export default WalletCard;
