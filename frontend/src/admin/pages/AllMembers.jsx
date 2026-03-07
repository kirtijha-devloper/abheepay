import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';
import {
  Users,
  UserPlus,
  Search,
  X,
  MoreVertical,
  LogOut,
  Edit,
  Percent,
  TrendingUp,
  List,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  Phone,
  ShieldUser
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllMembers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, roles: {} });
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery);

    const matchesRole = selectedRole === "All Roles" ||
      user.role === selectedRole.toUpperCase().replace(' ', '_');

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center text-white shadow-sm">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="bg-white/20 p-3 rounded-lg">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-indigo-100 mt-1">Manage all registered users, distributors & retailers</p>
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
          className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-indigo-200 ${selectedRole === "All Roles" ? "ring-2 ring-indigo-500 bg-indigo-50/10" : "border-gray-100"}`}>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center mb-2 text-indigo-500">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Network</p>
          <h3 className="text-xl font-bold text-gray-800">{stats.totalUsers}</h3>
        </div>

        {/* Super Distributors */}
        <div
          onClick={() => setSelectedRole("Super Distributor")}
          className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-purple-200 ${selectedRole === "Super Distributor" ? "ring-2 ring-purple-500 bg-purple-50/10" : "border-gray-100"}`}>
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-2 text-purple-500">
            <ShieldUser className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Super Dist.</p>
          <h3 className="text-xl font-bold text-gray-800">{stats.roles.SUPER_DISTRIBUTOR || 0}</h3>
        </div>

        {/* Master Distributors */}
        <div
          onClick={() => setSelectedRole("Master Distributor")}
          className={`bg-white rounded-lg p-5 shadow-sm border flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:shadow-md hover:border-pink-200 ${selectedRole === "Master Distributor" ? "ring-2 ring-pink-500 bg-pink-50/10" : "border-gray-100"}`}>
          <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center mb-2 text-pink-500">
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
                  <td className="px-6 py-5 text-center font-bold text-gray-800">
                    ₹{user.walletBalance?.toLocaleString() || '0'}
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
  );
};

export default AllMembers;
