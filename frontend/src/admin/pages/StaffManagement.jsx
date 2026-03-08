import React, { useState, useEffect } from 'react';
import { apiRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, ShieldCheck, Trash2, X, Save, Loader2 } from 'lucide-react';

const ALL_PERMISSIONS = [
  { key: 'addUser', label: 'Add User' },
  { key: 'userEdit', label: 'User Edit' },
  { key: 'userListView', label: 'User List View' },
  { key: 'userActiveDeactive', label: 'User Active / De-active' },
  { key: 'walletBalanceDebit', label: 'Wallet Balance Debit' },
  { key: 'walletBalanceCredit', label: 'Wallet Balance Credit' },
  { key: 'distributorUserMapping', label: 'Distributor User Mapping' },
  { key: 'resetTpin', label: 'Reset TPIN' },
  { key: 'paymentChargeSetEdit', label: 'Payment Charge Set/Edit' },
  { key: 'paymentChargeView', label: 'Payment Charge View' },
  { key: 'fundRequestAccepted', label: 'Fund Request Accepted / Rejected' },
  { key: 'accountNoAdd', label: 'Account No Add' },
  { key: 'qrAdd', label: 'QR Add' },
  { key: 'commissionView', label: 'Commission View' },
  { key: 'reportView', label: 'Report View' },
  { key: 'commissionEdit', label: 'Commission Edit' },
];

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit Modal State
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editPermissions, setEditPermissions] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saveError, setSaveError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await apiRequest('/users/staff');
      setStaff(res.data);
    } catch (err) {
      setError('Failed to fetch staff data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImpersonate = async (userId) => {
    if (!window.confirm("Are you sure you want to login as this staff member?")) return;

    try {
      const response = await apiRequest(`/auth/impersonate/${userId}`, 'POST');
      const impersonateUrl = `/admin/impersonate-session?token=${response.token}&user=${encodeURIComponent(JSON.stringify(response.user))}`;
      window.open(impersonateUrl, '_blank');
    } catch (error) {
      alert("Impersonation failed: " + error.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    alert("Delete functionality pending backend endpoint.");
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      mobile: user.mobile || '',
      role: user.role || 'EMPLOYEE',
      password: '',
      confirmPassword: '',
    });
    // Initialize permissions from user's saved permissions, or all false
    const perms = {};
    ALL_PERMISSIONS.forEach(p => {
      perms[p.key] = user.permissions ? !!user.permissions[p.key] : false;
    });
    setEditPermissions(perms);
    setSaveMsg('');
    setSaveError('');
  };

  const closeEditModal = () => {
    setEditUser(null);
    setEditForm({});
    setEditPermissions({});
    setSaveMsg('');
    setSaveError('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editForm.password && editForm.password !== editForm.confirmPassword) {
      setSaveError("Passwords do not match!");
      return;
    }
    setSaving(true);
    setSaveError('');
    try {
      const payload = {
        name: editForm.name,
        email: editForm.email,
        mobile: editForm.mobile,
        role: editForm.role,
        permissions: editPermissions,
        ...(editForm.password ? { password: editForm.password } : {}),
      };
      await apiRequest(`/users/${editUser.id}`, 'PUT', payload);
      setSaveMsg("Staff member updated successfully!");
      fetchStaff();
      setTimeout(() => closeEditModal(), 1500);
    } catch (err) {
      setSaveError(err.message || "Failed to update staff member.");
    } finally {
      setSaving(false);
    }
  };

  const togglePermission = (key) => {
    setEditPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAllPermissions = (val) => {
    const perms = {};
    ALL_PERMISSIONS.forEach(p => { perms[p.key] = val; });
    setEditPermissions(perms);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Staff Management</h1>

        {/* Top Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-1.5" />
            Add New Staff
          </button>
          <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded text-sm font-medium flex items-center transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-1.5" />
            Staff's Permissions
          </button>
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-100">{error}</div>}

      {/* Table Container */}
      <div className="bg-white rounded border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-100 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">NAME</th>
                <th className="px-6 py-4">USERNAME</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4">PHONE</th>
                <th className="px-6 py-4">USER TYPE</th>
                <th className="px-6 py-4 leading-tight">CREATED<br />AT</th>
                <th className="px-6 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="px-6 py-10 text-center text-gray-500">Loading staff data...</td></tr>
              ) : staff.length === 0 ? (
                <tr><td colSpan="8" className="px-6 py-10 text-center text-gray-500">No staff members found.</td></tr>
              ) : (
                staff.map((user, index) => (
                  <tr key={user.id} className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email.split('@')[0]}</td>
                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-gray-500">{user.mobile}</td>
                    <td className="px-6 py-4">
                      {user.role === 'ADMIN' ? (
                        <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded">ADMIN</span>
                      ) : (
                        <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-1 rounded">EMPLOYEE</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex flex-col text-xs space-y-0.5">
                        <span>{new Date(user.createdAt).getDate().toString().padStart(2, '0')} {new Date(user.createdAt).toLocaleString('default', { month: 'short' })}</span>
                        <span>{new Date(user.createdAt).getFullYear()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1.5 items-center">
                        {/* Login Button */}
                        <button
                          onClick={() => handleImpersonate(user.id)}
                          className="w-8 h-8 rounded bg-cyan-400 hover:bg-cyan-500 text-white flex items-center justify-center transition-colors"
                          title="Login as User"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit Button */}
                        {/* Permissions Button */}
                        <button
                          onClick={() => openEditModal(user)}
                          className="h-8 px-2.5 rounded bg-teal-500/90 hover:bg-teal-600 text-white flex flex-col items-center justify-center transition-colors leading-[0.5]"
                          title="Manage Permissions"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 mb-1" />
                          <span className="text-[9px]">Permissions</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="w-8 h-8 rounded bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                          title="Delete Staff"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====== EDIT USER MODAL ====== */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto pt-6 pb-6">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl mx-4 my-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Edit User</h2>
                <p className="text-xs text-gray-500 mt-0.5">Update staff member details and permissions</p>
              </div>
              <button
                onClick={closeEditModal}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="px-6 py-5 space-y-5">

                {/* Status Messages */}
                {saveMsg && <div className="p-3 bg-green-50 border border-green-100 text-green-700 rounded text-sm">{saveMsg}</div>}
                {saveError && <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded text-sm">{saveError}</div>}

                {/* Row 1: Name + Username */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Username (Email prefix)</label>
                    <input
                      type="text"
                      readOnly
                      value={editUser.email.split('@')[0]}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={editForm.email}
                      onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                    <input
                      type="text"
                      required
                      value={editForm.mobile}
                      onChange={e => setEditForm(f => ({ ...f, mobile: e.target.value }))}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Row 3: Password + Confirm Password */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Password <span className="text-gray-400 font-normal">(leave blank to keep current)</span></label>
                    <input
                      type="password"
                      value={editForm.password}
                      onChange={e => setEditForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="New password..."
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={editForm.confirmPassword}
                      onChange={e => setEditForm(f => ({ ...f, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password..."
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Row 4: Role + User Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Role *</label>
                    <select
                      value={editForm.role}
                      onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="EMPLOYEE">Employee</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">User Type</label>
                    <input
                      type="text"
                      readOnly
                      value={editForm.role === 'ADMIN' ? 'Admin' : 'Employee'}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Permissions Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Permissions</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => toggleAllPermissions(true)}
                        className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 px-2.5 py-1 rounded transition-colors"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleAllPermissions(false)}
                        className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-gray-50 rounded-lg p-4 border border-gray-100">
                    {ALL_PERMISSIONS.map(perm => (
                      <label
                        key={perm.key}
                        className="flex items-center gap-2 cursor-pointer group py-1"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={!!editPermissions[perm.key]}
                            onChange={() => togglePermission(perm.key)}
                            className="sr-only"
                          />
                          <div
                            onClick={() => togglePermission(perm.key)}
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${editPermissions[perm.key]
                              ? 'bg-blue-500 border-blue-500'
                              : 'bg-white border-gray-300 group-hover:border-blue-400'
                              }`}
                          >
                            {editPermissions[perm.key] && (
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-700 group-hover:text-gray-900 select-none">{perm.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-lg">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2 text-sm border border-gray-200 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded font-medium flex items-center gap-2 transition-colors disabled:opacity-70"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Update User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StaffManagement;
