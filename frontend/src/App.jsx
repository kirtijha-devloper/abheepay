import React from "react";
import { createBrowserRouter, ScrollRestoration, RouterProvider, Outlet } from "react-router-dom";

// --- Website Imports ---
import WebsiteNavbar from "./website/common/Navbar";
import WebsiteFooter from "./website/common/Footer";
import Home from "./website/page/home/Home";
import ContactUs from "./website/page/contact/Contact";
import AboutPage from "./website/page/about/About-us";
import BlogPage from "./website/page/blog/Blog";
import BlogDetails from "./website/page/blog/Blogdetails";
import EnquiryPopup from "./website/components/Enquiryform";
import InsurancePage from "./website/page/insurance/Insurance";
import PrivacyPolicy from "./website/page/privacy-policy/Privacy-Policy";
import TermsConditions from "./website/page/term-condition/Terms-conditions";
import Services from "./website/page/services/Services";
import ServicesDetail from "./website/page/services/Servicesdetails";
import Join from "./website/page/join-as-retailer/Join-as-retailer";
import Joins from "./website/page/join-as-distributor/Join-as-distributor";

// --- Admin Imports ---
import AdminLayout from './admin/components/Layout';
import Dashboard from './admin/pages/Dashboard';
import AddUser from './admin/pages/AddUser';
import AllMembers from './admin/pages/AllMembers';
import KycRequested from './admin/pages/KycRequested';
import StaffManagement from './admin/pages/StaffManagement';
import CommissionPlans from './admin/pages/CommissionPlans';
import ServiceMatrix from './admin/pages/ServiceMatrix';
import Ledger from './admin/pages/Ledger';
import CreditCardApplyRequest from './admin/pages/CreditCardApplyRequest';
import PanCardHistory from './admin/pages/PanCardHistory';
import PayoutHistory from './admin/pages/PayoutHistory';
import PgAddFund from './admin/pages/PgAddFund';
import AepsStatement from './admin/pages/AepsStatement';
import DmtReport from './admin/pages/DmtReport';
import BbpsHistory from './admin/pages/BbpsHistory';
import Login from './admin/pages/Login';
import ServicePage from './admin/pages/ServicePage';
import SubServiceForm from './admin/pages/SubServiceForm';
import ImpersonateSession from './admin/pages/ImpersonateSession';
import Settings from './admin/pages/Settings';
import CommissionPlanSettings from './admin/pages/CommissionPlanSettings';
import ProfileSettings from './admin/pages/ProfileSettings';
import TpinSettings from './admin/pages/TpinSettings';
import ChangePassword from './admin/pages/ChangePassword';
import CertificateDownload from './admin/pages/CertificateDownload';
import DeviceDriver from './admin/pages/DeviceDriver';
import SupportTicket from './admin/pages/SupportTicket';
import FundRequests from './admin/pages/FundRequests';

const WebsiteLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <WebsiteNavbar />
      <Outlet />
      <WebsiteFooter />
      {/* Optional: Enquiry Popup globally */}
      <EnquiryPopup />
    </>
  );
};

const router = createBrowserRouter([
  // Website Routes
  {
    element: <WebsiteLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/insurance", element: <InsurancePage /> },
      { path: "/join-as-retailer", element: <Join /> },
      { path: "/join-as-distributor", element: <Joins /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/blog/:id", element: <BlogDetails /> },
      { path: "/services", element: <Services /> },
      { path: "/services/:id", element: <ServicesDetail /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/term-condition", element: <TermsConditions /> },
    ],
  },

  // Admin Login Route (standalone)
  {
    path: "/login",
    element: <Login />,
  },

  // Admin Layout Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "add-member", element: <AddUser /> },
      { path: "all-members", element: <AllMembers /> },
      { path: "kyc-requested", element: <KycRequested /> },
      { path: "staff-management", element: <StaffManagement /> },
      { path: "commission-plans", element: <CommissionPlans /> },
      { path: "service-matrix", element: <ServiceMatrix /> },
      { path: "ledger", element: <Ledger /> },
      { path: "credit-card-apply-request", element: <CreditCardApplyRequest /> },
      { path: "pan-card-history", element: <PanCardHistory /> },
      { path: "payout-history", element: <PayoutHistory /> },
      { path: "pg-add-fund", element: <PgAddFund /> },
      { path: "aeps-statement", element: <AepsStatement /> },
      { path: "dmt-report", element: <DmtReport /> },
      { path: "bbps-history", element: <BbpsHistory /> },
      { path: "services/:serviceId", element: <ServicePage /> },
      { path: "services/:serviceId/:subServiceId", element: <SubServiceForm /> },
      { path: "impersonate-session", element: <ImpersonateSession /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/commission-plan", element: <CommissionPlanSettings /> },
      { path: "settings/profile", element: <ProfileSettings /> },
      { path: "settings/tpin", element: <TpinSettings /> },
      { path: "settings/change-password", element: <ChangePassword /> },
      { path: "settings/certificate", element: <CertificateDownload /> },
      { path: "settings/device-driver", element: <DeviceDriver /> },
      { path: "support", element: <SupportTicket /> },
      { path: "fund-requests", element: <FundRequests /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
