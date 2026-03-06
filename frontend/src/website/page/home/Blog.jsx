import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';


const BlogSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const blogs = [
    {
      id: 1,
      author: "Abheepay Team",
      date: "2025",
      title: "How the Right Insurance Plan Builds Long-Term Financial Security",
      img: "https://fintekdiary.com/wp-content/uploads/2022/11/close-up-hand-putting-money-coins-stack-saving-money-growing-business-concept-1300x731-1.jpg",
      url: "/blog/how-the-right-insurance-plan-builds-long-term-financial-security"
    },
    {
      id: 2,
      author: "Abheepay Team",
      date: "2025",
      title: "Why Digital Credit Card Bill Payments are Safer Than Cash",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
      url: "/blog/why-digital-credit-card-bill-payments-are-safer-than-cash"
    },
    {
      id: 3,
      author: "Abheepay Team",
      date: "2025",
      title: "Digital Banking Solutions Empowering Small Businesses",
      img: "https://fintekdiary.com/wp-content/uploads/2023/01/working-computer-graphing-cryptocurrenciesfinance-background-1300x731-1.jpg",
      url: "/blog/digital-banking-solutions-empowering-small-businesses"
    },
    {
      id: 4,
      author: "Abheepay Team",
      date: "2025",
      title: "Smart Cash Flow Management for Growing Retailers",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
      url: "/blog/smart-cash-flow-management-for-growing-retailers"
    },
    {
      id: 5,
      author: "Abheepay Team",
      date: "2025",
      title: "Domestic Money Transfer Made Simple with Digital Platforms",
      img: "https://fintekdiary.com/wp-content/uploads/2023/03/woman-looking-smartphone-screen-while-transferring-money-online-1300x731-1.jpg",
      url: "/blog/domestic-money-transfer-made-simple-with-digital-platforms"
    },
    {
      id: 6,
      author: "Abheepay Team",
      date: "2024",
      title: "Utility Bill Payments: A Convenient Digital Experience",
      img: "https://fintekdiary.com/wp-content/uploads/2022/12/attractive-casual-smart-asian-female-woman-online-shopping-purchase-online-with-credit-card-data-laptop-technology-lifestyle-1300x731-1.jpg",
      url: "/blog/utility-bill-payments-a-convenient-digital-experience"
    },
    {
      id: 7,
      author: "Abheepay Team",
      date: "2024",
      title: "How Digital Loan Services Help Businesses Scale Faster",
      img: "https://fintekdiary.com/wp-content/uploads/2022/11/focused-indian-young-couple-accounting-calculating-bills-discussing-planning-budget-together-using-online-banking-services-calculator-checking-finances-1300x731-1.jpg",
      url: "/blog/how-digital-loan-services-help-businesses-scale-faster"
    },
    {
      id: 8,
      author: "Abheepay Team",
      date: "2024",
      title: "How Digital Financial Services Increase Retail Store Footfall",
      img: "https://fintekdiary.com/wp-content/uploads/2023/02/real-estate-agent-working-table-1300x731-1.jpg",
      url: "/blog/how-digital-financial-services-increase-retail-store-footfall"
    }
  ];

  return (
    <section className="bg-[#F6F6FB] py-10 px-4 font-sans">
      <div className="container mx-auto max-w-6xl">

        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-[#2d3436] mb-3">
              Latest from Our Blog
            </h2>
            <p className="text-gray-500 text-sm max-w-xl">
              Discover insights, updates, and stories that inspire growth and impact.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              ref={prevRef}
              className="bg-white p-3 rounded-full hover:bg-[#00D3CD] hover:text-white transition-all duration-300 shadow-sm border border-gray-100"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              ref={nextRef}
              className="bg-white p-3 rounded-full hover:bg-[#00D3CD] hover:text-white transition-all duration-300 shadow-sm border border-gray-100"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

       
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={25}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-5"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div className="relative h-[420px] rounded-2xl overflow-hidden group shadow-lg cursor-pointer">
               
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
               
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

               
                <div className="absolute inset-0 p-7 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#2DD4BF] text-white text-[10px] px-3 py-1 rounded font-bold tracking-widest">
                      {blog.author.toUpperCase()}
                    </span>
                    <span className="text-gray-300 text-xs font-medium">{blog.date}</span>
                  </div>

                  <h3 className="text-white text-xl font-bold leading-tight mb-6 group-hover:text-[#2DD4BF] transition duration-300">
                    {blog.title}
                  </h3>

                
                  <a 
                    href={blog.url} 
                    className="flex items-center justify-between bg-white text-[#3b4b94] px-5 py-2.5 rounded-full w-fit gap-3 font-bold text-[13px] hover:bg-[#2DD4BF] hover:text-white transition-all duration-300 group/btn shadow-md no-underline"
                  >
                    Continue Reading
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default BlogSection;
