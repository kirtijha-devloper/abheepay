import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const mockAepsData = [
  {
    id: 484,
    mobile: '9911290350',
    reference: 'P250528110817ASHMN',
    bankName: 'Punjab\nNational\nBank',
    amount: '10000.00',
    commissions: '',
    status: 'Failed',
    opening: '1906.24',
    closing: '1906.24',
    type: 'CR',
    accountNo: 'xxxxxxxxx9252',
    dateTime: '2025-\n05-28\n11:08:22'
  },
  {
    id: 483,
    mobile: '9911290350',
    reference: 'P250527104200BTPQJ',
    bankName: 'UCO\nBANK',
    amount: '1000.00',
    commissions: '2.25',
    status: 'Success',
    opening: '903.99',
    closing: '1903.99',
    type: 'CR',
    accountNo: 'xxxxxxxxx4529',
    dateTime: '2025-\n05-27\n10:42:06'
  }
];

const AepsStatement = () => {
  const [entries, setEntries] = useState('10');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">AePS Statement</span>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-medium mb-2">Today Transactions</h3>
          <p className="text-xl font-medium text-gray-800">₹ 0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-medium mb-2">Today Success</h3>
          <p className="text-xl font-medium text-gray-800">₹ 0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-medium mb-2">Monthly Transaction</h3>
          <p className="text-xl font-medium text-gray-800">₹ 0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
          <h3 className="text-gray-700 font-medium mb-2">Monthly Success</h3>
          <p className="text-xl font-medium text-gray-800">₹ 0</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <div className="w-full md:w-1/3">
            <label className="block text-sm text-gray-700 mb-1">Start Date & Time</label>
            <div className="relative">
              <input
                type="text"
                placeholder="mm/dd/yyyy --:-- --"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-400 bg-white"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm text-gray-700 mb-1">End Date & Time</label>
            <div className="relative">
              <input
                type="text"
                placeholder="mm/dd/yyyy --:-- --"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-400 bg-white"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex gap-2">
            <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm">
              Filter
            </button>
            <button className="bg-[#84cc16] hover:bg-[#65a30d] text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm">
              Export
            </button>
          </div>
        </div>

        {/* Table Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 mt-12">
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
            <thead className="text-[11px] text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">#</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Mobile</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Reference</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Bank<br />Name</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Amount</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Commissions</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Status</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Opening</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Closing</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Type</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Account<br />No</th>
                <th className="px-3 py-4 font-bold uppercase whitespace-nowrap text-center">Date<br />& Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAepsData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.id}</td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.mobile}</td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.reference}</td>
                  <td className="px-3 py-4 text-center text-gray-600 whitespace-pre-line border-r border-gray-100">{row.bankName}</td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.amount}</td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.commissions}</td>
                  <td className="px-3 py-4 text-center border-r border-gray-100">
                    {row.status === 'Failed' ? (
                      <span className="text-red-500">{row.status}</span>
                    ) : (
                      <span className="px-2 py-1 text-[11px] text-white rounded bg-[#84cc16]">{row.status}</span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.opening}</td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.closing}</td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.type}</td>
                  <td className="px-3 py-4 text-center text-gray-600 border-r border-gray-100">{row.accountNo}</td>
                  <td className="px-3 py-4 text-center text-gray-600 whitespace-pre-line leading-snug text-[11px]">{row.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AepsStatement;
