import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

// Mock list of downlines
const mockDownlines = [
  { id: 1, name: 'Rahul (MD)', role: 'MASTER_DISTRIBUTOR', aeps: true, bbps: true, dmt: true, pg: false, payout: false, pos: true, soundBox: false },
  { id: 2, name: 'Priya (Dist)', role: 'DISTRIBUTOR', aeps: true, bbps: true, dmt: true, pg: false, payout: false, pos: true, soundBox: true },
  { id: 3, name: 'Amit (Retailer)', role: 'RETAILER', aeps: false, bbps: true, dmt: false, pg: false, payout: false, pos: false, soundBox: false },
  { id: 4, name: 'Vikram (Retailer)', role: 'RETAILER', aeps: true, bbps: true, dmt: true, pg: false, payout: false, pos: true, soundBox: true },
];

const ServiceMatrix = () => {
  const [downlines, setDownlines] = useState(mockDownlines);

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
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${currentValue ? 'bg-[#00D2CC]' : 'bg-gray-300'}`}
        >
          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${currentValue ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
      );
    } else {
      // If no permission, show static state or "Request"
      if (userRole === 'MASTER_DISTRIBUTOR' && (serviceName === 'pg' || serviceName === 'payout')) {
        return <span className="text-xs font-semibold text-orange-500 bg-orange-50 px-2 py-1 rounded">Request</span>;
      }
      return (
        <span className="flex items-center justify-center">
          {currentValue ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
        </span>
      );
    }
  };

  if (userRole === 'RETAILER') {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ShieldAlert className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-semibold">
                Access Denied. Retailers have no authority to manage service activations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="text-[#00D2CC]" /> Service Activation Matrix
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage service permissions for your downlines based on hierarchical rules.
          </p>
        </div>
        <div className="px-4 py-2 bg-[#ddf8f7] text-[#00D2CC] rounded-full font-bold text-sm tracking-wide border border-[#00D2CC] shadow-sm">
          ROLE: {userRole.replace('_', ' ')}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">AEPS</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">BBPS</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">DMT</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">PG</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Payout</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">POS</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Sound Box</th>
                <th className="px-4 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Remark</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {downlines.filter(m => roleLevel[m.role] < currentUserLevel).map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${member.role === 'MASTER_DISTRIBUTOR' ? 'bg-purple-100 text-purple-800' :
                        member.role === 'DISTRIBUTOR' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'}`}>
                      {member.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    {renderToggle(member.id, 'aeps', member.aeps, member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    {renderToggle(member.id, 'bbps', member.bbps, member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    {renderToggle(member.id, 'dmt', member.dmt, member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm bg-gray-50/50">
                    {renderToggle(member.id, 'pg', member.pg, member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm bg-gray-50/50">
                    {renderToggle(member.id, 'payout', member.payout, member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    {renderToggle(member.id, 'pos', member.pos, member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    {renderToggle(member.id, 'soundBox', member.soundBox, member.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                    <span className="text-gray-500 text-xs italic">
                      {member.role === 'MASTER_DISTRIBUTOR' ? 'Requires Approval' : 'Auto Approved'}
                    </span>
                  </td>
                </tr>
              ))}

              {downlines.filter(m => roleLevel[m.role] < currentUserLevel).length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    <AlertTriangle className="mx-auto h-8 w-8 text-yellow-400 mb-2" />
                    No downline members found below your hierarchy level.
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
