import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Users,
  Briefcase,
  Lock,
  Globe,
  MoveRight,
  Shield,
  Zap,
} from "lucide-react";
import Ourclient from "../home/Ourclient";

const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  const target = parseInt(value.replace(/[^0-9]/g, ""));
  const symbol = value.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <>
      {count}
      {symbol}
    </>
  );
};

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const tabData = {
    mission: {
      quote:
        "To build a secure, intelligent, and inclusive digital ecosystem that enables financial services for all.",
      desc: "Our mission is to build a secure, intelligent, and inclusive digital ecosystem that seamlessly enables payments, banking, credit, insurance, travel, and API-driven financial services. We focus on creating technology-led solutions that are reliable, compliant, and easy to use, empowering both businesses and individuals to access essential financial services. By simplifying complex financial processes and ensuring trust at every level, we help our partners, merchants, and users grow with confidence and long-term stability in an evolving digital economy.",
    },
    vision: {
      quote: "To become a trusted digital financial backbone for India.",
      desc: "Our vision is to become a trusted digital financial backbone for India by delivering secure, scalable, and compliant fintech and service platforms. We aim to support the nation’s growing digital economy by enabling sustainable financial access for businesses, merchants, and individuals across urban and rural regions alike. Through innovation, strong infrastructure, and long-term impact-driven solutions, we strive to contribute to inclusive economic growth and build lasting trust in digital financial services.",
    },
  };

  const values = [
    {
      title: "Security First",
      desc: "Bank-grade security protocols ensuring safe transactions",
      icon: <Shield className="w-6 h-6 text-white" />,
      style: "bg-slate-50 text-slate-800",
      iconBg: "bg-[#2DD4BF]",
    },
    {
      title: "Innovation",
      desc: "Cutting-edge technology driving financial solutions",
      icon: <Zap className="w-6 h-6 text-white" />,
      style: "bg-slate-50 text-slate-800",
      iconBg: "bg-[#2DD4BF]",
    },
    {
      title: "Customer Focus",
      desc: "Dedicated to retailer success and satisfaction",
      icon: <Users className="w-6 h-6 text-white" />,
      style: "bg-slate-50 text-slate-800",
      iconBg: "bg-[#2DD4BF]",
    },
  ];

  return (
    <div className="font-sans text-gray-800 min-h-screen">
    
      <section
        className="relative h-[320px] sm:h-[500px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">About Us</h1>
        </div>
      </section>

    
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
         
          <div className="relative mx-auto md:mx-0 max-w-md md:max-w-none">
            <div className="w-full sm:w-10/12 overflow-hidden rounded-[40px] shadow-lg mx-auto md:mx-0">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Digital financial services"
                className="w-full h-[380px] sm:h-[450px] object-cover"
              />
            </div>

            <div className="absolute -bottom-8 sm:-bottom-10 right-4 sm:right-1 w-8/12 sm:w-6/12 rounded-[40px] overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80"
                alt="Merchant empowerment"
                className="w-full h-48 sm:h-64 object-cover"
              />
            </div>

            <div
              className="absolute top-6 sm:top-10 right-2 sm:right-4 bg-[#00D3CD] text-white p-5 sm:p-8 rounded-2xl shadow-lg min-w-[120px] sm:min-w-[150px] text-center"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 82%, 18% 100%, 0 100%)",
              }}
            >
              <h3 className="text-3xl sm:text-4xl font-bold">30K+</h3>
              <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                Active <br /> Partners
              </p>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 text-center md:text-left mt-12 md:mt-0">
            <div>
              <h4 className="text-[#00D3CD] font-bold tracking-[0.2em] uppercase text-xs mb-3 sm:mb-4">
                About AbheePay
              </h4>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-medium leading-tight sm:leading-[1.1] text-slate-800">
                Powering Digital Finance for <br className="hidden sm:block" />
                <span className="font-bold">Modern Indian Businesses</span>
              </h2>
            </div>

            <p className="text-gray-600 max-w-lg mx-auto md:mx-0 text-base">
              AbheePay is a technology-driven fintech and digital financial
              services company delivering secure, scalable, and compliance-ready
              solutions across India.
            </p>

            <p className="text-gray-600 max-w-lg mx-auto md:mx-0 text-base">
              Designed to serve merchants, MSMEs, enterprises, partners, and
              consumers, AbheePay combines robust financial infrastructure with
              innovation-led technology to simplify transactions and enable
              sustainable business growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                "Secure & Scalable Payment Solutions",
                "Banking, Credit & Insurance Services",
                "API-Led Financial Infrastructure",
                "Trusted Platform for MSMEs & Enterprises",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle className="text-[#00D3CD] w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#00D3CD] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-white text-center">
            {[
              { icon: <Briefcase />, count: "1000+", label: "Partner Retailers" },
              { icon: <Globe />, count: "50+", label: "Cities Covered" },
              { icon: <Users />, count: "10k", label: "Happy Customers" },
              { icon: <Lock />, count: "100%", label: "Secure Transactions" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 border-b sm:border-r border-white/20 last:border-0 pb-6 sm:pb-0"
              >
                <div className="bg-black/10 p-3 rounded-full shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    <AnimatedNumber value={stat.count} />
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#feffff] uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h4 className="text-[#00D3CD] font-bold uppercase text-sm tracking-wide">
              Our Mission & Vision
            </h4>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
              Our Main Goal to Satisfied Local & Global Clients
            </h2>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 my-6">
              <button
                onClick={() => setActiveTab("mission")}
                className={`px-5 sm:px-6 py-2 rounded-full text-sm font-semibold transition ${
                  activeTab === "mission"
                    ? "bg-[#00D3CD] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`px-5 sm:px-6 py-2 rounded-full text-sm font-semibold transition ${
                  activeTab === "vision"
                    ? "bg-[#00D3CD] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Our Vision
              </button>
            </div>

            <p className="text-gray-600 italic text-base max-w-xl mx-auto md:mx-0">
              {tabData[activeTab].quote}
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
              {tabData[activeTab].desc}
            </p>
          </div>

          <div className="mt-8 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="Global Office"
              className="rounded-2xl shadow-2xl w-full h-auto aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </section>

     
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto">
              Built on the foundation of trust, innovation, and excellence
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((item, i) => (
              <div
                key={i}
                className={`relative p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-sm ${item.style}`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6 sm:mb-8 shadow-sm`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ourclient />
    </div>
  );
};

export default AboutPage;