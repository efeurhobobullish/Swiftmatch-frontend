import { useState } from "react";
import { 
  Bell, 
  Plus,
  ChevronDown,
  Search,
  CheckCircle2,
  Smartphone,
  ArrowRight,
  Loader2,
  Copy,
  Clock,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import BottomNav from "@/layouts/BottomNav";
import { ModeToggle, ButtonWithLoader } from "@/components/ui";

import { ALL_COUNTRIES, ALL_SERVICES } from "@/constants/data";
import type { Country, Service } from "@/constants/data";

export default function Dashboard() {
  const [balance, setBalance] = useState(12500.00);
  const [totalNumbers, setTotalNumbers] = useState(42); 
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedCountry, setSelectedCountry] = useState<Country>(ALL_COUNTRIES[0]);
  const [selectedService, setSelectedService] = useState<Service>(ALL_SERVICES[0]);
  
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");

  const [activeOrder, setActiveOrder] = useState<any>(null);

  const filteredCountries = ALL_COUNTRIES.filter((c: Country) => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  const filteredServices = ALL_SERVICES.filter((s: Service) => 
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const handlePurchase = async () => {
    if (activeOrder) {
      toast.error("You already have an active number. Finish that first.");
      return;
    }

    if (balance < selectedService.price) {
      toast.error("Insufficient balance. Please fund your wallet.");
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setBalance(prev => prev - selectedService.price);
    setTotalNumbers(prev => prev + 1);

    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      service: selectedService,
      country: selectedCountry,
      number: `${selectedCountry.code} ${Math.floor(Math.random() * 800) + 100} ${Math.floor(Math.random() * 900000) + 100000}`,
      status: "waiting",
      smsCode: null,
      expiry: Date.now() + 15 * 60 * 1000 
    };

    setActiveOrder(newOrder);
    setIsLoading(false);
    toast.success("Number generated successfully!");

    setTimeout(() => {
      setActiveOrder((prev: any) => {
        if (!prev) return null;
        return {
          ...prev,
          status: "received",
          smsCode: Math.floor(100000 + Math.random() * 900000).toString()
        };
      });
      toast.info("New SMS Received!");
    }, 6000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-line px-6 py-4">
        <div className="layout flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary border border-line flex items-center justify-center text-main font-bold text-lg">
              U
            </div>
            <div>
              <p className="text-xs text-muted font-medium">Welcome,</p>
              <h2 className="text-sm font-bold">User882</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <button className="relative w-10 h-10 rounded-full bg-secondary border border-line flex items-center justify-center text-main hover:bg-line transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="layout pt-6 space-y-8">
        
        {/* UPDATED: Balance Card with Neat Blue Gradient */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[2rem] p-6 shadow-xl shadow-blue-500/20 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">Available Balance</p>
                <h1 className="text-4xl font-bold tracking-tight flex items-start gap-1">
                   <span className="text-2xl mt-1">₦</span>{balance.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </h1>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm transition-colors flex items-center gap-2 border border-white/10 shadow-lg">
                <Plus size={16} /> Fund
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-white/90 text-xs font-mono bg-black/10 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Wallet Active
            </div>
          </div>
        </motion.div>

        {/* Total Stats */}
        <div className="bg-card border border-line rounded-3xl p-5 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-main border border-line">
                 <Smartphone size={22} />
              </div>
              <div>
                 <p className="text-xs text-muted font-medium">Total Numbers</p>
                 <h3 className="text-2xl font-bold text-main leading-tight">{totalNumbers}</h3>
              </div>
           </div>
           
           <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-main hover:text-white transition-all text-sm font-bold text-main">
             View All
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* Active Order Section */}
        <AnimatePresence>
          {activeOrder && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {/* Also updated Active Order card to match the blue theme slightly */}
              <div className="bg-main text-background rounded-3xl p-6 shadow-2xl relative mb-8">
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-2xl bg-background/20 flex items-center justify-center">
                          <activeOrder.service.icon size={24} className="text-background" />
                       </div>
                       <div>
                          <p className="text-background/70 text-xs font-medium uppercase tracking-wider">Active Number</p>
                          <p className="font-bold text-lg">{activeOrder.service.name}</p>
                       </div>
                    </div>
                    <div className="bg-background/20 px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-2">
                       <Clock size={12} /> 14:32
                    </div>
                 </div>

                 <div className="bg-background/10 rounded-2xl p-4 flex items-center justify-between mb-4 border border-background/10">
                    <span className="text-2xl font-mono font-bold tracking-wider">{activeOrder.number}</span>
                    <button 
                      onClick={() => copyToClipboard(activeOrder.number)}
                      className="p-2 hover:bg-background/20 rounded-lg transition-colors"
                    >
                      <Copy size={18} />
                    </button>
                 </div>

                 <div className="flex items-center justify-center min-h-[60px] bg-background text-main rounded-2xl p-4">
                    {activeOrder.status === "waiting" ? (
                      <div className="flex items-center gap-3 animate-pulse">
                         <Loader2 size={20} className="animate-spin text-main" />
                         <span className="font-bold text-sm">Waiting for SMS...</span>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-center"
                      >
                         <p className="text-muted text-xs uppercase font-bold tracking-widest mb-1">Your Code</p>
                         <div className="flex items-center gap-4">
                            <span className="text-3xl font-mono font-bold">{activeOrder.smsCode}</span>
                            <button onClick={() => copyToClipboard(activeOrder.smsCode)}><Copy size={16} /></button>
                         </div>
                      </motion.div>
                    )}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Form */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">New Order</h3>
            <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
              Server Online
            </span>
          </div>

          <div className="bg-card border border-line rounded-3xl p-1 shadow-sm relative z-20">
            {/* Country Selector */}
            <div className="relative">
               <button 
                  onClick={() => { setIsCountryOpen(!isCountryOpen); setIsServiceOpen(false); }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors text-left"
               >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl border border-line">
                      {selectedCountry.flag}
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium mb-0.5">Select Country</p>
                      <p className="font-bold text-main">{selectedCountry.name}</p>
                    </div>
                 </div>
                 <ChevronDown size={20} className={`text-muted transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
               </button>

               <AnimatePresence>
                 {isCountryOpen && (
                   <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-line mx-4"
                   >
                     <div className="relative mt-3 mb-2">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
                        <input 
                           type="text" 
                           placeholder="Search country..." 
                           value={countrySearch}
                           onChange={(e) => setCountrySearch(e.target.value)}
                           className="w-full bg-secondary/50 rounded-lg py-3 pl-9 pr-3 text-xs border border-transparent focus:border-line transition-all placeholder:text-muted/70" 
                        />
                      </div>
                     <div className="py-2 space-y-1 max-h-[250px] overflow-y-auto custom-scrollbar">
                        {filteredCountries.map((country: Country) => (
                          <button
                            key={country.id}
                            onClick={() => { setSelectedCountry(country); setIsCountryOpen(false); }}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm transition-colors ${selectedCountry.id === country.id ? 'bg-secondary text-main font-bold' : 'text-muted hover:bg-secondary/30'}`}
                          >
                             <div className="flex items-center gap-3">
                                <span className="text-lg">{country.flag}</span>
                                <span>{country.name}</span>
                             </div>
                             {selectedCountry.id === country.id && <CheckCircle2 size={16} className="text-main" />}
                          </button>
                        ))}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <div className="h-[1px] bg-line mx-4 my-1" />

            {/* Service Selector */}
            <div className="relative">
               <button 
                  onClick={() => { setIsServiceOpen(!isServiceOpen); setIsCountryOpen(false); }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors text-left"
               >
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center border border-line">
                      <selectedService.icon size={20} className={selectedService.color} />
                    </div>
                    <div>
                      <p className="text-xs text-muted font-medium mb-0.5">Select Service</p>
                      <p className="font-bold text-main">{selectedService.name}</p>
                    </div>
                 </div>
                 <ChevronDown size={20} className={`text-muted transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} />
               </button>

               <AnimatePresence>
                 {isServiceOpen && (
                   <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-line mx-4"
                   >
                      <div className="relative mt-3 mb-2">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/>
                        <input 
                           type="text" 
                           placeholder="Search service..." 
                           value={serviceSearch}
                           onChange={(e) => setServiceSearch(e.target.value)}
                           className="w-full bg-secondary/50 rounded-lg py-3 pl-9 pr-3 text-xs border border-transparent focus:border-line transition-all placeholder:text-muted/70" 
                        />
                      </div>
                     <div className="py-2 space-y-1 max-h-[250px] overflow-y-auto custom-scrollbar">
                        {filteredServices.map((service: Service) => (
                          <button
                            key={service.id}
                            onClick={() => { setSelectedService(service); setIsServiceOpen(false); }}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-sm transition-colors ${selectedService.id === service.id ? 'bg-secondary text-main font-bold' : 'text-muted hover:bg-secondary/30'}`}
                          >
                             <div className="flex items-center gap-3">
                                <service.icon size={16} className={service.color} />
                                <span>{service.name}</span>
                             </div>
                             <span className="text-xs font-mono">₦{service.price}</span>
                          </button>
                        ))}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>

          <div className="bg-card border border-line rounded-3xl p-4 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-xs text-muted font-medium">Total Cost</p>
               <p className="text-2xl font-bold text-main">₦{selectedService.price.toFixed(2)}</p>
            </div>
            {/* Using btn-primary class which now uses your new Blue theme */}
            <ButtonWithLoader 
               loading={isLoading}
               initialText="Get Number"
               loadingText="Generating..."
               className="btn-primary px-8 py-3 rounded-xl font-bold hover:shadow-lg"
               onClick={handlePurchase}
            />
          </div>
        </div>

        {!activeOrder && (
          <div className="pb-4">
            <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
            
            <div className="border border-dashed border-line rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-secondary/10">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                 <History size={32} className="text-muted/50" />
              </div>
              <h4 className="font-bold text-main">No activities yet</h4>
              <p className="text-sm text-muted max-w-[200px] mt-1">
                Your purchased numbers and SMS codes will appear here.
              </p>
            </div>
          </div>
        )}

      </main>

      <BottomNav />
    </div>
  );
}
