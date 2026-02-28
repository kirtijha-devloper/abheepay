import React, { useState } from 'react';
import { kycsData } from '../data/mockData';
import {
  Search,
  Filter,
  Download,
  FileCheck,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown
} from 'lucide-react';

const KycRequested = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    let bg = 'bg-slate-100 text-slate-600';
    let dot = 'bg-slate-500';

    if (status?.toLowerCase() === 'verified' || status?.toLowerCase() === 'approved') {
      bg = 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50';
      dot = 'bg-emerald-500';
    } else if (status?.toLowerCase() === 'pending') {
      bg = 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50';
      dot = 'bg-amber-500';
    } else if (status?.toLowerCase() === 'rejected') {
      bg = 'bg-red-50 text-red-700 ring-1 ring-red-200/50';
      dot = 'bg-red-500';
    }

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${bg}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
            <span className="hover:text-cyan-600 cursor-pointer transition-colors">Admin</span>
            <span>/</span>
            <span className="text-slate-800">KYC Requests</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <FileCheck className="w-8 h-8 text-cyan-500" />
            KYC Applications
          </h1>
          <p className="text-slate-500 font-medium h-[20px]">
            Review and manage all pending KYC requests from outlets.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="px-4 py-2.5 bg-cyan-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-cyan-700 transition-all shadow-sm shadow-cyan-500/20 active:scale-[0.98]">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

        {/* Table Controls (Search & Entries) */}
        <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-100 bg-slate-50/50">

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-sm font-semibold text-slate-500">Show</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold text-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer shadow-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-sm font-semibold text-slate-500">entries</span>
          </div>

          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID, Name, or Mobile..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-sm placeholder:text-slate-400 transition-all"
            />
          </div>
        </div>

        {/* Table itself */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Outlet ID</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">User Name</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Contact Info</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Documents</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Bank Details</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">KYC Status</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {kycsData.map((row, index) => (
                <tr key={index} className="hover:bg-cyan-50/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      #{row.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-sm shrink-0">
                        {row.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-700">{row.mobile}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{row.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded">PAN</span>
                      {row.pan}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs">
                      <div className="font-bold text-slate-700 mb-0.5">{row.accountNo}</div>
                      <div className="font-medium text-slate-500">IFSC: <span className="text-slate-700">{row.ifsc}</span></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex flex-col gap-1 items-start">
                    <StatusBadge status={row.kycStatus} />
                    <div className="text-[10px] font-medium text-slate-400 mt-1">
                      {row.date} {row.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors focus:outline-none">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {kycsData.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <FileCheck className="w-12 h-12 mb-3 text-slate-300" strokeWidth={1.5} />
                      <p className="text-base font-semibold text-slate-600">No KYC requests found</p>
                      <p className="text-sm mt-1">All applications have been processed.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-slate-700">1</span> to <span className="font-bold text-slate-700">10</span> of <span className="font-bold text-slate-700">{kycsData.length}</span> entries
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1.5 bg-cyan-600 text-white rounded-lg text-sm font-bold shadow-sm">1</button>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-white transition-colors">2</button>
            <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-white transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycRequested;

