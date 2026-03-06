import React, { useState } from 'react';
import {
  List, MapPin, Users, Settings, CreditCard, Wallet, Server,
  Search, Filter, Plus, Edit2, Trash2, ArrowUpDown, Percent
} from 'lucide-react';
import { commissionsData } from '../../constants/mockData';

const tabs = [
  { id: 'Commission List', label: 'Commission List', icon: <List className="w-4 h-4 mr-2" /> },
  { id: 'Map Commission List', label: 'Map Commission List', icon: <MapPin className="w-4 h-4 mr-2" /> },
  { id: 'Distributor Commission Plan', label: 'Distributor Plan', icon: <Users className="w-4 h-4 mr-2" /> },
  { id: 'Service Fee Setup', label: 'Service Fee Setup', icon: <Settings className="w-4 h-4 mr-2" /> },
  { id: 'Payout Charges', label: 'Payout Charges', icon: <CreditCard className="w-4 h-4 mr-2" /> },
  { id: 'Add fund PG charges & commission', label: 'Add Fund PG', icon: <Wallet className="w-4 h-4 mr-2" /> },
  { id: 'API PG charges', label: 'API PG Charges', icon: <Server className="w-4 h-4 mr-2" /> }
];

const CommissionPlans = () => {
  const [activeTab, setActiveTab] = useState('Commission List');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 animate-in fade-in duration-500">

      {/* Dynamic Header Section */}
      <div className="rounded-3xl p-8 shadow-md relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20 shadow-inner">
                <Percent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Commission Plans
                </h1>
                <p className="text-blue-100 font-medium mt-1">Manage and configure all commission structures, fees, and payout settings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Nav Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
        <ul className="flex overflow-x-auto hide-scrollbar text-sm font-medium text-center text-slate-500 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id} className="whitespace-nowrap flex-shrink-0">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-5 py-3 rounded-xl transition-all duration-300 ${isActive
                    ? 'bg-blue-50 text-blue-700 font-bold shadow-sm border border-blue-100'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-transparent hover:border-slate-100'
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">

        {/* Form Area */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-blue-600" />
            Add New Commission
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-6">

            {/* Form Fields with modern styling */}
            {[
              { label: 'PACKAGES', type: 'select', options: ['--Select Packages--', 'Retailer', 'Distributor'] },
              { label: 'SERVICE', type: 'select', options: ['--Select a Service--', 'AEPS', 'DMT'] },
              { label: 'FROM AMOUNT', type: 'text', placeholder: 'e.g., 0' },
              { label: 'TO AMOUNT', type: 'text', placeholder: 'e.g., 1000' },
              { label: 'CHARGE IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
              { label: 'CHARGE', type: 'text', placeholder: 'e.g., 50' },
              { label: 'COMMISSION IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
              { label: 'COMMISSION', type: 'text', placeholder: 'e.g., 20' },
              { label: 'TDS IN', type: 'select', options: ['--Select--', 'Flat', 'Percentage'] },
              { label: 'TDS', type: 'text', placeholder: 'e.g., 10' },
            ].map((field, idx) => (
              <div key={idx} className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">{field.label}</label>
                {field.type === 'select' ? (
                  <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 hover:bg-slate-100/50 transition-colors appearance-none">
                    {field.options.map((opt, i) => <option key={i}>{opt}</option>)}
                  </select>
                ) : (
                  <input type={field.type} placeholder={field.placeholder} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 hover:bg-slate-100/50 transition-colors placeholder-slate-400" />
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex items-end gap-3 h-full xl:col-span-2 mt-4 xl:mt-0">
              <button type="button" className="bg-emerald-500 text-white hover:bg-emerald-600 px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm shadow-emerald-500/20 flex-1">
                Submit
              </button>
              <button type="button" className="bg-slate-200 text-slate-700 hover:bg-slate-300 hover:text-slate-800 px-8 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex-1">
                Reset
              </button>
            </div>
          </form>
        </div>

        <hr className="border-slate-100 mb-8" />

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center text-sm font-medium text-slate-500">
            Show
            <select className="border border-slate-200 rounded-lg px-3 py-2 mx-2 focus:outline-none focus:border-blue-500 bg-slate-50 font-bold text-slate-700">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
          </div>

          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search commissions..."
              className="w-full border border-slate-200 bg-slate-50 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full text-sm text-center">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100 uppercase text-[10px] tracking-wider">
              <tr>
                {['SL NO.', 'PACKAGES', 'SERVICE', 'SUB SERVICE', 'FROM AMOUNT', 'TO AMOUNT', 'CHARGE', 'COMMISSION', 'TDS', 'CHARGE IN', 'COMMISSION IN', 'TDS IN', 'ACTION'].map((header, i) => (
                  <th key={i} className="px-4 py-5 whitespace-nowrap border-r border-slate-100 last:border-r-0">
                    <div className="flex justify-center items-center gap-1">
                      {header}
                      {['SL NO.', 'PACKAGES', 'FROM AMOUNT', 'TO AMOUNT', 'CHARGE IN', 'COMMISSION IN', 'TDS IN'].includes(header) && (
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {commissionsData.map((row) => (
                <tr key={row.id} className="bg-white hover:bg-slate-50/80 transition-colors group">
                  <td className="px-4 py-4 whitespace-nowrap text-slate-500 font-medium">{row.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-700 font-bold">{row.packages}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-blue-600 font-semibold">{row.service}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">{row.subService}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-emerald-600 font-bold">₹{row.fromAmount}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-emerald-600 font-bold">₹{row.toAmount}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-700 font-medium">{row.charge}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-blue-600 font-bold">{row.commission}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-red-500 font-medium">{row.tds}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">{row.chargeIn}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-bold">{row.commissionIn}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold">{row.tdsIn}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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

export default CommissionPlans;
