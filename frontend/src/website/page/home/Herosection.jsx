import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "MATM – Micro ATM Services",
      desc: "Provide cash withdrawal, balance enquiry, and mini statements directly at retail outlets with AbheePay MATM services.",
      img: "https://i.pinimg.com/1200x/68/5c/b5/685cb56b3266c5e339945013cdf1445b.jpg",
      link: "/services/micro-atm-matm-services" 
    },
    {
      title: "POS Machine Solutions",
      desc: "Accept debit and credit card payments easily with fast, secure, and reliable POS machines for your business.",
      img: "https://i.pinimg.com/736x/6d/b0/8d/6db08dd65ee31868f2c126f42ec319d9.jpg",
      link: "/services/pos-android-pos-devices"
    },
    {
      title: "BBPS & Recharge Services",
      desc: "Offer electricity, water, gas, mobile, and DTH bill payments under one platform with BBPS and recharge services.",
      img: "https://i.pinimg.com/1200x/78/56/5c/78565cd7adebcbeab6d0b7d565e5eac0.jpg",
      link: "/services/bbps-recharge-bill-payments"
    },
    {
      title: "Credit Card, Loan & Collection Services",
      desc: "Enable credit card services, loan assistance, and payment collection solutions to grow your retail business.",
      img: "https://i.pinimg.com/1200x/32/4c/47/324c47df02b5b1661820011fe877847e.jpg",
      link: "/services/credit-card-sourcing-and-lifecycle-support"
    }
  ];

  return (
    <section className="relative w-full h-[70dvh] md:h-[100dvh] font-sans overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section
              className="relative w-full h-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url('${slide.img}')` }}
            >
              <div className="absolute inset-0 bg-black/10"></div>
              <div
                className={`relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 text-white transition-all duration-1000 ease-out ${
                  activeSlide === index
                    ? "opacity-100 translate-y-0 scale-100 blur-0"
                    : "opacity-0 translate-y-12 sm:translate-y-16 scale-95 blur-sm"
                }`}
              >
                <h1 className="text-[2.1rem] leading-tight font-semibold sm:text-4xl md:text-5xl lg:text-6xl max-w-[90%] sm:max-w-4xl">
                  {slide.title}
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-[95%] sm:max-w-3xl text-white/90 leading-relaxed">
                  {slide.desc}
                </p>
                <div className="mt-8 sm:mt-10">
                  <a href={slide.link}>
                    <button className="border border-white px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold tracking-wide uppercase hover:bg-white hover:text-black transition min-w-[140px] sm:min-w-[160px]">
                      Know More
                    </button>
                  </a>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 sm:gap-3 z-20 hidden sm:flex">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-[2px] sm:h-[3px] transition-all duration-300 ${
              activeSlide === i ? "w-8 sm:w-10 bg-white" : "w-4 sm:w-6 bg-white/40"
            }`}
          ></span>
        ))}
      </div>


      <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 right-5 sm:right-8 md:right-10 flex items-center gap-4 sm:gap-6 text-white z-20">
        <button className="hero-prev text-3xl sm:text-4xl hover:opacity-70 transition">
          &#8249;
        </button>
        <span className="w-px h-6 sm:h-8 bg-white/50"></span>
        <button className="hero-next text-3xl sm:text-4xl hover:opacity-70 transition">
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default HeroSection;