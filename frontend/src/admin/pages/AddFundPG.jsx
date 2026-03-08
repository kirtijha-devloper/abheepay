import React, { useState, useEffect } from 'react';
import { Wallet, Shield } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddFundPG = () => {
  const [amount, setAmount] = useState('');
  const [pgRates, setPgRates] = useState([]);
  const [loadingRates, setLoadingRates] = useState(true);

  const quickAmounts = [101, 501, 1001, 2001, 5001, 10001];

  useEffect(() => {
    fetchMyPGRates();
  }, []);

  const fetchMyPGRates = async () => {
    try {
      setLoadingRates(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/commissions/pg/my-rates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = response.data;
      setPgRates(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error('Error fetching PG rates:', error);
      toast.error('Failed to load payment method rates');
    } finally {
      setLoadingRates(false);
    }
  };

  const handleProceedToPay = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 101 || numAmount > 128000) {
      toast.error('Please enter a valid amount between ₹101 and ₹1,28,000');
      return;
    }

    // TODO: Integrate actual Payment Gateway logic here
    toast.success(`Initiating payment for ₹${numAmount}`);
  };

  const formatMethodLabel = (row) => {
    if (row.method === 'Upi' || row.method === 'Netbanking') {
      return row.method;
    }

    // For cards, construct the display string logically
    let parts = [];
    if (row.network && row.network !== '-') parts.push(row.network);
    if (row.cardType && row.cardType !== '-') parts.push(row.cardType.charAt(0).toUpperCase() + row.cardType.slice(1));
    if (row.subType && row.subType !== '-') parts.push(row.subType.charAt(0).toUpperCase() + row.subType.slice(1));

    if (parts.length > 0) {
      return `${row.method} (${parts.join(' ')})`;
    }
    return row.method;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <Wallet className="w-8 h-8 text-slate-800" />
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Add Fund (PG)</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Input form */}
        <div className="lg:col-span-7">
          <div className="space-y-6 w-full max-w-[600px]">
            {/* Amount Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-2">
                ENTER AMOUNT
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg font-medium">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount to recharge"
                  className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7367F0]/20 focus:border-[#7367F0] bg-white text-md shadow-sm transition-all"
                />
              </div>
              <p className="text-slate-500 text-sm mt-2 font-medium">Minimum ₹101, Maximum ₹1,28,000</p>
            </div>

            {/* Quick Select Buttons */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-widest mb-3">
                QUICK SELECT
              </label>
              <div className="grid grid-cols-3 gap-4">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="py-3 border border-slate-200 rounded-lg text-slate-700 font-medium hover:border-[#7367F0] hover:text-[#7367F0] bg-white shadow-sm transition-all"
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={handleProceedToPay}
              className="w-full bg-[#7367F0] hover:bg-[#6559cc] text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] mt-4"
            >
              <span>➔</span> Proceed to Pay
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 mt-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Secure & encrypted payment processing</span>
            </div>
          </div>
        </div>

        {/* Right Column - Rates Table */}
        <div className="lg:col-span-5">
          <h2 className="text-[15px] font-bold text-slate-800 mb-4 tracking-tight">Payment Method Rates</h2>
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#f8f9fa] border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 font-bold text-[11px] uppercase tracking-wider text-slate-600">Method</th>
                  <th className="px-5 py-3.5 font-bold text-[11px] uppercase tracking-wider text-slate-600 text-right">Rate (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loadingRates ? (
                  <tr>
                    <td colSpan="2" className="px-5 py-8 text-center text-slate-400 font-medium">
                      Loading rates...
                    </td>
                  </tr>
                ) : pgRates.length === 0 ? (
                  <tr>
                    <td colSpan="2" className="px-5 py-8 text-center text-slate-400 font-medium">
                      No PG rates found.
                    </td>
                  </tr>
                ) : (
                  pgRates.map((rateObj) => (
                    <tr key={rateObj.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5 text-[#7367F0] font-medium whitespace-nowrap">
                        {formatMethodLabel(rateObj)}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 font-medium text-right">
                        {rateObj.rate.toFixed(2)}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFundPG;
