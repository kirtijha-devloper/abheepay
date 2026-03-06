import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-white py-10 px-5 sm:px-8 md:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-12 lg:gap-16">
    
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px]">
   
            <div
              className="absolute inset-0 rounded-full 
                border-[5px] sm:border-[6px] border-[#2DD4BF] 
                border-l-transparent border-r-transparent 
                -rotate-12 z-0"
            ></div>

          
            <div
              className="absolute inset-[6px] sm:inset-[8px] rounded-full 
                overflow-hidden border-4 border-white 
                shadow-xl z-10"
            >
              <img
                src="https://i.pinimg.com/736x/1a/69/51/1a69510686a5310198535627f6f74a6e.jpg"
                alt="Instant Mudra Team"
                className="w-full h-full object-cover"
              />
            </div>

         
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 bg-[radial-gradient(circle,#2DD4BF_20%,transparent_20%)] [background-size:10px_10px] opacity-20 hidden md:block"></div>

          
            <div
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 
                md:bottom-10 md:right-3 lg:bottom-16 lg:right-2 
                w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 
                rounded-full border-4 border-[#2DD4BF]
                overflow-hidden shadow-lg z-20 bg-white"
            >
              <img
                src="https://i.pinimg.com/736x/92/4c/6d/924c6dad5f1e6f1102e1367b5fbbee9b.jpg"
                alt="AbheePay Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-2 lg:mt-0">
          <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-5 sm:mb-6">
            About Us
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
            <span className="font-semibold text-gray-900">AbheePay</span> is a
            technology-driven fintech and digital financial services company
            delivering secure, scalable, and compliance-ready solutions across
            payments, banking, credit, insurance, travel, and API-led financial
            services in India. Designed to serve merchants, MSMEs, enterprises,
            partners, and consumers, AbheePay combines robust financial
            infrastructure with innovation-led technology to simplify
            transactions and enable sustainable business growth.
          </p>

          <Link to="/about">
            <button
              className="bg-[#2DD4BF] text-white font-medium 
                py-2.5 px-8 sm:py-3 sm:px-10 
                text-base sm:text-lg
                rounded-full transition-all duration-300 
                shadow-md hover:shadow-lg active:scale-98"
            >
              Know More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;