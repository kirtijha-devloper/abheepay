export const kycsData = [
  {
    id: '484248',
    name: 'KALPESH JAIN',
    mobile: '9784767647',
    email: 'kjkalpesh3@gmail.com',
    pan: 'ANTPJ4475A',
    accountNo: '0885101700023436',
    ifsc: 'PUNB0088510',
    kycStatus: 'Verified',
    date: '2025-09-23',
    time: '15:28:56'
  },
  {
    id: '487782',
    name: 'MD ABDULLAH',
    mobile: '9851550055',
    email: 'abdullah@teknoindia.in',
    pan: 'AQDPA0205E',
    accountNo: '32362966087',
    ifsc: 'SBIN0008437',
    kycStatus: 'Verified',
    date: '2026-02-24',
    time: '15:45:04'
  },
  {
    id: '493595',
    name: 'ABHISHEK KUMAR JAISWAL',
    mobile: '8097388992',
    email: 'aj11051995@gmail.com',
    pan: 'CVXPK1625B',
    accountNo: '27410100018748',
    ifsc: 'BARB0NERULX',
    kycStatus: 'Verified',
    date: '2025-09-21',
    time: '19:28:38'
  },
  {
    id: '496028',
    name: 'KRISHAN MURARI GAUTAM',
    mobile: '8982312547',
    email: 'pametaemitraonly@gmail.com',
    pan: 'BXPPG5394E',
    accountNo: '36588100005925',
    ifsc: 'BARB0KESKOT',
    kycStatus: 'Verified',
    date: '2025-09-16',
    time: '12:58:47'
  },
  {
    id: '498712',
    name: 'MRITYUNJAY KUMAR ROY',
    mobile: '9910421002',
    email: 'mrityunjay_roy@outlook.com',
    pan: 'ATWPR3417M',
    accountNo: '235501503935',
    ifsc: 'ICIC0000087',
    kycStatus: 'Verified',
    date: '2026-02-25',
    time: '13:26:57'
  }
];

export const commissionsData = [
  {
    id: 1,
    packages: 'Retailer',
    service: 'AEPS',
    subService: '',
    fromAmount: '100.00',
    toAmount: '499.00',
    charge: '0.00',
    commission: '0.00',
    tds: '0.00',
    chargeIn: 'Flat',
    commissionIn: 'Flat',
    tdsIn: 'Percentage'
  },
  {
    id: 2,
    packages: 'Retailer',
    service: 'AEPS',
    subService: '',
    fromAmount: '500.00',
    toAmount: '999.00',
    charge: '0.00',
    commission: '1.00',
    tds: '0.00',
    chargeIn: 'Flat',
    commissionIn: 'Flat',
    tdsIn: 'Percentage'
  }
];

export const allMembersData = [
  {
    id: '01',
    name: 'JAYESHBHAI BABUBHAI PARMAR',
    username: 'JP438258',
    phone: '9909240871',
    role: 'Distributor',
    balance: '₹ 156.40',
    kycStatus: 'Verified',
    status: 'Active',
    joinedDate: 'Jan 16, 2025',
    avatarLetter: 'J',
    avatarColor: 'bg-green-100 text-green-600',
  }
];

export const allMembersStatsData = [
  { title: "Total Users", value: "3", icon: "Users", color: "text-blue-500", bgColor: "bg-blue-100" },
  { title: "Distributors", value: "1", icon: "UserCheck", color: "text-green-500", bgColor: "bg-green-100" },
  { title: "Retailers", value: "2", icon: "ShoppingCart", color: "text-purple-500", bgColor: "bg-purple-100" },
  { title: "Active", value: "3", icon: "Activity", color: "text-emerald-500", bgColor: "bg-emerald-100" },
  { title: "Deactivated", value: "0", icon: "UserX", color: "text-red-500", bgColor: "bg-red-100" }
];

export const dashboardTopCardsData = [
  { title: "AEPS", value: "₹ 550.00", icon: "Activity", color: "text-blue-500", bgColor: "bg-blue-50" },
  { title: "DMT", value: "₹ 0.00", icon: "CreditCard", color: "text-purple-500", bgColor: "bg-purple-50" },
  { title: "WALLET ENQUIRY", value: "₹ 113.80", icon: "Wallet", color: "text-green-500", bgColor: "bg-green-50" }
];

export const dashboardUserStatsData = [
  { title: "Total Users", value: "3", icon: "Users", trend: "+12%", color: "text-indigo-500" },
  { title: "Distributors", value: "1", icon: "UserCheck", trend: "+5%", color: "text-emerald-500" },
  { title: "Retailers", value: "2", icon: "ShoppingCart", trend: "+18%", color: "text-amber-500" }
];

export const dashboardChartData = [
  { name: 'Feb 19', PG: 0, Payout: 0, BBPS: 0 },
  { name: 'Feb 20', PG: 0, Payout: 0, BBPS: 0 },
  { name: 'Feb 21', PG: 0, Payout: 0, BBPS: 0 },
  { name: 'Feb 22', PG: 0, Payout: 0, BBPS: 0 },
  { name: 'Feb 23', PG: 0, Payout: 0, BBPS: 0 },
  { name: 'Feb 24', PG: 0, Payout: 0, BBPS: 0 },
  { name: 'Feb 25', PG: 550, Payout: 0, BBPS: 0 },
];

export const dashboardPieData = [
  { name: 'AEPS', value: 550, color: '#3b82f6' },
  { name: 'Payout', value: 0, color: '#10b981' },
  { name: 'DMT', value: 0, color: '#f59e0b' },
  { name: 'Recharge', value: 0, color: '#ef4444' },
  { name: 'BBPS', value: 0, color: '#8b5cf6' },
];
