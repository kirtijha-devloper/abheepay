import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const OldAllTransaction = () => {
  const [fromDate, setFromDate] = useState('2026-02-25');
  const [toDate, setToDate] = useState('2025-10-10'); // Simulated older end date

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">Ledger Statement</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <div className="w-full md:w-64">
            <label className="block text-sm text-gray-700 mb-1">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-600 bg-white"
            />
          </div>
          <div className="w-full md:w-64">
            <label className="block text-sm text-gray-700 mb-1">To</label>
            <input
              type="text"
              value={toDate}
              readOnly
              className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none text-gray-500 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="w-full md:w-40">
            <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
              Search
            </button>
          </div>
          <div className="w-full md:w-40">
            <button className="w-full bg-[#84cc16] hover:bg-[#65a30d] text-white font-medium py-2 px-4 rounded-md transition-colors shadow-sm">
              Export
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full text-sm text-left align-middle">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">#</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Date Time</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Transaction Ref</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Services</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Retailer Phone</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Description</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">RRN/UTR No</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Status</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Opening Bal</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Credit</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Debit</th>
                <th className="px-4 py-4 font-bold uppercase whitespace-nowrap text-center">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="12" className="px-6 py-6 text-center text-gray-500 font-medium">
                  No transactions found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OldAllTransaction;
