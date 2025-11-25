import { useState } from "react";
import { 
  ChevronDown,
  Search,
  CheckCircle2,
  Smartphone,
  Loader2,
  Copy,
  Clock,
  History,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Header from "@/layouts/Header"; // Import the Header component
import BottomNav from "@/layouts/BottomNav";
import { ButtonWithLoader, WalletCard } from "@/components/ui";

import { ALL_COUNTRIES, ALL_SERVICES } from "@/constants/data";
import type { Country, Service } from "@/constants/data";
import { useAuth } from "@/hooks/useAuth";

interface ActiveOrder {
  id: string;
  service: Service;
  country: Country;
  number: string;
  status: "waiting" | "received";
  smsCode: string | null;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [totalNumbers, setTotalNumbers] = useState(42);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(ALL_COUNTRIES[0]);
  const [selectedService, setSelectedService] = useState<Service>(ALL_SERVICES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);

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

    if (user.wallet < selectedService.price) {
      toast.error("Insufficient balance. Please fund your wallet.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setTotalNumbers(prev => prev + 1);

    const newOrder: ActiveOrder = {
      id: Math.random().toString(36).substr(2, 9),
      service: selectedService,
      country: selectedCountry,
      number: `${selectedCountry.code} ${Math.floor(Math.random() * 800) + 100} ${Math.floor(Math.random() * 900000) + 100000}`,
      status: "waiting",
      smsCode: null,
    };

    setActiveOrder(newOrder);
    setIsLoading(false);
    toast.success("Number generated successfully!");

    // Simulate SMS reception
    setTimeout(() => {
      setActiveOrder((prev) => {
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
      {/* Use the imported Header component */}
      <Header />

      <main className="main pt-6 space-y-8">
        {/* Wallet Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <WalletCard />
        </motion.div>

        {/* Stats Section */}
        <div className="bg-card border border-line rounded-3xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-card border border-line shadow-sm center">
              <Smartphone size={22} />
            </div>
            <div>
              <p className="text-xs text-muted font-medium">Total Numbers</p>
              <h3 className="text-2xl font-bold text-main leading-tight">{totalNumbers}</h3>
            </div>
          </div>
          <button className="bg-card border border-line px-4 py-2 rounded-full text-xs hover:border-primary transition-colors">
            History
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
              <div className="bg-card border border-line rounded-3xl p-6 relative mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-card border border-line shadow-sm center">
                      <activeOrder.service.icon size={24} className={activeOrder.service.color} />
                    </div>
                    <div>
                      <p className="text-muted text-xs font-medium uppercase tracking-wider">Active Number</p>
                      <p className="font-bold text-lg">{activeOrder.service.name}</p>
                    </div>
                  </div>
                  <div className="bg-card px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-2 border border-line">
                    <Clock size={12} /> 14:32
                  </div>
                </div>

                <div className="bg-card border border-line border-dashed rounded-2xl p-4 flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-bold tracking-wider">{activeOrder.number}</span>
                  <button 
                    onClick={() => copyToClipboard(activeOrder.number)}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Copy size={18} className="text-muted" />
                  </button>
                </div>

                <div className="center min-h-[60px]">
                  {activeOrder.status === "waiting" ? (
                    <div className="flex items-center gap-3 animate-pulse text-primary">
                      <Loader2 size={20} className="animate-spin" />
                      <span className="font-bold text-sm">Waiting for SMS...</span>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.8 }} 
                      animate={{ scale: 1 }} 
                      className="text-center"
                    >
                      <p className="text-muted text-xs uppercase font-bold tracking-widest mb-1">
                        Your Code
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl font-mono font-bold text-primary">
                          {activeOrder.smsCode}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(activeOrder.smsCode!)}
                          className="hover:opacity-70 transition-opacity"
                        >
                          <Copy size={16} />
                        </button>
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

          <div className="bg-secondary border border-line rounded-3xl p-1 relative z-20">
            {/* Country Selector */}
            <div className="relative">
              <button 
                onClick={() => { 
                  setIsCountryOpen(!isCountryOpen); 
                  setIsServiceOpen(false);
                  setCountrySearch("");
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-card border border-line center text-xl">
                    {selectedCountry.flag}
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium mb-0.5">Select Country</p>
                    <p className="font-bold text-main">{selectedCountry.name}</p>
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-muted transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} 
                />
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
                        className="w-full bg-background border border-line rounded-xl pl-9 pr-4 py-2 text-sm focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="py-2 space-y-1 max-h-[250px] overflow-y-auto custom-scrollbar">
                      {filteredCountries.map((country: Country) => (
                        <button
                          key={country.id}
                          onClick={() => { 
                            setSelectedCountry(country); 
                            setIsCountryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-sm transition-colors ${
                            selectedCountry.id === country.id 
                              ? 'bg-card text-main font-bold shadow-sm' 
                              : 'text-muted hover:bg-secondary'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{country.flag}</span>
                            <span>{country.name}</span>
                          </div>
                          {selectedCountry.id === country.id && (
                            <CheckCircle2 size={16} className="text-primary" />
                          )}
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
                onClick={() => { 
                  setIsServiceOpen(!isServiceOpen); 
                  setIsCountryOpen(false);
                  setServiceSearch("");
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-card border border-line center">
                    <selectedService.icon size={20} className={selectedService.color} />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium mb-0.5">Select Service</p>
                    <p className="font-bold text-main">{selectedService.name}</p>
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-muted transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} 
                />
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
                        className="w-full bg-background border border-line rounded-xl pl-9 pr-4 py-2 text-sm focus:border-primary transition-colors" 
                      />
                    </div>
                    <div className="py-2 space-y-1 max-h-[250px] overflow-y-auto custom-scrollbar">
                      {filteredServices.map((service: Service) => (
                        <button
                          key={service.id}
                          onClick={() => { 
                            setSelectedService(service); 
                            setIsServiceOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-sm transition-colors ${
                            selectedService.id === service.id 
                              ? 'bg-card text-main font-bold shadow-sm' 
                              : 'text-muted hover:bg-secondary'
                          }`}
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

          {/* Purchase Section */}
          <div className="bg-secondary border border-line rounded-3xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted font-medium">Total Cost</p>
              <p className="text-2xl font-bold text-main">₦{selectedService.price.toFixed(2)}</p>
            </div>
            <ButtonWithLoader 
              loading={isLoading}
              initialText="Get Number"
              loadingText="Generating..."
              className="btn-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20"
              onClick={handlePurchase}
            />
          </div>
        </div>

        {/* Recent Activity */}
        {!activeOrder && (
          <div className="pb-4">
            <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
            <div className="border border-dashed border-line rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-secondary/20">
              <div className="w-16 h-16 rounded-full bg-secondary center mb-4">
                <History size={32} className="text-muted/50" />
              </div>
              <h4 className="font-bold text-main">No activities yet</h4>
              <p className="text-sm text-muted max-w-[200px] mt-1">
                Your purchased numbers will appear here.
              </p>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
