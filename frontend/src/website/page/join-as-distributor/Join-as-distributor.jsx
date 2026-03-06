import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, Smartphone, Wallet, Zap, DollarSign, ShieldCheck, 
  Headphones, LayoutGrid, TrendingUp, UserPlus, CheckCircle, 
  IndianRupee, Mail, Phone, MapPin, Globe, ArrowRight 
} from 'lucide-react';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Joins = () => {
  const services = [
    { title: "MATM", desc: "Micro ATM Services", icon: <LayoutGrid size={24} /> },
    { title: "POS MACHINE", desc: "Point of Sale Solutions", icon: <CreditCard size={24} /> },
    { title: "CC BILL PAY", desc: "Credit Card Bill Payments", icon: <DollarSign size={24} /> },
    { title: "RECHARGE", desc: "Mobile & DTH Recharge", icon: <Smartphone size={24} /> },
    { title: "BBPS", desc: "Bharat Bill Payment System", icon: <Zap size={24} /> },
    { title: "COLLECT", desc: "Payment Collection Services", icon: <Wallet size={24} /> },
    { title: "CREDIT CARD", desc: "Credit Card Services", icon: <CreditCard size={24} /> },
    { title: "LOAN", desc: "Loan Services", icon: <TrendingUp size={24} /> },
    { title: "INSURANCE", desc: "Insurance", icon: <ShieldCheck size={24} /> },
  ];

  const benefits = [
    { title: "0 investment business", icon: <DollarSign size={32} /> },
    { title: "simple joining process", icon: <ShieldCheck size={32} /> },
    { title: "24*7 customer service", icon: <Headphones size={32} /> },
    { title: "Earn upto ₹4 Lakh to ₹12 Lakh per annum", icon: <IndianRupee size={32} /> },
  ];

  return (
    <div className="font-sans text-gray-800 bg-white overflow-x-hidden min-h-screen">

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-5 sm:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl mx-auto relative z-10"
        >
          <span className="inline-block px-4 py-1.5 mb-4 sm:mb-5 text-xs sm:text-sm font-semibold tracking-wider text-cyan-600 uppercase bg-cyan-50 rounded-full">
            Digital Banking Partner
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 sm:mb-6 leading-tight sm:leading-snug md:leading-[1.15] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            AbheePay ke saath apna <br className="sm:hidden" /> banking vyapar shuru karein
          </h1>

          <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10 max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0">
            Enabling Indian SMEs to maximise their earning within a single platform.
            Join the revolution of digital finance.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold flex items-center mx-auto shadow-lg shadow-cyan-200/40 transition text-base sm:text-lg"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </motion.button>
        </motion.div>

        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 opacity-10 pointer-events-none hidden sm:block">
          <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="bg-[#1e2736] py-12 sm:py-16 px-5 sm:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center text-white bg-gradient-to-br from-[#2a3447] to-[#1e2736] p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-gray-700"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Start Your Banking Journey as Partner Today
          </h2>
          <p className="text-gray-300 sm:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg max-w-2xl mx-auto">
            Join thousands of successful retailers who have transformed their business with AbheePay. 
            Earn up to <span className="text-cyan-400 font-bold">₹12 Lakh</span> annually!
          </p>
          <motion.button 
            whileHover={{ y: -3 }}
            className="bg-cyan-400 hover:bg-cyan-300 text-[#1e2736] px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl font-black uppercase tracking-tight transition shadow-xl text-sm sm:text-base"
          >
            Join as Partner Now
          </motion.button>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Our Services</h2>
            <div className="w-16 sm:w-20 h-1.5 bg-cyan-400 mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-gray-600 text-base sm:text-lg">Comprehensive banking and financial solutions</p>
          </div>
          
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="mb-5 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section (keeping the cleaner light version) */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 bg-[#f8fafc] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none hidden sm:block">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-100/60 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-100/60 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#2dd4bf] font-bold mb-3 uppercase tracking-widest text-xs sm:text-sm"
          >
            Aapka business • Humara investment
          </motion.p>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-10 sm:mb-16 tracking-tight">
            Abheepay <span className="text-[#2dd4bf]">Benefits</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] shadow-lg shadow-black/5 border border-slate-100 hover:border-[#2dd4bf]/40 transition-all duration-300"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#2dd4bf]/10 rounded-2xl rotate-6 group-hover:rotate-12 group-hover:bg-[#2dd4bf] transition-all duration-300"></div>
                  <div className="relative text-[#2dd4bf] group-hover:text-white transition-colors duration-300 text-3xl sm:text-4xl">
                    {benefit.icon}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-800 leading-snug px-2">
                  {benefit.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 px-5 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10 border border-gray-200">
            <div className="bg-white p-8 sm:p-10 lg:p-12 xl:p-16 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Join Us Today</h2>
              <form className="space-y-5 sm:space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition text-base" 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Phone</label>
                    <input 
                      type="tel" 
                      placeholder="Enter your number" 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition text-base" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">City</label>
                  <input 
                    type="text" 
                    placeholder="Enter your city" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition text-base" 
                  />
                </div>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-cyan-400 text-white font-bold py-4 sm:py-5 rounded-xl hover:bg-cyan-500 transition-colors mt-4 text-base sm:text-lg shadow-lg shadow-cyan-200/30"
                >
                  Submit Application
                </motion.button>
              </form>
            </div>

            <div className="bg-[#1e2736] text-white p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between order-1 lg:order-2">
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10">Contact Information</h3>
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center text-cyan-400 shrink-0">
                      <Mail size={20} />
                    </div>
                    <span className="text-base sm:text-lg text-gray-300">care@abheepay.in</span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center text-cyan-400 shrink-0">
                      <Phone size={20} />
                    </div>
                    <span className="text-base sm:text-lg text-gray-300">88600 37218</span>
                  </div>
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center text-cyan-400 shrink-0">
                      <MapPin size={20} />
                    </div>
                    <span className="text-gray-300 leading-relaxed text-base sm:text-lg">
                      2nd Floor, Plot No - 3, KH. NO. 33/6 AMBERHAI, SECTOR-19, DWARKA, NEW DELHI- 110043
                    </span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center text-cyan-400 shrink-0">
                      <Globe size={20} />
                    </div>
                    <span className="text-base sm:text-lg text-gray-300">www.abheepay.com</span>
                  </div>
                </div>
              </div>
              <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 relative z-10">
                <p className="text-gray-400 italic text-sm sm:text-base">
                  "Empowering Rural India through Digital Innovation."
                </p>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-400/10 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Joins;