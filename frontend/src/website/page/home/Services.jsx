    import React, { useState } from "react";
    import { Swiper, SwiperSlide } from "swiper/react";
    import { Navigation, Autoplay } from "swiper/modules";
    import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

    // Swiper styles
    import "swiper/css";
    import "swiper/css/navigation";

    const services = [
      {
        title: "MATM",
        desc: "Micro ATM services enable instant withdrawals, deposits, and mini statements, even in remote areas, offering fast and convenient access.",
        height: "h-[280px]",
        video: "public/assets/video/services/_720P.mp4",
      },
      {
        title: "POS MACHINE",
        desc: "Point of Sale machines for quick, secure payments via cards, UPI, or wallets, with instant settlement, helping businesses process transactions efficiently.",
        height: "h-[270px]",
        mt: "mt-12",
        video: "public/assets/video/services/Android_Payment_Terminal_720P.m4v",
      },
      {
        title: "AEPS",
        desc: "AEPS allows secure banking transactions such as balance check, cash withdrawal, and fund transfers via Aadhaar, providing convenient access everywhere.",
        height: "h-[280px]",
        video:"public/assets/video/services/Finance_Banking_Mobile_App_Prorotype_UI_UX_Design_720P.m4v",
      },
      {
        title: "DMT",
        desc: "Send money instantly to any bank account across India with Domestic Money Transfer (DMT), ensuring fast, secure, and hassle-free transactions anytime, anywhere.",
        height: "h-[270px]",
        mt: "mt-12",
        video: "/videos/recharge.mp4",
    },

      {
        title: "BBPS",
        desc: "Bharat Bill Payment System enables fast, reliable utility bill payments with instant confirmation, helping users manage multiple bills quickly and easily.",
        height: "h-[280px]",
        video: "/videos/bbps.mp4",
      },
    {
        title: "PAYOUT",
        desc: "Efficiently disburse payments to employees, vendors, or partners with our Payout solutions via bank transfer, UPI, or wallets, ensuring timely and hassle-free transactions.",
        height: "h-[270px]",
        mt: "mt-12",
        video: "/videos/collect.mp4",
    },
      {
        title: "CREDIT CARD",
        desc: "Credit card services offer issuance, activation, management, and rewards, giving users secure transactions, flexibility, and easy financial control.",
        height: "h-[280px]",
        video: "/videos/creditcard.mp4",
      },
      {
        title: "LOAN",
        desc: "Personal and business loans with easy application, fast approval, and flexible repayment options, providing financial support tailored to customer needs.",
        height: "h-[270px]",
        mt: "mt-12",
        video: "/videos/loan.mp4",
      },
      {
        title: "INSURANCE",
        desc: "Insurance plans for life, health, vehicle, and property offer easy claims and flexible coverage, ensuring peace of mind for individuals and families.",
        height: "h-[280px]",
        video: "/videos/insurance.mp4",
      },
      {
        title: "PAYMENT GATEWAY",
        desc: "Securely accept online payments via cards, UPI, net banking, and wallets with our Payment Gateway, ensuring fast, reliable, and seamless transactions for your business.",
        height: "h-[270px]",
        mt: "mt-12",
        video: "/videos/insurance.mp4",
    },
      {
        title: "SOUND BOX",
        desc: "Experience powerful and crystal-clear audio with our Sound Box, delivering immersive sound for music, movies, and calls wherever you go.",
        height: "h-[280px]",
        video: "/videos/insurance.mp4",
    },
    {
        title: "QR",
        desc: "Make instant payments by scanning QR codes with ease, enabling fast, secure, and contactless transactions anytime, anywhere.",
        height: "h-[270px]",
        mt: "mt-12",
        video: "/videos/insurance.mp4",
    },
    ];

    const ServicesSlider = () => {
      const [hoveredIndex, setHoveredIndex] = useState(null);

      return (
        <div className="bg-[#F8FAFC] text-white h-[90vh] p-12 py-6 font-sans relative">
       
          <div className="flex justify-between items-start mb-10 px-4">
            <div className="max-w-md">
              <p className="text-gray-600 text-md">
                We work with hundred of services and make
              </p>
              <p className="text-gray-600 text-md">
                Here are the services we provide
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 -top-2.5 w-16 h-16 border border-black rounded-full opacity-40"></div>
              <h2 className="text-4xl font-light text-gray-800">Services</h2>
            </div>
          </div>

   
          <div className="relative px-4">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={4}
              slidesPerGroup={1}
              speed={700}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".prev-btn",
                nextEl: ".next-btn",
              }}
              loop={true}
              className="mySwiper"
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`bg-white text-black p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 ${service.height} ${service.mt || ""} relative overflow-hidden`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
           
                    {hoveredIndex === index && service.video && (
                      <video
                        src={service.video}
                        autoPlay
                        muted
                        loop
                        className="absolute top-0 left-0 w-full h-full object-cover z-10"
                      />
                    )}

                    <div className={`relative z-20`}>
                      <h3 className={`text-xl font-bold mb-4 tracking-tighter`}>
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600 mb-4">
                        {service.desc}
                      </p>
                      <button className="flex items-center text-[#2DD4BF] font-bold text-sm hover:underline mt-auto">
                        Read more <ArrowUpRight className="ml-1 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

       
          <div className="flex justify-center gap-10 mt-2">
            <button className="prev-btn text-gray-500 hover:text-black transition-colors cursor-pointer">
              <ArrowLeft size={30} strokeWidth={1} />
            </button>
            <button className="next-btn text-gray-500 hover:text-black transition-colors cursor-pointer">
              <ArrowRight size={30} strokeWidth={1} />
            </button>
          </div>
        </div>
      );
    };

    export default ServicesSlider;
