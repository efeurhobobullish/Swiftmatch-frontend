import { User, Moon, Shield, HelpCircle, LogOut, ChevronRight, BellRing } from "lucide-react";
import BottomNav from "@/layouts/BottomNav";
import { ModeToggle } from "@/components/ui";

export default function Profile() {
  const MENU_ITEMS = [
    { icon: User, label: "Account Information", sub: "Change email, username" },
    { icon: BellRing, label: "Notifications", sub: "Manage alerts" },
    { icon: Shield, label: "Security", sub: "2FA, Password" },
    { icon: HelpCircle, label: "Help & Support", sub: "FAQ, Contact us" },
  ];

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      <main className="layout pt-10 space-y-8">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-full bg-secondary border-4 border-background shadow-xl flex items-center justify-center text-3xl font-bold mb-4">
             U
           </div>
           <h2 className="text-2xl font-bold">User882</h2>
           <p className="text-muted text-sm">user882@example.com</p>
           <span className="mt-2 bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
             Verified User
           </span>
        </div>

        {/* Menu */}
        <div className="bg-card border border-line rounded-3xl overflow-hidden">
           {MENU_ITEMS.map((item, idx) => (
             <div key={idx} className="group flex items-center justify-between p-5 border-b border-line last:border-0 hover:bg-secondary/50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted group-hover:text-main group-hover:bg-background transition-colors">
                     <item.icon size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold text-sm">{item.label}</h4>
                     <p className="text-xs text-muted">{item.sub}</p>
                   </div>
                </div>
                <ChevronRight size={18} className="text-muted" />
             </div>
           ))}
        </div>

        {/* Preferences */}
        <div className="bg-card border border-line rounded-3xl p-5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-main">
                 <Moon size={20} />
              </div>
              <span className="font-bold text-sm">Dark Mode</span>
           </div>
           <ModeToggle />
        </div>

        <button className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
          <LogOut size={20} /> Log Out
        </button>

      </main>
      <BottomNav />
    </div>
  );
}
