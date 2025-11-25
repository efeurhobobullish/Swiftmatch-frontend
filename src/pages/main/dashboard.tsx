import { useState, useEffect } from "react";
import { 
  Search, 
  Home, 
  Clock, 
  CreditCard, 
  Settings, 
  Bell, 
  Copy, 
  // Service Icons
  MessageCircle, 
  Send, 
  Instagram, 
  Facebook, 
  Wallet,
  Car,
  // Country/Misc Icons
  MapPin,
  ChevronRight,
  Loader
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ModeToggle, ButtonWithLoader } from "@/components/ui";

// Mock Data - Now using Lucide Components directly
const SERVICES = [
  { id: "wa", name: "WhatsApp", price: 0.50, icon: MessageCircle },
  { id: "tg", name: "Telegram", price: 0.45, icon: Send },
  { id: "ig", name: "Instagram", price: 0.15, icon: Instagram },
  { id: "fb", name: "Facebook", price: 0.20, icon: Facebook },
  { id: "pp", name: "PayPal", price: 0.60, icon: Wallet },
  { id: "ub", name: "Uber", price: 0.25, icon: Car },
];

const COUNTRIES = [
  { id: "us", name: "United States", code: "+1", iso: "US" },
  { id: "uk", name: "United Kingdom", code: "+44", iso: "UK" },
  { id: "ca", name: "Canada", code: "+1", iso: "CA" },
  { id: "ng", name: "Nigeria", code: "+234", iso: "NG" },
  { id: "br", name: "Brazil", code: "+55", iso: "BR" },
];

export default function Dashboard() {
  const queryParams = new URLSearchParams(window.location.search);
  const serviceParam = queryParams.get("service");

  const [activeTab, setActiveTab] = useState("order");
  const [balance, setBalance] = useState(12.50);
  
  const [selectedService, setSelectedService] = useState(
    SERVICES.find(s => s.name.toLowerCase().includes(serviceParam?.toLowerCase() || "")) || SERVICES[0]
  );
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  
  const [activeOrder, setActiveOrder] = useState<any>(null);

  const handlePurchase = () => {
    if (balance < selectedService.price) {
      toast.error("Insufficient balance.");
      return;
    }
    
    setBalance(prev => prev - selectedService.price);
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      service: selectedService,
      country: selectedCountry,
      number: `${selectedCountry.code} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
      status: "waiting",
      code: null
    };

    setActiveOrder(newOrder);
    toast.success(`Number purchased for ${selectedService.name}!`);

    setTimeout(() => {
      setActiveOrder((prev: any) => ({
        ...prev,
        status: "received",
        code: "892-113"
      }));
      toast.info("New SMS received!");
    }, 8000);
  };

  const copyNumber = () => {
    if(!activeOrder) return;
    navigator.clipboard.writeText(activeOrder.number.replace(/\s/g, ''));
    toast.success("Number copied");
  };

  return (
    <div className="min-h-screen bg-background text-main font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-line bg-secondary/10 p-4 md:p-6 flex md:flex-col justify-between items-center md:items-start z-30 sticky top-0 md:h-screen">
        <div className="flex items-center gap-2 mb-0 md:mb-10">
           <div className="w-8 h-8 bg-main text-background rounded-lg flex items-center justify-center font-bold">V</div>
           <span className="font-bold text-xl hidden md:block">VirtuNum</span>
        </div>

        <nav className="flex md:flex-col gap-2 w-full justify-around md:justify-start">
          {[
            { id: "order", icon: Home, label: "Dashboard" },
            { id: "history", icon: Clock, label: "History" },
            { id: "topup", icon: CreditCard, label: "Top Up" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
                activeTab === item.id 
                  ? "bg-main text-background font-medium shadow-lg" 
                  : "text-muted hover:bg-secondary hover:text-main"
              }`}
            >
              <item.icon size={20} />
              <span className="hidden md:block">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 mt-auto w-full p-4 rounded-2xl bg-secondary/30 border border-line">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-orange-500" />
          <div className="flex-1 min-w-0">
             <p className="text-sm font-medium truncate">User882</p>
             <p className="text-xs text-muted">Free Plan</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8 relative">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Top Bar */}
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted text-sm">Welcome back, select a service.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="bg-secondary/50 px-4 py-2 rounded-full border border-line font-mono text-sm font-medium flex items-center gap-2">
                 <Wallet size={16} className="text-green-500" />
                 {balance.toFixed(2)}
               </div>
               <div className="relative">
                 <Bell size={20} className="text-muted hover:text-main cursor-pointer" />
                 <span className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
               </div>
               <ModeToggle />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN: Order Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Active Number Status Card */}
              <AnimatePresence mode="popLayout">
                {activeOrder && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 rounded-3xl bg-main text-background relative overflow-hidden shadow-xl">
                       <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                       
                       <div className="relative z-10 flex justify-between items-start mb-6">
                         <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                             <activeOrder.service.icon size={24} />
                           </div>
                           <div>
                             <p className="font-medium text-white/90">{activeOrder.service.name}</p>
                             <div className="flex items-center gap-2 mt-1">
                               <p className="text-2xl font-mono font-bold">{activeOrder.number}</p>
                               <button onClick={copyNumber} className="p-1 hover:bg-white/20 rounded transition-colors">
                                 <Copy size={14} />
                               </button>
                             </div>
                           </div>
                         </div>
                         <div className="text-right">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-1">
                              <MapPin size={10} /> {activeOrder.country.iso}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-white/70 justify-end">
                              <Clock size={12} /> 14:22 remaining
                            </div>
                         </div>
                       </div>

                       <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-center min-h-[80px]">
                          {activeOrder.status === "received" ? (
                            <motion.div 
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-center"
                            >
                               <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Your Code</p>
                               <p className="text-4xl font-mono font-bold tracking-widest">{activeOrder.code}</p>
                            </motion.div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-white/50">
                               <Loader size={20} className="animate-spin" />
                               <span className="text-sm">Waiting for SMS...</span>
                            </div>
                          )}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Service Selection */}
              <div className="bg-background border border-line rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Search size={18} className="text-muted" /> Select Service
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-2xl border text-left transition-all group ${
                        selectedService.id === service.id
                          ? "border-main bg-secondary ring-1 ring-main/20"
                          : "border-line hover:border-main/50 hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        {/* Rendering the Icon Component */}
                        <div className={`p-2 rounded-lg ${selectedService.id === service.id ? 'bg-main text-background' : 'bg-secondary text-main'} transition-colors`}>
                          <service.icon size={20} />
                        </div>
                        {selectedService.id === service.id && (
                          <div className="w-2 h-2 rounded-full bg-main" />
                        )}
                      </div>
                      <p className="font-bold text-sm">{service.name}</p>
                      <p className="text-xs text-muted mt-1">${service.price.toFixed(2)}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Country Selection */}
               <div className="bg-background border border-line rounded-3xl p-6 shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-muted" /> Select Country
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                   {COUNTRIES.map((country) => (
                     <button
                        key={country.id}
                        onClick={() => setSelectedCountry(country)}
                        className={`w-full flex items-center justify-between p-3 px-4 rounded-xl border transition-all ${
                          selectedCountry.id === country.id
                            ? "border-main bg-secondary/80"
                            : "border-transparent hover:bg-secondary/40"
                        }`}
                     >
                        <div className="flex items-center gap-3">
                           {/* Replaced Flag Emoji with stylized text badge */}
                           <div className="w-8 h-6 rounded bg-line/50 flex items-center justify-center text-[10px] font-bold text-main tracking-wider border border-line">
                             {country.iso}
                           </div>
                           <span className="font-medium text-sm">{country.name}</span>
                        </div>
                        <span className="font-mono text-muted text-xs">{country.code}</span>
                     </button>
                   ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Summary */}
            <div className="space-y-6">
              
              {/* Checkout Card */}
              <div className="bg-background border border-line rounded-3xl p-6 shadow-sm sticky top-8">
                 <h3 className="font-bold text-lg mb-6">Order Summary</h3>
                 
                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm items-center">
                       <span className="text-muted flex items-center gap-2"><Search size={14}/> Service</span>
                       <span className="font-medium flex items-center gap-2">
                         <selectedService.icon size={14} className="text-muted"/> 
                         {selectedService.name}
                       </span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                       <span className="text-muted">Country</span>
                       <span className="font-medium bg-secondary px-2 py-0.5 rounded text-xs">{selectedCountry.name}</span>
                    </div>
                    <div className="h-[1px] bg-line my-2" />
                    <div className="flex justify-between items-center">
                       <span className="font-bold">Total Cost</span>
                       <span className="text-xl font-bold text-main">${selectedService.price.toFixed(2)}</span>
                    </div>
                 </div>

                 <ButtonWithLoader
                    loading={false}
                    initialText="Purchase Number"
                    loadingText="Processing..."
                    onClick={handlePurchase}
                    className="w-full py-4 rounded-xl bg-main text-background font-bold hover:opacity-90 transition-opacity shadow-lg"
                 />
                 <p className="text-center text-xs text-muted mt-4 leading-relaxed">
                   If no SMS arrives in 20 mins, you are automatically refunded to your wallet.
                 </p>
              </div>

              {/* Mini History */}
              <div className="p-4 rounded-3xl border border-line/50">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-sm">Recent Activity</h3>
                   <button className="text-xs text-muted hover:text-main flex items-center gap-1">
                     View All <ChevronRight size={12} />
                   </button>
                 </div>
                 <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                         <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted">
                           <MessageCircle size={14} />
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium">Google Verification</p>
                            <p className="text-[10px] text-muted truncate">Code: 228-*** • 2h ago</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
