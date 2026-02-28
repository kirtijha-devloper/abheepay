import React from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  SmartphoneNfc, Send, Wallet, Activity, ArrowUpRight,
  CreditCard, ShieldCheck, FileText, Banknote, ShieldAlert, LineChart, Landmark,
  Plane, Building2, Ticket, CheckCircle2, XCircle, Clock
} from 'lucide-react';
import { dashboardChartData, dashboardPieData } from '../data/mockData';

const COLORS = ['#14B8A6', '#3B82F6', '#F59E0B', '#64748B', '#10B981', '#EF4444'];

const renderCustomizedLabel = ({ cx, cy }) => {
  return (
    <text x={cx} y={cy} fill="#1e293b" textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} py="-10" fontSize="14" fontWeight="600" fill="#64748b">Total</tspan>
      <tspan x={cx} dy="24" fontSize="22" fontWeight="800">100%</tspan>
    </text>
  );
};

const servicesData = [
  { id: 'aeps', title: 'AEPS', icon: <span className="text-2xl font-bold text-slate-700 italic">AE<span className="text-teal-500">P</span>S</span>, borderColor: 'border-purple-200', borderHover: 'hover:border-purple-400', bgHover: 'hover:bg-purple-50' },
  { id: 'bbps', title: 'BBPS', icon: <FileText className="w-8 h-8 text-blue-500" strokeWidth={1.5} />, borderColor: 'border-blue-200', borderHover: 'hover:border-blue-400', bgHover: 'hover:bg-blue-50' },
  { id: 'dmt', title: 'DMT', icon: <Send className="w-8 h-8 text-indigo-500" strokeWidth={1.5} />, borderColor: 'border-indigo-200', borderHover: 'hover:border-indigo-400', bgHover: 'hover:bg-indigo-50' },
  { id: 'recharge', title: 'Recharge', icon: <SmartphoneNfc className="w-8 h-8 text-orange-500" strokeWidth={1.5} />, borderColor: 'border-orange-200', borderHover: 'hover:border-orange-400', bgHover: 'hover:bg-orange-50' },
  { id: 'loan', title: 'Loan', icon: <Banknote className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />, borderColor: 'border-emerald-200', borderHover: 'hover:border-emerald-400', bgHover: 'hover:bg-emerald-50' },
  { id: 'credit-card', title: 'Credit Card', icon: <CreditCard className="w-8 h-8 text-slate-700" strokeWidth={1.5} />, borderColor: 'border-slate-200', borderHover: 'hover:border-slate-400', bgHover: 'hover:bg-slate-50' },
  { id: 'cc-bill-pay', title: 'CC Bill Pay', icon: <Wallet className="w-8 h-8 text-red-500" strokeWidth={1.5} />, borderColor: 'border-red-200', borderHover: 'hover:border-red-400', bgHover: 'hover:bg-red-50' },
  { id: 'payout', title: 'Payout', icon: <Landmark className="w-8 h-8 text-teal-600" strokeWidth={1.5} />, borderColor: 'border-teal-200', borderHover: 'hover:border-teal-400', bgHover: 'hover:bg-teal-50' },
  { id: 'matm', title: 'MATM', icon: <CreditCard className="w-8 h-8 text-amber-500" strokeWidth={1.5} />, borderColor: 'border-amber-200', borderHover: 'hover:border-amber-400', bgHover: 'hover:bg-amber-50' },
  { id: 'bank-account', title: 'Bank Account', icon: <Building2 className="w-8 h-8 text-blue-600" strokeWidth={1.5} />, borderColor: 'border-blue-200', borderHover: 'hover:border-blue-400', bgHover: 'hover:bg-blue-50' },
  { id: 'pan-apply', title: 'PAN Apply', icon: <ShieldCheck className="w-8 h-8 text-indigo-600" strokeWidth={1.5} />, borderColor: 'border-indigo-200', borderHover: 'hover:border-indigo-400', bgHover: 'hover:bg-indigo-50' },
  { id: 'ppi-wallet', title: 'PPI Wallet', icon: <Wallet className="w-8 h-8 text-purple-500" strokeWidth={1.5} />, borderColor: 'border-purple-200', borderHover: 'hover:border-purple-400', bgHover: 'hover:bg-purple-50' },
  { id: 'travel-booking', title: 'Travel Booking', icon: <Plane className="w-8 h-8 text-sky-500" strokeWidth={1.5} />, borderColor: 'border-sky-200', borderHover: 'hover:border-sky-400', bgHover: 'hover:bg-sky-50' },
];

const RetailerDashboard = ({ displayRole }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Welcome back, <span className="text-cyan-600">{displayRole}</span>
        </h1>
        <p className="text-slate-500 font-medium">Manage your daily transactions and wallet balance.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">



          {/* Transaction Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                <Activity className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">All Transactions</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">1,245</h2>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Completed</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">1,180</h2>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
                <Clock className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Pending</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">42</h2>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shadow-inner">
                <XCircle className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Failed</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">23</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Actual Associated Services */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60">
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-6">Actual Associated Services</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {servicesData.map((service) => (
                <Link
                  to={`/admin/services/${service.id}`}
                  key={service.id}
                  className={`bg-slate-50 rounded-2xl p-4 border border-slate-100 ${service.borderHover} ${service.bgHover} transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer h-[110px] shadow-sm hover:shadow-md block`}
                >
                  <div className="mb-3 transform hover:scale-110 transition-transform duration-300 drop-shadow-sm flex items-center justify-center h-10 w-10">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">{service.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">My Usage Report</h3>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Last 7 days performance</p>
              </div>
              <div className="flex gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> PG
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-teal-400"></span> Payout
                </div>
              </div>
            </div>

            <div className="h-[320px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPG3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPayout3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="PG" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorPG3)" />
                  <Area type="monotone" dataKey="Payout" stroke="#2DD4BF" strokeWidth={3} fillOpacity={1} fill="url(#colorPayout3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 space-y-8">

          <div className="rounded-3xl p-8 shadow-lg bg-gradient-to-br from-cyan-500 to-cyan-700 border border-cyan-400 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20">
                  <Wallet className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
              </div>

              <div>
                <p className="text-cyan-50 text-sm font-medium tracking-wide uppercase">Your Wallet Balance</p>
                <h3 className="text-4xl font-extrabold text-white mt-2 tracking-tight">₹45,200</h3>
              </div>

              <div className="pt-2">
                <button className="w-full bg-white text-cyan-700 hover:bg-cyan-50 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                  Request Wallet Fund
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/60 flex flex-col gap-6">

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide uppercase">My Services</h3>

              <div className="w-full h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {dashboardPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 600 }}
                      itemStyle={{ color: '#1e293b' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></span>AEPS</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>Payout</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>DMT</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#64748B]"></span>Recharge</div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>BBPS</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
