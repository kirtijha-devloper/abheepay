import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { dashboardChartData, dashboardPieData } from '../data/mockData';

const COLORS = ['#FF6B6B', '#4DABF7', '#FCC419', '#868E96', '#40C057', '#FA5252'];

const Dashboard = () => {
  // Get user role from local storage
  const userRole = localStorage.getItem('userRole') || 'RETAILER';
  const hasDownlines = ['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR', 'DISTRIBUTOR'].includes(userRole);

  // Format the role for display (e.g., MASTER_DISTRIBUTOR -> Master Distributor)
  const displayRole = userRole.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-normal text-gray-800 tracking-tight">
        Hello <span className="font-bold">{displayRole}</span>,
      </h1>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left Side (3/4 width) */}
        <div className="lg:col-span-3 space-y-6">

          {/* Top 3 Cards (Common to all roles) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* AEPS Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-gray-700 italic">A<span className="text-green-500">P</span>S<span className="text-orange-500 text-sm">)</span></span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">AEPS</h2>
              <p className="text-gray-500 text-sm mt-1">Today Volume: 0</p>
            </div>

            {/* DMT Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-indigo-600 flex items-center justify-center mb-4 bg-indigo-50">
                <div className="text-xl text-yellow-500">💸</div>
              </div>
              <h2 className="text-lg font-bold text-gray-800">DMT</h2>
              <p className="text-gray-500 text-sm mt-1">Today Volume: 0</p>
            </div>

            {/* Wallet Enquiry Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4 bg-red-50">
                <div className="text-xl text-green-500">👝</div>
              </div>
              <h2 className="text-lg font-bold text-gray-800">WALLET ENQUIRY</h2>
              <p className="text-gray-500 text-sm mt-1">Today Volume: 0</p>
            </div>

          </div>

          {/* Stats Cards Row - Only show if user has downlines */}
          {hasDownlines && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Users */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-indigo-400 text-center">
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">Total Network Volume</p>
                <h3 className="text-2xl font-bold text-gray-800">₹1,228,256.68</h3>
                <p className="text-indigo-500 font-semibold mt-1">Across 583 Users</p>
              </div>

              {/* Downline Level 1 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-orange-400 text-center">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Direct Downlines</p>
                <h3 className="text-2xl font-bold text-gray-800">85</h3>
                <p className="text-orange-400 font-semibold mt-1">₹26,021.85 Team Comm.</p>
              </div>

              {/* Downline Level 2 */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-green-400 text-center">
                <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">Retailers in Network</p>
                <h3 className="text-2xl font-bold text-gray-800">498</h3>
                <p className="text-green-500 font-semibold mt-1">₹1,202,234.83 Sales</p>
              </div>
            </div>
          )}

          {/* Main Bar Chart - Common */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">Usage Report last 7 days</h3>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="PG" fill="#4263EB" radius={[2, 2, 0, 0]} barSize={20} />
                  <Bar dataKey="Payout" fill="#8CE99A" radius={[2, 2, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Side (1/4 width) */}
        <div className="lg:col-span-1 space-y-6">

          {/* Right Side Transaction Chart (Pie) */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col h-auto">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider text-center">Service Breakdown</h3>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-[10px] text-gray-500 mb-4">
              <div className="flex items-center"><span className="w-4 h-2 bg-[#FF6B6B] mr-1"></span>AEPS</div>
              <div className="flex items-center"><span className="w-4 h-2 bg-[#4DABF7] mr-1"></span>Payout</div>
              <div className="flex items-center"><span className="w-4 h-2 bg-[#FCC419] mr-1"></span>DMT</div>
              <div className="flex items-center"><span className="w-4 h-2 bg-[#868E96] mr-1"></span>Recharge</div>
              <div className="flex items-center"><span className="w-4 h-2 bg-[#8b5cf6] mr-1"></span>BBPS</div>
            </div>

            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {dashboardPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Statistics List - Only show if has downlines */}
          {hasDownlines ? (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Network Size</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Retailers:</span>
                  <span className="text-gray-800 font-bold">498</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Distributors:</span>
                  <span className="text-gray-800 font-bold">85</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Total Network:</span>
                  <span className="text-gray-800 font-bold">583</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-500 bg-blue-50">
              <h3 className="text-sm font-bold text-blue-800 mb-4 uppercase tracking-wider">Your Wallet Info</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-xs text-blue-600 font-medium mb-1">Available Balance</p>
                  <h4 className="text-3xl font-extrabold text-blue-700">₹45,200</h4>
                </div>
                <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition">
                  Request Wallet Fund
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
