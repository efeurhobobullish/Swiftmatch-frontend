import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Gamepad2, Users, Swords, Trophy, MessageCircle, Crown, Zap, Globe, Sparkles } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import api from "@/api/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";
import { popularGames } from "@/constants/data";
import { useThemeStore } from "@/store";

// --- Animation Variants (Typed for TypeScript) ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50 },
  },
};

// --- Sub-Components ---

// 1. Infinite Scrolling Marquee (Added Prop Types)
const GameMarquee = ({ games }: { games: string[] }) => (
  <div className="relative flex overflow-hidden w-full mask-linear-fade">
    <motion.div
      className="flex gap-4 py-4 whitespace-nowrap"
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
    >
      {[...games, ...games, ...games].map((game, i) => (
        <span
          key={`${game}-${i}`}
          className="inline-flex items-center px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-muted font-medium text-sm hover:bg-orange-500 hover:text-white transition-colors cursor-default"
        >
          <Gamepad2 size={14} className="mr-2" /> {game}
        </span>
      ))}
    </motion.div>
    {/* Fade Edges */}
    <div className="absolute inset-y-0 left-0 w-10 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-10 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
  </div>
);

// 2. Live Activity Pill
const LiveActivity = () => {
  const [activity, setActivity] = useState("Waiting for players...");
  const activities = [
    "Alex joined a COD Lobby", "Sarah earned 'Sharpshooter'", "Squad #492 Formed", "Tournament starting in 5m"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivity(activities[Math.floor(Math.random() * activities.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={activity}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium mb-4"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      {activity}
    </motion.div>
  );
};

export default function Home() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-colour.svg";

  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        await Promise.all([api.get("/"), new Promise(r => setTimeout(r, 800))]); 
      } catch (error) {
        console.error(error);
        toast.error("Services are not available");
      } finally {
        setIsLoading(false);
      }
    };
    checkServices();
  }, []);

  const handleGetStarted = () => {
    window.location.href = "/signup";
  };

  const features = [
    {
      id: 1,
      colSpan: "md:col-span-2",
      icon: Users,
      title: "Find Your Dream Squad",
      desc: "Advanced matchmaking algorithms to find teammates that match your playstyle, rank, and language preferences.",
      bg: "bg-gradient-to-br from-orange-500/10 to-red-500/5"
    },
    {
      id: 2,
      colSpan: "md:col-span-1",
      icon: Swords,
      title: "Ranked Play",
      desc: "Climb the global leaderboards.",
      bg: "bg-secondary/30"
    },
    {
      id: 3,
      colSpan: "md:col-span-1",
      icon: MessageCircle,
      title: "Low Latency Voice",
      desc: "Crystal clear communication.",
      bg: "bg-secondary/30"
    },
    {
      id: 4,
      colSpan: "md:col-span-2",
      icon: Trophy,
      title: "Tournaments & Prizes",
      desc: "Join daily tournaments. Win cash prizes, skins, and badges. Prove you are the best in the region.",
      bg: "bg-gradient-to-br from-blue-500/10 to-purple-500/5"
    },
  ];

  const stats = [
    { value: "50K+", label: "Gamers" },
    { value: "5K+", label: "Matches" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col overflow-x-hidden selection:bg-orange-500/30">
        
        {/* Background Glow Effects */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        {/* Header */}
        <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-50 backdrop-blur-sm sticky top-0">
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
            <div className="w-10 h-10 md:w-12 md:h-12">
              <img src={logoPath} alt="GameSquad Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              GameSquad
            </span>
          </div>
          <ModeToggle />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 flex flex-col items-center justify-center bg-background z-40"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500 blur-xl opacity-20 animate-pulse" />
                  <Loader size={40} className="animate-spin text-orange-500 relative z-10" />
                </div>
                <p className="mt-4 text-muted font-mono text-sm animate-pulse">INITIALIZING SYSTEM...</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-7xl mx-auto px-4 pb-20"
              >
                {/* Hero Section */}
                <section className="flex flex-col items-center text-center pt-10 md:pt-20 pb-16">
                  <motion.div variants={itemVariants}>
                    <LiveActivity />
                  </motion.div>

                  <motion.h1 
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 relative"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                      Find Your
                    </span>
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 drop-shadow-2xl">
                      Squad Today.
                    </span>
                    <motion.span 
                      className="absolute -top-8 -right-8 md:-right-12 text-orange-500 opacity-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles size={80} />
                    </motion.span>
                  </motion.h1>

                  <motion.p 
                    variants={itemVariants}
                    className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed"
                  >
                    Stop playing with randoms. Join the fastest growing community for 
                    <span className="text-orange-500 font-semibold"> competitive </span> 
                    and 
                    <span className="text-orange-500 font-semibold"> casual </span> 
                    gamers.
                  </motion.p>

                  <motion.div 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                  >
                    <ButtonWithLoader
                      loading={false}
                      initialText="Start Matching Now"
                      loadingText="Connecting..."
                      onClick={handleGetStarted}
                      className="h-14 px-8 text-lg rounded-full bg-orange-500 hover:bg-orange-600 shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] transition-all hover:scale-105"
                    />
                    <button className="h-14 px-8 text-lg rounded-full border border-input bg-background hover:bg-secondary hover:text-orange-500 transition-all flex items-center justify-center gap-2 group">
                      <Zap size={20} className="group-hover:fill-orange-500 transition-colors" />
                      Explore Features
                    </button>
                  </motion.div>

                  {/* Quick Stats Row */}
                  <motion.div 
                    variants={itemVariants}
                    className="mt-12 grid grid-cols-3 gap-8 md:gap-16 border-y border-white/10 py-6 px-10 bg-black/5 backdrop-blur-sm"
                  >
                    {stats.map((stat) => (
                      <div key={stat.label} className="flex flex-col items-center">
                        <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                        <span className="text-xs md:text-sm text-muted uppercase tracking-widest">{stat.label}</span>
                      </div>
                    ))}
                  </motion.div>
                </section>

                {/* Marquee Section */}
                <motion.div variants={itemVariants} className="w-full py-10 opacity-80">
                   <GameMarquee games={popularGames} />
                </motion.div>

                {/* Bento Grid Features */}
                <section className="py-10">
                  <div className="flex items-center gap-2 mb-8 px-2">
                     <Globe className="text-orange-500" size={20} />
                     <h2 className="text-2xl font-bold">Why Choose GameSquad?</h2>
                  </div>
                  
                  <motion.div 
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {features.map((feature) => (
                      <motion.div
                        key={feature.id}
                        variants={itemVariants}
                        className={`${feature.colSpan} group relative overflow-hidden rounded-3xl border border-white/10 p-8 hover:border-orange-500/30 transition-all duration-500 bg-background/40 backdrop-blur-sm`}
                      >
                        {/* Hover Gradient Effect */}
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.bg}`} />
                        
                        <div className="relative z-10 h-full flex flex-col justify-between">
                          <div className="mb-4 w-12 h-12 rounded-2xl bg-background border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <feature.icon className="text-orange-500" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{feature.title}</h3>
                            <p className="text-muted group-hover:text-foreground/80 transition-colors">{feature.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>

                {/* Bottom CTA */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-10 relative rounded-3xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-90" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
                  <div className="relative z-10 p-12 md:p-20 text-center text-white">
                    <Crown size={48} className="mx-auto mb-6 text-yellow-300 drop-shadow-lg" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Dominate?</h2>
                    <p className="text-orange-100 mb-8 text-lg max-w-xl mx-auto">Join the community today and get a premium badge for your first month.</p>
                    <button 
                      onClick={handleGetStarted}
                      className="bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-xl"
                    >
                      Create Free Account
                    </button>
                  </div>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Pattern>
  );
}
