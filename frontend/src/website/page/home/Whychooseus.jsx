import React from "react";
import { motion } from "framer-motion";

const Whychooseus = () => {
  const features = [
    {
      title: "Secure & Compliant Infrastructure",
      icon: "https://cdn-icons-png.flaticon.com/512/483/483408.png",
    },
    {
      title: "All-in-One Financial Suite",
      icon: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
    },
    {
      title: "High-Success API Solutions",
      icon: "https://cdn-icons-png.flaticon.com/512/1611/1611179.png",
    },
    {
      title: "Real-time Monitoring & Support",
      icon: "https://cdn-icons-png.flaticon.com/512/126/126508.png",
    },
  ];

  return (
    <div className="bg-[#F9FAFB] w-full flex items-center justify-center overflow-hidden font-sans py-2 sm:py-16 lg:py-0 lg:min-h-screen">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 items-center px-4 sm:px-6 lg:px-0">
    
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-4 sm:p-6 md:p-12"
        >
          
          <div className="mb-6 relative z-20">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Abheepay?
            </h2>
            <p className="text-gray-600 text-sm max-w-lg leading-relaxed">
              Empowering businesses with a secure, scalable, and compliance-ready
              fintech ecosystem. From high-success payment gateways to assisted
              banking and API solutions, we provide the digital backbone for
              India's modern economy.
            </p>
          </div>

          <div className="relative mt-6 w-full flex justify-center sm:justify-start">
            
            <div
              className="absolute top-10 left-[-20px] w-10 h-10 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(#2DD4BF 1.2px, transparent 1.2px)",
                backgroundSize: "8px 8px",
              }}
            ></div>
            <div
              className="absolute top-[-20px] right-[45%] w-10 h-10 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(#2DD4BF 1.2px, transparent 1.2px)",
                backgroundSize: "8px 8px",
              }}
            ></div>

            <div
              className="absolute left-[-120px] top-[-30px] w-[450px] h-[400px] bg-[#2DD4BF1A] -z-10"
              style={{
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              }}
            ></div>

            <div
              className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[350px] overflow-hidden shadow-xl"
              style={{
                borderRadius: "45% 55% 50% 50% / 40% 40% 60% 60%",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1000"
                alt="Secure Payment Layout"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>
        </motion.div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 sm:gap-y-10 p-4 sm:p-6">
          {features.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white shadow-xl rounded-sm flex flex-col items-center text-center pb-6 pt-10 border border-gray-50 overflow-hidden min-h-[170px]"
            >
             
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-36 h-36 bg-[#2DD4BF1A] rounded-full"></div>

              <div className="relative z-10 mb-3 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-50">
                  <img
                    src={card.icon}
                    alt="icon"
                    className="w-5 h-5 object-contain"
                    style={{
                      filter:
                        "invert(74%) sepia(59%) saturate(452%) hue-rotate(123deg) brightness(92%) contrast(88%)",
                    }}
                  />
                </div>
              </div>

              <h3 className="relative z-10 text-gray-800 font-bold text-lg px-4 leading-tight">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Whychooseus;
