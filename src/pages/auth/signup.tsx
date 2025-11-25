import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, User, Lock, Zap } from "lucide-react";
import { ButtonWithLoader, ModeToggle, Pattern } from "@/components/ui";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    toast.success("Account created! Redirecting...");
    navigate("/dashboard");
  };

  return (
    <Pattern>
      <div className="min-h-screen w-full flex flex-col relative z-10">
        {/* Minimal Header */}
        <header className="w-full p-6 flex justify-between items-center layout">
          <Link to="/" className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-r from-violet-900 to-pink-400 rounded-lg flex items-center justify-center text-white">
               <Zap size={18} fill="currentColor" />
             </div>
             <span className="font-jaro text-xl tracking-wide text-main">SWIFT</span>
          </Link>
          <ModeToggle />
        </header>

        <main className="flex-1 center px-4 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-secondary/50 border border-line p-8 rounded-[2rem] backdrop-blur-xl shadow-xl"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-jaro mb-2 text-main">Create Account</h1>
              <p className="text-sm text-muted">Get your virtual number in seconds</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input w-full pl-11 bg-background"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input w-full pl-11 bg-background"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="input w-full pl-11 pr-11 bg-background"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-main transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="pt-2">
                <ButtonWithLoader 
                  loading={isLoading}
                  initialText="Sign Up"
                  loadingText="Creating Account..."
                  className="btn-primary w-full h-12 rounded-xl text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-violet-500/20 transition-all"
                />
              </div>
            </form>

            <div className="mt-6 text-center space-y-4">
              <p className="text-xs text-muted">
                By signing up, you agree to our <span className="text-main font-semibold cursor-pointer underline">Terms</span> & <span className="text-main font-semibold cursor-pointer underline">Privacy</span>
              </p>
              
              <div className="h-[1px] bg-line w-full" />
              
              <div className="text-sm text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-bold hover:underline ml-1">
                  Log in
                </Link>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </Pattern>
  );
}
