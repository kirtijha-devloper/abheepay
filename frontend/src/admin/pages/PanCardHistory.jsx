import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const mockPanData = [
  {
    sr: 39,
    orderId: 'PAN1739352075',
    retailerName: 'ASHFAK HUSSAIN',
    retailerId: 'APD961161',
    number: '9784610768',
    mode: 'ESIGN',
    apply: 'New',
    balance: '107.00',
    status: 'SUCCESS',
    applyOn: '12-02-2025 14:51:25'
  },
  {
    sr: 38,
    orderId: 'PAN1739192389',
    retailerName: 'Nitin Kumar',
    retailerId: 'APD198445',
    number: '7340792524',
    mode: 'EKYC',
    apply: 'New',
    balance: '107.00',
    status: 'SUCCESS',
    applyOn: '10-02-2025 18:29:53'
  },
  {
    sr: 37,
    orderId: 'PAN1739191891',
    retailerName: 'Nitin Kumar',
    retailerId: 'APD198445',
    number: '6239553233',
    mode: 'EKYC',
    apply: 'New',
    balance: '107.00',
    status: 'SUCCESS',
    applyOn: '10-02-2025 18:21:36'
  },
  {
    sr: 36,
    orderId: 'PAN1739191836',
    retailerName: 'Nitin Kumar',
    retailerId: 'APD198445',
    number: '8544874489',
    mode: 'EKYC',
    apply: 'New',
    balance: '0.00',
    status: 'Failure',
    applyOn: '10-02-2025 18:20:37'
  },
  {
    sr: 35,
    orderId: 'PAN1739191459',
    retailerName: 'Nitin Kumar',
    retailerId: 'APD198445',
    number: '8544874489',
    mode: 'EKYC',
    apply: 'New',
    balance: '0.00',
    status: 'SUCCESS',
    applyOn: '10-02-2025 18:14:24'
  },
  {
    sr: 34,
    orderId: 'PAN1738928831',
    retailerName: 'Nitin Kumar',
    retailerId: 'APD198445',
    number: '9888777776',
    mode: 'ESIGN',
    apply: 'Correction',
    balance: '0.00',
    status: 'Failure',
    applyOn: '07-02-2025 17:17:12'
  },
  {
    sr: 33,
    orderId: 'PAN1738928814',
    retailerName: 'Nitin Kumar',
    retailerId: 'APD198445',
    number: '9888777776',
    mode: 'EKYC',
    apply: 'Correction',
    balance: '0.00',
    status: 'SUCCESS',
    applyOn: '07-02-2025 17:16:59'
  },
  {
    sr: 32,
    orderId: 'PAN1737617794',
    retailerName: 'Tester',
    retailerId: 'APD820213',
    number: '9621122159',
    mode: 'EKYC',
    apply: 'Correction',
    balance: '107.00',
    status: 'FAILED',
    applyOn: '23-01-2025 13:06:34'
  },
  {
    sr: 31,
    orderId: 'PAN1737617498',
    retailerName: 'Tester',
    retailerId: 'APD820213',
    number: '9621122159',
    mode: 'EKYC',
    apply: 'New',
    balance: '107.00',
    status: 'FAILED',
    applyOn: '23-01-2025 13:01:39'
  },
  {
    sr: 30,
    orderId: 'PAN1737617472',
    retailerName: 'Tester',
    retailerId: 'APD820213',
    number: '9621122159',
    mode: 'EKYC',
    apply: 'New',
    balance: '107.00',
    status: 'FAILED',
    applyOn: '23-01-2025 13:01:18'
  },
];

const PanCardHistory = () => {
  const [entries, setEntries] = useState('10');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">PAN Responses</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

        {/* Pan Card Balance Button */}
        <div className="mb-8">
          <button className="bg-[#84cc16] hover:bg-[#65a30d] text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm text-sm">
            Pan Card Balance ₹0.00
          </button>
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
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">SR</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Order ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Retailer Name</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Retailer ID</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Number</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Mode</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Apply</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Balance</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Status</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Apply On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPanData.map((row) => (
                <tr key={row.sr} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.sr}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.orderId}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100 uppercase">{row.retailerName}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.retailerId}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.number}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.mode}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.apply}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.balance}</td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-100">{row.status}</td>
                  <td className="px-4 py-4 text-center text-gray-600">{row.applyOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PanCardHistory;
