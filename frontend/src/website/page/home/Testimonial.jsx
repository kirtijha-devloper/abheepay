import React from "react";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    text: `"Abheepay's user-friendly interface and lightning-fast transactions have helped us manage a significantly higher volume of daily walk-ins. I am extremely satisfied being an Abheepay partner."`,
    name: "Mr. Basit",
    location: "Uttar Pradesh",
    img: "https://i.pinimg.com/736x/da/31/38/da313829618ce49ebec8517389ff6016.jpg",
  },
  {
    text: `"The AEPS and withdrawal services provided by Abheepay are incredibly reliable. The success rate is the best in the industry, and the technical support is always just a call away."`,
    name: "Mr. Rajesh",
    location: "Madhya Pradesh",
    img: "https://i.pinimg.com/736x/05/34/06/05340637798692d3b7c4e75ce155f390.jpg",
  },
  {
    text: `"Since I started using Abheepay for Domestic Money Transfers, my customers' trust has grown immensely. The real-time settlement and transparency are truly unmatched."`,
    name: "Mr. Aman",
    location: "Bihar",
    img: "https://i.pinimg.com/736x/84/5e/44/845e442733a81758d7e9ad42db3b410f.jpg",
  },
  {
    text: `"Abheepay offers a seamless digital experience for all our financial services. From bill payments to recharges, everything is integrated perfectly into one powerful dashboard."`,
    name: "Mr. Vikram",
    location: "Rajasthan",
    img: "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
  },
  {
    text: `"I have tried several other portals, but Abheepay stands out due to its stability and high commission structure. It has significantly boosted my monthly business revenue."`,
    name: "Mr. Suresh",
    location: "Haryana",
    img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?cs=srgb&dl=pexels-italo-melo-881954-2379004.jpg&fm=jpg",
  },
  {
    text: `"The onboarding process was smooth, and the training provided by the Abheepay team was very helpful. It is the perfect platform for any small business looking to go digital."`,
    name: "Mr. Ankit",
    location: "Uttarakhand",
    img: "https://i.pinimg.com/736x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg",
  },
  {
    text: `"Excellent customer service and zero-hassle operations. Abheepay has transformed my shop into a complete digital banking point for my local community."`,
    name: "Mr. Rahul",
    location: "Delhi",
    img: "https://i.pinimg.com/736x/9a/21/2b/9a212b50601e724a3bc5bc3881a6c006.jpg",
  },
];

const Testimonial = () => {
  return (
    <div
      className="relative min-h-[500px] sm:min-h-[460px] bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 font-sans overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/13/9f/4a/139f4a29c0f762c19cb336d7166f0964.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
    
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-5xl mx-auto">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          allowTouchMove={true}
          navigation={{
            prevEl: ".testimonial-prev",
            nextEl: ".testimonial-next",
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = ".testimonial-prev";
            swiper.params.navigation.nextEl = ".testimonial-next";
          }}
          className="w-full"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative bg-[#1a1a1a] text-white px-6 py-10 sm:p-8 md:p-12 rounded-sm shadow-2xl mx-2 sm:mx-4 md:mx-0">
          
                <div className="absolute -top-4 left-6 sm:left-10 bg-[#2dd4bf] p-2 sm:p-3 rounded-sm">
                  <Quote size={24} fill="white" color="white" />
                </div>

                <p className="italic text-base sm:text-lg md:text-xl leading-relaxed font-light pt-4 sm:pt-2">
                  {t.text}
                </p>

              
                <div
                  className="absolute -bottom-3 sm:-bottom-4 left-10 sm:left-16 w-0 h-0 
                  border-l-[12px] sm:border-l-[15px] border-l-transparent 
                  border-t-[12px] sm:border-t-[15px] border-t-[#1a1a1a] 
                  border-r-[12px] sm:border-r-[15px] border-r-transparent"
                ></div>
              </div>

              
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-6 px-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white overflow-hidden shadow-lg flex-shrink-0">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#2dd4bf]">
                      {t.name}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base mt-1">
                      Location - {t.location}
                    </p>
                  </div>
                </div>

                
                <div className="hidden sm:block w-0" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

   
        <div className="absolute right-4 bottom-4 sm:bottom-6 flex gap-2 sm:gap-3 z-50">
          <button className="testimonial-prev bg-[#2dd4bf] text-white p-2.5 sm:p-3 rounded hover:bg-[#26b8a5] transition-colors shadow-md">
            <ArrowLeft size={20} />
          </button>
          <button className="testimonial-next bg-[#2dd4bf] text-white p-2.5 sm:p-3 rounded hover:bg-[#26b8a5] transition-colors shadow-md">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;