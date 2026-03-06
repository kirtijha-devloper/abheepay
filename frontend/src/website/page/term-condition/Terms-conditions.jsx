import React, { useState } from "react";
import {
  FileText,
  Scale,
  ShieldCheck,
  AlertCircle,
  Mail,
  Phone,
  ChevronRight,
  Globe,
  Lock,
  Users,
  FileCheck,
  Award,
  BookOpen,
  Heart,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <FileCheck size={22} />,
      color: "from-blue-500 to-cyan-500",
      content:
        "By accessing, browsing, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, along with our Privacy Policy and any other policies referenced herein. If you do not agree with any part of these Terms, please do not use our Services.",
    },
    {
      title: "Eligibility",
      icon: <Users size={22} />,
      color: "from-purple-500 to-pink-500",
      content:
        "You must be legally capable of entering into a binding contract under applicable laws to use our Services. By using our Services, you confirm that you meet this requirement.",
    },
    {
      title: "Service Usage",
      icon: <Globe size={22} />,
      color: "from-green-500 to-emerald-500",
      content:
        "You agree to use our Services strictly in compliance with all applicable laws, rules, and regulations. You shall not: use the Services for any illegal, fraudulent, or unauthorized purpose; attempt to gain unauthorized access to systems or data; misuse, disrupt, or interfere with the functioning of the Services; upload or transmit malicious code, viruses, or harmful content. We reserve the right to suspend or terminate your access if we believe you have violated these Terms.",
    },
    {
      title: "User Responsibilities",
      icon: <ShieldCheck size={22} />,
      color: "from-orange-500 to-red-500",
      content:
        "You are solely responsible for maintaining the confidentiality of your login credentials, all activities performed through your account, and ensuring the accuracy of the information you provide. You must immediately notify us if you suspect any unauthorized use of your account or any security breach.",
    },
    {
      title: "Account Management",
      icon: <Lock size={22} />,
      color: "from-indigo-500 to-purple-500",
      content:
        "We reserve the right to suspend, restrict, or terminate your account at any time without prior notice if you violate these Terms, we suspect fraudulent or suspicious activity, or required by law or regulatory authorities. Termination does not affect any rights or obligations that arose before termination.",
    },
    {
      title: "Limitation of Liability",
      icon: <AlertCircle size={22} />,
      color: "from-yellow-500 to-orange-500",
      content:
        "To the maximum extent permitted by law, Abheepay and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, loss of data, business interruption, or loss arising from unauthorized access. Our liability, if any, shall be limited to the amount paid by you (if applicable) for using our Services.",
    },
    {
      title: "Third-Party Services",
      icon: <Award size={22} />,
      color: "from-pink-500 to-rose-500",
      content:
        "Our Services may contain links to or integrations with third-party services. We are not responsible for the content, policies, or practices of such third parties. Your use of third-party services is governed by their respective terms.",
    },
    {
      title: "Intellectual Property",
      icon: <BookOpen size={22} />,
      color: "from-cyan-500 to-blue-500",
      content:
        "All content, trademarks, logos, designs, and software used in our Services are the intellectual property of Abheepay / Telering Process Private Limited. You may not copy, reproduce, distribute, or exploit any content without prior written permission.",
    },
    {
      title: "Governing Law",
      icon: <Scale size={22} />,
      color: "from-violet-500 to-purple-500",
      content:
        "These Terms shall be governed by and construed in accordance with the laws of India, and courts located in India shall have exclusive jurisdiction.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 px-4 font-sans relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#6366F1] to-[#A855F7] opacity-10 animate-float-particle"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      {/* Dynamic Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.03)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-6xl mx-auto relative">
        {/* Hero Section with 3D Effect */}
        <div className="relative mb-20">
          {/* Floating Shapes */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-full filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          {/* Main Header */}
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-full border border-gray-200 shadow-lg mb-6 hover:shadow-xl transition-all duration-300 group">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-gray-600">Legal Agreement v2.0</span>
              <span className="px-2 py-0.5 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white text-xs rounded-full">Updated</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Terms & 
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent relative">
                Conditions
                <svg className="absolute -bottom-4 left-0 w-full" height="20" viewBox="0 0 300 20" preserveAspectRatio="none">
                  <path d="M0,10 Q75,0 150,10 T300,10" stroke="url(#gradient)" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="50%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Welcome to <span className="font-bold text-gray-900">Abheepay</span>, a unit of{" "}
              <span className="font-bold text-gray-900">Telering Process Private Limited</span>
            </p>

            {/* Stats Cards */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              {[
                { label: "Last Updated", value: "Jan 31, 2025", icon: <FileText size={18} /> },
                { label: "Sections", value: "9", icon: <BookOpen size={18} /> },
                { label: "Read Time", value: "5 min", icon: <HelpCircle size={18} /> },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group bg-white/50 backdrop-blur-xl rounded-2xl px-6 py-4 border border-gray-200 hover:border-[#6366F1]/50 hover:shadow-xl transition-all duration-300 flex items-center gap-4"
                >
                  <div className="p-2 bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <div className="text-[#6366F1]">{stat.icon}</div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="relative mb-20 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6366F1]/10 to-[#A855F7]/10 rounded-full -mr-32 -mt-32"></div>
            
            <div className="flex items-start gap-6 relative z-10">
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded-2xl flex items-center justify-center text-white shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                  <Heart size={32} />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Our Digital Ecosystem</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  These Terms & Conditions ("Terms") govern your access to and use of our website,
                  mobile application, and digital financial services (collectively referred to as the
                  "Services"). By accessing or using our Services, you agree to comply with and be legally
                  bound by these Terms. If you do not agree with any part of these Terms, please do not
                  use our Services.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {sections.map((section, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setActiveSection(index)}
              onMouseLeave={() => setActiveSection(null)}
            >
              {/* Animated Border */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${section.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 ${activeSection === index ? 'opacity-100' : ''}`}></div>
              
              {/* Main Card */}
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Icon Container */}
                <div className={`w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  <div className="relative">
                    {section.icon}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-between">
                  <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#A855F7] transition-all duration-300">
                    {section.title}
                  </span>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transform transition-all duration-300 ${activeSection === index ? 'translate-x-1 text-[#6366F1]' : ''}`} />
                </h3>

                {/* Content with gradient fade */}
                <p className="text-gray-600 leading-relaxed text-sm flex-grow relative">
                  {section.content}
                  <span className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent group-hover:opacity-0 transition-opacity duration-300"></span>
                </p>

                {/* Read More Button */}
                <button className="mt-4 text-sm font-medium text-[#6366F1] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1">
                  Read Full Section
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Policy Update Banner */}
        <div className="relative mb-20 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-3xl opacity-75 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
          <div className="relative bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-3xl p-10 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 -mr-48 -mt-48 group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center transform rotate-6 group-hover:rotate-12 transition-transform duration-300">
                    <FileText size={40} className="text-white" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-2">Updates to Terms</h3>
                  <p className="text-white/90 text-lg max-w-2xl">
                    We reserve the right to modify these Terms. Material changes will be communicated via email or through our website. Continued use constitutes acceptance.
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Globe size={16} /> Governed by Indian Law
                    </span>
                    <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                    <span className="flex items-center gap-1">
                      <Scale size={16} /> Exclusive Jurisdiction
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-white/20 backdrop-blur rounded-xl hover:bg-white/30 transition-all duration-300 text-sm font-medium">
                  View Changes
                </button>
                <button className="px-6 py-3 bg-white text-[#6366F1] rounded-xl hover:shadow-xl transition-all duration-300 text-sm font-medium">
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section with 3D Cards */}
        <div className="relative">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Need Clarification?</h2>
            <p className="text-gray-600">Our team is available 24/7 to assist you with any questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Card */}
            <a
              href="mailto:care@abheepay.in"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Support</p>
                  <p className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#A855F7] transition-all duration-300">
                    care@abheepay.in
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Average response: 2 hours</p>
                </div>
                <ChevronRight className="ml-auto w-6 h-6 text-gray-400 group-hover:translate-x-2 group-hover:text-[#6366F1] transition-all duration-300" />
              </div>
            </a>

            {/* Phone Card */}
            <a
              href="tel:8860037218"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#EC4899] to-[#8B5CF6] rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Support</p>
                  <p className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#EC4899] group-hover:to-[#8B5CF6] transition-all duration-300">
                    88600 37218
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Available 24/7</p>
                </div>
                <ChevronRight className="ml-auto w-6 h-6 text-gray-400 group-hover:translate-x-2 group-hover:text-[#EC4899] transition-all duration-300" />
              </div>
            </a>
          </div>

          {/* Live Chat Button */}
          <div className="fixed bottom-8 right-8 z-50">
            <button className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-full opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-300 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-[#6366F1] to-[#A855F7] p-4 rounded-full text-white shadow-xl flex items-center gap-3 hover:gap-4 transition-all duration-300">
                <MessageCircle size={24} />
                <span className="max-w-0 group-hover:max-w-xs overflow-hidden transition-all duration-500 whitespace-nowrap font-medium">
                  Live Chat
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.2);
          }
          66% {
            transform: translate(-50px, 50px) scale(0.8);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-50px, 50px) scale(0.9);
          }
        }

        .animate-float-particle {
          animation: float-particle 20s infinite ease-in-out;
        }

        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default TermsConditions;