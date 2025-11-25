import { useEffect, useState } from "react";
import { toast } from "sonner";
import CountUp from "react-countup";
import { 
  Loader, 
  Phone, 
  Shield, 
  Globe, 
  Zap,
  CheckCircle,
  MessageCircle,
  Smartphone,
  CreditCard,
  ArrowRight,
  LucideIcon
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";

// Type definitions
interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function Home(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkServices = async (): Promise<void> => {
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

  const handleGetStarted = (): void => {
    toast.success("Redirecting to SwiftPlug dashboard...");
    window.location.href = "/dashboard";
  };

  const features: Feature[] = [
    {
      icon: Zap,
      title: "Instant Activation",
      desc: "Get your virtual number up and running within minutes.",
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      desc: "Works seamlessly with WhatsApp, Google Voice, Telegram, and more.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      desc: "Your privacy is our priority. No personal data required.",
    },
    {
      icon: CreditCard,
      title: "Affordable Plans",
      desc: "Flexible pricing that fits your needs and budget.",
    },
  ];

  const steps: Step[] = [
    {
      icon: Smartphone,
      title: "1. Create Account",
      desc: "Sign up and verify your account in seconds.",
    },
    {
      icon: CreditCard,
      title: "2. Top Up Balance",
      desc: "Add funds to your account securely.",
    },
    {
      icon: Phone,
      title: "3. Choose Number",
      desc: "Select your preferred country and service.",
    },
    {
      icon: MessageCircle,
      title: "4. Receive OTP",
      desc: "Get verification codes directly in your dashboard.",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "How to get started with SwiftPlug?",
      answer: "Simply sign up, top up your account, and choose your virtual number. It takes less than 5 minutes!"
    },
    {
      question: "Which platforms are supported?",
      answer: "We support all major platforms including WhatsApp, Google Voice, Telegram, Facebook, Instagram, and many more."
    },
    {
      question: "How do I receive verification codes?",
      answer: "Once you purchase a number, all incoming SMS and verification codes appear instantly in your dashboard."
    },
    {
      question: "Are the numbers reusable?",
      answer: "Yes! You can use your virtual number for multiple verifications during the rental period."
    }
  ];

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col overflow-x-hidden font-sans text-main">
        {/* Header */}
        <header className="w-full p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-main text-background rounded-xl">
              <Phone className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <span className="text-xl font-bold tracking-tight text-main">
              SwiftPlug
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted hover:text-main transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted hover:text-main transition-colors">How it Works</a>
            <a href="#pricing" className="text-muted hover:text-main transition-colors">Pricing</a>
            <a href="#faq" className="text-muted hover:text-main transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <ButtonWithLoader
              loading={false}
              initialText="Get Started"
              loadingText=""
              onClick={handleGetStarted}
              className="h-10 px-6 rounded-xl text-sm font-bold bg-main text-background hover:bg-main/90 transition-all"
            />
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12 md:pb-20 w-full max-w-7xl mx-auto relative">
          <AnimatePresence>
            {isLoading ? (
              <div className="center gap-3 text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <Loader size={28} className="animate-spin text-main" />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-20 text-center w-full"
              >
                {/* Hero Section */}
                <div className="space-y-8 max-w-4xl mx-auto mt-8 md:mt-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line bg-secondary/50 backdrop-blur-md text-sm font-medium text-muted"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span>
                      <CountUp end={10000} separator="," duration={2.5} />+ numbers activated today
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-main leading-[1.1]"
                  >
                    Get your virtual
                    <span className="block text-main">
                      number in minutes
                    </span>
                    <span className="text-2xl md:text-3xl block mt-4">🚀</span>
                  </motion.h1>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                  >
                    Empower your online presence with reliable virtual numbers. 
                    Seamlessly receive verification codes from top platforms like 
                    WhatsApp, Google Voice, Telegram, and more.
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex justify-center pt-4"
                  >
                    <ButtonWithLoader
                      loading={false}
                      initialText="Get Started Now"
                      loadingText=""
                      onClick={handleGetStarted}
                      className="h-14 px-8 rounded-2xl text-lg font-bold bg-main text-background hover:bg-main/90 transition-all shadow-xl hover:translate-y-[-2px] hover:shadow-2xl flex items-center gap-2"
                    >
                      Get Started Now <ArrowRight size={20} />
                    </ButtonWithLoader>
                  </motion.div>
                </div>

                {/* Features Grid */}
                <motion.section
                  id="features"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="pt-16 w-full max-w-6xl mx-auto"
                >
                  <p className="text-muted text-sm uppercase tracking-widest mb-4 font-bold">
                    Why Choose SwiftPlug
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-main mb-12">
                    What SwiftPlug has to offer
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature: Feature, idx: number) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center p-6 rounded-2xl border border-line hover:border-main hover:bg-secondary/30 transition-all duration-300 group"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-main group-hover:scale-110 transition-transform">
                          <feature.icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-main">{feature.title}</h3>
                        <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* How it Works */}
                <motion.section
                  id="how-it-works"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="pt-16 w-full max-w-6xl mx-auto"
                >
                  <p className="text-muted text-sm uppercase tracking-widest mb-4 font-bold">
                    How it works
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-main mb-12">
                    Follow these simple steps
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step: Step, idx: number) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center p-6 rounded-2xl border border-transparent hover:border-line hover:bg-secondary/30 transition-all duration-300"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-main">
                          <step.icon size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-main">{step.title}</h3>
                        <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* FAQ Section */}
                <motion.section
                  id="faq"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="pt-16 w-full max-w-4xl mx-auto"
                >
                  <p className="text-muted text-sm uppercase tracking-widest mb-4 font-bold">
                    FAQ
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-main mb-12">
                    Frequently asked questions
                  </h2>
                  
                  <div className="space-y-4 text-left">
                    {faqs.map((faq: FAQ, idx: number) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl border border-line bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
                      >
                        <h3 className="font-bold text-lg mb-2 text-main flex items-center gap-3">
                          <CheckCircle size={20} className="text-green-500" />
                          {faq.question}
                        </h3>
                        <p className="text-muted leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Final CTA Section */}
                <motion.section
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.9 }}
                  className="pt-16 w-full max-w-2xl mx-auto text-center"
                >
                  <div className="p-8 rounded-3xl bg-secondary border border-line">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-main">
                      Ready to get your virtual number?
                    </h2>
                    <p className="text-muted mb-6">
                      Join thousands of users who trust SwiftPlug for their verification needs.
                    </p>
                    <ButtonWithLoader
                      loading={false}
                      initialText="Get Started Now"
                      loadingText=""
                      onClick={handleGetStarted}
                      className="h-12 px-8 rounded-xl text-lg font-bold bg-main text-background hover:bg-main/90 transition-all shadow-lg hover:translate-y-[-2px] hover:shadow-xl"
                    />
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-line py-8 mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="w-8 h-8 flex items-center justify-center bg-main text-background rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold text-main">SwiftPlug</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm">
                <a href="#" className="text-muted hover:text-main transition-colors">Home</a>
                <a href="#features" className="text-muted hover:text-main transition-colors">Features</a>
                <a href="#how-it-works" className="text-muted hover:text-main transition-colors">How it Works</a>
                <a href="#faq" className="text-muted hover:text-main transition-colors">FAQ</a>
                <a href="#" className="text-muted hover:text-main transition-colors">Contact</a>
              </div>
              
              <div className="mt-4 md:mt-0 text-sm text-muted">
                © 2025 SwiftPlug. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Pattern>
  );
}