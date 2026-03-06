import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const mockTransferData = [
  {
    sl: 63,
    dateTime: '25 Feb 2026\n05:49 PM',
    transferId: 'TXN20260225174933699EE8D5656F0',
    sender: 'ADMIN | Akash Kumar (admin)',
    receiverId: 'APR638427',
    opening: '-956,912.79',
    credit: '',
    debit: '29,366.00',
    closing: '-986,278.79'
  },
  {
    sl: 62,
    dateTime: '25 Feb 2026\n05:49 PM',
    transferId: 'TXN20260225174933699EE8D540C08',
    sender: 'ADMIN | Akash Kumar (admin)',
    receiverId: 'APR638427',
    opening: '-927,546.79',
    credit: '',
    debit: '29,366.00',
    closing: '-956,912.79'
  },
  {
    sl: 61,
    dateTime: '25 Feb 2026\n05:33 PM',
    transferId: 'TXN20260225173326699EE50EC3DEE',
    sender: 'ADMIN | Akash Kumar (admin)',
    receiverId: 'APR638427',
    opening: '-839,146.79',
    credit: '',
    debit: '88,400.00',
    closing: '-927,546.79'
  },
  {
    sl: 60,
    dateTime: '25 Feb 2026\n05:28 PM',
    transferId: 'TXN20260225172808699EE3D028E0C',
    sender: 'ADMIN | Akash Kumar (admin)',
    receiverId: 'APR638427',
    opening: '-760,880.79',
    credit: '',
    debit: '78,266.00',
    closing: '-839,146.79'
  },
];

const FundTransfer = () => {
  const [fromDate, setFromDate] = useState('2026-02-25');
  const [toDate, setToDate] = useState('2026-02-25');
  const [entries, setEntries] = useState('10');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">Wallet Transaction History</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Wallet Transaction Report</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
              Get
            </button>
          </div>
          <div className="w-full md:w-1/4">
            <button className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
              Export to CSV
            </button>
          </div>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <select
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 mr-2 focus:outline-none focus:border-blue-500"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            entries per page
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm w-full md:w-64"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm text-left align-middle">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">SL</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Date Time</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Transfer ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Sender</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Receiver ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Opening</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Credit</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Debit</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-right">Closing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTransferData.map((row) => (
                <tr key={row.sl} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-600">{row.sl}</td>
                  <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line">{row.dateTime}</td>
                  <td className="px-4 py-4 text-center text-gray-600 font-mono text-xs">{row.transferId}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{row.sender}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{row.receiverId}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{row.opening}</td>
                  <td className="px-4 py-4 text-right text-green-500 font-medium">{row.credit}</td>
                  <td className="px-4 py-4 text-right text-red-500 font-medium">{row.debit}</td>
                  <td className="px-4 py-4 text-right text-gray-800 font-medium">{row.closing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>Showing 1 to {mockTransferData.length} of {mockTransferData.length} entries</span>
          <div className="flex gap-1 mt-4 md:mt-0">
            <button className="px-3 py-1 border border-gray-200 rounded text-gray-400 bg-gray-50 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-[#7C3AED] bg-[#7C3AED] text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 text-gray-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTransfer;
