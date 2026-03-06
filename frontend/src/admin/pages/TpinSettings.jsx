import React, { useState } from 'react';
import { Lock, Fingerprint, ShieldAlert, Eye, EyeOff, RefreshCcw } from 'lucide-react';

const TpinSettings = () => {
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <Fingerprint className="w-8 h-8 text-cyan-500" />
            Transaction PIN (TPIN)
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage your secure 4-digit PIN required for all financial transactions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Col - Info & Status */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg shadow-cyan-500/20 relative overflow-hidden">

            <Lock className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10" />

            <h2 className="text-xl font-bold mb-2 relative z-10">Current TPIN Status</h2>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
              <span className="font-semibold text-cyan-50">Active & Secured</span>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center relative z-10">
              <div className="tracking-[1em] text-2xl font-bold ml-3">
                {showPin ? '8241' : '••••'}
              </div>
              <button
                onClick={() => setShowPin(!showPin)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                title={showPin ? "Hide PIN" : "Show PIN"}
              >
                {showPin ? <EyeOff className="w-5 h-5 text-cyan-100" /> : <Eye className="w-5 h-5 text-cyan-100" />}
              </button>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200/50">
            <div className="flex gap-3">
              <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0" />
              <div>
                <h3 className="text-amber-800 font-bold mb-1">Security Warning</h3>
                <p className="text-sm text-amber-700/80 font-medium leading-relaxed">
                  Never share your TPIN with anyone, including company officials. We will never call to ask for your TPIN.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Reset Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-cyan-500" />
            Reset TPIN
          </h3>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Current Login Password</label>
              <input
                type="password"
                placeholder="Enter your account password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">New 4-Digit TPIN</label>
              <input
                type="password"
                maxLength="4"
                placeholder="••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 tracking-widest text-center text-lg font-bold text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-left placeholder:text-slate-400 placeholder:text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600">Confirm New TPIN</label>
              <input
                type="password"
                maxLength="4"
                placeholder="••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 tracking-widest text-center text-lg font-bold text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:font-normal placeholder:tracking-normal placeholder:text-left placeholder:text-slate-400 placeholder:text-sm"
              />
            </div>

            <div className="pt-4">
              <button
                type="button"
                className="w-full py-3 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all shadow-sm shadow-cyan-500/20 active:scale-[0.98]"
              >
                Reset Transaction PIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TpinSettings;
