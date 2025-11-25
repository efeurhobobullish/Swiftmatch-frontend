import { MessageCircle, Mail, ChevronDown } from "lucide-react";
import BottomNav from "@/layouts/BottomNav";

const FAQS = [
  { q: "How long do the numbers last?", a: "Most numbers are valid for 15-20 minutes for verification purposes." },
  { q: "What if I don't receive the SMS?", a: "If no SMS is received within the timeframe, the order is cancelled and your money is automatically refunded." },
  { q: "Can I reuse a number?", a: "No, for security reasons, all numbers are temporary and disposable one-time use." },
];

export default function Support() {
  return (
    <div className="min-h-screen bg-background text-main font-sans pb-32">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-line px-6 py-4">
        <h1 className="text-lg font-bold">Support</h1>
      </header>

      <main className="layout pt-6 space-y-8">
        
        {/* Contact Cards */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-3xl flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-bold text-main">Live Chat</h3>
              <p className="text-xs text-muted">Available 9am - 5pm</p>
           </div>
           <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-3xl flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-main">Email Us</h3>
              <p className="text-xs text-muted">Get answer in 24h</p>
           </div>
        </div>

        {/* FAQs */}
        <div>
           <h3 className="font-bold text-lg mb-4">Frequently Asked Questions</h3>
           <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-card border border-line rounded-2xl p-5">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-sm pr-4">{faq.q}</h4>
                     <ChevronDown size={16} className="text-muted" />
                   </div>
                   <p className="text-xs text-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>

      </main>
      <BottomNav />
    </div>
  );
}
