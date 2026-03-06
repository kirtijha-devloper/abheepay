import React, { useState } from 'react';
import { CreditCard, Filter, Download, Zap, MoveRight } from 'lucide-react';

const CommissionPlanSettings = () => {
  const [activeTab, setActiveTab] = useState('prepaid');

  const tabs = [
    { id: 'prepaid', label: 'Prepaid Mobile' },
    { id: 'dth', label: 'DTH Recharge' },
    { id: 'bbps', label: 'BBPS Services' },
    { id: 'aeps', label: 'AEPS' },
    { id: 'dmt', label: 'Money Transfer' }
  ];

  const plans = [
    { operator: 'Airtel', type: 'Prepaid', commission: '2.50%', typeLabel: 'Flat' },
    { operator: 'Jio', type: 'Prepaid', commission: '1.80%', typeLabel: 'Flat' },
    { operator: 'VI', type: 'Prepaid', commission: '3.00%', typeLabel: 'Flat' },
    { operator: 'BSNL', type: 'Prepaid', commission: '4.50%', typeLabel: 'Flat' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <Zap className="w-8 h-8 text-cyan-500" />
            My Commission Plans
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            View your active retail commission structures across all services.
          </p>
        </div>
        <button className="px-4 py-2.5 bg-cyan-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-cyan-700 transition-all shadow-sm shadow-cyan-500/20">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-100 hide-scrollbar px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <span className="font-semibold text-slate-700">Displaying Prepaid Mobile Rates</span>
          <div className="relative">
            <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-2 text-sm shadow-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operator / Service</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Structure Type</th>
                <th className="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Your Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {plans.map((plan, i) => (
                <tr key={i} className="hover:bg-cyan-50/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">{plan.operator}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">{plan.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">{plan.typeLabel}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className="text-cyan-600 font-bold bg-cyan-50 px-3 py-1.5 rounded-lg">{plan.commission}</span>
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

export default CommissionPlanSettings;
