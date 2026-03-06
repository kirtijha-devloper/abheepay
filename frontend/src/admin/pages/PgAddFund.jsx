import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const mockPgData = [
  {
    id: 1,
    dateTime: '25-02-2026\n06:21:12 PM',
    orderId: 'order_SKNvDvxKelYgxi',
    customer: 'AMANDEEP\nSINGH\nAPR638427',
    amount: '₹24,984.00',
    status: 'INITIATED',
    method: 'N/A',
    charges: '₹0.00',
  },
  {
    id: 2,
    dateTime: '25-02-2026\n06:18:33 PM',
    orderId: 'order_SKNsPj2przMoBA',
    customer: 'AMANDEEP\nSINGH\nAPR638427',
    amount: '₹49,897.00',
    status: 'CAPTURED',
    method: 'card',
    charges: '₹648.66',
  },
  {
    id: 3,
    dateTime: '25-02-2026\n06:14:36 PM',
    orderId: 'order_SKNoEjAlImEDmI',
    customer: 'AMANDEEP\nSINGH\nAPR638427',
    amount: '₹49,814.00',
    status: 'CAPTURED',
    method: 'card',
    charges: '₹647.58',
  },
  {
    id: 4,
    dateTime: '25-02-2026\n06:12:41 PM',
    orderId: 'order_SKNmE1dpF5nd7I',
    customer: 'AMANDEEP\nSINGH\nAPR638427',
    amount: '₹17,989.00',
    status: 'CAPTURED',
    method: 'card',
    charges: '₹233.86',
  }
];

const PgAddFund = () => {
  const [startDate, setStartDate] = useState('2026-02-25');
  const [endDate, setEndDate] = useState('2026-02-25');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">Razorpay Payment Report</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
          <div className="w-full md:w-1/3">
            <label className="block text-sm text-gray-700 mb-1">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm text-gray-700 mb-1">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-1/3">
            <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2.5 px-4 rounded-md transition-colors shadow-sm">
              Get Razorpay Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-800 text-lg">Razorpay Payment Report Results</h2>
          <div className="flex gap-2">
            <button className="bg-[#00D2CC] hover:bg-[#00B8B2] text-white font-medium py-1.5 px-4 rounded transition-colors text-sm">
              Client Payments Report
            </button>
            <button className="bg-[#84cc16] hover:bg-[#65a30d] text-white font-medium py-1.5 px-4 rounded transition-colors text-sm">
              Export to Excel
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 rounded-sm">
          <table className="w-full text-sm text-left align-middle">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">#</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Date Time</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Order ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Customer</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Amount</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Status</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Method</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Charges</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPgData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.id}</td>
                  <td className="px-4 py-4 text-center text-gray-500 whitespace-pre-line border-r border-gray-100 px-8">{row.dateTime}</td>
                  <td className="px-4 py-4 text-center text-gray-500 border-r border-gray-100">{row.orderId}</td>
                  <td className="px-4 py-4 text-center text-gray-500 whitespace-pre-line border-r border-gray-100">{row.customer}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.amount}</td>
                  <td className="px-4 py-4 text-center border-r border-gray-100">
                    <span className={`px-2 py-1 text-[10px] font-bold text-white rounded ${row.status === 'CAPTURED' ? 'bg-[#84cc16]' : 'bg-gray-500'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-gray-500 border-r border-gray-100">{row.method}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.charges}</td>
                  <td className="px-4 py-4 text-center">
                    <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs py-1 px-3 rounded shadow-sm">
                      View<br />Response
                    </button>
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

export default PgAddFund;
