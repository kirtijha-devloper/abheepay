import React, { useState, useEffect } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { apiRequest } from '../../services/api';

const Ledger = () => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(`/wallet/transactions?startDate=${startDate}&endDate=${endDate}`);
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Wallet Passbook Statements</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wider">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wider">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <button
              onClick={fetchTransactions}
              disabled={loading}
              className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Filter
            </button>
          </div>
          <div className="w-full md:w-1/4">
            <button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
              Export to Excel
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left align-middle">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">#</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Date Time</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">User ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap">Description</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Order ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Opening</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Credit</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Debit</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Closing</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Meta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((row, idx) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line text-xs">
                    {new Date(row.createdAt).toLocaleDateString()}<br />
                    {new Date(row.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-4 text-center text-xs">
                    <span className="text-blue-600 font-medium">{row.user.email}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-600 text-xs max-w-xs">
                    {row.description}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600 text-xs break-words">{row.id.substring(0, 12)}...</td>
                  <td className="px-4 py-4 text-right text-gray-600 font-medium">₹{(row.balanceAfter - (row.type === 'CREDIT' ? row.amount : -row.amount)).toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-green-500 font-bold">{row.type === 'CREDIT' ? `+₹${row.amount.toLocaleString()}` : ''}</td>
                  <td className="px-4 py-4 text-right text-red-500 font-bold">{row.type === 'DEBIT' ? `-₹${row.amount.toLocaleString()}` : ''}</td>
                  <td className="px-4 py-4 text-right text-gray-800 font-bold">₹{row.balanceAfter.toLocaleString()}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${row.status === 'SUCCESS' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && !loading && (
                <tr>
                  <td colSpan="10" className="px-4 py-10 text-center text-gray-400">No transactions found for the selected period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing 1 to {transactions.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 bg-gray-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-[#00D2CC] bg-[#00D2CC] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
