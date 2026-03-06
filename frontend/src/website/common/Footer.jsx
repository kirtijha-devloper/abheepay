// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const productLinks = [
    { name: "Bill Payments Solution", link: "/services/bbps" },
    { name: "Pos Machine", link: "/services/pos-android-pos-devices" },
    { name: "Aeps Abheepay", link: "/services/aeps-cash-withdrawal-balance-inquiry-mini-statement" },
    { name: "Micro Atm Services", link: "/services/micro-atm-matm-services" },
    { name: "Credit Card", link: "/services/credit-card-bill-payments" },
    { name: "Insurance", link: "/services/insurance-solutions" },
  ];

  return (
    <section
      className="relative bg-[#222836] text-white overflow-hidden"
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      }}
    >
      {/* ✅ TOP WAVE REMOVED (ONLY CHANGE) */}

      <div className="mx-auto sm:px-6 lg:px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10 pt-10">
          {/* Company Info - Logo centered */}
          <div className="mt-3 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4 flex justify-center items-center">
              <img
                src="/assets/image/logo/logos.png"
                alt="logo"
                loading="lazy"
                width="60"
                height="60"
                className="w-28 h-24 object-contain"
              />
            </h3>
            <p className="text-sm sm:text-base mb-3 sm:mb-4">
              AbheePay delivers secure fintech, payments, and digital financial
              solutions.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-sm sm:text-base text-[#00BCB7] hover:text-[#00BCB7]/80 transition-colors font-medium group"
            >
              Read more
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-3">
            <h3 className="text-xl font-bold mb-4 sm:text-3xl text-white sm:mb-7 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#00BCB7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Quick link
            </h3>
            <ul className="space-y-2 text-sm flex flex-col gap-2">
              {[
                { text: "Home", to: "/" },
                { text: "About Us", to: "/" },
                { text: "Join as Retailer", to: "/" },
                { text: "Join as Distributor", to: "/" },
                { text: "Privacy Policy", to: "/privacy-policy" },
                { text: "Terms & Conditions", to: "/term-condition" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray-500 group overflow-hidden"
                >
                  <Link
                    to={item.to}
                    className="text-[18px] text-white flex items-center hover:text-[#00BCB7] transition-all duration-300 ease-in-out"
                  >
                    <span className="inline-block w-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ➤
                    </span>
                    <span className="pl-4 transition-all duration-300 ease-in-out group-hover:pl-2">
                      {item.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Products */}
          <div className="mt-3">
            <h3 className="text-xl font-bold mb-4 sm:text-3xl text-white sm:mb-7 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-[#00BCB7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Our Services
            </h3>
            <ul className="space-y-2 text-sm flex flex-col gap-2">
              {productLinks.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-gray-500 group overflow-hidden"
                >
                  <Link
                    to={item.link}
                    className="text-[18px] text-white flex items-center hover:text-[#00BCB7] transition-all duration-300 ease-in-out"
                  >
                    <span className="inline-block w-6 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ➤
                    </span>
                    <span className="pl-4 transition-all duration-300 ease-in-out group-hover:pl-2">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (UNCHANGED) */}
          <div className="mt-3">
            <h3 className="text-3xl font-semibold mb-7">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start group">
                <div className="flex-shrink-0 pt-1">
                  <svg
                    className="w-5 h-5 text-[#00BCB7] group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-200 text-sm sm:text-base">
                    Call Us
                  </h4>
                  <p className="mt-1 hover:text-[#00BCB7] transition-colors text-sm sm:text-base">
                    <a href="tel:+918860037218">+91 88600 37218</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 pt-1">
                  <svg
                    className="w-5 h-5 text-[#00BCB7] group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-200 text-sm sm:text-base">
                    Email Us
                  </h4>
                  <p className="mt-1 hover:text-[#00BCB7] transition-colors text-sm sm:text-base">
                    <a href="mailto:care@abheepay.in">care@abheepay.in</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="flex-shrink-0 pt-1">
                  <svg
                    className="w-5 h-5 text-[#00BCB7] group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-200 text-sm sm:text-base">
                    Visit Us
                  </h4>
                  <p className="mt-1 text-sm sm:text-base">
                    2nd Floor, Plot No - 3, KH. NO. 33/6 AMBERHAI, SECTOR-19,
                    DWARKA, NEW DELHI- 110043
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-4 pt-4 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400 py-0.2">
          <p>© 2025 AbheePay. All rights reserved.</p>
        </div>
      </div>

      {/* WhatsApp Button (UNCHANGED) */}
      <a
        href="https://wa.me/918860037218"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 z-50 bg-[#0CC143] text-white rounded-full shadow-lg p-3 transition-transform duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-7 h-7"
        >
          <path d="M20.52 3.48A11.93 11.93 0 0012 0a11.93 11.93 0 00-8.52 3.48A11.93 11.93 0 000 12c0 2.1.54 4.16 1.56 5.98L0 24l6.15-1.6A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22a9.93 9.93 0 01-5.07-1.39l-.36-.21-3.64.95.97-3.54-.24-.37A9.92 9.92 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.43-7.18c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.91-2.21-.24-.59-.48-.5-.67-.51-.17 0-.37 0-.57 0s-.52.07-.8.37c-.27.3-1.04 1.01-1.04 2.46s1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.48.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
        </svg>
      </a>
    </section>
  );
};

export default Footer;
