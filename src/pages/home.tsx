import { useEffect, useState } from "react";
import { toast } from "sonner";
import { 
  Loader, 
  Ghost, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Lock,
  Fingerprint
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";
import { useThemeStore } from "@/store";

export default function Home() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic logo based on theme state
  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-black.svg";

  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        await api.get("/");
      } catch (error) {
        console.error(error);
        toast.error("Network services are unreachable");
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
      icon: Ghost,
      title: "Total Anonymity",
      desc: "Connect without revealing your identity. Your data remains yours alone.",
    },
    {
      icon: ShieldCheck,
      title: "End-to-End Encrypted",
      desc: "Every message is encrypted. We can't read your chats, and neither can anyone else.",
    },
    {
      icon: Globe,
      title: "Global Network",
      desc: "Join decentralized communities across the world without borders.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Real-time communication with zero latency, optimized for any device.",
    },
  ];

  const stats = [
    { value: "2M+", label: "Hidden Identities" },
    { value: "150+", label: "Countries" },
    { value: "100%", label: "Encrypted" },
    { value: "0", label: "Logs Kept" },
  ];

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col overflow-x-hidden font-sans text-main">
        {/* Header */}
        <header className="w-full p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <img src={logoPath} alt="Anonymous Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-main">
              Anonymous
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
                  <Loader size={28} className="animate-spin text-main" />
                  <Ghost className="absolute -top-1 -right-1 w-4 h-4 text-muted animate-pulse" />
                </div>
                <p className="text-muted text-sm font-medium animate-pulse">
                  Establishing Secure Connection...
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
                      <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-secondary/30 rounded-full border border-line p-6 backdrop-blur-sm">
                        <img src={logoPath} alt="Anonymous Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-tr from-main/10 to-transparent rounded-full blur-xl -z-10" />
                    </div>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-main"
                  >
                    Unseen. <span className="text-muted">Untraced.</span>
                  </motion.h1>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="space-y-4"
                  >
                    <p className="text-muted text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                      <Fingerprint className="w-4 h-4" />
                      Secure Identity Protocol
                      <Fingerprint className="w-4 h-4" />
                    </p>
                    <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                      Experience the freedom of true privacy. 
                      Connect with the world without leaving a digital footprint.
                      <span className="block text-main font-medium mt-2">
                        Your identity is your secret to keep.
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
                    <div key={idx} className="text-center p-4 rounded-2xl bg-secondary/30 border border-line backdrop-blur-sm">
                      <div className="text-2xl md:text-3xl font-bold text-main mb-1">{stat.value}</div>
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
                    initialText="Go Incognito"
                    loadingText=""
                    onClick={handleGetStarted}
                    className="h-12 md:h-14 px-8 md:px-10 rounded-full text-base md:text-lg min-w-[200px] shadow-lg bg-main text-background hover:bg-main/90 transition-all hover:shadow-xl hover:scale-105 border-0"
                  />
                  <button
                    onClick={() => window.location.href = "/about"}
                    className="flex items-center justify-center gap-2 h-12 md:h-14 px-8 rounded-full text-sm md:text-base font-medium text-muted hover:text-main transition-all border border-line hover:border-main bg-transparent w-full sm:w-auto hover:scale-105"
                  >
                    <Lock size={18} /> How it Works
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
                      <div className="absolute top-0 left-0 w-full h-1 bg-main transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon size={24} className="text-main" />
                      </div>
                      <h3 className="font-bold text-lg mb-3 text-main">{feature.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Pattern>
  );
}


