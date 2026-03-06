import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Whatwedo = () => {
  const services = [
    {
      id: 1,
      title: "Digital Payment",
      image:
        "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80",
      link: "/services/digital-payment-solutions",
    },
    {
      id: 2,
      title: "UPI, Cards, Net Banking, Wallet",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
      link: "/services/online-payment-gateway–upi-cards-net-banking-wallets",
    },
    {
      id: 3,
      title: " POS & Android POS Devices",
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
      link: "/services/pos-android-pos-devices",
    },
    {
      id: 4,
      title: "QR-Based Contactless Payments",
      image: "https://assets-160c6.kxcdn.com/wp-content/uploads/2023/11/2023-11-21-de-en-1.jpg",
      link: "/services/qr-based-contactless-payments",
    },
    {
      id: 5,
      title: "Smart routing with high success rates",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      link: "/services/Smart-routing-with-high-success-rates",
    },
    {
      id: 6,
      title: " Real-time monitoring and PCI-DSS ",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      link: "/services/real-time-monitoring-and-pci-dss-compliant-architecture",
    },
    {
      id: 7,
      title: "Assisted Banking & Cash Management",
      image:
        "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202505/682b17b7c169f-cash-in-vogue-currency-in-circulation-hits-rs-372-lakh-crore-in-fy25-vs-rs-145-lakh-crore-in-fy15-193618865-16x9.jpg",
      link: "/services/assisted-banking-cash-management",
    },
    {
      id: 8,
      title: " AEPS – Cash withdrawal, balance inquiry, mini statement",
      image:
        "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80",
      link: "/services/aeps-cash-withdrawal-balance-inquiry-mini-statement",
    },
    {
      id: 9,
      title: " Micro ATM (mATM) services",
      image: "https://www.smplraj.in/Content/front/services/Micro%20ATM.png",
      link: "/services/micro-atm-matm-services",
    },
    {
      id: 10,
      title: "Domestic Money Transfer (DMT)",
      image:
        "https://i.pinimg.com/736x/80/8a/29/808a2962331deef5a5e681abf03270da.jpg",
      link: "/services/domestic-money-transfer",
    },
    {
      id: 11,
      title: "BBPS, Recharge & Bill Payments",
      image:
        "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?auto=format&fit=crop&w=800&q=80",
      link: "/services/bbps-recharge-bill-payments",
    },
    {
      id: 12,
      title: "Utility bill payments – electricity, gas, water, FASTag",
      image:
        "https://i.pinimg.com/1200x/e7/4c/a9/e74ca913ea2df3765040a081a39383b5.jpg",
      link: "/services/utility-bill-payments-electricity-gas-water-fastag",
    },
    {
      id: 13,
      title: " Mobile, DTH & data card recharges",
      image:
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
      link: "/services/mobile-dth-data-card-recharges",
    },
    {
      id: 14,
      title: "Credit card bill payments",
      image:
        "https://i.pinimg.com/736x/92/ad/b6/92adb64c53082c7c1ab80cd981488763.jpg",
      link: "/services/credit-card-bill-payments",
    },
    {
      id: 15,
      title: "Lending & Credit Solutions",
      image:
        "https://i.pinimg.com/1200x/ed/bf/60/edbf60cc0e00a1cdae23f114957c8777.jpg",
      link: "/services/lending-credit-solutions",
    },
    {
      id: 16,
      title: "Business loans & working capital finance",
      image:
        "https://i.pinimg.com/736x/4a/c8/8a/4ac88a04b4c466e16f8aa077a38ac027.jpg",
      link: "/services/business-loans-working-capital-finance",
    },
    {
      id: 17,
      title: "Personal loans with digital onboarding",
      image:
        "https://i.pinimg.com/1200x/95/5f/13/955f137993310b5d346434f529558048.jpg",
      link: "/services/personal-loans-with-digital-onboarding",
    },
    {
      id: 18,
      title: "Credit card sourcing and lifecycle support",
      image:
        "https://i.pinimg.com/736x/22/0e/08/220e08aa2fa0a4e92575773e826cba0f.jpg",
      link: "/services/credit-card-sourcing-and-lifecycle-support",
    },
    {
      id: 19,
      title: "Insurance Solutions",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
      link: "/services/insurance-solutions",
    },
    {
      id: 20,
      title: "Health insurance",
      image:
        "https://i.pinimg.com/1200x/af/61/b8/af61b867229116f342e411c33c6b3911.jpg",
      link: "/services/health-insurance",
    },
    {
      id: 21,
      title: "Life insurance",
      image:
        "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=800&q=80",
      link: "/services/life-insurance",
    },
    {
      id: 22,
      title: "General & travel insurance",
      image:
        "https://i.pinimg.com/736x/bb/9e/0f/bb9e0f2c3ce9db7780ca496d0aecbcc3.jpg",
      link: "/services/general-travel-insurance",
    },
    {
      id: 23,
      title: "Travel APIs & Travel Services",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
      link: "/services/travel-apis-travel-services",
    },
    {
      id: 24,
      title: " Flight booking (Domestic & International)",
      image:
        "https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/depositphotos125503370xl-1718329782038.jpg",
      link: "/services/flight-booking-domestic-international",
    },
    {
      id: 25,
      title: "Bus ticket booking",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      link: "/services/bus-ticket-booking",
    },
    {
      id: 26,
      title: "Hotel booking",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      link: "/services/hotel-booking",
    },
    {
      id: 27,
      title: "Travel insurance integration",
      image:
        "https://i.pinimg.com/1200x/a2/91/a5/a291a55a2854dba3645ce0fa6d98f9c4.jpg",
      link: "/services/travel-insurance-integration",
    },
    {
      id: 28,
      title: "Commission-based travel services",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
      link: "/services/commission-based-travel-services",
    },
    {
      id: 29,
      title: "Technology & API Services",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      link: "/services/technology-api-services",
    },
    {
      id: 30,
      title: " Payment, banking, travel & wallet APIs",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      link: "/services/payment-banking-travel-wallet-apis",
    },
    {
      id: 31,
      title: "Settlement & reconciliation systems",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      link: "/services/settlement-reconciliation-systems",
    },
    {
      id: 32,
      title: " Merchant, distributor & admin dashboards",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      link: "/services/Merchant-distributor-admin-dashboards",
    },
    {
      id: 33,
      title: "White-label fintech & travel platforms",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      link: "/services/white-label-fintech-travel-platforms",
    },
  ];

  return (
    <section className="py-6 bg-white font-sans">
      <div className="container mx-auto px-6 md:px-32 text-center relative">
     
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What we do?
          </h2>
          <div className="w-12 h-0.5 bg-[#2dd4bf] mx-auto"></div>
        </div>

        
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .swiper-container-wrapper {
              position: relative;
            }
            .custom-nav {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin-top: 10px;
            }
            .nav-btn {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              background: #fff;
              border: 2px solid #2dd4bf;
              color: #2dd4bf;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s ease;
              font-weight: bold;
            }
            .nav-btn:hover {
              background: #2dd4bf;
              color: #fff;
            }
            /* Swiper default arrows hide karne ke liye */
            .swiper-button-next, .swiper-button-prev {
              display: none !important;
            }
          `,
          }}
        />

        <div className="swiper-container-wrapper">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".btn-next",
              prevEl: ".btn-prev",
            }}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#2dd4bf] overflow-hidden mb-4 mt-2 transition-transform duration-500 ease-in-out origin-center group-hover:scale-105 shadow-md">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#2dd4bf]/90 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    
                      <h3 className="text-white text-xs md:text-base font-normal mb-3 leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {service.title}
                      </h3>

                    
                      <a
                        href={service.link}
                        className="bg-white text-[#2dd4bf] px-2 py-0.5 rounded-full text-[10px] md:text-sm whitespace-nowrap shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-gray-800 leading-tight transition-opacity duration-300 group-hover:opacity-0">
                    {service.title}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        
          <div className="custom-nav">
            <div className="nav-btn btn-prev">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
            <div className="nav-btn btn-next">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whatwedo;
