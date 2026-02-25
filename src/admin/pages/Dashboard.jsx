import React from 'react';
import AdminDashboard from './dashboards/AdminDashboard';
import DistributorDashboard from './dashboards/DistributorDashboard';
import RetailerDashboard from './dashboards/RetailerDashboard';

const Dashboard = () => {
  // Get user role from local storage
  const userRole = localStorage.getItem('userRole') || 'RETAILER';

  // Format the role for display (e.g., MASTER_DISTRIBUTOR -> Master Distributor)
  const displayRole = userRole.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  // Admin Level (ADMIN, SUPER_DISTRIBUTOR, MASTER_DISTRIBUTOR)
  if (['ADMIN', 'SUPER_DISTRIBUTOR', 'MASTER_DISTRIBUTOR'].includes(userRole)) {
    return <AdminDashboard displayRole={displayRole} />;
  }

  // Distributor Level
  if (userRole === 'DISTRIBUTOR') {
    return <DistributorDashboard displayRole={displayRole} />;
  }

  // Default to Retailer Level
  return <RetailerDashboard displayRole={displayRole} />;
};

export default Dashboard;
