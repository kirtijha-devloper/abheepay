import React from 'react';
import { KeyRound, ShieldCheck, AlertCircle } from 'lucide-react';

const ChangePassword = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <KeyRound className="w-8 h-8 text-cyan-500" />
            Change Password
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Col - Password guidelines */}
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> Password Guidelines
            </h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
                Must be at least 8 characters long.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
                Should contain at least one uppercase letter (A-Z).
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
                Should contain at least one number (0-9).
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></div>
                Should contain at least one special character (!@#$%^&*).
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200 flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                You will be logged out of all other active sessions across your devices once you change your password.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col - Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="border-t border-slate-100 my-4"></div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-sm active:scale-[0.98]"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
