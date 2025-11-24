"use client";

import { useState } from "react";
import { Heart, Mail, Lock, User, Calendar, Loader2 } from "lucide-react";
import { GobackButton, ModeToggle } from "@/components/ui"; 

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex bg-background text-main font-sans relative overflow-hidden">
      
       {/* --- Floating Navigation Controls --- */}
      <div className="absolute top-6 left-6 z-50">
        <GobackButton />
      </div>
      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      {/* --- Right Side (Form) --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-6 mt-16 lg:mt-0">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Create your account</h1>
                <p className="text-muted">Join 2M+ people finding love today.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full h-12 pl-12 pr-4 bg-secondary/30 border border-line rounded-xl focus:border-primary focus:bg-background transition-all outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1">Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="email" 
                            placeholder="john@example.com"
                            className="w-full h-12 pl-12 pr-4 bg-secondary/30 border border-line rounded-xl focus:border-primary focus:bg-background transition-all outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="password" 
                            placeholder="Create a strong password"
                            className="w-full h-12 pl-12 pr-4 bg-secondary/30 border border-line rounded-xl focus:border-primary focus:bg-background transition-all outline-none"
                            required
                        />
                    </div>
                    <p className="text-xs text-muted ml-1">Must be at least 8 characters.</p>
                </div>

                {/* Birthday - Important for Dating Apps */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1">Date of Birth</label>
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="date" 
                            className="w-full h-12 pl-12 pr-4 bg-secondary/30 border border-line rounded-xl focus:border-primary focus:bg-background transition-all outline-none text-muted"
                            required
                        />
                    </div>
                    <p className="text-xs text-muted ml-1">You must be 18+ to use SwiftMatch.</p>
                </div>

                {/* Submit */}
                <button 
                    disabled={isLoading}
                    className="w-full h-12 mt-4 bg-primary text-white rounded-xl font-bold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
                </button>
            </form>

            <p className="text-center text-sm text-muted pt-2">
                Already have an account? <a href="/login" className="font-bold text-primary hover:underline">Log in</a>
            </p>
            
            <p className="text-center text-xs text-muted/60 max-w-xs mx-auto">
                By signing up, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>
        </div>
      </div>

      {/* --- Left Side (Visual) --- */}
      <div className="hidden lg:flex w-1/2 bg-secondary/20 relative items-center justify-center p-12 border-l border-line/20">
         {/* Decorative Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         
         <div className="relative z-10 text-center max-w-lg">
             <div className="mb-8 relative inline-block">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
                    <Heart size={48} className="text-white fill-white" />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-12 bg-white dark:bg-black px-4 py-2 rounded-full shadow-lg border border-line text-xs font-bold animate-bounce">
                    It's a match!
                </div>
             </div>
             
             <h2 className="text-3xl font-bold mb-4">Find your person.</h2>
             <ul className="text-left space-y-4 mt-8 inline-block">
                 <li className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center"><span className="text-xs">✓</span></div>
                     <span className="text-muted font-medium">Smart AI Matching</span>
                 </li>
                 <li className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center"><span className="text-xs">✓</span></div>
                     <span className="text-muted font-medium">Verified Profiles Only</span>
                 </li>
                 <li className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center"><span className="text-xs">✓</span></div>
                     <span className="text-muted font-medium">Free to Join</span>
                 </li>
             </ul>
         </div>
      </div>
    </div>
  );
}
