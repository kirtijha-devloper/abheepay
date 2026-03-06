import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye
} from 'lucide-react';
import { apiRequest } from '../../services/api';
import storage from '../../utils/storage';

const FundRequests = () => {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'history'
  const [requestType, setRequestType] = useState('received'); // 'received' | 'sent'
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [raiseData, setRaiseData] = useState({ amount: '', mode: 'UPI', utr: '', companyAccount: '', remark: '' });

  const userRole = storage.get('userRole');
  const isAdmin = userRole === 'ADMIN';
  const isRetailer = userRole === 'RETAILER';

  // Initialize requestType based on role
  useEffect(() => {
    if (isRetailer) setRequestType('sent');
  }, [isRetailer]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const statusParam = activeTab === 'pending' ? 'PENDING' : '';
      let url = `/funds/requests?status=${statusParam}&search=${search}&page=${page}&type=${requestType}`;
      if (fromDate) url += `&fromDate=${fromDate}`;
      if (toDate) url += `&toDate=${toDate}`;

      const response = await apiRequest(url, 'GET');
      setRequests(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching fund requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [activeTab, requestType, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRequests();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this request?`)) return;

    try {
      await apiRequest(`/funds/status/${id}`, 'PATCH', { status: newStatus });
      alert(`Request ${newStatus.toLowerCase()} successfully`);
      fetchRequests();
    } catch (error) {
      alert("Error updating status: " + error.message);
    }
  };

  const handleRaiseSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/funds/request', 'POST', raiseData);
      alert("Fund request raised successfully!");
      setShowRaiseModal(false);
      setRaiseData({ amount: '', mode: 'UPI', utr: '', companyAccount: '', remark: '' });
      fetchRequests();
    } catch (error) {
      alert("Error raising request: " + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'PENDING': { bg: 'bg-amber-100', text: 'text-amber-700', icon: <Clock size={12} />, label: 'Pending' },
      'APPROVED': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: <CheckCircle2 size={12} />, label: 'Approved' },
      'REJECTED': { bg: 'bg-rose-100', text: 'text-rose-700', icon: <XCircle size={12} />, label: 'Rejected' },
    };
    const b = badges[status] || { bg: 'bg-slate-100', text: 'text-slate-600', icon: null, label: status };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${b.bg} ${b.text} flex items-center gap-1 w-fit`}>
        {b.icon} {b.label}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header and Type Toggles */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-slate-800">Fund Requests</h1>

          <div className="flex items-center gap-4">
            {/* Hierarchical Toggle (Received vs Sent) */}
            {!isAdmin && !isRetailer && (
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setRequestType('received')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${requestType === 'received' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Requests Received
                </button>
                <button
                  onClick={() => setRequestType('sent')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${requestType === 'sent' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  My Requests
                </button>
              </div>
            )}

            {/* Status Toggle (Pending vs History) */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'pending' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-6 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'history' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                History
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!isAdmin && (
          <button
            onClick={() => setShowRaiseModal(true)}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
          >
            + Raise Fund Request
          </button>
        )}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-white flex flex-col md:flex-row gap-3 items-center">
          <div className="flex flex-1 items-center gap-3 w-full">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-slate-600 text-sm md:w-48"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-slate-600 text-sm md:w-48"
            />
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search UTR, Account, User..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 text-slate-600 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleSearch}
              className="px-7 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all"
            >
              Search
            </button>
            <button className="px-7 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all">
              Export
            </button>
          </div>
        </div>

        {/* Entries control (Matches Screenshot) */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <select className="bg-white border rounded p-1 outline-none font-medium">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="font-medium">entries per page</span>
          </div>
          <div className="relative max-w-xs w-full md:w-72">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">#</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">User Details</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Company A/C</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Amount</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">UTR / Mode</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Date/Remark</th>
                <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Status</th>
                {requestType === 'received' && activeTab === 'pending' && (
                  <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-slate-500 font-medium">Loading requests...</p>
                    </div>
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-20 text-center">
                    <p className="text-slate-400 font-medium italic">No entries found</p>
                  </td>
                </tr>
              ) : (
                requests.map((request, idx) => (
                  <tr key={request.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50">
                    <td className="px-4 py-4 text-xs text-slate-500">{(page - 1) * 10 + idx + 1}</td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-800 text-sm">{request.user.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{request.user.mobile}</div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600 font-medium">{request.companyAccount || 'Default'}</td>
                    <td className="px-4 py-4 text-sm font-black text-slate-900 text-right">₹{request.amount.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className="text-[11px] font-mono text-slate-600">{request.utr}</div>
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">{request.mode}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-[10px] text-slate-500 italic mb-1 truncate max-w-[120px]">{request.remark || 'No remark'}</div>
                      <div className="text-[9px] text-slate-400">{new Date(request.createdAt).toLocaleString()}</div>
                    </td>
                    <td className="px-4 py-4">{getStatusBadge(request.status)}</td>
                    {requestType === 'received' && activeTab === 'pending' && (
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleStatusUpdate(request.id, 'APPROVED')} className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded hover:bg-emerald-600">Approve</button>
                          <button onClick={() => handleStatusUpdate(request.id, 'REJECTED')} className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded hover:bg-rose-600">Reject</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 border rounded-lg bg-white disabled:opacity-30"><ChevronLeft size={14} /></button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 border rounded-lg bg-white disabled:opacity-30"><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>

      {/* Raise Request Modal */}
      {showRaiseModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/30">
              <h2 className="text-xl font-bold text-slate-800">Raise Fund Request</h2>
              <button onClick={() => setShowRaiseModal(false)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-all">
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleRaiseSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Amount (₹)</label>
                  <input
                    required type="number"
                    value={raiseData.amount}
                    onChange={(e) => setRaiseData({ ...raiseData, amount: e.target.value })}
                    placeholder="Min 100"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Payment Mode</label>
                  <select
                    value={raiseData.mode}
                    onChange={(e) => setRaiseData({ ...raiseData, mode: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-semibold"
                  >
                    <option value="UPI">UPI</option>
                    <option value="NEFT">NEFT / IMPS</option>
                    <option value="CASH">CASH DEPOSIT</option>
                    <option value="RTGS">RTGS</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">UTR Number / Transaction ID</label>
                <input
                  required type="text"
                  value={raiseData.utr}
                  onChange={(e) => setRaiseData({ ...raiseData, utr: e.target.value })}
                  placeholder="Paste UTR here"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Company Bank Account</label>
                <input
                  required type="text"
                  value={raiseData.companyAccount}
                  onChange={(e) => setRaiseData({ ...raiseData, companyAccount: e.target.value })}
                  placeholder="Bank A/C where you paid"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Remark (Optional)</label>
                <textarea
                  value={raiseData.remark}
                  onChange={(e) => setRaiseData({ ...raiseData, remark: e.target.value })}
                  placeholder="Any additional info..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all h-20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 mt-4 active:scale-95"
              >
                SUBMIT REQUEST
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundRequests;
