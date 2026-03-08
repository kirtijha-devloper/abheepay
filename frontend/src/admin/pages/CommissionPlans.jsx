import React, { useState, useEffect } from 'react';
import {
  List, MapPin, Users, Settings, CreditCard, Wallet, Server,
  Search, Filter, Plus, Edit2, Trash2, ArrowUpDown, Percent, Eye
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { commissionsData } from '../../constants/mockData';

const tabs = [
  { id: 'Commission List', label: 'Commission List', icon: <List className="w-4 h-4 mr-2" /> },
  { id: 'Map Commission List', label: 'Map Commission List', icon: <MapPin className="w-4 h-4 mr-2" /> },
  { id: 'Distributor Commission Plan', label: 'Distributor Plan', icon: <Users className="w-4 h-4 mr-2" /> },
  { id: 'Account Verification Charge', label: 'Account Verification Charge', icon: <Settings className="w-4 h-4 mr-2" /> },
  { id: 'Payout Charges', label: 'Payout Charges', icon: <CreditCard className="w-4 h-4 mr-2" /> },
  { id: 'Add fund PG charges & commission', label: 'Add Fund PG', icon: <Wallet className="w-4 h-4 mr-2" /> }
];

const CommissionPlans = () => {
  const [activeTab, setActiveTab] = useState('Commission List');
  const [payoutSlabs, setPayoutSlabs] = useState([]);
  const [serviceFees, setServiceFees] = useState([]);
  const [pgCharges, setPgCharges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form States
  const [newServiceFee, setNewServiceFee] = useState({
    serviceKey: 'BNK_ACC_VRFY',
    serviceName: 'Bank Account Verification',
    feeAmount: '',
    isActive: true
  });

  const [newPgCharge, setNewPgCharge] = useState({
    method: 'Card',
    network: 'VISA',
    cardType: 'credit',
    subType: 'consumer',
    rate: '',
    commission: ''
  });

  const [newPayoutSlab, setNewPayoutSlab] = useState({
    minAmount: '',
    maxAmount: '',
    serviceCharge: '',
    serviceName: 'Payout',
    isActive: true
  });

  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [showPgForm, setShowPgForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hierarchical Overrides State
  const [overrideRole, setOverrideRole] = useState(null); // 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR', 'RETAILER', or null
  const [userOverrides, setUserOverrides] = useState([]);
  const [loadingOverrides, setLoadingOverrides] = useState(false);

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const fetchTabData = async () => {
    setLoading(true);
    setOverrideRole(null); // Reset overrides view on tab switch
    try {
      if (activeTab === 'Payout Charges') {
        const res = await axios.get('http://localhost:5000/api/commissions/payout-slabs');
        setPayoutSlabs(res.data);
      } else if (activeTab === 'Account Verification Charge') {
        const res = await axios.get('http://localhost:5000/api/commissions/service-fees');
        setServiceFees(res.data);
      } else if (activeTab === 'Add fund PG charges & commission') {
        const res = await axios.get('http://localhost:5000/api/commissions/pg');
        setPgCharges(res.data);
      }
    } catch (error) {
      console.error('Error fetching commission data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddServiceFee = async (e) => {
    e.preventDefault();
    if (!newServiceFee.feeAmount) return alert('Fee amount is required');
    try {
      await axios.post('http://localhost:5000/api/commissions/service-fees', newServiceFee);
      fetchTabData();
      setNewServiceFee({ ...newServiceFee, feeAmount: '' });
    } catch (error) {
      console.error('Error adding service fee:', error);
      alert(error.response?.data?.error || 'Failed to add service fee');
    }
  };

  const handleAddPGCharge = async (e) => {
    e.preventDefault();
    if (!newPgCharge.rate || !newPgCharge.commission) return alert('Rate and Commission are required');
    try {
      await axios.post('http://localhost:5000/api/commissions/pg', newPgCharge);
      fetchTabData();
      setNewPgCharge({ ...newPgCharge, rate: '', commission: '' });
    } catch (error) {
      console.error('Error adding PG charge:', error);
      alert(error.response?.data?.error || 'Failed to add PG charge');
    }
  };

  const handleAddPayoutSlab = async (e) => {
    e.preventDefault();
    if (!newPayoutSlab.minAmount || !newPayoutSlab.maxAmount || !newPayoutSlab.serviceCharge) return alert('All fields are required');
    try {
      await axios.post('http://localhost:5000/api/commissions/payout-slabs', newPayoutSlab);
      fetchTabData();
      setNewPayoutSlab({ minAmount: '', maxAmount: '', serviceCharge: '', serviceName: 'Payout', isActive: true });
      setShowPayoutForm(false);
    } catch (error) {
      console.error('Error adding payout slab:', error);
      alert(error.response?.data?.error || 'Failed to add payout slab');
    }
  };

  const handleDeleteServiceFee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this fee?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/commissions/service-fees/${id}`);
      fetchTabData();
    } catch (error) {
      console.error('Error deleting service fee:', error);
    }
  };

  const handleDeletePGCharge = async (id) => {
    if (!window.confirm('Are you sure you want to delete this charge?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/commissions/pg/${id}`);
      fetchTabData();
    } catch (error) {
      console.error('Error deleting PG charge:', error);
    }
  };

  const handleDeletePayoutSlab = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slab?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/commissions/payout-slabs/${id}`);
      fetchTabData();
    } catch (error) {
      console.error('Error deleting payout slab:', error);
    }
  };

  const fetchUserOverrides = async (role) => {
    setLoadingOverrides(true);
    setOverrideRole(role);
    setShowPgForm(false); // Hide the global addition form
    try {
      const res = await axios.get(`http://localhost:5000/api/commissions/pg/user-overrides?role=${role}`);
      setUserOverrides(res.data);
    } catch (error) {
      console.error('Error fetching overrides:', error);
      toast?.error('Failed to load overrides');
    } finally {
      setLoadingOverrides(false);
    }
  };

  const handleUpdateServiceFee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/commissions/service-fees/${editingItem.id}`, editingItem);
      fetchTabData();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating service fee:', error);
      alert('Failed to update service fee');
    }
  };

  const handleUpdatePGCharge = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/commissions/pg/${editingItem.id}`, editingItem);
      fetchTabData();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating PG charge:', error);
      alert('Failed to update PG charge');
    }
  };

  const handleUpdatePayoutSlab = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/commissions/payout-slabs/${editingItem.id}`, editingItem);
      fetchTabData();
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating payout slab:', error);
      alert('Failed to update payout slab');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 animate-in fade-in duration-500">

      {/* Dynamic Header Section */}
      <div className="rounded-3xl p-8 shadow-md relative overflow-hidden bg-gradient-to-r from-cyan-600 to-teal-700">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20 shadow-inner">
                <Percent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Commission Plans
                </h1>
                <p className="text-cyan-100 font-medium mt-1">Manage and configure all commission structures, fees, and payout settings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Nav Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
        <ul className="flex overflow-x-auto hide-scrollbar text-sm font-medium text-center text-slate-500 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className="whitespace-nowrap flex-shrink-0">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-cyan-50 text-cyan-700 font-bold shadow-sm border border-cyan-100'
                    : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">

        {/* Form or Header Area */}
        {activeTab === 'Payout Charges' ? (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Payout Charge Slabs
              </h2>
              <button
                onClick={() => setShowPayoutForm(!showPayoutForm)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded flex items-center gap-1 text-sm font-medium transition-colors shadow-sm"
              >
                {showPayoutForm ? 'Cancel' : <><Plus className="w-4 h-4" /> Add New Slab</>}
              </button>
            </div>
            {showPayoutForm && (
              <form onSubmit={handleAddPayoutSlab} className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-end shadow-sm">
                <div className="space-y-1.5 flex-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">MIN AMOUNT</label>
                  <input
                    type="number" step="0.01"
                    value={newPayoutSlab.minAmount}
                    onChange={(e) => setNewPayoutSlab({ ...newPayoutSlab, minAmount: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">MAX AMOUNT</label>
                  <input
                    type="number" step="0.01"
                    value={newPayoutSlab.maxAmount}
                    onChange={(e) => setNewPayoutSlab({ ...newPayoutSlab, maxAmount: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">CHARGE (RS)</label>
                  <input
                    type="number" step="0.01"
                    value={newPayoutSlab.serviceCharge}
                    onChange={(e) => setNewPayoutSlab({ ...newPayoutSlab, serviceCharge: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                  />
                </div>
                <button type="submit" className="bg-cyan-600 text-white hover:bg-cyan-700 px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm h-[38px]">
                  Save Slab
                </button>
              </form>
            )}
          </div>
        ) : activeTab === 'Account Verification Charge' ? (
          <div className="mb-8 relative z-10">
            <div className="bg-cyan-600 rounded-t-3xl px-6 md:px-8 py-5 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6">
              <h3 className="text-lg font-semibold text-white">Add New Service Fee</h3>
            </div>
            <form onSubmit={handleAddServiceFee} className="flex flex-col md:flex-row md:items-end gap-6 mb-2">
              <div className="flex-1 space-y-1.5 w-full">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">SERVICE <span className="text-red-500">*</span></label>
                <select
                  value={newServiceFee.serviceKey}
                  onChange={(e) => setNewServiceFee({ ...newServiceFee, serviceKey: e.target.value, serviceName: e.target.options[e.target.selectedIndex].text })}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white appearance-none"
                >
                  <option value="">--Select Service--</option>
                  <option value="BNK_ACC_VRFY">Bank Account Verification</option>
                </select>
              </div>
              <div className="flex-1 space-y-1.5 w-full">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">FEE AMOUNT <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  step="0.01"
                  value={newServiceFee.feeAmount}
                  onChange={(e) => setNewServiceFee({ ...newServiceFee, feeAmount: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                />
              </div>
              <div className="flex items-center gap-3 mb-3 shrink-0">
                <div
                  className={`w-10 h-6 ${newServiceFee.isActive ? 'bg-cyan-500' : 'bg-slate-300'} rounded-full relative cursor-pointer transition-colors`}
                  onClick={() => setNewServiceFee({ ...newServiceFee, isActive: !newServiceFee.isActive })}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${newServiceFee.isActive ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
                <span className="text-sm font-bold text-slate-700">Is Active</span>
              </div>
              <button type="submit" className="bg-cyan-600 text-white hover:bg-cyan-700 px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm ml-auto md:ml-4 shrink-0">
                Add Fee
              </button>
            </form>
          </div>
        ) : activeTab === 'Add fund PG charges & commission' ? (
          <div className="mb-6">
            <h2 className="text-[22px] font-bold text-slate-800 mb-6">
              Add fund PG charges & Distributor's commission rate
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => { setShowPgForm(!showPgForm); setOverrideRole(null); }}
                className={`${!overrideRole && showPgForm ? 'bg-cyan-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2`}
              >
                {showPgForm ? 'Cancel New Charge' : <><Plus className="w-4 h-4" /> Global PG Charge</>}
              </button>

              <button
                onClick={() => fetchUserOverrides('SUPER_DISTRIBUTOR')}
                className={`${overrideRole === 'SUPER_DISTRIBUTOR' ? 'bg-cyan-600 ring-2 ring-offset-2 ring-cyan-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm`}
              >
                Super Distributor Rates
              </button>
              <button
                onClick={() => fetchUserOverrides('MASTER_DISTRIBUTOR')}
                className={`${overrideRole === 'MASTER_DISTRIBUTOR' ? 'bg-cyan-600 text-white ring-2 ring-offset-2 ring-cyan-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm`}
              >
                Master Distributor Rates
              </button>
              <button
                onClick={() => fetchUserOverrides('DISTRIBUTOR')}
                className={`${overrideRole === 'DISTRIBUTOR' ? 'bg-cyan-600 text-white ring-2 ring-offset-2 ring-cyan-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm`}
              >
                Distributor Rates
              </button>
              <button
                onClick={() => fetchUserOverrides('RETAILER')}
                className={`${overrideRole === 'RETAILER' ? 'bg-cyan-600 text-white ring-2 ring-offset-2 ring-cyan-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm`}
              >
                Retailer Rates
              </button>
            </div>

            {showPgForm && !overrideRole && (
              <form onSubmit={handleAddPGCharge} className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 relative shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">METHOD</label>
                    <select
                      value={newPgCharge.method}
                      onChange={(e) => setNewPgCharge({ ...newPgCharge, method: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                    >
                      <option value="Card">Card</option>
                      <option value="Netbanking">Netbanking</option>
                      <option value="Upi">Upi</option>
                      <option value="Wallet">Wallet</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">NETWORK</label>
                    <select
                      value={newPgCharge.network}
                      onChange={(e) => setNewPgCharge({ ...newPgCharge, network: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                    >
                      <option value="VISA">VISA</option>
                      <option value="MASTERCARD">MASTERCARD</option>
                      <option value="RUPAY">RUPAY</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">CARD TYPE</label>
                    <select
                      value={newPgCharge.cardType}
                      onChange={(e) => setNewPgCharge({ ...newPgCharge, cardType: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                    >
                      <option value="credit">credit</option>
                      <option value="debit">debit</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">SUB TYPE</label>
                    <select
                      value={newPgCharge.subType}
                      onChange={(e) => setNewPgCharge({ ...newPgCharge, subType: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                    >
                      <option value="consumer">consumer</option>
                      <option value="business">business</option>
                      <option value="-">-</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">RATE (%)</label>
                    <input
                      type="number" step="0.01"
                      value={newPgCharge.rate}
                      onChange={(e) => setNewPgCharge({ ...newPgCharge, rate: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                      placeholder="e.g. 1.50"
                    />
                  </div>
                  <div className="space-y-1.5 flex gap-2">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest">COMM (%)</label>
                      <input
                        type="number" step="0.01"
                        value={newPgCharge.commission}
                        onChange={(e) => setNewPgCharge({ ...newPgCharge, commission: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 bg-white"
                        placeholder="e.g. 0.00"
                      />
                    </div>
                    <button type="submit" className="bg-cyan-600 text-white hover:bg-cyan-700 px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm self-end h-[38px]">
                      Add
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>
        ) : (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <Plus className="w-5 h-5 mr-2 text-cyan-600" />
              Add New Commission
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-6">

              {/* Conditionally Render Form Fields */}
              {(activeTab === 'Map Commission List'
                ? [
                  { label: 'SERVICE', type: 'select', options: ['--Select a Service--', 'AEPS', 'DMT', 'Recharge'] },
                  { label: 'FROM RT COUNT', type: 'text', placeholder: 'e.g., 0' },
                  { label: 'TO RT COUNT', type: 'text', placeholder: 'e.g., 0' },
                  { label: 'CHARGE IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
                  { label: 'CHARGE', type: 'text', placeholder: 'e.g., 50' },
                  { label: 'COMMISSION IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
                  { label: 'COMMISSION', type: 'text', placeholder: 'e.g., 20' },
                  { label: 'TDS IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
                  { label: 'TDS', type: 'text', placeholder: 'e.g., 10' },
                ]
                : [
                  { label: 'PACKAGES', type: 'select', options: ['--Select Packages--', 'Retailer', 'Distributor'] },
                  { label: 'SERVICE', type: 'select', options: ['--Select a Service--', 'AEPS', 'DMT'] },
                  { label: 'FROM AMOUNT', type: 'text', placeholder: 'e.g., 0' },
                  { label: 'TO AMOUNT', type: 'text', placeholder: 'e.g., 1000' },
                  { label: 'CHARGE IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
                  { label: 'CHARGE', type: 'text', placeholder: 'e.g., 50' },
                  { label: 'COMMISSION IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
                  { label: 'COMMISSION', type: 'text', placeholder: 'e.g., 20' },
                  { label: 'TDS IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
                  { label: 'TDS', type: 'text', placeholder: 'e.g., 10' },
                ]
              ).map((field, idx) => (
                <div key={idx} className={`space-y-1.5 ${field.label === 'SERVICE' && activeTab === 'Map Commission List' ? 'md:col-span-2 lg:col-span-1 xl:col-span-2' : ''}`}>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">{field.label}</label>
                  {field.type === 'select' ? (
                    <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-slate-50 hover:bg-slate-100/50 transition-colors appearance-none">
                      {field.options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input type={field.type} placeholder={field.placeholder} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-slate-50 hover:bg-slate-100/50 transition-colors placeholder-slate-400" />
                  )}
                </div>
              ))}

              {/* Buttons */}
              <div className="flex items-end gap-3 h-full xl:col-span-2 mt-4 xl:mt-0">
                <button type="button" className="bg-teal-500 text-white hover:bg-teal-600 px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm shadow-teal-500/20 flex-1">
                  Submit
                </button>
                <button type="button" className="bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-800 px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex-1">
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab !== 'Add fund PG charges & commission' && (
          <hr className="border-slate-100 mb-8" />
        )}

        {/* Table Controls */}
        {activeTab !== 'Add fund PG charges & commission' && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center text-sm font-medium text-slate-500">
              Show
              <select className="border border-slate-200 rounded-lg px-3 py-2 mx-2 focus:outline-none focus:border-cyan-500 bg-slate-50 font-bold text-slate-700">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              entries
            </div>

            <div className="relative w-full sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search commissions..."
                className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className={activeTab === 'Add fund PG charges & commission' ? "overflow-x-auto" : "overflow-x-auto rounded-2xl border border-slate-100 shadow-sm"}>
          <table className={`w-full text-sm text-left text-slate-600 ${activeTab === 'Add fund PG charges & commission' ? 'border border-slate-200 border-b-0' : ''}`}>
            {!overrideRole && (
              <thead className={activeTab === 'Add fund PG charges & commission' ? "text-slate-800 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider bg-white" : "bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase text-[10px] tracking-wider text-center"}>
                <tr>
                  {(
                    activeTab === 'Payout Charges'
                      ? ['ID', 'MIN AMOUNT', 'MAX AMOUNT', 'SERVICE CHARGE', 'SERVICE NAME', 'CREATED AT', 'ACTIONS']
                      : activeTab === 'Account Verification Charge'
                        ? ['#', 'SERVICE KEY', 'SERVICE NAME', 'FEE AMOUNT', 'STATUS', 'ACTIONS']
                        : activeTab === 'Add fund PG charges & commission'
                          ? ['METHOD', 'NETWORK', 'CARD TYPE', 'SUB TYPE', 'RATE (%)', 'COMMISSION RATE (%)', 'ACTION']
                          : activeTab === 'Map Commission List'
                            ? ['SERVICE', 'FROM RT COUNT', 'TO RT COUNT', 'CHARGE IN', 'CHARGE', 'COMMISSION IN', 'COMMISSION', 'TDS IN', 'TDS', 'ACTION']
                            : ['SL NO.', 'PACKAGES', 'SERVICE', 'SUB SERVICE', 'FROM AMOUNT', 'TO AMOUNT', 'CHARGE', 'COMMISSION', 'TDS', 'CHARGE IN', 'COMMISSION IN', 'TDS IN', 'ACTION']
                  ).map((header, i) => (
                    <th key={i} className={`px-4 py-4 whitespace-nowrap ${activeTab === 'Add fund PG charges & commission' ? 'border-r border-slate-200' : 'border-r border-slate-100 last:border-r-0'}`}>
                      <div className={`flex items-center gap-1 ${activeTab !== 'Add fund PG charges & commission' ? 'justify-center' : ''}`}>
                        {header}
                        {['ID', 'MIN AMOUNT', 'MAX AMOUNT', 'SERVICE CHARGE', '#', 'SERVICE KEY', 'SERVICE NAME', 'FEE AMOUNT', 'STATUS', 'ACTIONS', 'SL NO.', 'PACKAGES', 'FROM AMOUNT', 'TO AMOUNT', 'FROM RT COUNT', 'TO RT COUNT', 'CHARGE IN', 'COMMISSION IN', 'TDS IN'].includes(header) && activeTab !== 'Add fund PG charges & commission' && (
                          <ArrowUpDown className="w-3 h-3 text-slate-300" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-100 text-center">
              {overrideRole ? (
                loadingOverrides ? (
                  <tr><td colSpan="7" className="px-4 py-8 text-center text-slate-500">Loading overrides...</td></tr>
                ) : userOverrides.length === 0 ? (
                  <tr><td colSpan="7" className="px-4 py-8 text-center text-slate-500">No users found for this role.</td></tr>
                ) : (
                  <tr className="bg-white">
                    <td colSpan="7" className="p-0">
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-slate-50">
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">User</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Card (Visa Credit Consumer)</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Card (MC Credit Consumer)</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Card (Visa Credit Business)</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Card (MC Credit Business)</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Netbanking ()</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Card (Rupay Credit Consumer)</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Card (Rupay Credit Business)</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">UPI ()</th>
                              <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userOverrides.map((user) => (
                              <tr key={user.userId} className="border-t border-slate-100 hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-700">{user.userName}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Card_VISA_credit_consumer'] || '0.00'}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Card_MASTERCARD_credit_consumer'] || '0.00'}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Card_VISA_credit_business'] || '0.00'}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Card_MASTERCARD_credit_business'] || '0.00'}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Netbanking_-_-_'] || '0.00'}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Card_RUPAY_credit_consumer'] || '0.00'}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Card_RUPAY_credit_business'] || '0.00'}</td>
                                <td className="px-4 py-3 text-slate-600">{user['Upi_-_-_'] || '0.00'}</td>
                                <td className="px-4 py-3">
                                  <button className="px-4 py-1.5 bg-amber-500 text-white text-xs rounded font-bold hover:bg-amber-600 transition-colors shadow-sm">
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )
              ) : activeTab === 'Payout Charges' ? (
                loading ? (
                  <tr><td colSpan="7" className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>
                ) : payoutSlabs.length === 0 ? (
                  <tr><td colSpan="7" className="px-4 py-8 text-center text-slate-500">No payout slabs found</td></tr>
                ) : (
                  payoutSlabs.map((row, idx) => (
                    <tr key={row.id} className="bg-white hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500 font-medium">{idx + 1}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500">{row.minAmount}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500">{row.maxAmount}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500">{row.serviceCharge}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500">{row.serviceName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500">{new Date(row.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button className="px-3 py-1.5 bg-cyan-500 text-white hover:bg-cyan-600 rounded text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm" title="View">
                            <Eye className="w-3 h-3" /> View
                          </button>
                          <button
                            onClick={() => { setEditingItem({ ...row, type: 'payout' }); setIsModalOpen(true); }}
                            className="px-3 py-1.5 bg-amber-500 text-white hover:bg-amber-600 rounded text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm" title="Edit"
                          >
                            <Edit className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => handleDeletePayoutSlab(row.id)} className="px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm" title="Delete">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : activeTab === 'Account Verification Charge' ? (
                loading ? (
                  <tr><td colSpan="6" className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>
                ) : serviceFees.length === 0 ? (
                  <tr><td colSpan="6" className="px-4 py-8 text-center text-slate-500">No service fees found</td></tr>
                ) : (
                  serviceFees.map((fee, idx) => (
                    <tr key={fee.id} className="bg-white hover:bg-slate-50/80 transition-colors group">
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500 font-medium">{idx + 1}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-700">{fee.serviceKey}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-700">{fee.serviceName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-slate-700 font-medium">{fee.feeAmount.toFixed(2)}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 ${fee.isActive ? 'bg-green-500' : 'bg-red-500'} text-white rounded text-[10px] font-bold tracking-wider`}>
                          {fee.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => { setEditingItem({ ...fee, type: 'service' }); setIsModalOpen(true); }}
                            className="px-3 py-1.5 bg-amber-500 text-white hover:bg-amber-600 rounded text-xs font-semibold transition-colors flex items-center gap-1" title="Edit"
                          >
                            <Edit2 className="w-3 h-3" /> Edit
                          </button>
                          <button onClick={() => handleDeleteServiceFee(fee.id)} className="px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded text-xs font-semibold transition-colors flex items-center gap-1" title="Delete">
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : activeTab === 'Add fund PG charges & commission' ? (
                loading ? (
                  <tr><td colSpan="7" className="px-4 py-8 text-center text-slate-500 border-b border-slate-200">Loading...</td></tr>
                ) : pgCharges.length === 0 ? (
                  <tr><td colSpan="7" className="px-4 py-8 text-center text-slate-500 border-b border-slate-200">No PG charges configured</td></tr>
                ) : (
                  pgCharges.map((row) => (
                    <tr key={row.id} className="bg-white hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-[18px] whitespace-nowrap text-slate-800 font-semibold text-left border-b border-r border-slate-200">{row.method}</td>
                      <td className="px-4 py-[18px] whitespace-nowrap text-slate-600 font-medium text-left border-b border-r border-slate-200">{row.network}</td>
                      <td className="px-4 py-[18px] whitespace-nowrap text-slate-500 text-left border-b border-r border-slate-200">{row.cardType}</td>
                      <td className="px-4 py-[18px] whitespace-nowrap text-slate-500 text-left border-b border-r border-slate-200">{row.subType}</td>
                      <td className="px-4 py-[18px] whitespace-nowrap text-slate-500 text-left border-b border-r border-slate-200">{row.rate.toFixed(2)}</td>
                      <td className="px-4 py-[18px] whitespace-nowrap text-slate-500 text-left border-b border-r border-slate-200">{row.commission.toFixed(2)}</td>
                      <td className="px-4 py-[18px] whitespace-nowrap border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingItem({ ...row, type: 'pg' }); setIsModalOpen(true); }}
                            className="px-4 py-1.5 bg-amber-500 text-white hover:bg-amber-600 rounded text-xs transition-colors" title="Edit"
                          >
                            Edit
                          </button>
                          <button onClick={() => handleDeletePGCharge(row.id)} className="px-4 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded text-xs transition-colors" title="Delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : activeTab === 'Map Commission List' ? (
                <tr>
                  <td colSpan="10" className="px-4 py-12 text-center text-slate-400 font-medium">
                    No commissions found.
                  </td>
                </tr>
              ) : (
                commissionsData.map((row) => (
                  <tr key={row.id} className="bg-white hover:bg-slate-50/80 transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap text-slate-500 font-medium">{row.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-700 font-bold">{row.packages}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-cyan-600 font-semibold">{row.service}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600">{row.subService}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-teal-600 font-bold">₹{row.fromAmount}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-teal-600 font-bold">₹{row.toAmount}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-700 font-medium">{row.charge}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-cyan-600 font-bold">{row.commission}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-red-500 font-medium">{row.tds}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">{row.chargeIn}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                      <span className="px-2.5 py-1 bg-cyan-50 text-cyan-600 rounded-md text-xs font-bold">{row.commissionIn}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">{row.tdsIn}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-cyan-50 text-cyan-600 hover:bg-cyan-600 hover:text-white rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors" title="Delete">
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

      {/* Edit Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
            <div className="bg-cyan-600 px-8 py-6 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold">Edit {
                editingItem.type === 'pg' ? 'PG Charge' :
                  editingItem.type === 'service' ? 'Service Fee' :
                    'Payout Slab'
              }</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <form
              onSubmit={
                editingItem.type === 'pg' ? handleUpdatePGCharge :
                  editingItem.type === 'service' ? handleUpdateServiceFee :
                    handleUpdatePayoutSlab
              }
              className="p-8 space-y-6"
            >
              {editingItem.type === 'pg' ? (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Rate (%)</label>
                    <input
                      type="number" step="0.01" value={editingItem.rate}
                      onChange={(e) => setEditingItem({ ...editingItem, rate: parseFloat(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Commission (%)</label>
                    <input
                      type="number" step="0.01" value={editingItem.commission}
                      onChange={(e) => setEditingItem({ ...editingItem, commission: parseFloat(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              ) : editingItem.type === 'service' ? (
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Fee Amount</label>
                    <input
                      type="number" step="0.01" value={editingItem.feeAmount}
                      onChange={(e) => setEditingItem({ ...editingItem, feeAmount: parseFloat(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-6 ${editingItem.isActive ? 'bg-cyan-500' : 'bg-slate-300'} rounded-full relative cursor-pointer`}
                      onClick={() => setEditingItem({ ...editingItem, isActive: !editingItem.isActive })}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${editingItem.isActive ? 'right-0.5' : 'left-0.5'}`}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-700">Is Active</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Min Amount</label>
                    <input
                      type="number" step="0.01" value={editingItem.minAmount}
                      onChange={(e) => setEditingItem({ ...editingItem, minAmount: parseFloat(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Max Amount</label>
                    <input
                      type="number" step="0.01" value={editingItem.maxAmount}
                      onChange={(e) => setEditingItem({ ...editingItem, maxAmount: parseFloat(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Charge (Rs)</label>
                    <input
                      type="number" step="0.01" value={editingItem.serviceCharge}
                      onChange={(e) => setEditingItem({ ...editingItem, serviceCharge: parseFloat(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
                >
                  Update
                </button>
                <button
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionPlans;
