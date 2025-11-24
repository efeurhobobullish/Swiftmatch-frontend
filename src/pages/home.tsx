"use client";

import { useState } from "react";
import ModeToggle from "@/components/ui/mode-toggle";
import { 
  Heart, ArrowRight, Users, Sparkles, ShieldCheck, 
  MessageCircle, Zap, Star, Menu, X, CheckCircle, Apple
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] w-full bg-background text-main relative overflow-x-hidden font-sans selection:bg-primary/20">
      
      {/* --- 1. Navbar (Responsive) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-line/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="main h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-muted rounded-xl center text-white shadow-lg shadow-primary/20">
              <Heart size={20} fill="currentColor" className="animate-pulse" />
            </div>
            <span className="font-extrabold text-xl tracking-tight">SwiftMatch</span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted hover:text-primary transition-colors">Features</a>
            <a href="#stories" className="text-sm font-medium text-muted hover:text-primary transition-colors">Success Stories</a>
            <a href="#download" className="text-sm font-medium text-muted hover:text-primary transition-colors">Download</a>
            <div className="w-px h-4 bg-line"></div>
            <div className="flex items-center gap-4">
                <ModeToggle />
                <a href="/login" className="text-sm font-bold hover:text-primary transition-colors">Log in</a>
                <a href="/signup" className="btn btn-primary rounded-full px-6 text-sm h-10 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                Join Now
                </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-main"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
           <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-line p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
              <a href="#features" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#stories" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Success Stories</a>
              <div className="h-px bg-line my-2"></div>
              <a href="/login" className="btn w-full border border-line">Log In</a>
              <a href="/signup" className="btn btn-primary w-full">Join Now</a>
           </div>
        )}
      </nav>

      {/* --- 2. Hero Section --- */}
      <section className="pt-32 pb-12 lg:pt-48 lg:pb-32 relative">
        {/* Background Blurs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-muted/10 rounded-full blur-[100px] -z-10 pointer-events-none opacity-50" />

        <div className="main grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>The #1 App for real connections</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Dating meant for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-muted to-primary bg-[length:200%_auto] animate-gradient">
                Modern Life.
              </span>
            </h1>
            
            <p className="text-muted text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
              No games, just dates. We use behavioral AI to match you with people who actually want what you want.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="btn btn-primary h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:translate-y-[-2px] transition-transform">
                <Users size={20} />
                <span>Find Your Match</span>
              </button>
              <button className="h-14 px-8 rounded-full border border-line font-semibold hover:bg-secondary/50 transition-colors flex items-center gap-2">
                <span>Explore</span>
                <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="text-xs text-muted font-medium pt-2">
              * No credit card required for sign up
            </div>
          </div>

          {/* Hero Visual - Stacked Cards Effect */}
          <div className="relative hidden lg:flex justify-center perspective-1000">
             {/* Card 3 (Back) */}
             <div className="absolute top-12 right-12 w-[300px] h-[400px] bg-muted/20 rounded-[32px] rotate-12 scale-90 border border-white/10"></div>
             {/* Card 2 (Middle) */}
             <div className="absolute top-6 right-6 w-[300px] h-[400px] bg-primary/20 rounded-[32px] rotate-6 scale-95 border border-white/10"></div>
             
             {/* Card 1 (Front - Main) */}
             <div className="relative w-[300px] bg-background border border-line/50 shadow-2xl shadow-primary/10 rounded-[32px] overflow-hidden p-4">
                <div className="h-[280px] w-full bg-gradient-to-b from-secondary to-line/50 rounded-2xl relative overflow-hidden">
                    {/* Fake Profile Image Placeholder */}
                    <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="text-white">
                            <h3 className="text-2xl font-bold flex items-center gap-2">Sarah, 24 <CheckCircle size={16} className="text-blue-400 fill-blue-400/20"/></h3>
                            <p className="text-white/80 text-sm">Designer • 3km away</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-6 mt-6">
                    <div className="w-14 h-14 rounded-full border border-line/50 flex items-center justify-center text-muted hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all cursor-pointer">
                        <X size={24} />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform cursor-pointer">
                        <Heart size={24} fill="currentColor" />
                    </div>
                </div>
             </div>

             {/* Floating Badge */}
             <div className="absolute top-20 -left-4 bg-background border border-line shadow-lg px-4 py-3 rounded-xl flex items-center gap-3 animate-bounce">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600">
                    <MessageCircle size={16} />
                </div>
                <div>
                    <p className="text-xs text-muted">New Message</p>
                    <p className="text-sm font-bold">Hey! 👋</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 3. Social Proof --- */}
      <section className="border-y border-line/40 bg-secondary/30 py-8">
        <div className="main">
            <p className="text-center text-sm font-semibold text-muted uppercase tracking-widest mb-6">Trusted by over 2 million daters</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Text Placeholders for Logos */}
                <span className="text-xl font-bold font-serif">Vogue</span>
                <span className="text-xl font-bold font-mono">Wired</span>
                <span className="text-xl font-bold italic">Cosmopolitan</span>
                <span className="text-xl font-bold">TechCrunch</span>
                <span className="text-xl font-bold font-serif">GQ</span>
            </div>
        </div>
      </section>

      {/* --- 4. Features Grid (Bento Box Style) --- */}
      <section id="features" className="py-24 bg-background">
        <div className="main">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold">More than just swiping</h2>
            <p className="text-muted text-lg">We built features that actually help you get off the app and on a date.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl border border-line/60 bg-secondary/20 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Real Humans</h3>
                <p className="text-muted leading-relaxed">Photo verification is mandatory. No bots, no catfishes, just real people looking for connection.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl border border-line/60 bg-secondary/20 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Conversation Starters</h3>
                <p className="text-muted leading-relaxed">Don't know what to say? Our AI suggests icebreakers based on their profile interests.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl border border-line/60 bg-secondary/20 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
                <p className="text-muted leading-relaxed">We learn your type over time. The more you use SwiftMatch, the better your matches get.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. Success Stories (Testimonials) --- */}
      <section id="stories" className="py-24 bg-secondary/30 border-t border-line/30">
        <div className="main">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold">Success Stories</h2>
                    <p className="text-muted text-lg">Real couples who found love on SwiftMatch.</p>
                </div>
                <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Read more stories <ArrowRight size={18}/>
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background p-6 rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex gap-1 text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-main mb-6 leading-relaxed">"We matched on a Tuesday and went for coffee on Thursday. 2 years later, we are engaged! I never thought an app would work for me."</p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-muted"></div>
                            <div>
                                <p className="font-bold text-sm">Alex & Jordan</p>
                                <p className="text-xs text-muted">Matched Jan 2023</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- 6. CTA / Download Section --- */}
      <section id="download" className="py-24">
         <div className="main">
            <div className="bg-primary rounded-[3rem] p-10 md:p-20 text-center md:text-left relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[50px] -ml-10 -mb-10"></div>

                <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to find your person?</h2>
                        <p className="text-white/80 text-lg max-w-md">Download the app now and start meeting people nearby in less than 2 minutes.</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors w-fit">
                                <Apple size={24} fill="white" />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-medium">Download on the</div>
                                    <div className="text-sm font-bold leading-none">App Store</div>
                                </div>
                            </button>
                            <button className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-gray-900 transition-colors w-fit">
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-medium">Get it on</div>
                                    <div className="text-sm font-bold leading-none">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Phone Mockup Graphic */}
                    <div className="hidden md:flex justify-center relative">
                         <div className="w-[260px] h-[500px] bg-background border-[8px] border-black rounded-[3rem] shadow-2xl relative overflow-hidden translate-y-12">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20"></div>
                            <div className="w-full h-full bg-secondary center flex-col gap-4">
                                <Heart size={48} className="text-primary animate-pulse" fill="currentColor" />
                                <p className="font-bold text-primary">SwiftMatch</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-background border-t border-line pt-16 pb-8">
        <div className="main grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1 space-y-4">
                <div className="flex items-center gap-2">
                    <Heart size={20} className="text-primary" fill="currentColor" />
                    <span className="font-bold text-xl">SwiftMatch</span>
                </div>
                <p className="text-sm text-muted">Making dating simple, safe, and fun again.</p>
            </div>
            
            <div className="space-y-4">
                <h4 className="font-bold">Company</h4>
                <ul className="space-y-2 text-sm text-muted">
                    <li><a href="#" className="hover:text-primary">About</a></li>
                    <li><a href="#" className="hover:text-primary">Careers</a></li>
                    <li><a href="#" className="hover:text-primary">Press</a></li>
                </ul>
            </div>
            <div className="space-y-4">
                <h4 className="font-bold">Legal</h4>
                <ul className="space-y-2 text-sm text-muted">
                    <li><a href="#" className="hover:text-primary">Privacy</a></li>
                    <li><a href="#" className="hover:text-primary">Terms</a></li>
                    <li><a href="#" className="hover:text-primary">Cookies</a></li>
                </ul>
            </div>
            <div className="space-y-4">
                <h4 className="font-bold">Social</h4>
                <ul className="space-y-2 text-sm text-muted">
                    <li><a href="#" className="hover:text-primary">Instagram</a></li>
                    <li><a href="#" className="hover:text-primary">Twitter</a></li>
                    <li><a href="#" className="hover:text-primary">TikTok</a></li>
                </ul>
            </div>
        </div>
        <div className="main border-t border-line/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
            <p>© 2025 SwiftMatch Inc. All rights reserved.</p>
            <p>Made with ♥ for connections.</p>
        </div>
      </footer>
    </div>
  );
}
