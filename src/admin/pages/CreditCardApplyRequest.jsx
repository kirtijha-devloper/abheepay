import React from 'react';
import { ChevronRight } from 'lucide-react';

const mockCreditCardData = [
  {
    id: 1,
    name: 'Diwakar',
    phone: '9876543210',
    pincode: '212345',
    panNumber: 'xxxxxxxx',
    bank: 'SBI',
    retailerName: 'Tester',
    retailerUsername: 'PMLT820213',
    createdAt: '25-11-\n2024\n01:25:10'
  },
  {
    id: 2,
    name: 'Diwakar',
    phone: '9621122159',
    pincode: '212345',
    panNumber: 'xxxxxxxx',
    bank: 'PNB',
    retailerName: 'Tester',
    retailerUsername: 'PMLT820213',
    createdAt: '25-11-\n2024\n01:28:44'
  },
  {
    id: 3,
    name: 'Sarvesh',
    phone: '9621122159',
    pincode: '281004',
    panNumber: 'xxxxxxxx',
    bank: 'Yes',
    retailerName: 'Akshay Rana',
    retailerUsername: 'PMLT306825',
    createdAt: '25-11-\n2024\n01:44:25'
  },
  {
    id: 4,
    name: 'Sunny',
    phone: '9621122155',
    pincode: '212345',
    panNumber: 'xxxxxxxx',
    bank: 'HDFC',
    retailerName: 'Akshay Rana',
    retailerUsername: 'PMLT306825',
    createdAt: '25-11-\n2024\n04:35:17'
  },
  {
    id: 5,
    name: 'AbeePay',
    phone: '9876543210',
    pincode: '212345',
    panNumber: 'xxxxxxxx',
    bank: 'IDFC',
    retailerName: 'Akshay Rana',
    retailerUsername: 'PMLT306825',
    createdAt: '25-11-\n2024\n04:42:25'
  },
];

const CreditCardApplyRequest = () => {

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="mb-2">
        <div className="flex items-center text-sm text-gray-500">
          <span>Home</span>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-400">All Credit Card Applications</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">

        {/* Export Button */}
        <div className="mb-6">
          <button className="bg-[#84cc16] hover:bg-[#65a30d] text-white font-medium py-2 px-6 rounded-md transition-colors shadow-sm">
            Export to Excel
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto border border-gray-100 rounded-sm">
          <table className="w-full text-sm text-left align-middle">
            <thead className="text-xs text-gray-700 bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">#</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Name</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Phone</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Pincode</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Pan Number</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Bank</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Retailer Name</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center border-r border-gray-100">Retailer Username</th>
                <th className="px-6 py-4 font-bold uppercase whitespace-nowrap text-center">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockCreditCardData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.id}</td>
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.name}</td>
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.phone}</td>
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.pincode}</td>
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.panNumber}</td>
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.bank}</td>
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.retailerName}</td>
                  <td className="px-6 py-6 text-center text-gray-500 border-r border-gray-100">{row.retailerUsername}</td>
                  <td className="px-6 py-6 text-center text-gray-500 whitespace-pre-line leading-relaxed">{row.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreditCardApplyRequest;
