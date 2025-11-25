import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { 
  Loader, 
  MessageCircle, 
  Smartphone, 
  ShieldCheck, 
  Globe, 
  Phone,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkServices = async () => {
      setIsLoading(true);
      try {
        await api.get("/");
      } catch (error) {
        console.log("API check finished");
      } finally {
        setIsLoading(false);
      }
    };
    checkServices();
  }, []);

  const handleGetStarted = () => {
    if (searchQuery) {
      window.location.href = "/signup?service=" + searchQuery;
    } else {
      window.location.href = "/signup";
    }
  };

  const steps = [
    { 
      icon: Globe, 
      title: "Select Country", 
      desc: "150+ Regions supported" 
    },
    { 
      icon: MessageCircle, 
      title: "Choose App", 
      desc: "WhatsApp, Telegram, etc" 
    },
    { 
      icon: Smartphone, 
      title: "Get Number", 
      desc: "Instant allocation" 
    },
    { 
      icon: ShieldCheck, 
      title: "Receive SMS", 
      desc: "Code appears here" 
    },
  ];

  const features = [
    { name: "Instant Activation", icon: Zap },
    { name: "Secure & Private", icon: ShieldCheck },
    { name: "150+ Countries", icon: Globe },
    { name: "24/7 Support", icon: Phone }
  ];

  return (
    <Pattern>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        {/* Header */}
        <header className="w-full p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center text-card">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-main">
              SWIFT
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20 w-full">
          <AnimatePresence>
            {isLoading ? (
              <div className="center gap-3 text-center">
                <div className="relative">
                  <Loader size={28} className="animate-spin text-primary" />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-20 text-center w-full max-w-6xl"
              >
                {/* Hero Section */}
                <div className="space-y-8 max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-line bg-card/50 backdrop-blur-sm text-sm font-medium text-muted"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>
                      <CountUp end={8500} separator="," duration={2.5} />+ numbers online now
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-main leading-tight"
                  >
                    Virtual SMS Numbers{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                      Instantly
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-xl text-muted max-w-2xl mx-auto leading-relaxed"
                  >
                    Bypass OTP verifications for WhatsApp, Telegram, PayPal and more. 
                    Secure, private, and ready in seconds.
                  </motion.p>

                  {/* Features Grid */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
                  >
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted">
                        <CheckCircle size={16} className="text-primary shrink-0" />
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Search Input */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto w-full pt-6"
                  >
                    <div className="relative w-full">
                      <input 
                        type="text" 
                        placeholder="WhatsApp, Telegram, PayPal..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 px-6 rounded-xl bg-card border border-line focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg font-medium placeholder:text-muted/50 transition-all"
                      />
                    </div>
                    <ButtonWithLoader
                      loading={false}
                      initialText="Get Started"
                      loadingText=""
                      onClick={handleGetStarted}
                      className="h-14 px-8 rounded-xl bg-primary text-card font-semibold hover:bg-primary/90 active:scale-95 transition-all flex items-center gap-2 min-w-[140px]"
                    >
                      <ArrowRight size={20} />
                    </ButtonWithLoader>
                  </motion.div>
                </div>

                {/* How it Works */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="w-full max-w-5xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-main mb-4">How It Works</h2>
                    <p className="text-muted text-lg">Get your virtual number in 4 simple steps</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.4 + idx * 0.1 }}
                        className="group text-center p-6 rounded-2xl bg-card border border-line hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-card transition-all">
                          <step.icon size={24} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-lg text-main mb-2">{step.title}</h3>
                        <p className="text-muted text-sm">{step.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Social Proof */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-main mb-3">Active Verifications</h3>
                    <p className="text-muted">Real-time SMS codes being delivered</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Message Card 1 */}
                    <div className="p-6 rounded-2xl bg-card border border-line text-left shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <MessageCircle size={20} />
                        </div>
                        <span className="text-xs text-muted font-mono">
                          <CountUp end={5} duration={2} />s ago
                        </span>
                      </div>
                      <p className="text-main font-medium">"PayPal: Your security code is 882-991"</p>
                    </div>

                    {/* Message Card 2 */}
                    <div className="p-6 rounded-2xl bg-primary text-card border border-primary text-left shadow-lg transform hover:scale-105 transition-transform">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-card/20 flex items-center justify-center text-card">
                          <ShieldCheck size={20} />
                        </div>
                        <span className="text-xs text-card/60 font-mono">
                          <CountUp end={2} duration={4} />s ago
                        </span>
                      </div>
                      <p className="font-medium">"WhatsApp code: 442-123. Verification complete."</p>
                    </div>

                    {/* Message Card 3 */}
                    <div className="p-6 rounded-2xl bg-card border border-line text-left shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                          <Phone size={20} />
                        </div>
                        <span className="text-xs text-muted font-mono">
                          <CountUp end={12} duration={3} />s ago
                        </span>
                      </div>
                      <p className="text-main font-medium">"Uber: Your verification code is 1124"</p>
                    </div>
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