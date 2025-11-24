import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";
import { popularGames } from "@/constants/data";
import {
  Users,
  Swords,
  Trophy,
  MessageCircle,
  Gamepad2,
  Crown,
  Mic,
  Shield
} from "lucide-react";
import { useThemeStore } from "@/store";

export default function Home() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-colour.svg";

  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        await api.get("/");
      } catch (error) {
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
      desc: "Connect with players at your skill level for any game."
    },
    {
      icon: Swords,
      title: "Competitive Play",
      desc: "Join ranked matches and climb the leaderboards."
    },
    {
      icon: MessageCircle,
      title: "Voice Chat",
      desc: "Integrated voice chat for seamless communication."
    },
    {
      icon: Trophy,
      title: "Track Progress",
      desc: "Monitor stats and earn achievements."
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Players" },
    { value: "100+", label: "Games" },
    { value: "5K+", label: "Daily Matches" },
    { value: "10K+", label: "Squads" }
  ];

  return (
    <Pattern>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <img src={logoPath} alt="GameSquad" className="w-full h-full" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              GameSquad
            </span>
          </div>
          <ModeToggle />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-6xl mx-auto">
            <AnimatePresence>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-3">
                  <Loader size={32} className="animate-spin text-orange-500" />
                  <p className="text-orange-500/80 text-sm font-medium">
                    Loading Game Services...
                  </p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-16 text-center"
                >
                  {/* Hero Section */}
                  <section className="space-y-8">
                    <div className="space-y-6">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center"
                      >
                        <div className="w-20 h-20 relative">
                          <img src={logoPath} alt="GameSquad" className="w-full h-full" />
                          <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-lg -z-10" />
                        </div>
                      </motion.div>

                      <div className="space-y-4">
                        <motion.h1
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
                        >
                          GameSquad
                        </motion.h1>
                        
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        >
                          Team up with players worldwide. Find your perfect squad and dominate together.
                        </motion.p>
                      </div>
                    </div>

                    {/* Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto"
                    >
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center p-4 rounded-lg bg-card border">
                          <div className="text-xl font-bold text-orange-500">{stat.value}</div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                      <ButtonWithLoader
                        loading={false}
                        initialText="Find Your Squad"
                        loadingText=""
                        onClick={handleGetStarted}
                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg"
                      />
                      <button
                        onClick={() => window.location.href = "/games"}
                        className="px-8 py-3 border border-border hover:border-orange-500/50 text-muted-foreground hover:text-orange-500 rounded-lg transition-colors"
                      >
                        Browse Games
                      </button>
                    </motion.div>
                  </section>

                  {/* Features */}
                  <section className="space-y-8">
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-2xl font-semibold"
                    >
                      Why Choose GameSquad?
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 + index * 0.1 }}
                          className="p-6 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                            <feature.icon className="w-6 h-6 text-orange-500" />
                          </div>
                          <h3 className="font-semibold mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* Popular Games */}
                  <section className="space-y-6">
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="text-2xl font-semibold"
                    >
                      Popular Games
                    </motion.h2>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto"
                    >
                      {popularGames.map((game, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 text-sm border rounded-full bg-background hover:border-orange-500/50 hover:text-orange-500 transition-colors cursor-default"
                        >
                          {game}
                        </span>
                      ))}
                    </motion.div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </Pattern>
  );
}