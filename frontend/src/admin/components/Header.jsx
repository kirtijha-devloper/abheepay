import React, { useState, useRef, useEffect } from 'react';
import { Search, LogOut, User, Bell, Wallet, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import storage from '../../utils/storage';
import { apiRequest } from '../../services/api';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wallets, setWallets] = useState({ main: null, eWallet: null });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userData = JSON.parse(storage.get('userData') || '{}');
  const userRole = storage.get('userRole') || 'User';

  useEffect(() => {
    // Initialize wallets from stored userData first (fast)
    setWallets({
      main: userData.walletBalance ?? 0,
      eWallet: userData.eWalletBalance ?? 0,
    });

    // Fetch fresh balance from server
    const fetchBalance = async () => {
      try {
        const userId = userData.id;
        if (!userId) return;

        const res = await apiRequest(`/users/${userId}/balance`);
        if (res.success) {
          setWallets({ main: res.walletBalance, eWallet: res.eWalletBalance });

          // Also update storage so it persists across reloads without delay
          const currentData = JSON.parse(storage.get('userData') || '{}');
          storage.set('userData', JSON.stringify({
            ...currentData,
            walletBalance: res.walletBalance,
            eWalletBalance: res.eWalletBalance
          }));
        }
      } catch (err) {
        console.error('Failed to auto-refresh balance:', err);
      }
    };

    fetchBalance(); // Fetch once on mount

    // Listen for global custom event whenever a transaction happens anywhere
    const handleBalanceUpdate = () => {
      fetchBalance();
    };

    window.addEventListener('balanceUpdated', handleBalanceUpdate);
    return () => window.removeEventListener('balanceUpdated', handleBalanceUpdate);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    storage.clear();
    navigate('/login');
  };

  const fmt = (n) => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-6 md:px-8 shrink-0 z-50 border-b border-slate-100">

      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-2xl">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" strokeWidth={2} />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 bg-slate-100/80 border-none rounded-full focus:ring-2 focus:ring-cyan-500/20 focus:bg-white focus:outline-none sm:text-sm text-slate-700 transition-all placeholder:text-slate-400 font-medium"
            placeholder="Search anything..."
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">

        {/* Wallet Balances */}
        <div className="hidden md:flex items-center gap-3">
          {/* Main Wallet */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200/60 rounded-xl px-3.5 py-2 min-w-[130px]">
            <div className="p-1.5 bg-indigo-500 rounded-lg">
              <Wallet className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider leading-none">Main Wallet</p>
              <p className="text-sm font-bold text-indigo-700 leading-tight mt-0.5">₹{fmt(wallets.main)}</p>
            </div>
          </div>

          {/* E-Wallet (AEPS) - Not for Admin */}
          {userRole !== 'ADMIN' && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl px-3.5 py-2 min-w-[130px]">
              <div className="p-1.5 bg-emerald-500 rounded-lg">
                <Smartphone className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider leading-none">E-Wallet (AEPS)</p>
                <p className="text-sm font-bold text-emerald-700 leading-tight mt-0.5">₹{fmt(wallets.eWallet)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200"></div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none rounded-full hover:bg-slate-100">
          <Bell className="w-5 h-5" strokeWidth={2} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none flex items-center gap-3"
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-slate-800">{userData.name || 'Admin User'}</p>
              <p className="text-xs font-medium text-slate-500">{userRole.replace(/_/g, ' ')}</p>
            </div>
            <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm flex-shrink-0 cursor-pointer">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'Admin User')}&background=00D3CD&color=fff`}
                alt="User profile"
                className="h-full w-full object-cover"
              />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-12 mt-2 w-64 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-200/50 z-20 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                <p className="text-sm font-semibold text-slate-900">{userData.name || 'Admin User'}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{userData.email || 'admin@abheepay.com'}</p>
              </div>

              {/* Wallet info inside dropdown too (mobile-friendly) */}
              <div className="px-4 py-3 border-b border-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-indigo-500" />
                    <span className="text-xs text-slate-500 font-medium">Main Wallet</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-700">₹{fmt(wallets.main)}</span>
                </div>
                {userRole !== 'ADMIN' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs text-slate-500 font-medium">E-Wallet (AEPS)</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">₹{fmt(wallets.eWallet)}</span>
                  </div>
                )}
              </div>

              <div className="p-1.5">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md flex items-center transition-colors"
                >
                  <User className="w-4 h-4 mr-2.5 text-slate-400" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md flex items-center transition-colors mt-1"
                >
                  <LogOut className="w-4 h-4 mr-2.5 text-red-500" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
