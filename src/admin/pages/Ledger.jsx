import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const mockLedgerData = [
  {
    id: 172,
    dateTime: '25 Feb 2026\n05:48 PM',
    userId: 'APR428097\nGOURAV BANSAL',
    description: 'Wallet Recharge for the amount of Rs. 120121.00 and charges is Rs. 1801.815 for order id order_SKNJC8PvasOlOr',
    orderId: 'order_SKNJC8PvasOlOr',
    opening: '14,715.79',
    credit: '118,319.19',
    debit: '',
    closing: '133,034.98'
  },
  {
    id: 171,
    dateTime: '25 Feb 2026\n05:46 PM',
    userId: 'APR638427\nAMANDEEP SINGH',
    description: 'Wallet Recharge for the amount of Rs. 49862.00 and charges is Rs. 648.206 for order id order_SKNIDKYoJ3xnFz',
    orderId: 'order_SKNIDKYoJ3xnFz',
    opening: '80,141.73',
    credit: '49,213.79',
    debit: '',
    closing: '129,355.52'
  },
  {
    id: 170,
    dateTime: '25 Feb 2026\n05:39 PM',
    userId: 'APR638427\nAMANDEEP SINGH',
    description: 'Wallet Recharge for the amount of Rs. 49878.00 and charges is Rs. 648.414 for order id order_SKNC1CqwqfL8ae',
    orderId: 'order_SKNC1CqwqfL8ae',
    opening: '30,912.14',
    credit: '49,229.59',
    debit: '',
    closing: '80,141.73'
  },
];

const Ledger = () => {
  const [startDate, setStartDate] = useState('2026-02-25');
  const [endDate, setEndDate] = useState('2026-02-25');

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
            <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
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
              {mockLedgerData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-500">{row.id}</td>
                  <td className="px-4 py-4 text-center text-gray-600 whitespace-pre-line">{row.dateTime}</td>
                  <td className="px-4 py-4 text-center whitespace-pre-line">
                    <span className="text-blue-600 font-medium">{row.userId.split('\n')[0]}</span>
                    <br />
                    <span className="text-blue-600">{row.userId.split('\n')[1]}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-600 max-w-xs md:max-w-md lg:max-w-lg">
                    {row.description}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600 break-words">{row.orderId}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{row.opening}</td>
                  <td className="px-4 py-4 text-right text-green-500 font-medium">{row.credit}</td>
                  <td className="px-4 py-4 text-right text-red-500 font-medium">{row.debit}</td>
                  <td className="px-4 py-4 text-right text-gray-800 font-medium">{row.closing}</td>
                  <td className="px-4 py-4 text-center">
                    <button className="bg-[#00D2CC] hover:bg-[#00B8B2] text-white text-xs font-medium py-1.5 px-3 rounded transition-colors">
                      Meta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing 1 to {mockLedgerData.length} of {mockLedgerData.length} entries</span>
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
