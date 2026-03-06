import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, AlertCircle } from 'lucide-react';

// Mock list of downlines
const mockDownlines = [
  { id: 1, name: 'Sanjay (SD)', role: 'SUPER_DISTRIBUTOR', aeps: true, bbps: true, dmt: true, recharge: true, loan: true, creditCard: true, ccBillPay: true, payout: true, matm: true, bankAccount: true, panApply: true, ppiWallet: true, travelBooking: true, travelPackage: true, insurance: true, pg: true, pos: true, soundBox: true },
  { id: 2, name: 'Rahul (MD)', role: 'MASTER_DISTRIBUTOR', aeps: true, bbps: true, dmt: true, recharge: true, loan: false, creditCard: true, ccBillPay: false, payout: false, matm: true, bankAccount: true, panApply: true, ppiWallet: false, travelBooking: true, travelPackage: true, insurance: true, pg: false, pos: true, soundBox: false },
  { id: 3, name: 'Priya (Dist)', role: 'DISTRIBUTOR', aeps: true, bbps: true, dmt: true, recharge: true, loan: false, creditCard: false, ccBillPay: false, payout: false, matm: true, bankAccount: false, panApply: true, ppiWallet: false, travelBooking: false, travelPackage: false, insurance: false, pg: false, pos: true, soundBox: true },
  { id: 4, name: 'Vikram (Retailer)', role: 'RETAILER', aeps: true, bbps: true, dmt: true, recharge: true, loan: false, creditCard: false, ccBillPay: false, payout: false, matm: true, bankAccount: false, panApply: true, ppiWallet: false, travelBooking: false, travelPackage: false, insurance: false, pg: false, pos: true, soundBox: true },
];

const servicesList = [
  { id: 'aeps', label: 'AEPS' },
  { id: 'bbps', label: 'BBPS' },
  { id: 'dmt', label: 'DMT' },
  { id: 'recharge', label: 'Recharge' },
  { id: 'loan', label: 'Loan' },
  { id: 'creditCard', label: 'Credit Card' },
  { id: 'ccBillPay', label: 'CC Bill Pay' },
  { id: 'payout', label: 'Payout' },
  { id: 'matm', label: 'MATM' },
  { id: 'bankAccount', label: 'Bank Account' },
  { id: 'panApply', label: 'PAN Apply' },
  { id: 'ppiWallet', label: 'PPI Wallet' },
  { id: 'travelBooking', label: 'Travel Booking' },
  { id: 'travelPackage', label: 'Travel Package' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'pg', label: 'Payment Gateway' },
  { id: 'pos', label: 'POS Machine' },
  { id: 'soundBox', label: 'Sound Box' }
];

const ServiceMatrix = () => {
  const [downlines, setDownlines] = useState(mockDownlines);

  const [remarks, setRemarks] = useState(
    servicesList.reduce((acc, curr) => ({
      ...acc,
      [curr.id]: curr.id === 'pg' || curr.id === 'payout' ? 'Admin Approval Required' : 'Auto Approved'
    }), {})
  );

  const handleRemarkChange = (serviceId, newRemark) => {
    setRemarks(prev => ({ ...prev, [serviceId]: newRemark }));
  };

  // Get logged-in user's role
  const userRole = localStorage.getItem('userRole') || 'RETAILER';

  // Define role hierarchy level (higher number = more power)
  const roleLevel = {
    'ADMIN': 5,
    'SUPER_DISTRIBUTOR': 4,
    'MASTER_DISTRIBUTOR': 3,
    'DISTRIBUTOR': 2,
    'RETAILER': 1
  };

  const currentUserLevel = roleLevel[userRole];

  // Helper to check if current user can toggle a specific service for a target role
  const canToggleService = (serviceName, targetRole) => {
    const targetLevel = roleLevel[targetRole];

    // Cannot manage someone at same or higher level
    if (currentUserLevel <= targetLevel) return false;

    // Based on user provided matrix:
    switch (userRole) {
      case 'ADMIN':
      case 'SUPER_DISTRIBUTOR':
        // Full control over downlines
        return true;

      case 'MASTER_DISTRIBUTOR':
        // MD controls Dist and Retailer. 
        // PG & Payout = "Request" (cannot toggle directly)
        if (serviceName === 'pg' || serviceName === 'payout') return false;
        return true;

      case 'DISTRIBUTOR':
        // Dist controls Retailer only (temporary)
        if (targetRole !== 'RETAILER') return false;
        if (serviceName === 'pg' || serviceName === 'payout') return false;
        return true;

      case 'RETAILER':
      default:
        // Retailer has no authority to toggle anything
        return false;
    }
  };

  // Helper to render the toggle or status text
  const renderToggle = (memberId, serviceName, currentValue, targetRole) => {
    const hasPermission = canToggleService(serviceName, targetRole);

    const toggleHandler = () => {
      if (!hasPermission) return;
      setDownlines(prev =>
        prev.map(user =>
          user.id === memberId ? { ...user, [serviceName]: !user[serviceName] } : user
        )
      );
    };

    if (hasPermission) {
      return (
        <button
          onClick={toggleHandler}
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus:outline-none ${currentValue ? 'bg-[#00D2CC]' : 'bg-slate-300'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${currentValue ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      );
    } else {
      // If no permission, show static state or "Request"
      if (userRole === 'MASTER_DISTRIBUTOR' && (serviceName === 'pg' || serviceName === 'payout')) {
        return <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded shadow-sm border border-amber-100">Request</span>;
      }
      return (
        <span className="flex items-center justify-center">
          {currentValue ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <XCircle className="w-5 h-5 text-red-400" />}
        </span>
      );
    }
  };

  if (userRole === 'RETAILER') {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <ShieldAlert className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-bold">
                Access Denied. Retailers have no authority to manage service activations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Only show roles below the current user
  const visibleDownlines = downlines.filter(m => roleLevel[m.role] < currentUserLevel);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Shield className="text-cyan-500 w-7 h-7" /> Service Activation Matrix
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Manage service permissions for your downlines based on hierarchical rules.
          </p>
        </div>
        <div className="flex flex-col items-end gap-3 text-right">
          <div className="px-5 py-2.5 bg-cyan-50 text-cyan-700 rounded-full font-bold text-sm tracking-wide border border-cyan-100 shadow-sm transition-colors cursor-default inline-block">
            ROLE: {userRole.replace('_', ' ')}
          </div>
        </div>
      </div>

      {/* Matrix Table (Pivoted) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-800 uppercase tracking-widest border-r border-slate-100 w-1/4">
                  Services
                </th>

                {visibleDownlines.map(member => (
                  <th key={member.id} className="px-4 py-5 text-center border-r border-slate-100 last:border-r-0 min-w-[150px]">
                    <span className={`px-3 py-1.5 inline-flex text-[11px] tracking-wider font-extrabold rounded-full shadow-sm border
                        ${member.role === 'SUPER_DISTRIBUTOR' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        member.role === 'MASTER_DISTRIBUTOR' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          member.role === 'DISTRIBUTOR' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                      {member.role.replace('_', ' ')}
                    </span>
                    <p className="mt-2 text-xs font-semibold text-slate-500">{member.name}</p>
                  </th>
                ))}

                {/* Added Remark Header */}
                {visibleDownlines.length > 0 && (
                  <th className="px-6 py-5 text-center text-xs font-extrabold text-slate-800 uppercase tracking-widest border-l border-slate-100 min-w-[150px]">
                    Remark
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {servicesList.map(service => (
                <tr key={service.id} className="hover:bg-slate-50/50 transition-colors group">

                  {/* Service Name (Row Header) */}
                  <td className="px-6 py-5 whitespace-nowrap text-left border-r border-slate-50 bg-slate-50/30 group-hover:bg-slate-50 transition-colors">
                    <span className="text-sm font-bold text-slate-800">{service.label}</span>
                  </td>

                  {/* Dynamic Role Columns for this Service */}
                  {visibleDownlines.map(member => (
                    <td key={`${member.id}-${service.id}`} className="px-4 py-5 whitespace-nowrap text-center align-middle border-r border-slate-50 last:border-r-0">
                      {renderToggle(member.id, service.id, member[service.id], member.role)}
                    </td>
                  ))}

                  {/* Remark Column for this Service */}
                  {visibleDownlines.length > 0 && (
                    <td className="px-4 py-5 whitespace-nowrap text-center align-middle border-l border-slate-50 bg-slate-50/40">
                      <input
                        type="text"
                        value={remarks[service.id]}
                        onChange={(e) => handleRemarkChange(service.id, e.target.value)}
                        className="text-slate-500 font-medium text-[11px] uppercase tracking-wider block mx-auto w-full max-w-[120px] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-cyan-500 focus:outline-none transition-colors px-1 py-0.5 text-center"
                        placeholder="Enter remark"
                        title="Click to edit remark"
                      />
                    </td>
                  )}

                </tr>
              ))}



              {visibleDownlines.length === 0 && (
                <tr>
                  <td colSpan={1 /* Services col */} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <AlertTriangle className="h-10 w-10 text-amber-400 mb-3" />
                      <p className="text-lg font-bold text-slate-700">No Downline Members Found</p>
                      <p className="text-sm font-medium mt-1">There are no users below your hierarchy level to manage.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ServiceMatrix;
