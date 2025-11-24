import ModeToggle from "@/components/ui/mode-toggle";
import { Heart, ArrowRight, Users, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full bg-background relative overflow-y-auto">
      <div className="relative z-10 center flex-col gap-10 text-center layout py-10">
        {/* Header with mode toggle */}
        <div className="absolute top-6 right-6">
          <ModeToggle />
        </div>

        {/* Main content */}
        <div className="space-y-6 mt-20">
          <div className="center gap-3">
            <Sparkles className="text-primary" size={24} />
            <h1 className="text-6xl md:leading-[80px] leading-[60px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted">
              SwiftMatch
            </h1>
            <Heart className="text-primary" size={24} />
          </div>
          <p className="text-muted text-lg max-w-md mx-auto">
            Find your perfect match in seconds. Smart dating for modern connections.
          </p>
        </div>

        {/* CTA Button */}
        <div className="center gap-2">
          <a
            href="/signup"
            className="border border-line rounded-full bg-secondary/70 px-6 py-3 center gap-3 inline-flex hover:bg-primary hover:text-white transition-all duration-300"
          >
            <div className="center gap-2">
              <Users size={18} className="currentColor" />
              <p className="text-sm font-semibold">Start Matching</p>
            </div>
            <ArrowRight size={20} className="currentColor" />
          </a>
        </div>

        {/* Features list */}
        <ul className="center flex-wrap gap-3 max-w-2xl">
          {features.map((feature) => (
            <li
              key={feature}
              className="text-sm text-muted dark:bg-secondary border border-line rounded-full px-4 py-2 hover:border-primary transition-colors"
            >
              {feature}
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-xs text-muted">Active Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">1M+</div>
            <div className="text-xs text-muted">Matches Made</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">95%</div>
            <div className="text-xs text-muted">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}