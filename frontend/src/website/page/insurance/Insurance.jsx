import React from 'react';
import { Shield, Phone, ArrowRight, CheckCircle, Home, Heart, Briefcase, Users } from 'lucide-react';

const InsurancePage = () => {
  return (
    <div className="bg-white font-sans text-gray-900">
      
      {/* --- TOP BANNER (Updated Image Container) --- */}
      <div className="overflow-hidden">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/025/074/876/small/protection-and-insurance-concept-car-home-and-health-preventing-and-evaluating-potential-business-investment-benefits-life-insurance-protect-your-family-and-loved-ones-from-accidents-free-photo.jpg"   
          alt="Featured Insurance"
          className="w-full h-[380px] md:h-[480px] lg:h-[420px] object-cover"
        />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#00CCC7]/5 py-16 md:py-10 px-6 mb-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <div className="w-24 h-1 bg-[#00CCC7] mb-6"></div>
            <h1 className="text-5xl md:text-5xl font-black leading-tight mb-6 text-black">
              Insurance <br />
              <span className="text-gray-800">for the better</span> <br />
              <span className="text-[#00CCC7]">family life.</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-md font-medium">
              Protecting your loved ones starts with the right plan. We provide comprehensive coverage tailored to your needs.
            </p>
            
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800" 
              alt="Happy Family" 
              className="rounded-3xl shadow-2xl relative z-10 grayscale-[20%]"
            />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#00CCC7]/20 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* --- FEATURE CARDS --- */}
      <section className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { id: '01', title: 'Safe your money', icon: <Shield className="w-10 h-10 text-white" /> },
            { id: '02', title: 'Get free quote', icon: <Users className="w-10 h-10 text-white" /> },
            { id: '03', title: 'Fast & reliable', icon: <Home className="w-10 h-10 text-white" /> },
          ].map((item) => (
            <div 
              key={item.id} 
              className="relative bg-white pt-16 pb-10 px-8 rounded-3xl overflow-hidden border-b-4 border-[#00CCC7] "
            >
              <div 
                className="absolute top-0 left-0 w-36 h-28 bg-[#00CCC7]  flex items-center justify-center pt-2 pr-4 transition-colors duration-300"
                style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0% 100%)', 
                    borderRadius: '0 0 100% 0' 
                }}
              >
                <div className="mb-4 mr-4">
                  {item.icon}
                </div>
              </div>

              <div className="absolute top-8 right-10">
                <span 
                  className="text-6xl font-black opacity-10 select-none"
                  style={{ 
                    WebkitTextStroke: '2px #00CCC7', 
                    color: 'transparent' 
                  }}
                >
                  {item.id}
                </span>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-black text-black mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div className="lg:w-1/2 relative">
            <div className="relative w-full max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600" 
                alt="Team Work" 
                className="rounded-[2.5rem] shadow-2xl w-full h-[500px] object-cover"
              />
              
              <div className="absolute -bottom-12 -left-12 w-2/3 border-[12px] border-white rounded-[2rem] shadow-2xl hidden md:block overflow-hidden">
                <img 
                  src="https://img.freepik.com/premium-photo/creative-business-meeting-professionals-brainstorming-ideas-collaborative-boardroom_1267411-113.jpg" 
                  alt="Office discussion" 
                  className="w-full h-44 object-cover"
                />
              </div>

              <div className="absolute bottom-6 right-6 bg-[#00CCC7] text-white p-6 rounded-2xl shadow-xl border-2 border-dashed border-white flex items-center gap-3">
                <span className="text-5xl font-black italic text-white">30</span>
                <div className="text-sm font-bold leading-tight">
                  Years of <br /> Experience
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            
            
            <h2 className="text-5xl font-black text-black mt-2 mb-8 leading-[1.1]">
              We provide the best <br /> insurance policy
            </h2>
            
            <p className="text-gray-600 text-lg italic font-semibold mb-8 border-l-4 border-[#00CCC7] pl-5 leading-relaxed">
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu nulla pariatur."
            </p>
            
            <ul className="space-y-5 mb-12">
              {[
                'Delivering to get results a personal touch.',
                'Dedicated and professional team members.',
                'Work with modern and secure equipment.'
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-700 font-bold group">
                  <div className="bg-[#00CCC7]/10 p-1 rounded-full group-hover:bg-[#00CCC7] transition-all">
                    <CheckCircle className="text-[#00CCC7] w-5 h-5 group-hover:text-white" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-10">
             
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg text-black">
                  <Phone className="w-6 h-6 fill-current text-[#00CCC7]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Call Anytime</div>
                  <div className="font-black text-black text-lg">+91 8860037218</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-14 bg-gray-50 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="md:w-1/2">
              <span className="text-[#00CCC7] font-black uppercase tracking-widest text-sm">Our Services</span>
              <h2 className="text-4xl font-black mt-4 text-black">We're covering all the <br /> insurance fields</h2>
            </div>
            <p className="md:w-1/3 text-gray-500 mt-4 md:mt-0 font-medium border-l-2 border-black pl-4">
              Providing a wide range of insurance products to protect what matters most to you and your future.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Business Insurance', icon: <Briefcase />, img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300' },
              { title: 'Life Insurance', icon: <Users />, img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300' },
              { title: 'Home Insurance', icon: <Home />, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=300' },
              { title: 'Health Insurance', icon: <Heart />, img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group">
                <div className="h-48 overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 grayscale-[30%] group-hover:grayscale-0" />
                  <div className="absolute bottom-4 right-4 bg-black p-3 rounded-xl shadow-lg text-white group-hover:bg-[#00CCC7] group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-black text-xl mb-3 text-black">{service.title}</h4>
                  <p className="text-gray-400 text-sm mb-4 font-medium">Protect your assets with our premium coverage plans.</p>
                  <div className="w-10 h-1 bg-[#00CCC7] rounded-full group-hover:w-full transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsurancePage;