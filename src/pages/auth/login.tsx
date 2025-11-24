"use client";

import { useState } from "react";
import { Heart, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { GobackButton, ModeToggle } from "@/components/ui"; 

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
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

      {/* --- Left Side: Visual / Brand --- */}
      <div className="hidden lg:flex w-1/2 bg-primary relative items-center justify-center p-12 text-white">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-[#500724] opacity-90 z-10" />
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-black/20 rounded-full blur-3xl z-0" />
        
        {/* Content Overlay */}
        <div className="relative z-20 max-w-lg space-y-6 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <Heart size={32} className="text-white" fill="currentColor" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-lg text-white/80 leading-relaxed">
              "I met my soulmate on SwiftMatch after just 3 days. It works." 
              <br />
              <span className="text-sm font-bold mt-4 block">— Jessica, New York</span>
            </p>
        </div>
      </div>

      {/* --- Right Side: Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 relative">
        <div className="w-full max-w-md space-y-8 mt-12 lg:mt-0">
            <div className="text-center lg:text-left space-y-2">
                <h1 className="text-3xl font-bold">Log in to your account</h1>
                <p className="text-muted">Nice to see you again! Enter your details below.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium ml-1">Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type="email" 
                            placeholder="hello@example.com"
                            className="w-full h-12 pl-12 pr-4 bg-secondary/30 border border-line rounded-xl focus:border-primary focus:bg-background transition-all outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-medium">Password</label>
                        <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full h-12 pl-12 pr-12 bg-secondary/30 border border-line rounded-xl focus:border-primary focus:bg-background transition-all outline-none"
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    disabled={isLoading}
                    className="w-full h-12 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-line"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted">Or continue with</span></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 h-11 border border-line rounded-xl hover:bg-secondary/50 transition-colors font-medium text-sm">
                    {/* Google Icon */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                </button>
                <button className="flex items-center justify-center gap-2 h-11 border border-line rounded-xl hover:bg-secondary/50 transition-colors font-medium text-sm">
                   {/* Apple Icon */}
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.81 0 1.9-.71 3.35-.71 1.05.02 1.95.45 2.56 1.12-2.45 1.5-2.02 5.58.55 6.78-.53 1.55-1.25 3.09-2.54 4.03-.49.37-1.53 1.03-1.53 1.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                   Apple
                </button>
            </div>

            <p className="text-center text-sm text-muted pt-4">
                Don't have an account? <a href="/signup" className="font-bold text-primary hover:underline">Sign up for free</a>
            </p>
        </div>
      </div>
    </div>
  );
}
