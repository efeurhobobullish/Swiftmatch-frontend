import { Link } from "react-router-dom";
import { Gift, Wallet, Zap } from "lucide-react";
import CountUp from "react-countup";
import { useAuth } from "@/hooks/useAuth"; 

const WalletCard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-card border border-line rounded-3xl p-5 space-y-6 shadow-lg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <Zap size={24} className="fill-primary" /> 
          SWIFT
        </div>
        <p className="text-muted font-medium text-sm">
          **** {user?.phone?.slice(-4)}
        </p>
      </div>

      <div className="text-center relative z-10">
        <p className="text-muted text-xs uppercase font-semibold tracking-wider mb-1">
          Total Balance
        </p>
        <p className="text-primary text-4xl font-bold">
          <span className="text-2xl align-top mr-1">₦</span>
          <CountUp 
            end={Number(user?.wallet)} 
            duration={2.5} 
            decimals={2} 
            separator="," 
          />
        </p>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <Link
          to="/wallet"
          className="btn-primary border border-line text-card-foreground w-full rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Wallet size={18} />
          Wallet
        </Link>
        <Link
          to="/services"
          className="bg-secondary text-primary border border-line w-full rounded-full py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all"
        >
          <Gift size={18} />
          Services
        </Link>
      </div>
    </div>
  );
};

export default WalletCard;