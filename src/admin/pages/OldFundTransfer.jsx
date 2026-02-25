import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const mockTransferData = [
  {
    id: 1,
    dateTime: '2026-02-25\n17:49:33',
    transferId: 'AbheePay699ce8d56246f',
    senderId: 'Akash Kumar\n(admin)',
    receiverId: 'APR638427',
    amount: '29366.00',
    openingBal: '99989.52',
    closingBal: '70623.52',
    remark: 'Balance transfer by admin | ID DEBIT & TRF IN QR'
  },
  {
    id: 2,
    dateTime: '2026-02-25\n17:49:33',
    transferId: 'AbheePay699ee8d53ddaf',
    senderId: 'Akash Kumar\n(admin)',
    receiverId: 'APR638427',
    amount: '29366.00',
    openingBal: '129355.52',
    closingBal: '99989.52',
    remark: 'Balance transfer by admin | ID DEBIT & TRF IN QR'
  },
  {
    id: 3,
    dateTime: '2026-02-25\n17:33:26',
    transferId: 'AbheePay699ee50ec138b',
    senderId: 'Akash Kumar\n(admin)',
    receiverId: 'APR638427',
    amount: '88400.00',
    openingBal: '119312.14',
    closingBal: '30912.14',
    remark: 'Balance transfer by admin | ID DEBIT & TRF IN QR'
  },
  {
    id: 4,
    dateTime: '2026-02-25\n17:28:08',
    transferId: 'AbheePay699ee3d025636',
    senderId: 'Akash Kumar\n(admin)',
    receiverId: 'APR638427',
    amount: '78266.00',
    openingBal: '197578.14',
    closingBal: '119312.14',
    remark: 'Balance transfer by admin | ID DEBIT & TRF IN A/C'
  },
];

const OldFundTransfer = () => {
  const [fromDate, setFromDate] = useState('2026-02-25');
  const [toDate, setToDate] = useState('10/10/2025');
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
        <h1 className="text-xl font-bold text-gray-800 mb-6">Wallet Transaction History <span className="text-orange-500">(Till 10-10-2025)</span></h1>

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
              type="text"
              value={toDate}
              readOnly
              className="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none text-gray-500 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="w-full md:w-1/4">
            <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
              Get
            </button>
          </div>
          <div className="w-full md:w-1/4">
            <button className="w-full bg-[#84cc16] hover:bg-[#65a30d] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
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
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full text-sm text-left align-middle">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Date Time</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Transfer ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Sender ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Receiver ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Amount</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Opening Balance</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Closing Balance</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTransferData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.id}</td>
                  <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line border-r border-gray-100">{row.dateTime}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.transferId}</td>
                  <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line border-r border-gray-100">{row.senderId}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.receiverId}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.amount}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.openingBal}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.closingBal}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{row.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OldFundTransfer;
