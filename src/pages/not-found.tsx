import { HeartCrack, ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  const navigateToHome = () => {
    window.location.href = "/";
  };

  const navigateToHelp = () => {
    window.location.href = "/help";
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden font-sans selection:bg-primary/20">

      {/* --- Ambient Background Effects (Same as Landing) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-muted/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* --- Main Content Card --- */}
      <div className="relative z-10 p-8 md:p-12 max-w-lg w-full text-center">

        {/* Animated Icon */}
        <div className="relative inline-block mb-8 group">
           <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
           <HeartCrack 
             size={80} 
             className="relative text-primary rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500" 
             strokeWidth={1.5}
           />
        </div>

        {/* Typography */}
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted mb-2 tracking-tighter">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-main mb-4">
          It's not you, it's us.
        </h2>
        <p className="text-muted text-lg mb-10 leading-relaxed">
          Looks like this page ghosted you. We couldn't find the match you were looking for.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={navigateToHome}
            className="btn btn-primary h-12 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </button>

          <button 
            onClick={goBack}
            className="h-12 px-8 rounded-full border border-line text-main font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-12 pt-8 border-t border-line/30">
            <button 
              onClick={navigateToHelp}
              className="text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-2"
            >
                <Search size={14} />
                Looking for something specific? Visit Help Center
            </button>
        </div>

      </div>
    </div>
  );
}