import ModeToggle from "@/components/ui/mode-toggle";
import { 
  Heart, 
  ArrowRight, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Zap 
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-main relative overflow-x-hidden selection:bg-primary/20">
      
      {/* --- Ambient Background Effects --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-muted/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line/50 bg-background/80 backdrop-blur-md">
        <div className="main h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight">SwiftMatch</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden md:block">
              Log in
            </a>
            <ModeToggle />
            <a href="/signup" className="btn btn-primary rounded-full px-5 text-sm h-9">
              Join Now
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="main grid lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Left Column: Content --- */}
          <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-semibold mx-auto lg:mx-0">
              <Sparkles size={14} />
              <span>#1 Dating App for 2025</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                Match with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-muted to-primary bg-[length:200%_auto] animate-gradient">
                  Confidence.
                </span>
              </h1>
              <p className="text-muted text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Stop swiping endlessly. Our AI-driven algorithm finds people who actually match your vibe, values, and vision.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="/signup" className="btn btn-primary h-12 px-8 rounded-full text-base shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                <Users size={20} />
                <span>Start Matching</span>
              </a>
              <button className="h-12 px-8 rounded-full border border-line font-medium hover:bg-secondary transition-colors flex items-center gap-2">
                <span>How it works</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Trust Stats */}
            <div className="pt-8 border-t border-line/50 flex items-center justify-center lg:justify-start gap-8">
              <div>
                <div className="text-2xl font-bold text-main">50K+</div>
                <div className="text-sm text-muted">Active Users</div>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div>
                <div className="text-2xl font-bold text-main">1M+</div>
                <div className="text-sm text-muted">Matches Made</div>
              </div>
              <div className="w-px h-8 bg-line"></div>
              <div>
                <div className="text-2xl font-bold text-main">4.9/5</div>
                <div className="text-sm text-muted">App Rating</div>
              </div>
            </div>
          </div>

          {/* --- Right Column: Visual (Mock UI) --- */}
          <div className="relative center hidden lg:flex">
            {/* Decorative Circle behind */}
            <div className="absolute w-[400px] h-[400px] border border-line rounded-full opacity-50 animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] border border-dashed border-primary/30 rounded-full opacity-50 animate-[spin_40s_linear_infinite_reverse]" />
            
            {/* Glass Card Mockup */}
            <div className="relative w-[320px] bg-background/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-all duration-500 cursor-default">
              {/* Mock Header */}
              <div className="p-4 border-b border-line/20 flex justify-between items-center">
                <div className="w-8 h-8 bg-secondary rounded-full" />
                <div className="w-20 h-3 bg-secondary rounded-full" />
              </div>
              {/* Mock Image Area */}
              <div className="h-64 bg-secondary/50 m-4 rounded-2xl center relative overflow-hidden group">
                 <Heart size={48} className="text-primary/20 group-hover:scale-125 transition-transform duration-500" fill="currentColor"/>
                 
                 {/* Floating "It's a Match" Tag */}
                 <div className="absolute bottom-4 bg-white dark:bg-[#1e1e1e] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                    <Heart size={14} className="text-primary" fill="currentColor" />
                    <span className="text-xs font-bold">It's a Match!</span>
                 </div>
              </div>
              {/* Mock Actions */}
              <div className="p-4 flex justify-center gap-6 pb-8">
                <div className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-muted hover:bg-muted/10 transition-colors">
                   <ArrowRight size={20} className="rotate-180" />
                </div>
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                   <Heart size={20} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- Features Marquee / List --- */}
        <div className="mt-24 border-y border-line/50 bg-secondary/30 py-12">
            <div className="main text-center space-y-8">
                <h2 className="text-2xl font-bold">Why people choose SwiftMatch</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group flex items-center gap-3 bg-background border border-line px-5 py-3 rounded-xl hover:border-primary/50 transition-colors cursor-default shadow-sm">
                            <span className="p-1.5 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                {feature.icon}
                            </span>
                            <span className="font-medium text-sm">{feature.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </main>

      {/* --- Simple Footer --- */}
      <footer className="border-t border-line py-8 bg-background">
        <div className="main flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted">© 2025 SwiftMatch Inc.</p>
            <div className="flex gap-6 text-sm font-medium text-muted">
                <a href="#" className="hover:text-primary">Privacy</a>
                <a href="#" className="hover:text-primary">Terms</a>
                <a href="#" className="hover:text-primary">Safety</a>
            </div>
        </div>
      </footer>
    </div>
  );
}

// --- DATA CONSTANTS (Place this in "@/constants/data" or keep here) ---
const features = [
  { label: "Verified Profiles", icon: <ShieldCheck size={16} /> },
  { label: "Smart Algorithm", icon: <Sparkles size={16} /> },
  { label: "Instant Chat", icon: <MessageCircle size={16} /> },
  { label: "Fast Matches", icon: <Zap size={16} /> },
  { label: "No Ghosting Policy", icon: <Users size={16} /> },
];
