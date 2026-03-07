import React, { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { apiRequest } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const userRole = localStorage.getItem('userRole') || 'ADMIN';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedRole, setSelectedRole] = useState('');
  const [parents, setParents] = useState([]);
  const [loadingParents, setLoadingParents] = useState(false);

  useEffect(() => {
    if (selectedRole) {
      const fetchParents = async () => {
        try {
          setLoadingParents(true);
          const res = await apiRequest(`/users/potential-parents?role=${selectedRole}`);
          setParents(res.data || []);
        } catch (err) {
          console.error(err);
          setParents([]);
        } finally {
          setLoadingParents(false);
        }
      };
      fetchParents();
    } else {
      setParents([]);
    }
  }, [selectedRole]);

  const getAvailableRoles = () => {
    switch (userRole) {
      case 'ADMIN':
        return [
          { value: 'SUPER_DISTRIBUTOR', label: 'Super Distributor' },
          { value: 'MASTER_DISTRIBUTOR', label: 'Master Distributor' },
          { value: 'DISTRIBUTOR', label: 'Distributor' },
          { value: 'RETAILER', label: 'Retailer' }
        ];
      case 'SUPER_DISTRIBUTOR':
        return [
          { value: 'MASTER_DISTRIBUTOR', label: 'Master Distributor' },
          { value: 'DISTRIBUTOR', label: 'Distributor' },
          { value: 'RETAILER', label: 'Retailer' }
        ];
      case 'MASTER_DISTRIBUTOR':
        return [
          { value: 'DISTRIBUTOR', label: 'Distributor' },
          { value: 'RETAILER', label: 'Retailer' }
        ];
      case 'DISTRIBUTOR':
        return [
          { value: 'RETAILER', label: 'Retailer' }
        ];
      default:
        return [];
    }
  };

  const availableRoles = getAvailableRoles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Convert FormData to JSON object, omitting file fields for now as the backend isn't using them
      const data = Object.fromEntries(formData.entries());
      delete data.confirmPassword;
      delete data.aadharFront;
      delete data.aadharBack;
      delete data.panImage;
      delete data.bankDoc;

      await apiRequest('/users/add', 'POST', data);
      setSuccess("User created successfully! Redirecting...");
      e.target.reset();
      setTimeout(() => navigate('/admin/all-members'), 2000);
    } catch (err) {
      setError(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Add New User</h1>
        <div className="flex items-center text-sm text-gray-500">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">Add User</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 md:p-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium">{error}</div>}
        {success && <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 rounded-lg text-sm font-medium">{success}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Role */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              required
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 appearance-none bg-white"
            >
              <option value="">Select Role</option>
              {availableRoles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          {/* Upline / Parent Selector */}
          {selectedRole && (
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Select {
                  selectedRole === 'SUPER_DISTRIBUTOR' ? 'Admin' :
                    selectedRole === 'MASTER_DISTRIBUTOR' ? 'Super Distributor' :
                      selectedRole === 'DISTRIBUTOR' ? 'Master Distributor' :
                        'Distributor'
                } (Upline)
              </label>
              <select
                name="parentId"
                required
                disabled={loadingParents}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 appearance-none bg-white disabled:bg-gray-50"
              >
                <option value="">{loadingParents ? 'Loading potential parents...' : 'Select Parent User'}</option>
                {parents.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - {p.role} ({p.mobile})</option>
                ))}
              </select>
            </div>
          )}

          {/* Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" required placeholder="Enter Name" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Shop Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Shop Name</label>
            <input type="text" name="shopName" placeholder="Enter Shop Name" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Mobile No */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Mobile No (as per Aadhar Link)</label>
            <input type="text" name="mobile" required placeholder="Enter Mobile Number" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Email Id */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email Id</label>
            <input type="email" name="email" required placeholder="Enter Email" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Address (As per Aadhar)</label>
            <textarea name="address" placeholder="Enter Full Address" rows="3" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400 resize-none"></textarea>
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" name="city" placeholder="Enter City" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* State */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input type="text" name="state" placeholder="Enter State" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Pin */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Pin</label>
            <input type="text" name="pincode" placeholder="Enter Pin Code" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Aadhar No */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Aadhar No</label>
            <input type="text" name="aadharNo" placeholder="Enter Aadhar Number" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Aadhar Front Page Upload */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Aadhar Front Page Upload</label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden bg-gray-50">
              <input type="file" name="aadharFront" id="aadharFront" className="hidden" />
              <label htmlFor="aadharFront" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 border-r border-gray-300 cursor-pointer text-sm font-medium whitespace-nowrap">Choose File</label>
              <span className="px-4 py-2.5 text-gray-500 text-sm truncate flex-1 flex items-center bg-white">No file chosen</span>
            </div>
          </div>

          {/* Aadhar Back Page Upload */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Aadhar Back Page Upload</label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden bg-gray-50">
              <input type="file" name="aadharBack" id="aadharBack" className="hidden" />
              <label htmlFor="aadharBack" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 border-r border-gray-300 cursor-pointer text-sm font-medium whitespace-nowrap">Choose File</label>
              <span className="px-4 py-2.5 text-gray-500 text-sm truncate flex-1 flex items-center bg-white">No file chosen</span>
            </div>
          </div>

          {/* Pan No */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Pan No</label>
            <input type="text" name="panNo" placeholder="Enter Pan Number" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Pan Image Upload */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Pan Image Upload</label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden bg-gray-50">
              <input type="file" name="panImage" id="panImage" className="hidden" />
              <label htmlFor="panImage" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 border-r border-gray-300 cursor-pointer text-sm font-medium whitespace-nowrap">Choose File</label>
              <span className="px-4 py-2.5 text-gray-500 text-sm truncate flex-1 flex items-center bg-white">No file chosen</span>
            </div>
          </div>

          {/* Account No */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Account No</label>
            <input type="text" name="accountNo" placeholder="Enter Account Number" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* IFSC Code */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
            <input type="text" name="ifscCode" placeholder="Enter IFSC Code" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Bank Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input type="text" name="bankName" placeholder="Enter Bank Name" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Bank Document Upload */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Bank Document Upload (Passbook, Cheque, or Statement)</label>
            <div className="flex border border-gray-300 rounded-md overflow-hidden bg-gray-50">
              <input type="file" name="bankDoc" id="bankDoc" className="hidden" />
              <label htmlFor="bankDoc" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 border-r border-gray-300 cursor-pointer text-sm font-medium whitespace-nowrap">Choose File</label>
              <span className="px-4 py-2.5 text-gray-500 text-sm truncate flex-1 flex items-center bg-white">No file chosen</span>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" required placeholder="Enter Password" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" name="confirmPassword" required placeholder="Confirm Password" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-700 placeholder-gray-400" />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddUser;
