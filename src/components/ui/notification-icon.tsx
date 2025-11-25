import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationIconProps {
  count?: number;
  className?: string;
}

export default function NotificationIcon({ count = 0, className = "" }: NotificationIconProps) {
  return (
    <Link 
      to="/notifications"
      className={`relative p-2 rounded-full hover:bg-secondary/80 transition-all duration-200 group ${className}`}
      aria-label="View Notifications"
    >
      {/* Bell Icon */}
      <Bell 
        size={22} 
        className="text-muted-foreground group-hover:text-foreground transition-colors" 
      />

      {/* Notification Badge */}
      {count > 0 && (
        <div className="absolute top-1.5 right-1.5 flex items-center justify-center pointer-events-none">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-background"></span>
          </span>
        </div>
      )}
    </Link>
  );
}
