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
import { dashboardChartData, dashboardPieData } from '../../data/mockData';

const COLORS = ['#FF6B6B', '#4DABF7', '#FCC419', '#868E96', '#40C057', '#FA5252'];

const RetailerDashboard = ({ displayRole }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-normal text-gray-800 tracking-tight">
        Hello <span className="font-bold">{displayRole}</span>,
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Top 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:border-blue-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-gray-700 italic">A<span className="text-green-500">P</span>S<span className="text-orange-500 text-sm">)</span></span>
              </div>
              <h2 className="text-lg font-bold text-gray-800">AEPS</h2>
              <p className="text-gray-500 text-sm mt-1">Fast & Secure</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:border-blue-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-indigo-600 flex items-center justify-center mb-4 bg-indigo-50">
                <div className="text-xl text-yellow-500">💸</div>
              </div>
              <h2 className="text-lg font-bold text-gray-800">DMT</h2>
              <p className="text-gray-500 text-sm mt-1">Instant Transfer</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:border-blue-300 transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4 bg-red-50">
                <div className="text-xl text-green-500">👝</div>
              </div>
              <h2 className="text-lg font-bold text-gray-800">WALLET PAY</h2>
              <p className="text-gray-500 text-sm mt-1">Pay Bills</p>
            </div>
          </div>

          {/* Main Bar Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 text-center mb-6">My Usage Report (Last 7 Days)</h3>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

        <div className="lg:col-span-1 space-y-6">
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

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col h-auto">
            <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider text-center">My Services</h3>
            <div className="w-full h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dashboardPieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} fill="#8884d8" paddingAngle={2} dataKey="value">
                    {dashboardPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDashboard;
