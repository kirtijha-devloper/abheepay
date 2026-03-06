import React, { useState, useEffect, useRef } from "react";
import { Search, X, Menu, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // mobile
  const [scrolled, setScrolled] = useState(false);

  // Desktop services dropdown control
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  // Search logic states
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // POORA ORIGINAL DATA (Kuch bhi nahi hataya)
  const allServices = [
    {
      name: "Digital Payment Solutions",
      path: "/services/digital-payment-solutions",
      keywords: ["digital", "payment", "upi", "qr", "gateway"],
      items: [
        {
          name: "Online Payment Gateway – UPI, Cards, Net Banking, Wallets",
          path: "/services/online-payment-gateway–upi-cards-net-banking-wallets",
        },
        { name: "POS & Android POS Devices", path: "/services/pos-devices" },
        { name: "QR-Based Contactless Payments", path: "/services/qr-based-contactless-payments" },
        { name: "Smart routing with high success rates", path: "/services/Smart-routing-with-high-success-rates" },
        {
          name: "Real-time monitoring and PCI-DSS compliant architecture",
          path: "/services/real-time-monitoring-and-pci-dss-compliant-architecture",
        },
      ],
    },
    {
      name: "Assisted Banking & Cash Management",
      path: "/services/assisted-banking-cash-management",
      keywords: ["banking", "cash", "matm", "aeps"],
      items: [
        {
          name: "AEPS – Cash withdrawal, balance inquiry, mini statement",
          path: "/services/aeps-cash-withdrawal-balance-inquiry-mini-statement",
        },
        { name: "Micro ATM (mATM) services", path: "/services/micro-atm-matm-services" },
        { name: "Domestic Money Transfer (DMT)", path: "/services/domestic-money-transfer" },
      ],
    },
    {
      name: "BBPS, Recharge & Bill Payments",
      path: "/services/bbps-recharge-bill-payments",
      keywords: ["bbps", "bill", "payment", "recharge", "dth", "mobile", "bill"],
      items: [
        {
          name: "Utility bill payments – electricity, gas, water, FASTag",
          path: "/services/utility-bill-payments-electricity-gas-water-fastag",
        },
        { name: "Mobile, DTH & data card recharges", path: "/services/mobile-dth-data-card-recharges" },
        { name: "Credit card bill payments", path: "/services/credit-card-bill-payments" },
      ],
    },
    {
      name: "Lending & Credit Solutions",
      path: "/services/lending-credit-solutions",
      keywords: ["loan", "credit", "finance", "lending"],
      items: [
        { name: "Business loans & working capital finance", path: "/services/business-loans-working-capital-finance" },
        { name: "Personal loans with digital onboarding", path: "/services/personal-loans-with-digital-onboarding" },
        { name: "Credit card sourcing and lifecycle support", path: "/services/credit-card-sourcing-and-lifecycle-support" },
      ],
    },
    {
      name: "Insurance Solutions",
      path: "/services/insurance-solutions",
      keywords: ["insurance", "policy", "lic"],
      items: [
        { name: "Health insurance", path: "/services/health-insurance" },
        { name: "Life insurance", path: "/services/life-insurance" },
        { name: "General & travel insurance", path: "/services/general-travel-insurance" },
      ],
    },
    {
      name: "Travel APIs & Travel Services",
      path: "/services/travel-apis-travel-services",
      keywords: ["travel", "flight", "hotel", "api"],
      items: [
        { name: "Flight booking (Domestic & International)", path: "/services/flight-booking-domestic-international" },
        { name: "Bus ticket booking", path: "/services/bus-ticket-booking" },
        { name: "Train ticket booking", path: "/services/train-ticket-booking" },
        { name: "Hotel booking", path: "/services/hotel-booking" },
        { name: "Holiday packages", path: "/services/holiday-packages" },
        { name: "Travel insurance integration", path: "/services/travel-insurance-integration" },
        { name: "Commission-based travel services", path: "/services/commission-based-travel-services" },
      ],
    },
    {
      name: "Technology & API Services",
      path: "/services/technology-api-services",
      keywords: ["technology", "api", "integration"],
      items: [
        { name: "Payment, banking, travel & wallet APIs", path: "/services/payment-banking-travel-wallet-apis" },
        { name: "Settlement & reconciliation systems", path: "/services/settlement-reconciliation-systems" },
        { name: "Merchant, distributor & admin dashboards", path: "/services/Merchant-distributor-admin-dashboards" },
        { name: "White-label fintech & travel platforms", path: "/services/white-label-fintech-travel-platforms" },
      ],
    },
    {
      name: "Web Infrastructure & Maintenance",
      path: "/services/web-infrastructure-maintenance",
      keywords: ["web", "maintenance", "hosting", "server"],
    },
    {
      name: "Ecommerece websites",
      path: "/services/ecommerce-websites",
      keywords: ["ecommerce", "shop", "website"],
    },
    {
      name: "software development",
      path: "/services/software-development",
      keywords: ["software", "app", "development"],
    },
    {
      name: "Customised  software development",
      path: "/services/customised-software-development",
      keywords: ["software", "custom", "tailored", "solution"],
    },
    {
      name: "White label software development",
      path: "/services/white-label-software-development",
      keywords: ["white label", "resell", "software", "branding"],
    },
    {
      name: "App development",
      path: "/services/app-development",
      keywords: ["android", "ios", "mobile", "app", "development"],
    },
  ];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = allServices.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSuggestions(filtered);
    }
  }, [searchQuery]);

  const handleSearchNav = (path) => {
    navigate(path);
    setOpenSearch(false);
    setSearchQuery("");
  };

  // Desktop dropdown hover handlers with delay on leave
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 overflow-visible ${scrolled ? "bg-black/70 shadow-lg" : "bg-black/20"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/assets/image/logo/logos.png" alt="Logo" className="h-20 w-24 object-contain" />
            </Link>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center items-center gap-10 text-white">
            <Link
              to="/about"
              className="relative text-sm font-semibold tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#00D3CD] after:transition-all after:duration-300 hover:after:w-full hover:text-[#00D3CD]"
            >
              ABOUT US
            </Link>

            <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link
                to="/services"
                className="relative text-sm font-semibold tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#00D3CD] after:transition-all after:duration-300 hover:after:w-full hover:text-[#00D3CD]"
              >
                SERVICES
              </Link>

              {/* ✅ CHANGE #1: absolute → fixed (live clipping issue fix) */}
              <div
                className={`fixed top-20 left-1/2 -translate-x-1/2  w-[950px] max-w-[95vw] transition-all duration-200 ease-out z-[9999] lg:block
                  ${servicesDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }`}
              >
                {/* Extra padding-top to create safe hover area between link and dropdown */}
                <div>
                  <div className="grid grid-cols-3 gap-5 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 max-h-[85vh] overflow-y-auto">
                    {/* API COLUMN */}
                    <div className="bg-[#F6FAFF] rounded-xl p-5">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">API</h3>
                      <div className="space-y-3">
                        {allServices.slice(0, 7).map((s, i) => (
                          <div key={i} className="group/item">
                            <Link
                              to={s.path}
                              className="flex items-center gap-4 transition-all hover:translate-x-1.5 hover:text-[#00D3CD]"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <span className="text-[#00D3CD] text-xl font-bold w-6 flex justify-center group-hover/item:scale-125">
                                {i === 0
                                  ? "📱"
                                  : i === 1
                                    ? "🏦"
                                    : i === 2
                                      ? "🧾"
                                      : i === 3
                                        ? "⚡"
                                        : i === 4
                                          ? "💳"
                                          : i === 5
                                            ? "🛡️"
                                            : "✈️"}
                              </span>
                              <p className="font-semibold text-gray-900 leading-tight">{s.name}</p>
                            </Link>

                            {s.items?.length > 0 && (
                              <div className="ml-10 mt-2 hidden group-hover/item:block">
                                <ul className="space-y-1 text-sm text-gray-700">
                                  {s.items.map((it, idx) => (
                                    <li key={idx}>
                                      <Link
                                        to={it.path}
                                        className="flex gap-2 hover:text-[#00D3CD] py-0.5"
                                        onClick={() => setServicesDropdownOpen(false)}
                                      >
                                        <span className="text-[#00D3CD]">•</span>
                                        <span>{it.name}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* BANKING COLUMN */}
                    <div className="bg-[#F5FBF6] rounded-xl p-5">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Banking</h3>
                      <div className="space-y-3">
                        {allServices.slice(0, 7).map((s, i) => (
                          <div key={i} className="group/item">
                            <Link
                              to={s.path}
                              className="flex items-center gap-4 transition-all hover:translate-x-1.5 hover:text-[#00D3CD]"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <span className="text-xl w-6 flex justify-center group-hover/item:scale-125">
                                {i === 0 ? "🌐" : i === 1 ? "📱" : i === 2 ? "🏦" : i === 3 ? "🧾" : i === 4 ? "💳" : i === 5 ? "🛡️" : "✈️"}
                              </span>
                              <p className="font-semibold text-gray-900 leading-tight">{s.name}</p>
                            </Link>

                            {s.items?.length > 0 && (
                              <div className="ml-10 mt-2 hidden group-hover/item:block">
                                <ul className="space-y-1 text-sm text-gray-700">
                                  {s.items.map((it, idx) => (
                                    <li key={idx}>
                                      <Link
                                        to={it.path}
                                        className="flex gap-2 hover:text-[#00D3CD] py-0.5"
                                        onClick={() => setServicesDropdownOpen(false)}
                                      >
                                        <span className="text-[#00D3CD]">•</span>
                                        <span>{it.name}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DEVELOPMENT COLUMN */}
                    <div className="bg-[#FFF7ED] rounded-xl p-5">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Development</h3>
                      <div className="space-y-3">
                        {allServices.slice(7).map((s, i) => (
                          <div key={i} className="group/item">
                            <Link
                              to={s.path}
                              className="flex items-center gap-4 transition-all hover:translate-x-1.5 hover:text-[#00D3CD]"
                              onClick={() => setServicesDropdownOpen(false)}
                            >
                              <span className="text-xl w-6 flex justify-center group-hover/item:scale-125">
                                {i === 0 ? "🌐" : i === 1 ? "🛒" : i === 5 ? "📱" : "💻"}
                              </span>
                              <p className="font-semibold text-gray-900 leading-tight">{s.name}</p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/join-as-retailer"
              className="relative text-sm font-semibold tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#00D3CD] after:transition-all after:duration-300 hover:after:w-full hover:text-[#00D3CD]"
            >
              JOIN AS RETAILER
            </Link>
            <Link
              to="/join-as-distributor"
              className="relative text-sm font-semibold tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#00D3CD] after:transition-all after:duration-300 hover:after:w-full hover:text-[#00D3CD]"
            >
              JOIN AS DISTRIBUTOR
            </Link>
            <Link to="/blog" className="relative text-sm font-semibold tracking-wide hover:text-[#00D3CD]">
              BLOGS
            </Link>
            <Link to="/contact" className="relative text-sm font-semibold tracking-wide hover:text-[#00D3CD]">
              CONTACT US
            </Link>
            <Link to="/login" className="relative text-sm font-semibold tracking-wide hover:text-[#00D3CD]">
              LOGIN
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenSearch(true)}
              className="p-2 rounded-full hover:bg-gray-700/50 text-white transition-colors"
            >
              <Search size={20} />
            </button>
            <button
              className="lg:hidden text-white p-2 rounded-md hover:bg-gray-700/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } bg-[#0F172A] text-white`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="p-6 border-b border-gray-700">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <img src="/assets/image/logo/logos.png" alt="Logo" className="h-20 w-20 object-contain" />
            </Link>
          </div>
          <div className="px-6 py-8 flex flex-col gap-6">
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
              ABOUT US
            </Link>

            <div>
              <button
                className="w-full flex justify-between items-center font-semibold"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>SERVICES</span> {servicesOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </button>

              {servicesOpen && (
                <div className="mt-4 pl-5 flex flex-col gap-4 border-l-2 border-[#00D3CD]/30">
                  {allServices.map((s, i) => (
                    <div key={i}>
                      <Link
                        to={s.path}
                        className="block font-bold text-[#00D3CD]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {s.name}
                      </Link>
                      {s.items?.map((it, idx) => (
                        <Link
                          key={idx}
                          to={it.path}
                          className="block text-xs text-gray-400 mt-2"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          - {it.name}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/join-as-retailer" onClick={() => setMobileMenuOpen(false)}>
              JOIN AS RETAILER
            </Link>
            <Link to="/join-as-distributor" onClick={() => setMobileMenuOpen(false)}>
              JOIN AS DISTRIBUTOR
            </Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>
              BLOGS
            </Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              CONTACT US
            </Link>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      {openSearch && (
        <div className="absolute top-full left-0 w-full bg-[#222836] border-t border-gray-700 shadow-xl z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 relative">
            <div className="flex items-center gap-4 text-white">
              <Search className="text-gray-400" />
              <input
                type="text"
                autoFocus
                className="w-full text-lg bg-transparent outline-none"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && suggestions[0] && handleSearchNav(suggestions[0].path)}
              />
              <button
                onClick={() => {
                  setOpenSearch(false);
                  setSearchQuery("");
                }}
              >
                <X size={20} />
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="absolute left-6 right-6 top-full bg-[#1a1f2b] border border-gray-700 rounded-b-lg shadow-2xl overflow-hidden max-w-lg">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSearchNav(s.path)}
                    className="px-4 py-3 hover:bg-[#00D3CD]/10 cursor-pointer text-white border-b border-gray-800 last:border-none"
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {mobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Navbar;