/**
 * Main Dashboard Switcher Component
 * ---------------------------------
 * This component acts as a router for the dashboards. Instead of loading
 * a single massive dashboard file with complex condition checks, we 
 * determine the user's role here and delegate to the appropriate component.
 * 
 * Future Developers:
 * If you need to edit the UI for a specific role (like Admin or Retailer),
 * open their specific file (e.g., AdminDashboard.jsx) rather than editing this.
 */

import React from 'react';
import AdminDashboard from './AdminDashboard';
import SuperDistributorDashboard from './SuperDistributorDashboard';
import MasterDistributorDashboard from './MasterDistributorDashboard';
import DistributorDashboard from './DistributorDashboard';
import RetailerDashboard from './RetailerDashboard';
import storage from '../../utils/storage';

const Dashboard = () => {
  // 1. Fetch the user's role from storage (session prioritized). Default to Retailer for safety.
  const userRole = storage.get('userRole') || 'RETAILER';

  // 2. Format the role string for display (e.g., 'MASTER_DISTRIBUTOR' -> 'Master Distributor')
  const displayRole = userRole.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  // --------------------------------------------------------------------------
  // ROLE HIERARCHY ROUTING
  // Note: The highest-level role gets intercepted first.
  // --------------------------------------------------------------------------

  // 1. Admin Level (Highest Access)
  if (userRole === 'ADMIN') {
    return <AdminDashboard displayRole={displayRole} />;
  }

  // 2. Super Distributor Level (Manages Zone Volumes)
  if (userRole === 'SUPER_DISTRIBUTOR') {
    return <SuperDistributorDashboard displayRole={displayRole} />;
  }

  // 3. Master Distributor Level (Manages MD Networks)
  if (userRole === 'MASTER_DISTRIBUTOR') {
    return <MasterDistributorDashboard displayRole={displayRole} />;
  }

  // 4. Distributor Level (Manages Retailers directly)
  if (userRole === 'DISTRIBUTOR') {
    return <DistributorDashboard displayRole={displayRole} />;
  }

  // 5. Default/Fallback: Retailer Level (Action-oriented simple view)
  return <RetailerDashboard displayRole={displayRole} />;
};

export default Dashboard;
