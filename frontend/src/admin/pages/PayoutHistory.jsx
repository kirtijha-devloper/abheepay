import React, { useState } from 'react';
import { ChevronRight, LayoutGrid } from 'lucide-react';

const mockPayoutData = [
  {
    id: 1,
    dateTime: '25-02-\n2026\n18:21:03',
    userDetails: 'AKASH ANIL\nPANDEY\n9372473413',
    requestId: 'AP0000012297_Refund',
    beneficiaryDetails: 'MR ASHISH\nKUMAR\nA/C: 20527552896\nIFSC: SBIN0011690',
    amount: '₹5,848.00',
    charge: '₹20.00',
    api: 'BranchX',
    status: 'FAILED_REFUND'
  },
  {
    id: 2,
    dateTime: '25-02-\n2026\n17:45:10',
    userDetails: 'PRASHANT\nKUMAR\n9876543210',
    requestId: 'AP0000012296_Trf',
    beneficiaryDetails: 'RAHUL\nSHARMA\nA/C: 30458712901\nIFSC: HDFC0001234',
    amount: '₹12,500.00',
    charge: '₹15.00',
    api: 'BranchX',
    status: 'SUCCESS'
  }
];

const PayoutHistory = () => {
  const [fromDate, setFromDate] = useState('2026-02-25');
  const [toDate, setToDate] = useState('2026-02-25');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">Payout Report</span>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-medium mb-2">Total Transactions</h3>
          <p className="text-xl font-bold text-gray-800">₹ 932,760.00</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-medium mb-2">Success</h3>
          <p className="text-xl font-bold text-gray-800">₹ 0.00</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-medium mb-2">Failed</h3>
          <p className="text-xl font-bold text-gray-800">₹ 456,365.00</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-gray-700 mb-1">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-gray-700 mb-1">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="UTR, Ref ID, etc."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/4 flex gap-2">
            <button className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
              Search
            </button>
            <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
              Reset
            </button>
            <button className="flex-1 bg-[#84cc16] hover:bg-[#65a30d] text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
              Export CSV
            </button>
          </div>
        </div>

        {/* Table Title */}
        <div className="flex items-center text-gray-700 font-medium mb-4">
          <LayoutGrid className="w-5 h-5 mr-2" />
          <h2 className="text-md">Payout Transactions</h2>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full text-sm text-left align-middle">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">#</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Date & Time</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">User Details</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Request ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Beneficiary Details</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Amount</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Charge</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">API</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPayoutData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-500 border-r border-gray-100">{row.id}</td>
                  <td className="px-4 py-4 text-center text-gray-500 whitespace-pre-line border-r border-gray-100">{row.dateTime}</td>
                  <td className="px-4 py-4 text-center text-gray-500 whitespace-pre-line border-r border-gray-100">{row.userDetails}</td>
                  <td className="px-4 py-4 text-center text-gray-500 border-r border-gray-100">{row.requestId}</td>
                  <td className="px-4 py-4 text-center text-gray-500 whitespace-pre-line border-r border-gray-100 leading-relaxed text-xs text-left">{row.beneficiaryDetails}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.amount}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.charge}</td>
                  <td className="px-4 py-4 text-center text-gray-500 border-r border-gray-100">{row.api}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-2 py-1 text-[10px] font-bold text-white rounded bg-gray-500`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayoutHistory;
