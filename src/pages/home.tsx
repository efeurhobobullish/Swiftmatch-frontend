"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader, Github, Chat, Zap, Layers } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/API/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";
import { libraries } from "@/constants/data";
import { useThemeStore } from "@/store";

export default function Home() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-color.svg";

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

  const handleStart = () => {
    window.location.href = "/signup";
  };

  const features = [
    {
      icon: Chat,
      title: "AI Chat",
      desc: "Instantly converse with AI for answers, guidance, or ideas.",
    },
    {
      icon: Zap,
      title: "Quick Automation",
      desc: "Automate repetitive tasks using smart AI-driven workflows.",
    },
    {
      icon: Layers,
      title: "Knowledge Hub",
      desc: "Organize, explore, and learn from AI-curated resources.",
    },
    {
      icon: Github,
      title: "Open Source",
      desc: "Collaborate on projects and explore code within the community.",
    },
  ];

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col overflow-x-hidden">
        {/* Header */}
        <header className="w-full p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-20">
          <div className="flex items-center">
            <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
              <img src={logoPath} alt="NeatAI Logo" className="w-full h-full object-contain" />
            </div>
            <span className="ml-4 font-bold text-2xl md:text-3xl text-main">NeatAI</span>
          </div>
          <ModeToggle />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 md:pb-20 w-full max-w-7xl mx-auto relative">
          <AnimatePresence>
            {isLoading ? (
              <div className="center gap-2 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Loader size={28} className="animate-spin text-main" />
                <p className="text-main/80 text-sm font-medium animate-pulse">
                  Checking Services...
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-10 text-center w-full"
              >
                {/* Hero */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-main to-primary/70 tracking-tight">
                    Smarter AI, Better Productivity
                  </h1>
                  <p className="text-muted text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                    NeatAI combines intelligent conversation, automation, and resources to help you work, learn, and create effortlessly.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 w-full sm:w-auto">
                  <ButtonWithLoader
                    loading={false}
                    initialText="Start Chatting"
                    loadingText=""
                    onClick={handleStart}
                    className="h-12 md:h-14 px-8 md:px-10 rounded-full text-base md:text-lg min-w-[200px] shadow-xl bg-primary text-background hover:bg-primary/90 transition-all"
                  />
                  <button
                    onClick={() => window.open("https://github.com/efeurhobobullish", "_blank")}
                    className="flex items-center justify-center gap-2 h-12 md:h-14 px-8 rounded-full text-sm md:text-base font-medium text-muted hover:text-main transition-colors border border-line hover:border-main/50 bg-transparent w-full sm:w-auto"
                  >
                    <Github size={20} /> View on GitHub
                  </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24 w-full">
                  {features.map((feature, idx) => (
                    <div key={idx} className="p-6 rounded-2xl border border-line bg-background hover:bg-secondary/40 transition-all group cursor-default hover:-translate-y-1 duration-300">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon size={24} className="text-main" />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-main">{feature.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Libraries / Footer */}
                <div className="mt-16 md:mt-24 text-center space-y-6 w-full">
                  <ul className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl mx-auto">
                    {libraries.map((library) => (
                      <li
                        key={library}
                        className="text-[10px] md:text-xs font-medium text-muted bg-secondary border border-line rounded-full px-4 py-2 hover:border-main/50 transition-colors"
                      >
                        {library}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Pattern>
  );
}