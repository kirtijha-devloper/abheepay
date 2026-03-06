import React, { useState } from "react";
import {
  Shield,
  Settings,
  Lock,
  Cookie,
  Globe,
  User,
  RefreshCw,
  Mail,
  Phone,
  ChevronRight,
  Fingerprint,
  Eye,
  Bell,
  Database,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 1,
      icon: <Shield className="w-6 h-6" />,
      title: "Introduction & Acceptance",
      subtitle: "Who we are and what this policy covers",
      content: [
        "Abheepay (“we”, “us”, “our”) respects every individual’s right to privacy and is committed to protecting their Personal Data and Sensitive Personal Data or Information.",
        "This Privacy Policy (“Policy”) applies to all visitors (who do not have an account) and users (who have registered accounts) (collectively “User”) who access, browse, or use our website, applications, platforms, or services (collectively “Platform”).",
        "This Policy explains how we collect, use, store, process, transfer, and disclose User data.",
        "By accessing or using our Platform, you acknowledge that you have read, understood, and agreed to this Policy. If you do not agree, please do not use our services.",
        "This Policy forms part of Abheepay’s Terms & Conditions. Continued use of our services after updates constitutes acceptance of the revised Policy.",
        "We reserve the right to modify this Policy at any time. Material changes will be notified via registered email or other communication channels. Users are advised to review this Policy periodically.",
      ],
    },
    {
      id: 2,
      icon: <FileText className="w-6 h-6" />,
      title: "Legal Compliance",
      subtitle: "Laws and regulations we follow",
      content: [
        "This Policy is published in compliance with:",
        "Section 43A of the Information Technology Act, 2000",
        "Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011",
        "Digital Personal Data Protection Act, 2023 (“DPDP Act”) and applicable rules",
      ],
    },
    {
      id: 3,
      icon: <Database className="w-6 h-6" />,
      title: "Definitions",
      subtitle: "Key terms used in this Policy",
      content: [
        "Data Fiduciary: Entity determining purpose and means of processing personal data.",
        "Data Principal: Individual to whom personal data relates.",
        "Personal Data: Any data about an identifiable individual.",
        "Personal Information: Information capable of identifying a person directly or indirectly.",
        "Sensitive Personal Data or Information: Includes passwords, financial information, health data, biometric information, and similar sensitive categories as defined under applicable law.",
        "Payment Data: Transaction data including customer information, payment credentials, account details, and transaction references.",
        "Information publicly available or disclosed under law is not treated as sensitive data.",
      ],
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Consent",
      subtitle: "Your consent and how it works",
      content: [
        "By using our Platform, Users consent to collection, storage, processing, and use of their Personal Information for lawful purposes.",
        "Sensitive Personal Data is collected only with explicit consent, such as when creating an account or submitting forms.",
        "If a User is under 18 years of age, parental or guardian consent is presumed.",
        "Users may withdraw consent at any time. However, doing so may limit service availability.",
      ],
    },
    {
      id: 5,
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      subtitle: "Categories of data we may collect",
      content: [
        {
          type: "Account & Identity Data",
          desc: "Name, age, demographic details, username and password, email address, mobile number, postal address and contact details, PAN or other KYC details.",
        },
        {
          type: "Payment & Transaction Data",
          desc: "Payment instrument details, transaction records, payment history, deposits and withdrawals, service usage records, settlement and reconciliation data.",
        },
        {
          type: "Device & Technical Data",
          desc: "IP address and device identifiers, device and browser information, cookies and usage data, log files and access timestamps.",
        },
        {
          type: "Support & Communications",
          desc: "Feedback, queries, and communications shared with us through customer support or other channels.",
        },
        {
          type: "Other Necessary Information",
          desc: "Any other information required for service delivery and compliance, as applicable.",
        },
      ],
    },
    {
      id: 6,
      icon: <Settings className="w-6 h-6" />,
      title: "Purpose of Collection",
      subtitle: "Why we collect and use your data",
      content: [
        "Providing secure and efficient services.",
        "Account creation and verification.",
        "Customer support and issue resolution.",
        "Processing transactions.",
        "Fraud detection and prevention.",
        "Service improvement and analytics.",
        "Compliance with regulatory requirements.",
        "Marketing and promotional communication (with opt-out option).",
        "Development of new products and features.",
        "Enforcement of legal rights and agreements.",
      ],
    },
    {
      id: 7,
      icon: <RefreshCw className="w-6 h-6" />,
      title: "How Information Is Collected",
      subtitle: "Sources of data collection",
      content: [
        "Directly from Users during registration or service use.",
        "Through communications with customer support.",
        "Automatically via cookies and analytics tools.",
        "From third-party integrations or partners where permitted.",
      ],
    },
    {
      id: 8,
      icon: <Globe className="w-6 h-6" />,
      title: "Disclosure of Information",
      subtitle: "When and with whom we may share data",
      content: [
        "Affiliates and group companies.",
        "Banks and payment partners.",
        "Technology vendors and service providers.",
        "Regulatory authorities or law enforcement when required by law.",
        "Professional advisors.",
        "We may also disclose data in connection with mergers, acquisitions, restructuring, or sale of business assets.",
        "Credit information accessed through our platform shall be used strictly for consented purposes and never for unauthorized use.",
      ],
    },
    {
      id: 9,
      icon: <Globe className="w-6 h-6" />,
      title: "Location Data",
      subtitle: "Collection and use of location information",
      content: [
        "We may collect approximate or precise device location data if permission is granted.",
        "Uses include: location-based services, fraud detection, regulatory compliance, and service optimization.",
        "Users may disable location permissions through device or browser settings. Some features may then become unavailable.",
        "Location data is shared only with authorized service providers or authorities and retained only as long as necessary.",
      ],
    },
    {
      id: 10,
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies & Tracking Technologies",
      subtitle: "How cookies help improve your experience",
      content: [
        "We use cookies and similar technologies to understand user behavior, improve performance, and personalize experience.",
        "Users may disable cookies in browser settings; however, some features may not function properly.",
        "Third-party cookies may appear on certain pages, and we are not responsible for such third-party practices.",
      ],
    },
    {
      id: 11,
      icon: <Globe className="w-6 h-6" />,
      title: "Third-Party Links",
      subtitle: "External sites and services",
      content:
        "Our Platform may contain links to external websites. We are not responsible for the privacy practices of such websites.",
    },
    {
      id: 12,
      icon: <User className="w-6 h-6" />,
      title: "User Rights (Access, Correction, Erasure)",
      subtitle: "Your rights over your personal data",
      content: [
        "Review your data.",
        "Update or correct inaccuracies.",
        "Request deletion of personal data (subject to legal retention requirements).",
        "Requests can be made through account settings or by contacting us.",
      ],
    },
    {
      id: 13,
      icon: <Clock className="w-6 h-6" />,
      title: "Data Retention",
      subtitle: "How long we keep your data",
      content: [
        "We retain personal data only for as long as required for stated purposes, required by law/regulation, or needed for legal/contractual obligations.",
        "After this period, data is securely deleted or anonymized.",
      ],
    },
    {
      id: 14,
      icon: <Mail className="w-6 h-6" />,
      title: "Communications",
      subtitle: "Transactional and promotional messages",
      content: [
        "We may send transactional or promotional communications.",
        "Users can opt out of promotional emails via unsubscribe links or account settings.",
      ],
    },
    {
      id: 15,
      icon: <Eye className="w-6 h-6" />,
      title: "Advertising",
      subtitle: "How ads may be served",
      content: [
        "We may use third-party advertising providers.",
        "These providers may use anonymized data to display relevant advertisements.",
        "No personally identifiable information is shared for advertising purposes.",
      ],
    },
    {
      id: 16,
      icon: <Database className="w-6 h-6" />,
      title: "Data Localization",
      subtitle: "Where payment data is stored",
      content: [
        "In compliance with Reserve Bank of India regulations, all payment data is stored only on servers located within India.",
        "For cross-border transactions, copies of domestic transaction data may be stored abroad if legally required.",
      ],
    },
    {
      id: 17,
      icon: <Lock className="w-6 h-6" />,
      title: "Security Measures",
      subtitle: "How we protect your data",
      content: [
        "We maintain strict administrative, technical, and physical safeguards to protect data, including secure servers, encryption protocols, access controls, firewall protection, and periodic security audits.",
        "In case of any data breach likely to cause harm, affected Users will be notified promptly.",
      ],
    },
    {
      id: 18,
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Changes to This Policy",
      subtitle: "Policy updates and revisions",
      content:
        "We reserve the right to modify this Policy at any time. Material changes will be notified via registered email or other communication channels. Continued use of our services after updates constitutes acceptance of the revised Policy.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1E] py-12 px-4 sm:px-6 lg:py-20 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E2A4A_1px,transparent_1px),linear-gradient(to_bottom,#1E2A4A_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00D3CD] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E2A4A]/50 backdrop-blur-sm border border-[#00D3CD]/20 rounded-full px-4 py-2 mb-6">
            <Fingerprint className="w-4 h-4 text-[#00D3CD]" />
            <span className="text-xs font-medium text-[#00D3CD] tracking-wider">
              END-TO-END ENCRYPTED
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#00D3CD] via-white to-[#00D3CD] bg-clip-text text-transparent animate-gradient">
              Privacy Policy
            </span>
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Welcome to{" "}
            <span className="text-[#00D3CD] font-semibold">Abheepay</span>. Your privacy and data security
            are extremely important to us.
          </p>

          <p className="text-gray-500 max-w-3xl mx-auto mt-4">
            This Privacy Policy explains how we collect, use, store, process,
            transfer, and protect your personal information when you access or
            use Abheepay’s website, mobile application, and digital financial
            services.
            <br />
            <span className="text-gray-400">
              By using Abheepay services, you agree to the collection and use of
              information in accordance with this policy.
            </span>
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Navigation/Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#151F33]/80 backdrop-blur-sm border border-[#2A3A5A] rounded-2xl p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00D3CD]/10 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#00D3CD]" />
                </div>
                <h3 className="text-white font-semibold">Policy Sections</h3>
              </div>

              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onMouseEnter={() => setActiveSection(section.id)}
                    onMouseLeave={() => setActiveSection(null)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#1E2A4A] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-[#00D3CD] text-black"
                            : "bg-[#1E2A4A] text-gray-400"
                        }`}
                      >
                        {section.icon}
                      </div>
                      <span
                        className={`text-sm transition-colors duration-300 ${
                          activeSection === section.id
                            ? "text-[#00D3CD]"
                            : "text-gray-400"
                        }`}
                      >
                        {section.title}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        activeSection === section.id
                          ? "text-[#00D3CD] translate-x-1"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-8 pt-6 border-t border-[#2A3A5A]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="text-xs text-gray-500">Data Encryption</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-xs text-gray-500">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Content cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company info card */}
            <div className="bg-gradient-to-br from-[#00D3CD] to-[#008B88] rounded-2xl p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-pattern opacity-20 group-hover:scale-110 transition-transform duration-700"></div>

              <div className="relative flex items-start gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Abheepay
                  </h2>
                  <p className="text-white/90 leading-relaxed">
                    Abheepay respects every individual’s right to privacy and is
                    committed to protecting Personal Data and Sensitive Personal
                    Data or Information. We follow applicable Indian data
                    protection laws and industry security practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic content cards */}
            {sections.map((section) => (
              <div
                key={section.id}
                className="group relative"
                onMouseEnter={() => setActiveSection(section.id)}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r from-[#00D3CD] to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur ${
                    activeSection === section.id ? "opacity-75" : ""
                  }`}
                ></div>

                <div className="relative bg-[#151F33] backdrop-blur-sm border border-[#2A3A5A] rounded-2xl p-8 hover:bg-[#1A253C] transition-all duration-500">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br from-[#00D3CD]/20 to-transparent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        activeSection === section.id ? "from-[#00D3CD]/40" : ""
                      }`}
                    >
                      <div className="text-[#00D3CD] group-hover:rotate-12 transition-transform duration-300">
                        {section.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#00D3CD] transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-500">{section.subtitle}</p>
                    </div>

                    <div className="text-6xl font-bold text-[#2A3A5A] opacity-20 group-hover:opacity-30 transition-opacity">
                      {String(section.id).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Array.isArray(section.content) ? (
                      section.content.map((item, i) =>
                        typeof item === "string" ? (
                          <div key={i} className="flex items-start gap-3 group/item">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00D3CD] mt-2 group-hover/item:scale-150 transition-transform"></div>
                            <p className="text-gray-300 group-hover/item:text-gray-200 transition-colors">
                              {item}
                            </p>
                          </div>
                        ) : (
                          <div
                            key={i}
                            className="bg-[#1E2A4A]/50 rounded-xl p-4 hover:bg-[#1E2A4A] transition-all duration-300"
                          >
                            <h4 className="text-[#00D3CD] font-semibold mb-2 flex items-center gap-2">
                              <span className="w-1 h-4 bg-[#00D3CD] rounded-full"></span>
                              {item.type}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-gray-300 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-5">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            ))}

            {/* Contact section */}
            <div className="bg-gradient-to-br from-[#1E2A4A] to-[#151F33] rounded-2xl p-8 border border-[#2A3A5A] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#00D3CD] rounded-full filter blur-3xl opacity-10"></div>

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-[#00D3CD]" />
                Grievance Officer / Contact Us
              </h3>

              <p className="text-gray-400 mb-6">
                For any privacy concerns, complaints, or requests related to this Privacy Policy, please contact us.
                <br />
                <span className="text-gray-500">Response Time: Within 30 days of receipt of request.</span>
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group/contact">
                  <div className="bg-[#1A253C] rounded-xl p-5 hover:bg-[#1E2A4A] transition-all duration-300 border border-[#2A3A5A] hover:border-[#00D3CD]/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#00D3CD]/10 rounded-lg flex items-center justify-center group-hover/contact:scale-110 transition-transform">
                        <Mail className="w-5 h-5 text-[#00D3CD]" />
                      </div>
                      <span className="text-gray-400">Email Support</span>
                    </div>
                    <a
                      href="mailto:support@abheepay.com"
                      className="text-white font-semibold text-lg hover:text-[#00D3CD] transition-colors"
                    >
                      support@abheepay.com
                    </a>
                  </div>
                </div>

                <div className="group/contact">
                  <div className="bg-[#1A253C] rounded-xl p-5 hover:bg-[#1E2A4A] transition-all duration-300 border border-[#2A3A5A] hover:border-[#00D3CD]/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-[#00D3CD]/10 rounded-lg flex items-center justify-center group-hover/contact:scale-110 transition-transform">
                        <Phone className="w-5 h-5 text-[#00D3CD]" />
                      </div>
                      <span className="text-gray-400">Phone Support</span>
                    </div>
                    <a
                      href="tel:8860037218"
                      className="text-white font-semibold text-lg hover:text-[#00D3CD] transition-colors"
                    >
                      8860037218
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-[#2A3A5A]">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00D3CD]" />
                  <span className="text-xs text-gray-500">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#00D3CD]" />
                  <span className="text-xs text-gray-500">Privacy Controls</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00D3CD]" />
                  <span className="text-xs text-gray-500">30-day Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00D3CD]" />
                  <span className="text-xs text-gray-500">Regular Audits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;