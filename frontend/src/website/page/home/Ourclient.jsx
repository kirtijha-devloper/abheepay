  import React from "react";
  import { Swiper, SwiperSlide } from "swiper/react";
  import { Autoplay, Pagination } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";

  const partners = [
    {
      name: "Axis Bank",
      role: "Banking Partner",
      img: "public/assets/image/partner/Axis-Bank.png",
    },
    {
      name: "HDFC",
      role: "Banking Partner",
      img: "public/assets/image/partner/hdfc.webp",
    },
    {
      name: "Pine Labs",
      role: "Payment Solutions",
      img: "public/assets/image/partner/Pine_Labs.jpg",
    },
    {
      name: "Razorpay",
      role: "Payment Gateway",
      img: "public/assets/image/partner/Razorpay.webp",
    },
    {
      name: "Instant Mudra",
      role: "Loan Partner",
      img: "public/assets/image/partner/Instant-Mudra.jpg",
    },
    {
      name: "Dogma",
      role: "Fintech Partner",
      img: "public/assets/image/partner/dogma.png",
    },
    {
      name: "yebank",
      role: "Fintech Partner",
      img: "public/assets/image/partner/yesbank.avif",
    },
    {
      name: "cashfree",
      role: "Fintech Partner",
      img: "public/assets/image/partner/cashfree.png",
    },  
    {
      name: "paytm",
      role: "Fintech Partner",
      img: "public/assets/image/partner/Paytm.png",
    },  
    {
      name: "branchx",
      role: "Fintech Partner",
      img: "public/assets/image/partner/branchx.jpg",
    },  
    {
      name: "bill avenue",
      role: "Fintech Partner",
      img: "public/assets/image/partner/bill-avenue.jpg",
    },  
    {
      name: "digitap",
      role: "Fintech Partner",
      img: "public/assets/image/partner/digitap.png",
    },  
    {
      name: "instantpay",
      role: "Fintech Partner",
      img: "public/assets/image/partner/instantpay.jpeg",
    },  
    {
      name: "paysprint",
      role: "Fintech Partner",
      img: "public/assets/image/partner/paysprint.jpeg",
    },  
  ];

  export default function OurPartners() {
    return (
      <div className="w-full bg-slate-50 py-6 font-sans">
        <div className="max-w-7xl mx-auto px-4">
     
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold tracking-[0.3em] text-slate-400 uppercase mb-2">
              OUR TRUSTED NETWORK
            </h2>
            <h3 className="text-3xl font-bold text-slate-900">
              Strategic Partnerships
            </h3>
          </div>

          
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="pb-10"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  
               
                  <div className="w-full h-32 flex items-center justify-center p-6 bg-white rounded-xl border border-slate-300 shadow-md">
                    <img
                      src={partner.img}
                      alt={partner.name}
                      className="max-w-full h-32 object-contain"
                    />
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
          .swiper-pagination-bullet-active {
            background: #2DD4BF !important;
          }
        `}</style>
      </div>
    );
  }
