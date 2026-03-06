import React, { useState, useEffect } from 'react';
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
import { SmartphoneNfc, Send, Wallet, TrendingUp, Users, Activity, UserCheck, CreditCard } from 'lucide-react';

const COLORS = ['#14B8A6', '#3B82F6', '#F59E0B', '#64748B', '#10B981', '#EF4444'];

// Custom label for Donut Chart center
const renderCustomizedLabel = ({ cx, cy, totalValue }) => {
  return (
    <text x={cx} y={cy} fill="#1e293b" textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-10" fontSize="14" fontWeight="600" fill="#64748b">Total</tspan>
      <tspan x={cx} dy="24" fontSize="22" fontWeight="800">{totalValue || 0}</tspan>
    </text>
  );
};

const AdminDashboard = ({ displayRole }) => {
  const [balance, setBalance] = useState(0);
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, roles: {} });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [balanceRes, statsRes, reportRes] = await Promise.all([
          apiRequest('/wallet/balance'),
          apiRequest('/users/stats'),
          apiRequest('/wallet/usage-report')
        ]);

        setBalance(balanceRes.balance);
        setStats(statsRes.data);
        setChartData(reportRes.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const pieData = Object.entries(stats.roles).map(([name, value]) => ({ name, value }));
  const totalUsersPie = stats.totalUsers;
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Welcome back, <span className="text-teal-600">{displayRole}</span>
        </h1>
        <p className="text-slate-500 font-medium">Here's what's happening with your platform today.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Side (2/3 width on xl) */}
        <div className="xl:col-span-2 space-y-8">

          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4 cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-inner">
                <Wallet className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Main Wallet</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-extrabold text-slate-800">₹{balance.toLocaleString()}</h2>
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">+₹0 today</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4 cursor-default">
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

            <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60 flex flex-col items-start gap-4 cursor-default">
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

          {/* Main Area Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100/60">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Usage Report</h3>
                <p className="text-sm font-medium text-slate-500 mt-0.5">Last 7 days performance metrics</p>
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
                    <linearGradient id="colorPG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="PG" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorPG)" />
                  <Area type="monotone" dataKey="Payout" stroke="#2DD4BF" strokeWidth={3} fillOpacity={1} fill="url(#colorPayout)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Side (1/3 width on xl) */}
        <div className="xl:col-span-1 space-y-8">

          {/* Primary Gradient Card */}
          <div className="rounded-3xl p-8 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                  <TrendingUp className="w-6 h-6 text-teal-400" strokeWidth={2} />
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm font-medium tracking-wide">Total Network Volume</p>
                <h3 className="text-4xl font-extrabold text-white mt-2 tracking-tight">₹1,228,256</h3>
                <p className="text-teal-400 font-semibold mt-3 text-sm flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  +12.5% vs last month
                </p>
              </div>
            </div>
          </div>

          {/* Network Health & Breakdown Info */}
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
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                      labelLine={false}
                      label={(props) => renderCustomizedLabel({ ...props, totalValue: totalUsersPie })}
                    >
                      {pieData.map((entry, index) => (
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
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]"></span>AEPS</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]"></span>Payout</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>DMT</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#64748B]"></span>Recharge</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>BBPS</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
