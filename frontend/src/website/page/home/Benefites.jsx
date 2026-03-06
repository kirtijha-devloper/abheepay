import React from "react";
import { IndianRupee, ShieldCheck, Users, TrendingUp } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: IndianRupee,
      title: "0 investment",
      subtitle: "business",
      description: "Start your journey without any initial cost",
      color: "from-emerald-500 to-teal-500",
      delay: "0ms",
    },
    {
      icon: ShieldCheck,
      title: "simple joining",
      subtitle: "process",
      description: "Quick and hassle-free onboarding",
      color: "from-blue-500 to-cyan-500",
      delay: "100ms",
    },
    {
      icon: Users,
      title: "24*7 customer",
      subtitle: "service",
      description: "Always here to support your growth",
      color: "from-purple-500 to-pink-500",
      delay: "200ms",
    },
    {
      icon: TrendingUp,
      title: "Earn ₹4L - ₹12L",
      subtitle: "per annum",
      description: "Unlimited earning potential",
      color: "from-orange-500 to-red-500",
      delay: "300ms",
    },
  ];

  return (
    
    <section className="relative bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] py-8 px-6 md:px-12 lg:px-24 text-slate-800 overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.15]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#0D9488 1px, transparent 1px), linear-gradient(90deg, #0D9488 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>


      <div className="absolute top-10 left-10 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">

        <div className="mb-10">
          <p className="text-[#94A3B8] text-sm uppercase tracking-[0.2em] mb-4 font-bold animate-fade-in">
            Aapka business • Humara investment
          </p>

          <h2 className="text-5xl md:text-5xl font-black mb-4 animate-slide-up text-slate-900">
            Abheepay Benefits
          </h2>

          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-[#2DD4BF]"></div>
            <div className="w-2 h-2 bg-[#2DD4BF] rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-[#2DD4BF]"></div>
          </div>
        </div>

     
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: benefit.delay }}
              >
                <div className="relative h-full bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:border-[#2DD4BF]">
                
                  <div className="relative mb-5">
                    <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gray-300 p-[2px] transition-all duration-500">
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <Icon
                          className={`w-9 h-9 transition-transform duration-500 group-hover:scale-110`}
                          style={{ color: "inherit" }}
                          strokeWidth={2.5}
                        />
                        <div
                          className={`absolute inset-0 flex items-center justify-center`}
                        >
                          <Icon
                            className="w-9 h-9 text-slate-500"
                            strokeWidth={2.5}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

         
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="text-lg font-semibold text-slate-500">
                      {benefit.subtitle}
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Benefits;
