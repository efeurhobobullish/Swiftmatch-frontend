import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Github, Sparkles } from "lucide-react";
import { Pattern, ButtonWithLoader, ModeToggle } from "@/components/ui";
import { useThemeStore } from "@/store";
import { toast } from "sonner";

export default function Signup() {
  const { theme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const logoPath = theme === "dark" ? "/logo-white.svg" : "/logo-colour.svg";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Account created successfully!");
      // Redirect to dashboard or verification page
      window.location.href = "/chat";
    } catch (error) {
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.info("Google signup coming soon");
  };

  const handleGitHubSignup = () => {
    toast.info("GitHub signup coming soon");
  };

  return (
    <Pattern>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logoPath} alt="NeuralCore" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-main to-main/70 bg-clip-text text-transparent">
              NeuralCore
            </span>
          </div>
          <ModeToggle />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Card */}
            <div className="bg-background border border-line rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-main/10 to-main/5 flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-main" />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-main mb-2">
                    Create your account
                  </h1>
                  <p className="text-muted text-sm">
                    Start your AI journey with NeuralCore
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-main">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-secondary border border-line rounded-xl text-main placeholder-muted focus:border-main transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-main">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-secondary border border-line rounded-xl text-main placeholder-muted focus:border-main transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-main">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 bg-secondary border border-line rounded-xl text-main placeholder-muted focus:border-main transition-colors"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-main transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-main">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-secondary border border-line rounded-xl text-main placeholder-muted focus:border-main transition-colors"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <ButtonWithLoader
                    loading={isLoading}
                    initialText="Create Account"
                    loadingText="Creating account..."
                    onClick={() => {}}
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-base font-medium mt-6 bg-main text-background hover:bg-main/90 transition-all"
                  />
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-line" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted">Or continue with</span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-line rounded-xl text-main hover:bg-secondary transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    onClick={handleGitHubSignup}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-line rounded-xl text-main hover:bg-secondary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    Continue with GitHub
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="text-muted text-sm">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-main font-medium hover:underline transition-colors"
                    >
                      Sign in
                    </a>
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-secondary border-t border-line">
                <p className="text-xs text-muted text-center">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-main hover:underline">Terms of Service</a>{" "}
                  and{" "}
                  <a href="#" className="text-main hover:underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </Pattern>
  );
}