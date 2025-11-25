import { useState } from "react";
import { 
  Bell, 
  Plus,
  ChevronDown,
  Search,
  CheckCircle2,
  Ghost,
  Smartphone,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/layouts/BottomNav";
import { ModeToggle, ButtonWithLoader } from "@/components/ui";

// Import your new comprehensive data
import { ALL_COUNTRIES, ALL_SERVICES } from "@/constants/data";

export default function Dashboard() {
  const [balance] = useState(12500.00);
  const [totalNumbers] = useState(42); 
  
  // Set default to first items in the big list
  const [selectedCountry, setSelectedCountry] = useState(ALL_COUNTRIES.find(c => c.id === "us") || ALL_COUNTRIES[0]);
  const [selectedService, setSelectedService] = useState(ALL_SERVICES.find(s => s.id === "wa") || ALL_SERVICES[0]);
  
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

  // Search States for the dropdowns
  const [countrySearch, setCountrySearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");

  // Filtering Logic
  const filteredCountries = ALL_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredServices = ALL_SERVICES.filter(s => 
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      {/* Top Header */}
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
        
        {/* Balance Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-main text-background rounded-[2rem] p-6 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-background/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-background/5 rounded-full blur-xl"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-background/70 text-sm font-medium mb-1">Available Balance</p>
                <h1 className="text-4xl font-bold tracking-tight flex items-start gap-1">
                   <span className="text-2xl mt-1">₦</span>{balance.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </h1>
              </div>
              <button className="bg-background/20 hover:bg-background/30 text-background px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-2">
                <Plus size={16} /> Fund
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-background/80 text-xs font-mono bg-background/10 w-fit px-3 py-1.5 rounded-lg backdrop-blur-md border border-background/10">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Wallet Active
            </div>
          </div>
        </motion.div>

        {/* Total Numbers Purchased Stats */}
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
           
           <button 
             onClick={() => {}} 
             className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-main hover:text-background transition-all text-sm font-bold"
           >
             View All
             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* Order Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">New Order</h3>
            <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
              Server Online
            </span>
          </div>

          <div className="bg-card border border-line rounded-3xl p-1 shadow-sm">
            
            {/* Country Selector */}
            <div className="relative z-20">
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

               {/* Country Dropdown Body */}
               <AnimatePresence>
                 {isCountryOpen && (
                   <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-line mx-4"
                   >
                     {/* Search Bar for Countries */}
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
                        {filteredCountries.map(country => (
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
                        {filteredCountries.length === 0 && (
                           <div className="text-center py-4 text-xs text-muted">No country found</div>
                        )}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <div className="h-[1px] bg-line mx-4 my-1" />

            {/* Service Selector */}
            <div className="relative z-10">
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

               {/* Service Dropdown Body */}
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
                        {filteredServices.map(service => (
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
                         {filteredServices.length === 0 && (
                           <div className="text-center py-4 text-xs text-muted">No service found</div>
                        )}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>

          {/* Checkout Action */}
          <div className="bg-card border border-line rounded-3xl p-4 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-xs text-muted font-medium">Total Cost</p>
               <p className="text-2xl font-bold text-main">₦{selectedService.price.toFixed(2)}</p>
            </div>
            <ButtonWithLoader 
               loading={false}
               initialText="Get Number"
               loadingText="Generating..."
               className="bg-main text-background px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
               onClick={() => {}}
            />
          </div>
        </div>

        {/* Recent Activity - Empty State */}
        <div className="pb-4">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          
          <div className="border border-dashed border-line rounded-3xl p-10 flex flex-col items-center justify-center text-center bg-secondary/10">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
               <Ghost size={32} className="text-muted/50" />
            </div>
            <h4 className="font-bold text-main">No activities yet</h4>
            <p className="text-sm text-muted max-w-[200px] mt-1">
              Your purchased numbers and SMS codes will appear here.
            </p>
          </div>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}
