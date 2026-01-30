
import React, { useState } from 'react';

const PremiumPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'MONTHLY' | 'YEARLY'>('MONTHLY');

  return (
    <div className="animate-in fade-in duration-700 bg-background-dark text-white min-h-screen">
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Page Heading */}
        <div className="flex flex-col gap-4 mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em] text-primary">
            Unleash the Power of Sound
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Elevate your storytelling experience. Ad-free audio series, offline downloads, and exclusive early access to the world's best creators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Pricing Tiers */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Free Plan */}
              <div 
                onClick={() => setSelectedPlan('FREE')}
                className={`flex flex-col gap-5 rounded-2xl border cursor-pointer p-6 transition-all hover:translate-y-[-4px] ${
                  selectedPlan === 'FREE' ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Basic</span>
                  <h3 className="text-xl font-black">Free</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black">$0</span>
                    <span className="text-xs font-medium text-slate-500">/mo</span>
                  </div>
                </div>
                <button className={`w-full rounded-xl h-10 text-xs font-black transition-all ${
                  selectedPlan === 'FREE' ? 'bg-primary text-white' : 'bg-white/10 text-slate-300'
                }`}>
                  {selectedPlan === 'FREE' ? 'Selected' : 'Select Free'}
                </button>
                <ul className="flex flex-col gap-3 mt-2">
                  <li className="text-[11px] font-bold flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Ad-supported
                  </li>
                  <li className="text-[11px] font-bold flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Standard audio
                  </li>
                  <li className="text-[11px] font-bold flex gap-3 items-center text-slate-600 line-through">
                    <span className="material-symbols-outlined text-slate-600 text-lg">cancel</span>
                    Offline mode
                  </li>
                </ul>
              </div>

              {/* Monthly Pro */}
              <div 
                onClick={() => setSelectedPlan('MONTHLY')}
                className={`flex flex-col gap-5 rounded-2xl border-2 cursor-pointer p-6 relative shadow-2xl transition-all hover:translate-y-[-4px] ${
                  selectedPlan === 'MONTHLY' ? 'border-primary bg-primary/10 shadow-primary/20' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Popular</div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Pro Experience</span>
                  <h3 className="text-xl font-black">Monthly Pro</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black">$9.99</span>
                    <span className="text-xs font-medium text-slate-500">/mo</span>
                  </div>
                </div>
                <button className={`w-full rounded-xl h-10 text-xs font-black transition-all ${
                  selectedPlan === 'MONTHLY' ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'bg-white/10 text-slate-300'
                }`}>
                  {selectedPlan === 'MONTHLY' ? 'Selected' : 'Select Pro'}
                </button>
                <ul className="flex flex-col gap-3 mt-2">
                  <li className="text-[11px] font-bold flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Ad-free listening
                  </li>
                  <li className="text-[11px] font-bold flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    High-fidelity audio
                  </li>
                  <li className="text-[11px] font-bold flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Offline downloads
                  </li>
                </ul>
              </div>

              {/* Yearly Elite */}
              <div 
                onClick={() => setSelectedPlan('YEARLY')}
                className={`flex flex-col gap-5 rounded-2xl border cursor-pointer p-6 transition-all hover:translate-y-[-4px] ${
                  selectedPlan === 'YEARLY' ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Ultimate</span>
                    <span className="bg-green-500/10 text-green-500 text-[9px] px-2 py-0.5 rounded font-black tracking-widest">Save 20%</span>
                  </div>
                  <h3 className="text-xl font-black">Yearly Elite</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-black">$99.99</span>
                    <span className="text-xs font-medium text-slate-500">/yr</span>
                  </div>
                </div>
                <button className={`w-full rounded-xl h-10 text-xs font-black transition-all ${
                  selectedPlan === 'YEARLY' ? 'bg-primary text-white' : 'bg-white/10 text-slate-300'
                }`}>
                  {selectedPlan === 'YEARLY' ? 'Selected' : 'Select Elite'}
                </button>
                <ul className="flex flex-col gap-3 mt-2">
                  <li className="text-[11px] font-bold flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Everything in Pro
                  </li>
                  <li className="text-[11px] font-bold flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    Early access
                  </li>
                  <li className="text-[11px] font-black text-primary flex gap-3 items-center">
                    <span className="material-symbols-outlined text-primary text-lg">stars</span>
                    2 Months FREE
                  </li>
                </ul>
              </div>
            </div>

            {/* Trust Section */}
            <div className="flex flex-wrap gap-8 items-center justify-center lg:justify-start pt-8 opacity-50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">verified_user</span>
                <span className="text-[10px] font-black uppercase tracking-widest">PCI-DSS Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">lock</span>
                <span className="text-[10px] font-black uppercase tracking-widest">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">history</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Cancel Anytime</span>
              </div>
            </div>
          </div>

          {/* Right Side: Secure Checkout */}
          <div className="lg:col-span-5">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sticky top-24 shadow-2xl backdrop-blur-xl">
              <h2 className="text-2xl font-black tracking-tight mb-6">Secure Checkout</h2>
              
              {/* Payment Tabs */}
              <div className="flex border-b border-white/10 mb-8">
                <button className="flex items-center gap-2 px-6 pb-4 border-b-2 border-primary text-primary">
                  <span className="material-symbols-outlined text-xl">credit_card</span>
                  <span className="text-xs font-black uppercase tracking-widest">Card</span>
                </button>
                <button className="flex items-center gap-2 px-6 pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-300">
                  <span className="material-symbols-outlined text-xl">qr_code</span>
                  <span className="text-xs font-black uppercase tracking-widest">UPI</span>
                </button>
              </div>

              {/* Payment Form */}
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cardholder Name</label>
                  <input 
                    className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-primary outline-none transition-all placeholder:text-slate-600 font-medium" 
                    placeholder="Enter full name" 
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Card Number</label>
                  <div className="relative">
                    <input 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pr-12 text-sm focus:border-primary outline-none transition-all placeholder:text-slate-600 font-medium" 
                      placeholder="0000 0000 0000 0000" 
                      type="text"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1.5 opacity-60">
                      <div className="w-7 h-4 bg-slate-700 rounded-sm"></div>
                      <div className="w-7 h-4 bg-slate-800 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Expiry Date</label>
                    <input 
                      className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-primary outline-none transition-all placeholder:text-slate-600 font-medium" 
                      placeholder="MM/YY" 
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">CVV</label>
                    <input 
                      className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm focus:border-primary outline-none transition-all placeholder:text-slate-600 font-medium" 
                      placeholder="***" 
                      type="password"
                    />
                  </div>
                </div>

                {/* Order Summary Section */}
                <div className="mt-4 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">
                      {selectedPlan === 'MONTHLY' ? 'Monthly Pro' : selectedPlan === 'YEARLY' ? 'Yearly Elite' : 'Basic'} Subscription
                    </span>
                    <span className="text-white">
                      {selectedPlan === 'MONTHLY' ? '$9.99' : selectedPlan === 'YEARLY' ? '$99.99' : '$0.00'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">Processing Fee</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-black mt-2 pt-2 border-t border-white/5">
                    <span>Total Amount</span>
                    <span className="text-primary">
                       {selectedPlan === 'MONTHLY' ? '$9.99' : selectedPlan === 'YEARLY' ? '$99.99' : '$0.00'}
                    </span>
                  </div>
                </div>

                <button 
                  className="mt-4 w-full h-14 bg-primary text-white font-black rounded-xl shadow-2xl shadow-primary/30 transition-all active:scale-[0.98] hover:scale-[1.02] flex items-center justify-center gap-3" 
                  type="submit"
                >
                  <span className="material-symbols-outlined text-xl">lock</span>
                  Pay Now Securely
                </button>
                <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                  By clicking Pay Now, you agree to our Terms of Service. Your subscription will automatically renew.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-16 px-6 mt-12 bg-black/50 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <span className="material-symbols-outlined text-white text-xl font-black">graphic_eq</span>
              </div>
              <span className="font-black text-xl tracking-tight">ShadowHub</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest">
              The premier destination for high-quality audio storytelling.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Platform</h4>
            <a className="text-xs text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-widest" href="#">Browse</a>
            <a className="text-xs text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-widest" href="#">Pricing</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Support</h4>
            <a className="text-xs text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-widest" href="#">Help</a>
            <a className="text-xs text-slate-400 hover:text-primary transition-colors font-bold uppercase tracking-widest" href="#">Privacy</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Connect</h4>
            <div className="flex gap-4">
               <span className="material-symbols-outlined text-2xl text-slate-500 hover:text-primary cursor-pointer transition-all">share</span>
               <span className="material-symbols-outlined text-2xl text-slate-500 hover:text-primary cursor-pointer transition-all">public</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">© 2024 ShadowHub.in. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PremiumPage;
