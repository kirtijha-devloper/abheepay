import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Wallet,
  SmartphoneNfc,
  FileText,
  Landmark,
  CreditCard,
  Wifi,
  Lightbulb,
  Droplets,
  Tv,
  Phone,
  MonitorPlay,
  Zap,
  ShieldCheck,
  Building,
  ArrowRightLeft,
  Search,
  CheckCircle2,
  AlertCircle,
  Send,
  Flame,
  Car,
  Plane,
  Building2,
  Banknote,
  UserCheck,
  Briefcase,
  Activity,
  Database,
  Smartphone,
  Shield,
  PhoneCall,
  GraduationCap,
  Truck,
  Home,
  Users,
  HeartHandshake,
  Gauge,
  TrainFront,
  Play,
  Ticket
} from 'lucide-react';

// Common sub-services data mapping
const servicesDataMap = {
  'aeps': {
    title: 'AEPS Services',
    description: 'Aadhaar Enabled Payment System for seamless banking.',
    color: 'emerald',
    icon: <Landmark className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'cw', title: 'Cash Withdrawal', icon: <Wallet className="w-6 h-6 text-emerald-600" /> },
      { id: 'be', title: 'Balance Enquiry', icon: <Search className="w-6 h-6 text-blue-600" /> },
      { id: 'ms', title: 'Mini Statement', icon: <FileText className="w-6 h-6 text-purple-600" /> },
      { id: 'ap', title: 'Aadhaar Pay', icon: <SmartphoneNfc className="w-6 h-6 text-teal-600" /> },
    ]
  },
  'bbps': {
    title: 'BBPS Services',
    description: 'Bharat Bill Payment System.',
    color: 'blue',
    icon: <FileText className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'electricity', title: 'Electricity', icon: <Zap className="w-6 h-6 text-amber-500" /> },
      { id: 'lpg-gas', title: 'LPG Gas Cylinder', icon: <Database className="w-6 h-6 text-orange-600" /> },
      { id: 'cc-bill', title: 'Credit Card Bill', icon: <CreditCard className="w-6 h-6 text-slate-600" /> },
      { id: 'mobile-postpaid', title: 'Mobile Postpaid', icon: <Smartphone className="w-6 h-6 text-indigo-500" /> },
      { id: 'lic-insurance', title: 'LIC/Insurance', icon: <Shield className="w-6 h-6 text-blue-600" /> },
      { id: 'broadband', title: 'Broadband', icon: <Wifi className="w-6 h-6 text-teal-500" /> },
      { id: 'piped-gas', title: 'Piped Gas', icon: <Flame className="w-6 h-6 text-orange-500" /> },
      { id: 'water', title: 'Water', icon: <Droplets className="w-6 h-6 text-blue-400" /> },
      { id: 'loan-repay', title: 'Loan Repayment', icon: <Banknote className="w-6 h-6 text-emerald-600" /> },
      { id: 'landline', title: 'Landline', icon: <PhoneCall className="w-6 h-6 text-slate-500" /> },
      { id: 'cable-tv', title: 'Cable TV', icon: <MonitorPlay className="w-6 h-6 text-purple-500" /> },
      { id: 'municipal-tax', title: 'Municipal Tax', icon: <Building className="w-6 h-6 text-slate-600" /> },
      { id: 'education', title: 'Education Fees', icon: <GraduationCap className="w-6 h-6 text-indigo-600" /> },
      { id: 'municipal-services', title: 'Municipal Services', icon: <Truck className="w-6 h-6 text-emerald-500" /> },
      { id: 'rental', title: 'Rental', icon: <Home className="w-6 h-6 text-orange-500" /> },
      { id: 'housing-society', title: 'Housing Society', icon: <Building2 className="w-6 h-6 text-blue-500" /> },
      { id: 'clubs', title: 'Clubs & Associations', icon: <Users className="w-6 h-6 text-purple-600" /> },
      { id: 'donation', title: 'Donation', icon: <HeartHandshake className="w-6 h-6 text-red-500" /> },
      { id: 'prepaid-meter', title: 'Prepaid Meter', icon: <Gauge className="w-6 h-6 text-amber-600" /> },
    ]
  },
  'dmt': {
    title: 'DMT Services',
    description: 'Domestic Money Transfer.',
    color: 'indigo',
    icon: <ArrowRightLeft className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'as', title: 'Add Beneficiary', icon: <UserCheck className="w-6 h-6 text-indigo-600" /> },
      { id: 'sl', title: 'Sender Login', icon: <Search className="w-6 h-6 text-emerald-600" /> },
      { id: 'bl', title: 'Beneficiary List', icon: <FileText className="w-6 h-6 text-purple-600" /> },
      { id: 'sm', title: 'Send Money', icon: <Send className="w-6 h-6 text-amber-600" /> },
    ]
  },
  'recharge': {
    title: 'Recharge Services',
    description: 'Mobile & DTH Recharge.',
    color: 'orange',
    icon: <SmartphoneNfc className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'mobile-recharge', title: 'Mobile Recharge', icon: <Zap className="w-6 h-6 text-blue-600" /> },
      { id: 'dth-rech', title: 'DTH Recharge', icon: <Tv className="w-6 h-6 text-orange-600" /> },
      { id: 'app-store', title: 'App Store Code', icon: <Smartphone className="w-6 h-6 text-slate-800" /> },
      { id: 'fastag', title: 'FASTag Recharge', icon: <Car className="w-6 h-6 text-emerald-600" /> },
      { id: 'metro', title: 'Metro Recharge', icon: <TrainFront className="w-6 h-6 text-blue-500" /> },
      { id: 'google-play', title: 'Google Play Recharge', icon: <Play className="w-6 h-6 text-red-500" /> },
      { id: 'delhi-metro-qr', title: 'Delhi Metro QR', icon: <Ticket className="w-6 h-6 text-red-600" /> },
      { id: 'buy-fastag', title: 'Buy FASTag', icon: <Car className="w-6 h-6 text-slate-600" /> },
      { id: 'ncmc', title: 'NCMC Recharge', icon: <CreditCard className="w-6 h-6 text-orange-500" /> },
    ]
  },
  'loan': {
    title: 'Loan Services',
    description: 'Apply for Personal & Business Loans.',
    color: 'emerald',
    icon: <Banknote className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'personal', title: 'Personal Loan', icon: <Briefcase className="w-6 h-6 text-emerald-600" /> },
      { id: 'business', title: 'Business Loan', icon: <Building2 className="w-6 h-6 text-blue-600" /> },
      { id: 'status', title: 'Check Status', icon: <CheckCircle2 className="w-6 h-6 text-purple-600" /> },
    ]
  },
  'credit-card': {
    title: 'Credit Card Application',
    description: 'Apply for new Credit Cards.',
    color: 'slate',
    icon: <CreditCard className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'apply-sbi', title: 'SBI Card', icon: <CreditCard className="w-6 h-6 text-blue-500" /> },
      { id: 'apply-hdfc', title: 'HDFC Card', icon: <CreditCard className="w-6 h-6 text-indigo-600" /> },
      { id: 'apply-axis', title: 'Axis Bank Card', icon: <CreditCard className="w-6 h-6 text-red-600" /> },
    ]
  },
  'cc-bill-pay': {
    title: 'Credit Card Bill Pay',
    description: 'Pay your Credit Card bills instantly.',
    color: 'red',
    icon: <Wallet className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'pay-bill', title: 'Pay Bill', icon: <Wallet className="w-6 h-6 text-emerald-600" /> },
      { id: 'bill-history', title: 'Payment History', icon: <FileText className="w-6 h-6 text-slate-600" /> },
    ]
  },
  'payout': {
    title: 'Payout Services',
    description: 'Wallet to Bank Payouts.',
    color: 'teal',
    icon: <Landmark className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'add-acc', title: 'Add Account', icon: <Building2 className="w-6 h-6 text-blue-600" /> },
      { id: 'req-payout', title: 'Request Payout', icon: <Banknote className="w-6 h-6 text-emerald-600" /> },
      { id: 'payout-rep', title: 'Payout Report', icon: <FileText className="w-6 h-6 text-purple-600" /> },
    ]
  },
  'matm': {
    title: 'Micro ATM Services',
    description: 'Provide ATM services at your shop.',
    color: 'amber',
    icon: <CreditCard className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'cw-matm', title: 'Cash Withdrawal', icon: <Wallet className="w-6 h-6 text-emerald-600" /> },
      { id: 'be-matm', title: 'Balance Enquiry', icon: <Search className="w-6 h-6 text-blue-600" /> },
    ]
  },
  'bank-account': {
    title: 'Bank Account Opening',
    description: 'Open new bank accounts instantly.',
    color: 'blue',
    icon: <Building2 className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'savings', title: 'Savings Account', icon: <Landmark className="w-6 h-6 text-blue-600" /> },
      { id: 'current', title: 'Current Account', icon: <Briefcase className="w-6 h-6 text-indigo-600" /> },
    ]
  },
  'pan-apply': {
    title: 'PAN Card Apply',
    description: 'Apply for New/Correction PAN.',
    color: 'indigo',
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'nsdl-pan', title: 'NSDL PAN', icon: <FileText className="w-6 h-6 text-indigo-600" /> },
      { id: 'uti-pan', title: 'UTI PAN', icon: <FileText className="w-6 h-6 text-blue-600" /> },
      { id: 'pan-track', title: 'Track Status', icon: <Search className="w-6 h-6 text-emerald-600" /> },
    ]
  },
  'ppi-wallet': {
    title: 'PPI Wallet Services',
    description: 'Prepaid Payment Instruments.',
    color: 'purple',
    icon: <Wallet className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'wallet-load', title: 'Load Wallet', icon: <ArrowRightLeft className="w-6 h-6 text-purple-600" /> },
      { id: 'wallet-trf', title: 'Wallet Transfer', icon: <Send className="w-6 h-6 text-indigo-600" /> },
    ]
  },
  'travel-booking': {
    title: 'Travel Booking',
    description: 'Book Flights, Trains, Buses, and Hotels.',
    color: 'sky',
    icon: <Plane className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'flight', title: 'Flight Booking', icon: <Plane className="w-6 h-6 text-sky-600" /> },
      { id: 'train', title: 'Train Booking', icon: <TrainFront className="w-6 h-6 text-blue-600" /> },
      { id: 'bus', title: 'Bus Booking', icon: <Car className="w-6 h-6 text-emerald-600" /> },
      { id: 'hotel', title: 'Hotel Booking', icon: <Building className="w-6 h-6 text-purple-600" /> },
      { id: 'travelling-package', title: 'Travelling Package', icon: <Briefcase className="w-6 h-6 text-amber-600" /> },
    ]
  },
  'insurance': {
    title: 'Insurance Services',
    description: 'Secure your future with General, Life, and Health Insurance.',
    color: 'blue',
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'insurance-general', title: 'General Insurance', icon: <Shield className="w-6 h-6 text-blue-600" /> },
      { id: 'insurance-life', title: 'Life Insurance', icon: <HeartHandshake className="w-6 h-6 text-red-500" /> },
      { id: 'insurance-health', title: 'Health Insurance', icon: <Activity className="w-6 h-6 text-emerald-600" /> },
    ]
  },
  // Default fallback for others
  'default': {
    title: 'Service Options',
    description: 'Explore related services and tools.',
    color: 'slate',
    icon: <Activity className="w-8 h-8 text-white" />,
    subServices: [
      { id: 'view', title: 'View Details', icon: <Search className="w-6 h-6 text-slate-600" /> },
      { id: 'history', title: 'History', icon: <FileText className="w-6 h-6 text-slate-600" /> },
      { id: 'support', title: 'Help & Support', icon: <AlertCircle className="w-6 h-6 text-slate-600" /> },
    ]
  }
};

const ServicePage = () => {
  const { serviceId } = useParams();
  const serviceData = servicesDataMap[serviceId] || servicesDataMap['default'];

  // Custom theme colors based on the service
  const themeColors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    teal: 'bg-teal-500',
    orange: 'bg-orange-500',
    sky: 'bg-sky-500',
    slate: 'bg-slate-500'
  };

  const bgClass = themeColors[serviceData.color] || 'bg-slate-500';

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className={`rounded-3xl p-8 shadow-md relative overflow-hidden ${bgClass}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-white">
            <Link to="/admin" className="flex items-center text-white/80 hover:text-white mb-2 text-sm font-medium transition-colors w-fit">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/20 shadow-inner">
                {serviceData.icon}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {serviceData.title}
                </h1>
                <p className="text-white/80 font-medium mt-1">{serviceData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-services Grid */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100/60">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">Available {serviceData.title}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {serviceData.subServices.map((sub) => (
            <Link
              to={`/admin/services/${serviceId}/${sub.id}`}
              key={sub.id}
              className="group bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-slate-300 hover:bg-white transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer h-[160px] shadow-sm hover:shadow-lg hover:-translate-y-1 block"
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                {sub.icon}
              </div>
              <span className="text-sm font-bold text-slate-700">{sub.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
