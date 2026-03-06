import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  User,
  Settings,
  FileText,
  ChevronRight,
  ChevronDown,
  CreditCard,
  Briefcase,
  PieChart,
  Shield,
  LayoutGrid
} from 'lucide-react';

import storage from '../../utils/storage';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    user: false,
    services: false,
    api: false,
    reports: false,
    settings: false,
  });

  const userRole = storage.get('userRole') || 'RETAILER';
  const canManageUsers = ['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR'].includes(userRole);
  const isAdmin = userRole === 'ADMIN';

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center px-4 py-3 font-medium rounded-xl transition-all duration-200 ${isActive
      ? 'bg-cyan-500/10 text-cyan-400'
      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
    }`;

  const subNavItemClass = ({ isActive }) =>
    `block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
      ? 'text-cyan-400 bg-slate-800/50'
      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'
    }`;

  return (
    <aside className="w-64 bg-slate-900 hidden md:flex flex-col h-full shrink-0 z-10">
      {/* Logo */}
      <div className="h-36 flex items-center justify-center border-b border-slate-800/50 py-4 px-4 mt-2">
        <img
          src="https://pos.abheepay.com/assets/FORMAT-PNG-Lj3U1uY2.png"
          alt="AbheePay Logo"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-4 space-y-1.5">

          <NavLink to="/admin" end className={navItemClass}>
            <Home className="w-5 h-5 mr-3" strokeWidth={1.5} />
            Dashboard
          </NavLink>

          {canManageUsers && (
            <div>
              <button
                onClick={() => toggleMenu('user')}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-400 font-medium rounded-xl hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
              >
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3" strokeWidth={1.5} />
                  <span>User Mgt</span>
                </div>
                {openMenus.user ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {openMenus.user && (
                <div className="pl-11 pr-2 py-2 space-y-1 mb-2">
                  <NavLink to="/admin/add-member" className={subNavItemClass}>Add Member</NavLink>
                  <NavLink to="/admin/all-members" className={subNavItemClass}>All Members</NavLink>
                  <NavLink to="/admin/kyc-requested" className={subNavItemClass}>KYC Requested</NavLink>
                </div>
              )}
            </div>
          )}

          {canManageUsers && (
            <NavLink to="/admin/service-matrix" className={navItemClass}>
              <Shield className="w-5 h-5 mr-3" strokeWidth={1.5} />
              <span>Service Activation</span>
            </NavLink>
          )}

          <NavLink to="/admin/fund-requests" className={navItemClass}>
            <CreditCard className="w-5 h-5 mr-3" strokeWidth={1.5} />
            <span>Fund Requests</span>
          </NavLink>

          {userRole !== 'RETAILER' && (
            <NavLink to="/admin/commission-plans" className={navItemClass}>
              <PieChart className="w-5 h-5 mr-3" strokeWidth={1.5} />
              <span>Commission Plans</span>
            </NavLink>
          )}

          {userRole === 'RETAILER' && (
            <div>
              <button
                onClick={() => toggleMenu('services')}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-400 font-medium rounded-xl hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
              >
                <div className="flex items-center">
                  <LayoutGrid className="w-5 h-5 mr-3" strokeWidth={1.5} />
                  <span>Services</span>
                </div>
                {openMenus.services ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {openMenus.services && (
                <div className="pl-11 pr-2 py-2 space-y-1 mb-2">
                  <NavLink to="/admin/services/aeps" className={subNavItemClass}>AEPS</NavLink>
                  <NavLink to="/admin/services/bbps" className={subNavItemClass}>BBPS</NavLink>
                  <NavLink to="/admin/services/dmt" className={subNavItemClass}>DMT</NavLink>
                  <NavLink to="/admin/services/recharge" className={subNavItemClass}>Recharge</NavLink>
                  <NavLink to="/admin/services/loan" className={subNavItemClass}>Loan</NavLink>
                  <NavLink to="/admin/services/credit-card" className={subNavItemClass}>Credit Card</NavLink>
                  <NavLink to="/admin/services/cc-bill-pay" className={subNavItemClass}>CC Bill Pay</NavLink>
                  <NavLink to="/admin/services/payout" className={subNavItemClass}>Payout</NavLink>
                  <NavLink to="/admin/services/matm" className={subNavItemClass}>MATM</NavLink>
                  <NavLink to="/admin/services/bank-account" className={subNavItemClass}>Bank Account</NavLink>
                  <NavLink to="/admin/services/pan-apply" className={subNavItemClass}>PAN Apply</NavLink>
                  <NavLink to="/admin/services/ppi-wallet" className={subNavItemClass}>PPI Wallet</NavLink>
                  <NavLink to="/admin/services/travel-booking" className={subNavItemClass}>Travel Booking</NavLink>
                  <NavLink to="/admin/services/insurance" className={subNavItemClass}>Insurance</NavLink>
                </div>
              )}
            </div>
          )}

          <div>
            <button
              onClick={() => toggleMenu('reports')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-400 font-medium rounded-xl hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3" strokeWidth={1.5} />
                <span>Reports</span>
              </div>
              {openMenus.reports ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.reports && (
              <div className="pl-11 pr-2 py-2 space-y-1 mb-2">
                <NavLink to="/admin/ledger" className={subNavItemClass}>Ledger Statement</NavLink>
                <NavLink to="/admin/pg-add-fund" className={subNavItemClass}>PG Add Fund</NavLink>
                <NavLink to="/admin/payout-history" className={subNavItemClass}>PayOut History</NavLink>
                <NavLink to="/admin/aeps-statement" className={subNavItemClass}>AEPS Statement</NavLink>
                <NavLink to="/admin/dmt-report" className={subNavItemClass}>DMT Report</NavLink>
                <NavLink to="/admin/bbps-history" className={subNavItemClass}>BBPS History</NavLink>
                <NavLink to="/admin/fund-requests-history" className={subNavItemClass}>Fund Requests History</NavLink>
                <NavLink to="/admin/pan-card-history" className={subNavItemClass}>Pan Card History</NavLink>
                <NavLink to="/admin/credit-card-apply-request" className={subNavItemClass}>Credit Card Request</NavLink>
              </div>
            )}
          </div>



          <div className="pt-2 pb-2">
            <button
              onClick={() => toggleMenu('settings')}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-400 font-medium rounded-xl hover:bg-slate-800/50 hover:text-slate-200 transition-all duration-200"
            >
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-3" strokeWidth={1.5} />
                <span>Setting</span>
              </div>
              {openMenus.settings ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.settings && (
              <div className="pl-11 pr-2 py-2 space-y-1 mb-2">
                <NavLink to="/admin/settings/commission-plan" className={subNavItemClass}>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-400"></div> Commission Plan</div>
                </NavLink>
                <NavLink to="/admin/settings/profile" className={subNavItemClass}>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-400"></div> Profile</div>
                </NavLink>
                <NavLink to="/admin/settings/tpin" className={subNavItemClass}>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-400"></div> TPIN</div>
                </NavLink>
                <NavLink to="/admin/settings/change-password" className={subNavItemClass}>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-400"></div> Change Password</div>
                </NavLink>
                <NavLink to="/admin/settings/certificate" className={subNavItemClass}>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-slate-400"></div> Certificate Download</div>
                </NavLink>
                <NavLink to="/admin/settings/device-driver" className={subNavItemClass}>
                  <div className="flex flex-col">
                    <div className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-slate-400 mt-2"></div>
                      <span>Download Device<br />Driver</span>
                    </div>
                  </div>
                </NavLink>
              </div>
            )}
          </div>

          <div className="pb-6">
            <NavLink
              to="/admin/support"
              className={navItemClass}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                <span>Support Ticket</span>
              </div>
            </NavLink>
          </div>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
