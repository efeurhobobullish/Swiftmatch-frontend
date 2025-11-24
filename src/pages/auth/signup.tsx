import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  Ghost, 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  Check
} from "lucide-react";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  // Check for username in URL params (from Home page input)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
    if (userParam) {
      setFormData(prev => ({ ...prev, username: userParam }));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // Simulate API Call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Account created successfully!");
      // window.location.href = "/dashboard"; // Redirect logic
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pattern>
      <div className="relative z-10 min-h-[100dvh] flex flex-col font-sans text-main">
        
        {/* Header */}
        <header className="w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-20">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => window.location.href = "/"}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-main text-background rounded-xl">
               <Ghost className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-main hidden sm:block">
              Anonymous
            </span>
          </div>
          <ModeToggle />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Card */}
            <div className="bg-background/80 backdrop-blur-xl border border-line p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              
              {/* Decorative Gradient Blob */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full pointer-events-none" />

              <div className="text-center mb-8 relative z-10">
                <h1 className="text-3xl font-bold mb-2 text-main tracking-tight">Claim your link</h1>
                <p className="text-muted text-sm">
                  Create an account to start receiving anonymous messages.
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-5 relative z-10">
                {/* Username Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted ml-1">Username</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-main transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="yourname"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-secondary/30 border border-line focus:border-main focus:bg-background focus:ring-0 text-main placeholder:text-muted/50 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-main transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full h-12 pl-11 pr-12 rounded-xl bg-secondary/30 border border-line focus:border-main focus:bg-background focus:ring-0 text-main placeholder:text-muted/50 transition-all outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted hover:text-main transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted ml-1">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-main transition-colors">
                      <Check size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-secondary/30 border border-line focus:border-main focus:bg-background focus:ring-0 text-main placeholder:text-muted/50 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <ButtonWithLoader
                    loading={isLoading}
                    initialText="Create Account"
                    loadingText="Creating..."
                    type="submit"
                    className="w-full h-12 rounded-xl font-bold text-lg bg-main text-background hover:bg-main/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  />
                </div>
              </form>

              {/* Footer Links */}
              <div className="mt-8 text-center text-sm text-muted">
                <p>
                  Already have an account?{" "}
                  <a href="/login" className="text-main font-semibold hover:underline decoration-2 underline-offset-4 cursor-pointer">
                    Login
                  </a>
                </p>
              </div>

            </div>
            
            {/* Terms */}
            <p className="text-center text-xs text-muted/60 mt-6 max-w-xs mx-auto">
              By signing up, you agree to our Terms of Service and Privacy Policy. 
              We do not sell your data.
            </p>
          </motion.div>
        </main>
      </div>
    </Pattern>
  );
}