import { useState } from "react";
import { 
  ChevronDown,
  Search,
  CheckCircle2,
  Copy,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Header from "@/layouts/Header";
import BottomNav from "@/layouts/BottomNav";
import { ButtonWithLoader } from "@/components/ui";
import { ALL_COUNTRIES, ALL_SERVICES } from "@/constants/data";
import type { Country, Service } from "@/constants/data";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface GeneratedNumber {
  id: string;
  number: string;
  service: Service;
  country: Country;
}

export default function Order() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(ALL_COUNTRIES[0]);
  const [selectedService, setSelectedService] = useState<Service>(ALL_SERVICES[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [generatedNumber, setGeneratedNumber] = useState<GeneratedNumber | null>(null);

  const filteredCountries = ALL_COUNTRIES.filter((c: Country) => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  
  const filteredServices = ALL_SERVICES.filter((s: Service) => 
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handlePurchase = async () => {
    if (user.wallet < selectedService.price) {
      toast.error("Insufficient balance. Please fund your wallet.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate a random phone number
    const newNumber: GeneratedNumber = {
      id: Math.random().toString(36).substr(2, 9),
      number: `${selectedCountry.code} ${Math.floor(Math.random() * 800) + 100} ${Math.floor(Math.random() * 900000) + 100000}`,
      service: selectedService,
      country: selectedCountry,
    };

    setGeneratedNumber(newNumber);
    setIsLoading(false);
    toast.success("Number generated successfully!");
  };

  const handleUseNumber = () => {
    // Navigate back to dashboard with the new number
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-main font-sans pb-20">
      <Header />

      <main className="main pt-16 space-y-6">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-main mb-2">Get a New Number</h1>
          <p className="text-sm text-muted">
            Select a country and service to get a virtual number
          </p>
        </div>

        {/* Generated Number Display */}
        <AnimatePresence>
          {generatedNumber && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-line rounded-2xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="font-bold text-lg text-main mb-2">Number Generated!</h3>
                <p className="text-sm text-muted mb-4">
                  Your {generatedNumber.service.name} number for {generatedNumber.country.name}
                </p>
                
                <div className="bg-secondary border border-line border-dashed rounded-xl p-4 flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-bold tracking-wider">
                    {generatedNumber.number}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(generatedNumber.number)}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Copy size={20} className="text-muted" />
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setGeneratedNumber(null)}
                    className="flex-1 bg-secondary border border-line px-4 py-3 rounded-lg font-medium hover:bg-line transition-colors"
                  >
                    Get Another
                  </button>
                  <button
                    onClick={handleUseNumber}
                    className="flex-1 btn-primary px-4 py-3 rounded-lg font-bold shadow-lg shadow-primary/20"
                  >
                    Use Number
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order Form - Only show if no number generated */}
        <AnimatePresence>
          {!generatedNumber && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Order Details</h3>
                <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                  Server Online
                </span>
              </div>

              <div className="bg-secondary border border-line rounded-2xl p-1 relative z-20">
                {/* Country Selector */}
                <div className="relative">
                  <button 
                    onClick={() => { 
                      setIsCountryOpen(!isCountryOpen); 
                      setIsServiceOpen(false);
                      setCountrySearch("");
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-card border border-line center text-lg">
                        {selectedCountry.flag}
                      </div>
                      <div>
                        <p className="text-xs text-muted font-medium mb-0.5">Select Country</p>
                        <p className="font-bold text-sm">{selectedCountry.name}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`text-muted transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {isCountryOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-line mx-3"
                      >
                        <div className="relative mt-2 mb-1">
                          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted"/>
                          <input 
                            type="text" 
                            placeholder="Search country..." 
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full bg-background border border-line rounded-lg pl-8 pr-3 py-1.5 text-sm focus:border-primary transition-colors" 
                          />
                        </div>
                        <div className="py-1 space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                          {filteredCountries.map((country: Country) => (
                            <button
                              key={country.id}
                              onClick={() => { 
                                setSelectedCountry(country); 
                                setIsCountryOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                                selectedCountry.id === country.id 
                                  ? 'bg-card text-main font-bold shadow-sm' 
                                  : 'text-muted hover:bg-secondary'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-base">{country.flag}</span>
                                <span className="text-xs">{country.name}</span>
                              </div>
                              {selectedCountry.id === country.id && (
                                <CheckCircle2 size={14} className="text-primary" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-[1px] bg-line mx-3 my-1" />

                {/* Service Selector */}
                <div className="relative">
                  <button 
                    onClick={() => { 
                      setIsServiceOpen(!isServiceOpen); 
                      setIsCountryOpen(false);
                      setServiceSearch("");
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-card border border-line center">
                        <selectedService.icon size={16} className={selectedService.color} />
                      </div>
                      <div>
                        <p className="text-xs text-muted font-medium mb-0.5">Select Service</p>
                        <p className="font-bold text-sm">{selectedService.name}</p>
                      </div>
                    </div>
                    <ChevronDown 
                      size={16} 
                      className={`text-muted transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {isServiceOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-line mx-3"
                      >
                        <div className="relative mt-2 mb-1">
                          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted"/>
                          <input 
                            type="text" 
                            placeholder="Search service..." 
                            value={serviceSearch}
                            onChange={(e) => setServiceSearch(e.target.value)}
                            className="w-full bg-background border border-line rounded-lg pl-8 pr-3 py-1.5 text-sm focus:border-primary transition-colors" 
                          />
                        </div>
                        <div className="py-1 space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar">
                          {filteredServices.map((service: Service) => (
                            <button
                              key={service.id}
                              onClick={() => { 
                                setSelectedService(service); 
                                setIsServiceOpen(false);
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                                selectedService.id === service.id 
                                  ? 'bg-card text-main font-bold shadow-sm' 
                                  : 'text-muted hover:bg-secondary'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <service.icon size={14} className={service.color} />
                                <span className="text-xs">{service.name}</span>
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
              <div className="bg-secondary border border-line rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted font-medium">Total Cost</p>
                  <p className="text-xl font-bold text-main">₦{selectedService.price.toFixed(2)}</p>
                </div>
                <ButtonWithLoader 
                  loading={isLoading}
                  initialText="Get Number"
                  loadingText="Generating..."
                  className="btn-primary px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 text-sm"
                  onClick={handlePurchase}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        {!generatedNumber && (
          <div className="bg-card border border-line rounded-2xl p-4">
            <h4 className="font-bold text-main mb-2">How it works</h4>
            <ul className="text-sm text-muted space-y-1">
              <li>• Select your preferred country and service</li>
              <li>• Get a virtual number for verification</li>
              <li>• Receive SMS messages in real-time</li>
              <li>• Numbers are automatically recycled after use</li>
            </ul>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}