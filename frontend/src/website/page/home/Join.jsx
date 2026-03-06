import React from 'react';

const Join = () => {
  return (
    <div className="relative w-full h-[420px] sm:h-[380px] md:h-[300px] lg:h-[380px] overflow-hidden">
    
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

    
      <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-0">
          
          <div className="text-white space-y-3 md:space-y-4 w-full md:w-auto text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide">
              Come...Grow With Us...
            </h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal leading-tight">
              Become an Abheepay Retailer and Grow Your Income
              <br className="hidden md:block" />
              upto Rs.50,000/- to Rs.1,00,000/- per month
            </h1>
          </div>

    
          <div className="flex items-center justify-center md:justify-end w-full md:w-auto">

            <div className="hidden md:block h-28 lg:h-32 w-[1px] bg-gray-400/50 mx-8 lg:mx-12"></div>

         
            <a
              href="#bottomform"
              className="bg-[#2DD4BF] text-white font-bold py-3.5 px-8 sm:py-4 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300 shadow-lg inline-block hover:bg-[#2cc8b5] active:scale-95"
            >
              Join Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;