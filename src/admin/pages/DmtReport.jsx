import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const DmtReport = () => {
  const [startDate, setStartDate] = useState('2026-02-25');
  const [endDate, setEndDate] = useState('2026-02-25');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">DMT Statement (Datewise)</span>
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
              Get DMT Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-gray-700 font-medium text-sm">DMT Report Results</h2>
        </div>

        <div className="py-20 text-center">
          <p className="text-gray-800 font-medium">No DMT transactions found for the selected date range.</p>
        </div>
      </div>
    </div>
  );
};

export default DmtReport;
