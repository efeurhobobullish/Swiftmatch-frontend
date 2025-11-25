import { ChevronLeft, User, Settings, LogOut } from "lucide-react";
import ModeToggle from "@/components/ui/mode-toggle";
import NotificationIcon from "@/components/ui/notification-icon";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDashboard = location.pathname === "/dashboard";
  const isProfile = location.pathname === "/profile";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsDropdownOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-b from-background via-background/70 to-transparent">
      <nav className="layout flex items-center justify-between h-[70px] text-main">

        {/* Left Side: Navigation / Back Buttons */}
        <div className="flex items-center gap-2">
          {!isDashboard && !isProfile && (
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 rounded-full bg-background border border-line center hover:bg-secondary transition-colors"
              title="Go back"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {isDashboard && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-10 w-10 bg-primary rounded-full center overflow-hidden shadow-sm border-2 border-background hover:border-line transition-colors"
                title="Profile menu"
              >
                <img
                  src="https://api.dicebear.com/9.x/adventurer/svg?seed=DevUser"
                  alt="Demo Avatar"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-line rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                  <button
                    onClick={handleProfileClick}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-secondary flex items-center gap-3 transition-colors text-card-foreground"
                  >
                    <User size={16} />
                    Profile
                  </button>

                  <button
                    onClick={handleSettingsClick}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-secondary flex items-center gap-3 transition-colors text-card-foreground"
                  >
                    <Settings size={16} />
                    Settings
                  </button>

                  <div className="h-px bg-line" />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-red-500/10 flex items-center gap-3 transition-colors text-red-500"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
          {isProfile && (
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 rounded-full bg-background border border-line center hover:bg-secondary transition-colors"
              title="Go back"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </div>

        {/* Right Side: Notifications & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NotificationIcon count={3} />
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
