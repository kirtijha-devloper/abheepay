import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import storage from '../../utils/storage';

const BankAccount = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    bankName: '',
    ifsc: '',
    accountNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      setLoading(true);
      const token = storage.get('authToken');
      const res = await axios.get('/api/settings/banks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = res.data;
      setBanks(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error('Error fetching banks:', error);
      toast.error('Failed to load bank details.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (bank = null) => {
    if (bank) {
      setFormData({
        id: bank.id,
        bankName: bank.bankName,
        ifsc: bank.ifsc,
        accountNumber: bank.accountNumber
      });
    } else {
      setFormData({
        id: null,
        bankName: '',
        ifsc: '',
        accountNumber: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.bankName || !formData.ifsc || !formData.accountNumber) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = storage.get('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      if (formData.id) {
        // Update
        await axios.put(`/api/settings/banks/${formData.id}`, {
          bankName: formData.bankName,
          ifsc: formData.ifsc,
          accountNumber: formData.accountNumber
        }, { headers });
        toast.success('Bank details updated successfully!');
      } else {
        // Create
        await axios.post('/api/settings/banks', {
          bankName: formData.bankName,
          ifsc: formData.ifsc,
          accountNumber: formData.accountNumber
        }, { headers });
        toast.success('New bank added successfully!');
      }

      closeModal();
      fetchBanks();
    } catch (error) {
      console.error('Error saving bank:', error);
      toast.error(error.response?.data?.error || 'Failed to save bank details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bank?')) return;

    try {
      const token = storage.get('authToken');
      await axios.delete(`/api/settings/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Bank deleted successfully!');
      fetchBanks();
    } catch (error) {
      console.error('Error deleting bank:', error);
      toast.error('Failed to delete bank.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Background Container */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col gap-4 items-start">
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
            Bank Details
          </h1>
          <button
            onClick={() => openModal()}
            className="bg-[#6b62ff] hover:bg-[#5750d4] text-white px-5 py-2 rounded shadow-sm text-sm font-medium transition-colors"
          >
            Add New Bank
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] font-bold text-slate-700 uppercase tracking-widest border-b border-slate-200">
              <tr>
                <th className="px-4 py-4 border-r border-slate-100 w-16 text-center">ID</th>
                <th className="px-4 py-4 border-r border-slate-100 w-1/4">BANK NAME</th>
                <th className="px-4 py-4 border-r border-slate-100 w-1/4">IFSC</th>
                <th className="px-4 py-4 border-r border-slate-100 w-1/4">ACCOUNT NUMBER</th>
                <th className="px-4 py-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-400">Loading bank details...</td>
                </tr>
              ) : banks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-slate-400">No bank details added yet.</td>
                </tr>
              ) : (
                banks.map((bank, index) => (
                  <tr key={bank.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-4 border-r border-slate-100 text-slate-500 text-center">{index + 1}</td>
                    <td className="px-4 py-4 border-r border-slate-100 text-slate-500">{bank.bankName}</td>
                    <td className="px-4 py-4 border-r border-slate-100 text-slate-500">{bank.ifsc}</td>
                    <td className="px-4 py-4 border-r border-slate-100 text-slate-500">{bank.accountNumber}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2 transition-opacity">
                        <button
                          onClick={() => openModal(bank)}
                          className="bg-[#fbbf24] hover:bg-[#f59e0b] text-white px-3 py-1 rounded text-xs font-semibold shadow-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(bank.id)}
                          className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-3 py-1 rounded text-xs font-semibold shadow-sm transition-colors"
                        >
                          Delete
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

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-800">
                {formData.id ? 'Edit Bank Details' : 'Add New Bank'}
              </h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-1.5">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6b62ff]/20 focus:border-[#6b62ff]"
                  placeholder="e.g. HDFC Bank"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-1.5">
                  IFSC Code
                </label>
                <input
                  type="text"
                  name="ifsc"
                  value={formData.ifsc}
                  onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6b62ff]/20 focus:border-[#6b62ff] uppercase"
                  placeholder="e.g. HDFC0000001"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-1.5">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#6b62ff]/20 focus:border-[#6b62ff]"
                  placeholder="Enter Account Number"
                  required
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#6b62ff] hover:bg-[#5750d4] rounded-lg transition-colors disabled:bg-slate-300"
                >
                  {isSubmitting ? 'Saving...' : formData.id ? 'Update Bank' : 'Add Bank'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccount;
