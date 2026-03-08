import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';
import {
  Users,
  UserPlus,
  Search,
  X,
  Edit,
  List,
  Trash2,
  CheckCircle2,
  XCircle,
  Phone,
  ShieldUser,
  Settings2,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALL_SERVICES = [
  { id: 'aeps', label: 'AEPS', desc: 'Cash Withdrawal / Balance' },
  { id: 'bbps', label: 'BBPS', desc: 'Bill Payments' },
  { id: 'dmt', label: 'DMT', desc: 'Money Transfer' },
  { id: 'recharge', label: 'Recharge', desc: 'Mobile / DTH' },
  { id: 'loan', label: 'Loan', desc: 'Personal & Business Loans' },
  { id: 'credit-card', label: 'Credit Card', desc: 'Apply for Credit Cards' },
  { id: 'cc-bill-pay', label: 'CC Bill Pay', desc: 'Credit Card Bill Payment' },
  { id: 'payout', label: 'Payout', desc: 'Wallet to Bank' },
  { id: 'matm', label: 'MATM', desc: 'Micro ATM Services' },
  { id: 'bank-account', label: 'Bank Account', desc: 'Account Opening' },
  { id: 'pan-apply', label: 'PAN Apply', desc: 'PAN Card Services' },
  { id: 'ppi-wallet', label: 'PPI Wallet', desc: 'Prepaid Wallet' },
  { id: 'travel-booking', label: 'Travel', desc: 'Flights, Hotels, Buses' },
  { id: 'insurance', label: 'Insurance', desc: 'Life, Health, General' },
];

const AllMembers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, roles: {} });
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Service Activation Modal
  const [serviceModal, setServiceModal] = useState(null);
  const [serviceToggles, setServiceToggles] = useState({});
  const [savingServices, setSavingServices] = useState(false);
  const [serviceMsg, setServiceMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          apiRequest('/users/list'),
          apiRequest('/users/stats')
        ]);
        setUsers(usersRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImpersonate = async (userId) => {
    if (!window.confirm("Are you sure you want to login as this user?")) return;

    try {
      const response = await apiRequest(`/auth/impersonate/${userId}`, 'POST');

      // Open in a new tab/window
      const impersonateUrl = `/admin/impersonate-session?token=${response.token}&user=${encodeURIComponent(JSON.stringify(response.user))}`;
      window.open(impersonateUrl, '_blank');
    } catch (error) {
      alert("Impersonation failed: " + error.message);
    }
  };

  const openServiceModal = async (user) => {
    setServiceMsg('');
    setServiceModal(user);
    try {
      const res = await apiRequest(`/users/${user.id}/service-access`);
      const saved = res.data?.serviceAccess || {};
      const toggles = {};
      ALL_SERVICES.forEach(s => {
        toggles[s.id] = saved[s.id] !== undefined ? saved[s.id] : true;
      });
      setServiceToggles(toggles);
    } catch {
      const toggles = {};
      ALL_SERVICES.forEach(s => { toggles[s.id] = true; });
      setServiceToggles(toggles);
    }
  };

  const saveServiceAccess = async () => {
    setSavingServices(true);
    setServiceMsg('');
    try {
      await apiRequest(`/users/${serviceModal.id}/service-access`, 'PUT', { serviceAccess: serviceToggles });
      setServiceMsg('saved');
      setTimeout(() => setServiceModal(null), 1000);
    } catch {
      setServiceMsg('error');
    } finally {
      setSavingServices(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery);

    const matchesRole = selectedRole === "All Roles" ||
      user.role === selectedRole.toUpperCase().replace(' ', '_');

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="space-y-6 max-w-7xl mx-auto">

        {/* Top Banner */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center text-white shadow-sm">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-cyan-50 mt-1">Manage all registered users, distributors & retailers</p>
            </div>
          </div>
          <Link to="/admin/add-member" className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-md font-medium flex items-center border border-white/30">
            <UserPlus className="w-4 h-4 mr-2" />
            Add New User
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

          {/* Total Users */}
          <div
            onClick={() => setSelectedRole("All Roles")}
            className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-cyan-200 ${selectedRole === "All Roles" ? "ring-2 ring-cyan-500 bg-cyan-50/10" : "border-gray-100"}`}>
            <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center mb-2 text-cyan-500">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Network</p>
            <h3 className="text-xl font-bold text-gray-800">{stats.totalUsers}</h3>
          </div>

          {/* Super Distributors */}
          <div
            onClick={() => setSelectedRole("Super Distributor")}
            className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-teal-200 ${selectedRole === "Super Distributor" ? "ring-2 ring-teal-500 bg-teal-50/10" : "border-gray-100"}`}>
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center mb-2 text-teal-500">
              <ShieldUser className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Super Dist.</p>
            <h3 className="text-xl font-bold text-gray-800">{stats.roles.SUPER_DISTRIBUTOR || 0}</h3>
          </div>

          {/* Master Distributors */}
          <div
            onClick={() => setSelectedRole("Master Distributor")}
            className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-sky-200 ${selectedRole === "Master Distributor" ? "ring-2 ring-sky-500 bg-sky-50/10" : "border-gray-100"}`}>
            <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center mb-2 text-sky-500">
              <UserPlus className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Master Dist.</p>
            <h3 className="text-xl font-bold text-gray-800">{stats.roles.MASTER_DISTRIBUTOR || 0}</h3>
          </div>

          {/* Distributors */}
          <div
            onClick={() => setSelectedRole("Distributor")}
            className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-blue-200 ${selectedRole === "Distributor" ? "ring-2 ring-blue-500 bg-blue-50/10" : "border-gray-100"}`}>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2 text-blue-500">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Distributors</p>
            <h3 className="text-xl font-bold text-gray-800">{stats.roles.DISTRIBUTOR || 0}</h3>
          </div>

          {/* Retailers */}
          <div
            onClick={() => setSelectedRole("Retailer")}
            className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-green-200 ${selectedRole === "Retailer" ? "ring-2 ring-green-500 bg-green-50/10" : "border-gray-100"}`}>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-2 text-green-500">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Retailers</p>
            <h3 className="text-xl font-bold text-gray-800">{stats.roles.RETAILER || 0}</h3>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Search</label>
            <input
              type="text"
              placeholder="Name, phone, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Role Select */}
          <div className="w-full lg:w-48">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Filter by Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-600 bg-white"
            >
              <option value="All Roles">All Roles</option>
              <option value="Super Distributor">Super Distributor</option>
              <option value="Master Distributor">Master Distributor</option>
              <option value="Distributor">Distributor</option>
              <option value="Retailer">Retailer</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2 shrink-0">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRole("All Roles");
              }}
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-md font-medium flex items-center text-sm transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">

          {/* Table Header Area */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <List className="w-5 h-5 mr-2 text-gray-500" />
              {selectedRole === "All Roles" ? "All Users" : `${selectedRole}s`}
            </h2>
            <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-md">{filteredUsers.length} USERS</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-black uppercase bg-white border-b-2 border-black font-bold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">USER & UPLINE DETAILS</th>
                  <th className="px-6 py-4 text-center">ROLE</th>
                  <th className="px-6 py-4 text-center">BALANCE</th>
                  <th className="px-6 py-4 text-center">KYC STATUS</th>
                  <th className="px-6 py-4">JOINED</th>
                  <th className="px-6 py-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">

                    {/* ID */}
                    <td className="px-6 py-5 text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                      {user.id}
                    </td>

                    {/* User Details */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{user.name}</div>
                          <div className="flex items-center text-gray-500 text-[10px] mb-0.5">
                            <UserPlus className="w-3 h-3 mr-1" />
                            {user.email} | <Phone className="w-2.5 h-2.5 mx-1" /> {user.mobile}
                          </div>
                        </div>

                        {/* Upline Section */}
                        {user.parent && (
                          <div className="mt-1 pt-1 border-t border-dashed border-gray-200">
                            <div className="text-[10px] font-bold text-gray-400 uppercase">Upline</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-xs font-medium text-indigo-600">{user.parent.name}</span>
                              <span className="bg-indigo-50 text-indigo-500 text-[8px] px-1.5 py-0.5 rounded border border-indigo-100 font-bold uppercase">
                                {user.parent.role.replace(/_/g, ' ')}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-5 text-center">
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded-sm border border-indigo-100 uppercase">
                        {user.role.replace(/_/g, ' ')}
                      </span>
                    </td>

                    {/* Balance */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-800 text-sm">₹{user.walletBalance?.toLocaleString() || '0'}</span>
                        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 rounded px-1.5 py-0.5 border border-emerald-100">
                          E: ₹{user.eWalletBalance?.toLocaleString() || '0'}
                        </span>
                      </div>
                    </td>

                    {/* KYC Status */}
                    <td className="px-6 py-5 text-center">
                      <div className={`inline-flex items-center justify-center ${user.kycStatus === 'APPROVED' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'} text-[10px] font-bold px-2 py-0.5 rounded-sm border mb-1 leading-tight`}>
                        {user.kycStatus === 'APPROVED' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                        {user.kycStatus}
                      </div>
                    </td>

                    {/* Joined Date */}
                    <td className="px-6 py-5">
                      <div className="text-gray-800 font-medium text-sm">{new Date(user.createdAt).toLocaleDateString()}</div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleImpersonate(user.id)}
                          className="p-1.5 text-orange-500 hover:bg-orange-50 border border-orange-200 rounded transition-colors"
                          title="Login as User"
                        >
                          <ShieldUser className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-blue-500 hover:bg-blue-50 border border-blue-200 rounded transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openServiceModal(user)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 border border-emerald-200 rounded transition-colors"
                          title="Service Activation"
                        >
                          <Settings2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && !loading && (
                  <tr>
                    <td colSpan="8" className="px-6 py-10 text-center text-gray-500">No members found matching your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ===== SERVICE ACTIVATION MODAL ===== */}
      {serviceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-800">Service Activation</h2>
                <p className="text-xs text-gray-500 mt-0.5">{serviceModal.name} — Toggle services on/off</p>
              </div>
              <button onClick={() => setServiceModal(null)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Service Toggles */}
            <div className="px-6 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {ALL_SERVICES.map(svc => (
                <div
                  key={svc.id}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 border border-gray-100"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{svc.label}</div>
                    <div className="text-xs text-gray-400">{svc.desc}</div>
                  </div>
                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => setServiceToggles(prev => ({ ...prev, [svc.id]: !prev[svc.id] }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${serviceToggles[svc.id] ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${serviceToggles[svc.id] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-b-xl">
              <div className="text-sm">
                {serviceMsg === 'saved' && <span className="text-emerald-600 font-medium">✓ Saved!</span>}
                {serviceMsg === 'error' && <span className="text-red-600 font-medium">Failed to save.</span>}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setServiceModal(null)}
                  className="px-4 py-2 text-sm border border-gray-200 rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={saveServiceAccess}
                  disabled={savingServices}
                  className="px-4 py-2 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded font-medium flex items-center gap-2 disabled:opacity-70"
                >
                  {savingServices ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {savingServices ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default AllMembers;
