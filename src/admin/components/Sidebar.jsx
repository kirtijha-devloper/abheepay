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
  PieChart
} from 'lucide-react';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    user: false,
    api: false,
    reports: false,
    settings: false,
  });

  // Get user role from local storage (default to RETAILER if not logged in for previews)
  const userRole = localStorage.getItem('userRole') || 'RETAILER';

  // Role permissions mapping
  // Admin: Can see everything
  // SD/MD/DIST: Can see User mgt (Add Member, All Members, KYC)
  // Retailer: Usage only, CANNOT see User mgt
  const canManageUsers = ['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR'].includes(userRole);
  const isAdmin = userRole === 'ADMIN';

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-full shrink-0 shadow-sm z-10">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* Mock Logo */}
          <div className="text-3xl font-bold text-cyan-400 italic">a<span className="text-gray-800 text-xl font-semibold not-italic">bheePay</span></div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">

          <NavLink to="/admin" end className={({ isActive }) => `flex items-center px-3 py-2.5 font-semibold rounded-md ${isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>

          {/* User Menu - Only for DISTRIBUTOR and above */}
          {canManageUsers && (
            <div>
              <button
                onClick={() => toggleMenu('user')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-3" />
                  <span className="font-semibold">User Mgt</span>
                </div>
                {openMenus.user ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {openMenus.user && (
                <div className="pl-11 pr-3 py-1 space-y-1">
                  <NavLink to="/admin/add-member" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• Add Member</NavLink>
                  <NavLink to="/admin/all-members" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• All Members</NavLink>
                  <NavLink to="/admin/kyc-requested" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• KYC Requested</NavLink>
                </div>
              )}
            </div>
          )}

          <NavLink to="/admin/fund-requests" className={({ isActive }) => `flex items-center px-3 py-2.5 font-medium rounded-md ${isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
            <CreditCard className="w-5 h-5 mr-3" />
            <span className="font-semibold">Fund Requests</span>
          </NavLink>

          {/* Commission Plans - Usually Admin/SD/MD level */}
          {userRole !== 'RETAILER' && (
            <NavLink to="/admin/commission-plans" className={({ isActive }) => `flex items-center px-3 py-2.5 font-medium rounded-md ${isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}>
              <PieChart className="w-5 h-5 mr-3" />
              <span className="font-semibold">Commission Plans</span>
            </NavLink>
          )}

          {/* Reports Menu */}
          <div>
            <button
              onClick={() => toggleMenu('reports')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-3" />
                <span className="font-semibold">Reports</span>
              </div>
              {openMenus.reports ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {openMenus.reports && (
              <div className="pl-11 pr-3 py-1 space-y-1">
                <NavLink to="/admin/ledger" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• Ledger</NavLink>
                <NavLink to="/admin/fund-transfer" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• Fund History</NavLink>
                <NavLink to="/admin/pg-add-fund" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• PG Fund History</NavLink>
                <NavLink to="/admin/payout-history" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• PayOut History</NavLink>
                <NavLink to="/admin/aeps-statement" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• AEPS Statement</NavLink>
                <NavLink to="/admin/dmt-report" className={({ isActive }) => `block px-3 py-2 text-sm font-medium rounded-md ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`}>• DMT Report</NavLink>
              </div>
            )}
          </div>

          {/* Settings Menu - Admin Only */}
          {isAdmin && (
            <div>
              <button
                onClick={() => toggleMenu('settings')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 font-medium rounded-md hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-3" />
                  <span className="font-semibold">Settings</span>
                </div>
                {openMenus.settings ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
