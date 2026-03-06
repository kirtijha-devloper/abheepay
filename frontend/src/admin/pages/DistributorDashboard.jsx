import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';
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
  SmartphoneNfc, Send, Wallet, TrendingUp, Users, Activity, CheckCircle2,
  CreditCard, ShieldCheck, FileText, Banknote, ShieldAlert, LineChart, Landmark,
  UserCheck, Plane, Building2, Ticket
} from 'lucide-react';
import { dashboardPieData } from '../../constants/mockData';

const COLORS = ['#14B8A6', '#3B82F6', '#F59E0B', '#64748B', '#10B981', '#EF4444'];

const renderCustomizedLabel = ({ cx, cy }) => {
  return (
    <text x={cx} y={cy} fill="#1e293b" textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} py="-10" fontSize="14" fontWeight="600" fill="#64748b">Total</tspan>
      <tspan x={cx} dy="24" fontSize="22" fontWeight="800">100%</tspan>
    </text>
  );
};

const DistributorDashboard = ({ displayRole }) => {
  const [balance, setBalance] = useState(0);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, roles: {} });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const balRes = await apiRequest('/wallet/balance');
        setBalance(balRes.balance);

        const statsRes = await apiRequest('/users/stats');
        setStats(statsRes.data);

        const reportRes = await apiRequest('/wallet/usage-report');
        setChartData(reportRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Welcome back, <span className="text-cyan-600">{displayRole}</span>
        </h1>
        <p className="text-slate-500 font-medium">Track your network's performance and growth.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
                <Wallet className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Main Wallet</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">₹0</h2>
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">+₹0 today</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                <SmartphoneNfc className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">E-Wallet</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">₹0</h2>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">+₹0 today</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shadow-inner">
                <CreditCard className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Todays Transaction</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">₹0</h2>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">+0% today</span>
                </div>
              </div>
            </div>
          </div>



          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Network Usage Report</h3>
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
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPG2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPayout2" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="PG" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorPG2)" />
                  <Area type="monotone" dataKey="Payout" stroke="#2DD4BF" strokeWidth={3} fillOpacity={1} fill="url(#colorPayout2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 space-y-8">

          <div className="rounded-3xl p-8 shadow-lg bg-gradient-to-br from-cyan-600 to-blue-800 border border-cyan-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20">
                  <Wallet className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
              </div>

              <div>
                <p className="text-cyan-100 text-sm font-medium tracking-wide uppercase">Your Wallet Balance</p>
                <h3 className="text-4xl font-extrabold text-white mt-2 tracking-tight">₹{balance.toLocaleString()}</h3>
              </div>

              <div className="pt-2">
                <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-xl transition-colors backdrop-blur-sm border border-white/20">
                  Distribute Funds
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Network Health</h3>
              <div className="p-2 bg-slate-50 text-slate-500 rounded-lg">
                <Users className="w-5 h-5" strokeWidth={1.5} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Total Users</span>
                  <span className="text-slate-800 font-bold text-lg">{stats.totalUsers}</span>
                </div>
                <div className="text-right flex flex-col">
                  <span className="text-teal-500 font-bold bg-teal-50 px-2 py-0.5 rounded-md text-xs">All System</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Active Users</span>
                  <span className="text-slate-800 font-bold text-lg">{stats.activeUsers}</span>
                </div>
                <div className="text-right flex flex-col">
                  <span className="text-blue-500 font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs">Online</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide">Service Breakdown</h3>

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

              <div className="flex flex-wrap gap-2 justify-center mt-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-[#14B8A6]"></span>AEPS</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>Payout</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>DMT</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-[#64748B]"></span>Recharge</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span>BBPS</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;
