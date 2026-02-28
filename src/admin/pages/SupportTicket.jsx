import React, { useState } from 'react';
import { HeadphonesIcon, MessageSquarePlus, LifeBuoy, Clock, CheckCircle2, Search, SendHorizontal } from 'lucide-react';

const SupportTicket = () => {
  const [activeTab, setActiveTab] = useState('create');

  const tickets = [
    { id: 'TKT-2026-8012', subject: 'Transaction Failed but Amount Deducted', status: 'Pending', date: 'Oct 24, 2026', priority: 'High' },
    { id: 'TKT-2026-6453', subject: 'Commission structure not reflecting correctly', status: 'Resolved', date: 'Oct 15, 2026', priority: 'Normal' },
    { id: 'TKT-2026-1120', subject: 'Morpho RD Service connection issue', status: 'Resolved', date: 'Sep 02, 2026', priority: 'Normal' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <HeadphonesIcon className="w-8 h-8 text-cyan-500" />
            Support Helpdesk
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Submit issues or review your previously raised support tickets with the team.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-800 rounded-3xl p-8 text-white shadow-lg shadow-cyan-500/20 relative overflow-hidden">
            <LifeBuoy className="absolute -right-6 -bottom-6 w-32 h-32 text-white opacity-10" />
            <h2 className="text-2xl font-bold mb-4 relative z-10 text-white">Need immediate help?</h2>
            <p className="text-cyan-50 font-medium mb-6 relative z-10 opacity-90 leading-relaxed text-sm">
              For critical issues affecting major transactions or portal access, please reach out to our dedicated priority hotline.
            </p>
            <div className="space-y-4 relative z-10">
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">Priority Support Hotline</p>
                <p className="text-xl font-bold text-white tracking-widest">+91 1800-456-7890</p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-xs font-bold text-cyan-200 uppercase tracking-wider mb-1">Email Escalations</p>
                <p className="text-lg font-bold text-white tracking-wide">priority@abheepay.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Forms/History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden h-full">
            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'create'
                    ? 'text-cyan-600 border-b-2 border-cyan-500 bg-cyan-50/30'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <MessageSquarePlus className="w-5 h-5" />
                Raise New Ticket
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'history'
                    ? 'text-cyan-600 border-b-2 border-cyan-500 bg-cyan-50/30'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Clock className="w-5 h-5" />
                Ticket History
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'create' ? (
                <form className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Service Category</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none">
                        <option>AEPS / Micro ATM</option>
                        <option>Money Transfer (DMT)</option>
                        <option>Recharge & BBPS</option>
                        <option>Account Commission/Wallet</option>
                        <option>Hardware/Device Support</option>
                        <option>Other Queries</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Transaction ID (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. TXN-9844821"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Subject Line</label>
                    <input
                      type="text"
                      placeholder="Brief overview of the issue"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Detailed Description</label>
                    <textarea
                      rows="5"
                      placeholder="Please provide as much specific detail as possible so we can resolve your issue quickly..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-400 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      className="px-8 py-3.5 bg-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-700 transition-all shadow-sm shadow-cyan-500/20 active:scale-[0.98]"
                    >
                      Submit Ticket
                      <SendHorizontal className="w-5 h-5 ml-1" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-0 animate-in fade-in duration-300">
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search tickets by ID or Subject..."
                      className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-sm placeholder:text-slate-400 transition-all"
                    />
                  </div>

                  <div className="space-y-4">
                    {tickets.map((ticket, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-cyan-200 hover:shadow-sm bg-slate-50/50 hover:bg-white transition-all group cursor-pointer">
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                              {ticket.id}
                            </span>
                            {ticket.priority === 'High' && (
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 ring-1 ring-red-200/50 px-2 rounded-full uppercase tracking-wider">High Priority</span>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-800 truncate group-hover:text-cyan-700 transition-colors">
                            {ticket.subject}
                          </h4>
                          <p className="text-xs font-medium text-slate-500 mt-1">Logged on: {ticket.date}</p>
                        </div>
                        <div className="mt-3 sm:mt-0 flex items-center gap-4 shrink-0">
                          {ticket.status === 'Resolved' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Resolved
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 ring-1 ring-amber-200/50">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                              Under Review
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;
