import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Users, Swords, Trophy, MessageCircle, Gamepad2, Crown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";
import { popularGames } from "@/constants/data";
import { useThemeStore } from "@/store";

export default function Home() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic logo based on theme state
  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-colour.svg";

  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        await api.get("/");
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
      icon: Users,
      title: "Find Teammates",
      desc: "Connect with players at your skill level for COD, PUBG, Free Fire and more.",
    },
    {
      icon: Swords,
      title: "Competitive Play",
      desc: "Join ranked matches and climb the leaderboards with your squad.",
    },
    {
      icon: MessageCircle,
      title: "Voice Chat Ready",
      desc: "Integrated voice chat for seamless communication during gameplay.",
    },
    {
      icon: Trophy,
      title: "Achievements & Stats",
      desc: "Track your progress, earn badges, and showcase your gaming skills.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Gamers" },
    { value: "100+", label: "Games Supported" },
    { value: "5K+", label: "Daily Matches" },
    { value: "10K+", label: "Squads Formed" },
  ];

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col overflow-x-hidden font-sans text-main">
        {/* Header */}
        <header className="w-full p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
              <img src={logoPath} alt="GameSquad Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              GameSquad
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 md:pb-20 w-full max-w-7xl mx-auto relative">
          <AnimatePresence>
            {isLoading ? (
              <div className="center gap-3 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Loader size={28} className="animate-spin text-orange-500" />
                  <Gamepad2 className="absolute -top-1 -right-1 w-4 h-4 text-orange-500 animate-pulse" />
                </div>
                <p className="text-orange-500/80 text-sm font-medium animate-pulse">
                  Loading Game Services...
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-12 text-center w-full"
              >
                {/* Hero Section */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                    className="flex justify-center mb-8"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        <img src={logoPath} alt="GameSquad Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/5 rounded-full blur-xl -z-10" />
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-400 tracking-tight"
                  >
                    GameSquad
                  </motion.h1>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-4"
                  >
                    <p className="text-muted text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                      <Crown className="w-4 h-4" />
                      Where Gamers Connect
                      <Crown className="w-4 h-4" />
                    </p>
                    <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                      Team up with players worldwide for COD, PUBG, Free Fire and more.
                      <span className="block text-orange-500 font-medium mt-2">
                        Find Your Squad. Dominate Together.
                      </span>
                    </p>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
                >
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-4 rounded-2xl bg-secondary/50 border border-line backdrop-blur-sm">
                      <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">{stat.value}</div>
                      <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 w-full sm:w-auto"
                >
                  <ButtonWithLoader
                    loading={false}
                    initialText="Find Your Squad"
                    loadingText=""
                    onClick={handleGetStarted}
                    className="h-12 md:h-14 px-8 md:px-10 rounded-full text-base md:text-lg min-w-[200px] shadow-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-all hover:shadow-2xl hover:scale-105 border-0"
                  />
                  <button
                    onClick={() => window.location.href = "/games"}
                    className="flex items-center justify-center gap-2 h-12 md:h-14 px-8 rounded-full text-sm md:text-base font-medium text-muted hover:text-orange-500 transition-all border border-line hover:border-orange-500/50 bg-transparent w-full sm:w-auto hover:scale-105"
                  >
                    <Gamepad2 size={20} /> Browse Games
                  </button>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 md:mt-20 w-full"
                >
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.9 + idx * 0.1 }}
                      className="p-6 rounded-2xl border border-line bg-background hover:bg-secondary/40 transition-all group cursor-default hover:-translate-y-2 duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon size={24} className="text-orange-500" />
                      </div>
                      <h3 className="font-bold text-lg mb-3 text-main">{feature.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Popular Games */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.1 }}
                  className="mt-16 md:mt-24 text-center space-y-6 w-full"
                >
                  <p className="text-muted text-sm uppercase tracking-widest mb-6">
                    Popular Games
                  </p>
                  <ul className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
                    {popularGames.map((game) => (
                      <li
                        key={game}
                        className="text-xs font-medium text-muted bg-secondary border border-line rounded-full px-4 py-2 hover:border-orange-500/50 hover:text-orange-500 transition-all cursor-default hover:scale-105"
                      >
                        {game}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Pattern>
  );
}

