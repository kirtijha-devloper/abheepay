import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';
import {
  ArrowLeft,
  Smartphone,
  Zap,
  CreditCard,
  Building,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Banknote,
  Send,
  UserCheck,
  Search,
  AlertCircle,
  Briefcase,
  Shield,
  HeartHandshake,
  Activity
} from 'lucide-react';

// Form configurations mapping subServiceIds to required fields
const formConfigs = {
  // Mobile Recharge
  'mobile-recharge': {
    title: 'Mobile Recharge',
    icon: <Smartphone className="w-6 h-6 text-blue-600" />,
    fields: [
      { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter 10-digit mobile number' },
      { id: 'operator', label: 'Operator', type: 'select', options: ['Airtel', 'Jio', 'VI', 'BSNL'] },
      { id: 'circle', label: 'Circle', type: 'select', options: ['Delhi NCR', 'Mumbai', 'Karnataka', 'Maharashtra', 'UP East'] },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount to recharge' },
    ]
  },
  'dth-rech': {
    title: 'DTH Recharge',
    icon: <Zap className="w-6 h-6 text-orange-600" />,
    fields: [
      { id: 'subscriber_id', label: 'Subscriber/Smartcard ID', type: 'text', placeholder: 'Enter your ID' },
      { id: 'operator', label: 'Operator', type: 'select', options: ['Tata Play', 'Airtel Digital TV', 'Dish TV', 'Sun Direct', 'Videocon D2H'] },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount to recharge' },
    ]
  },
  'fastag': {
    title: 'FASTag Recharge',
    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    fields: [
      { id: 'vehicle_number', label: 'Vehicle Registration Number', type: 'text', placeholder: 'e.g., DL01AB1234' },
      { id: 'bank', label: 'Issuer Bank', type: 'select', options: ['ICICI Bank', 'HDFC Bank', 'State Bank of India', 'Kotak Mahindra Bank', 'Paytm Payments Bank'] },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount to recharge' },
    ]
  },

  // BBPS
  'electricity': {
    title: 'Electricity Bill',
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    fields: [
      { id: 'state', label: 'State', type: 'select', options: ['Delhi', 'Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Gujarat'] },
      { id: 'board', label: 'Electricity Board', type: 'select', options: ['BSES Rajdhani', 'BSES Yamuna', 'Tata Power', 'Adani Electricity', 'MSEDCL'] },
      { id: 'consumer_number', label: 'Consumer/CA Number', type: 'text', placeholder: 'Enter Consumer No.' },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Leave blank to fetch bill', optional: true },
    ]
  },
  'water': {
    title: 'Water Bill',
    icon: <Building2 className="w-6 h-6 text-blue-400" />,
    fields: [
      { id: 'board', label: 'Water Board', type: 'select', options: ['Delhi Jal Board', 'BMC Water', 'BWSSB'] },
      { id: 'k_number', label: 'K Number / Consumer No', type: 'text', placeholder: 'Enter your consumer number' },
    ]
  },
  'broadband': {
    title: 'Broadband Postpaid',
    icon: <Send className="w-6 h-6 text-teal-500" />,
    fields: [
      { id: 'operator', label: 'Operator', type: 'select', options: ['Airtel Broadband', 'JioFiber', 'BSNL', 'Hathway', 'Excitel'] },
      { id: 'account_number', label: 'Account Number/Landline', type: 'text', placeholder: 'Enter account number' },
    ]
  },

  // Banking (AEPS/DMT/Payout)
  'cw': {
    title: 'Cash Withdrawal',
    icon: <Banknote className="w-6 h-6 text-emerald-600" />,
    fields: [
      { id: 'aadhaar', label: 'Aadhaar Number', type: 'text', placeholder: 'Enter 12-digit Aadhaar' },
      { id: 'bank', label: 'Select Bank', type: 'select', options: ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Punjab National Bank', 'Bank of Baroda'] },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter withdrawal amount' },
    ]
  },
  'sm': {
    title: 'Send Money',
    icon: <Send className="w-6 h-6 text-amber-600" />,
    fields: [
      { id: 'remitter_mobile', label: 'Remitter Mobile', type: 'tel', placeholder: 'Enter verified mobile number' },
      { id: 'beneficiary', label: 'Beneficiary', type: 'select', options: ['Ravi Kumar (SBI - 1234)', 'Amit Shah (HDFC - 5678)', '+ Add New'] },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount to transfer' },
    ]
  },
  'req-payout': {
    title: 'Wallet Payout',
    icon: <Banknote className="w-6 h-6 text-emerald-600" />,
    fields: [
      { id: 'account', label: 'Select Account', type: 'select', options: ['Primary - HDFC Bank (****1234)', 'Secondary - SBI (****5678)'] },
      { id: 'amount', label: 'Payout Amount (₹)', type: 'number', placeholder: 'Enter amount' },
      { id: 'mode', label: 'Transfer Mode', type: 'select', options: ['IMPS (Instant)', 'NEFT (2-4 hours)'] },
    ]
  },

  // Loan & Cards
  'personal': {
    title: 'Personal Loan Application',
    icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
    fields: [
      { id: 'pan', label: 'PAN Card Number', type: 'text', placeholder: 'Enter PAN' },
      { id: 'dob', label: 'Date of Birth', type: 'date' },
      { id: 'employment', label: 'Employment Type', type: 'select', options: ['Salaried', 'Self-Employed', 'Business Owner'] },
      { id: 'salary', label: 'Net Monthly Income (₹)', type: 'number', placeholder: 'Enter monthly income' },
    ]
  },
  'apply-sbi': {
    title: 'SBI Credit Card',
    icon: <CreditCard className="w-6 h-6 text-blue-500" />,
    fields: [
      { id: 'name', label: 'Full Name (As on PAN)', type: 'text', placeholder: 'Enter Full Name' },
      { id: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: 'Enter mapped mobile number' },
      { id: 'pan', label: 'PAN Number', type: 'text', placeholder: 'Enter PAN' },
      { id: 'pin', label: 'Current Pincode', type: 'text', placeholder: 'e.g. 110001' },
    ]
  },
  'cc-bill': {
    title: 'Pay Credit Card Bill',
    icon: <CreditCard className="w-6 h-6 text-slate-600" />,
    fields: [
      { id: 'cc_number', label: 'Credit Card Number', type: 'text', placeholder: 'Enter 16-digit card number' },
      { id: 'bank', label: 'Bank Name', type: 'select', options: ['SBI Card', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak'] },
      { id: 'amount', label: 'Bill Amount (₹)', type: 'number', placeholder: 'Enter amount to pay' },
    ]
  },
  'nsdl-pan': {
    title: 'NSDL PAN Apply',
    icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
    fields: [
      { id: 'type', label: 'Application Type', type: 'select', options: ['New PAN - Indian Citizen (Form 49A)', 'Changes/Correction in PAN'] },
      { id: 'category', label: 'Category', type: 'select', options: ['Individual', 'Company', 'Firm', 'HUF'] },
      { id: 'aadhaar', label: 'Aadhaar Number', type: 'text', placeholder: 'Enter 12-digit Aadhaar' },
    ]
  },
  'hotel': {
    title: 'Hotel Booking',
    icon: <Building className="w-6 h-6 text-purple-600" />,
    fields: [
      { id: 'destination', label: 'City or Hotel Name', type: 'text', placeholder: 'Enter destination or property' },
      { id: 'checkin', label: 'Check-in Date', type: 'date' },
      { id: 'checkout', label: 'Check-out Date', type: 'date' },
      { id: 'guests', label: 'Number of Guests', type: 'number', placeholder: 'Enter number of guests' },
    ]
  },
  'travelling-package': {
    title: 'Travelling Package',
    icon: <Briefcase className="w-6 h-6 text-amber-600" />,
    fields: [
      { id: 'destination', label: 'Package Destination', type: 'text', placeholder: 'e.g. Goa, Kerala, Dubai' },
      { id: 'travel_date', label: 'Preferred Travel Date', type: 'date' },
      { id: 'persons', label: 'Number of Persons', type: 'number', placeholder: 'Total travelers' },
      { id: 'budget', label: 'Estimated Budget (₹)', type: 'number', placeholder: 'Enter budget' },
    ]
  },
  'insurance-general': {
    title: 'General Insurance',
    icon: <Shield className="w-6 h-6 text-blue-600" />,
    fields: [
      { id: 'policy_type', label: 'Policy category', type: 'select', options: ['Home Insurance', 'Travel Insurance', 'Fire Insurance', 'Personal Accident'] },
      { id: 'proposer_name', label: 'Proposer Name', type: 'text', placeholder: 'Full Name' },
      { id: 'sum_insured', label: 'Sum Insured (₹)', type: 'number', placeholder: 'Enter amount' },
    ]
  },
  'insurance-life': {
    title: 'Life Insurance',
    icon: <HeartHandshake className="w-6 h-6 text-red-500" />,
    fields: [
      { id: 'policy_number', label: 'Policy Number', type: 'text', placeholder: 'Enter policy number (if existing)' },
      { id: 'proposer_name', label: 'Proposer Name', type: 'text', placeholder: 'Full Name' },
      { id: 'dob', label: 'Date of Birth', type: 'date' },
      { id: 'term', label: 'Policy Term (Years)', type: 'select', options: ['5', '10', '15', '20', '25+'] },
    ]
  },
  'insurance-health': {
    title: 'Health Insurance',
    icon: <Activity className="w-6 h-6 text-emerald-600" />,
    fields: [
      { id: 'plan_type', label: 'Plan Type', type: 'select', options: ['Individual', 'Family Floater', 'Senior Citizen', 'Critical Illness'] },
      { id: 'proposer_name', label: 'Proposer Name', type: 'text', placeholder: 'Full Name' },
      { id: 'age', label: 'Age of Eldest Member', type: 'number', placeholder: 'Enter age' },
    ]
  }
};

const SubServiceForm = () => {
  const { serviceId, subServiceId } = useParams();
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fallback configuration if subServiceId is not found
  const config = formConfigs[subServiceId] || {
    title: `Service Form: ${subServiceId}`,
    icon: <AlertCircle className="w-6 h-6 text-slate-500" />,
    fields: [
      { id: 'customer_id', label: 'Customer ID / Number', type: 'text', placeholder: 'Enter details' },
      { id: 'amount', label: 'Amount (₹)', type: 'number', placeholder: 'Enter amount' },
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState("");
  const [txnData, setTxnData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");

    try {
      // Map form fields to backend expected params
      const payload = {
        serviceType: serviceId.toUpperCase(),
        subService: subServiceId.toUpperCase(),
        amount: parseFloat(formData.amount || 0),
        mobile: formData.phone || formData.remitter_mobile || formData.mobile || "",
        accountNo: formData.account_number || formData.account || formData.cc_number || formData.subscriber_id || "",
        adhaarNo: formData.aadhaar || ""
      };

      const res = await apiRequest('/services/process', 'POST', payload);
      setTxnData(res.data);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto mt-12 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-emerald-100 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Transaction {txnData?.transaction?.status}!</h2>
          <p className="text-slate-500 mb-8">Your request for {config.title} has been processed. A reference ID has been generated.</p>

          <div className="bg-slate-50 rounded-2xl p-6 w-full text-left mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Transaction ID</span>
              <span className="font-bold text-slate-800">{txnData?.transaction?.id.substring(0, 16)}...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-bold text-slate-800">{new Date(txnData?.transaction?.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount</span>
              <span className="font-bold text-emerald-600">₹{txnData?.transaction?.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Commission Earned</span>
              <span className="font-bold text-blue-600">₹{txnData?.commission?.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-4 w-full">
            <button
              onClick={() => setIsSuccess(false)}
              className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Do Another
            </button>
            <Link
              to={`/admin/services/${serviceId}`}
              className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors text-center"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          to={`/admin/services/${serviceId}`}
          className="flex items-center text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors w-fit bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to {serviceId.toUpperCase()} Services
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden">
        {/* Card Header */}
        <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
            {config.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{config.title}</h2>
            <p className="text-sm text-slate-500 font-medium">Please fill in the details below to proceed.</p>
          </div>
        </div>

        {error && <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

        {/* Card Body (Form) */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.fields.map((field) => (
              <div key={field.id} className={`flex flex-col gap-2 ${field.id === 'amount' || field.id === 'name' ? 'md:col-span-2' : ''}`}>
                <label htmlFor={field.id} className="text-sm font-semibold text-slate-700 flex justify-between">
                  {field.label}
                  {field.optional && <span className="text-slate-400 font-normal text-xs">(Optional)</span>}
                </label>

                {field.type === 'select' ? (
                  <div className="relative">
                    <select
                      id={field.id}
                      name={field.id}
                      required={!field.optional}
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none transition-all"
                    >
                      <option value="" disabled>Select {field.label}</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    required={!field.optional}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 mt-8 flex justify-end gap-4">
            <Link
              to={`/admin/services/${serviceId}`}
              className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isProcessing}
              className={`px-8 py-3 rounded-xl font-semibold text-white shadow-sm transition-all ${isProcessing ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]'}`}
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : 'Proceed Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubServiceForm;
