import React, { useState } from "react";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const indiaTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    formData.append("Submitted At (IST)", indiaTime);

    try {
      const response = await fetch("https://formsubmit.co/care@abheepay.in", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("✅ Submitted successfully!");
        e.target.reset();
      } else {
        alert("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("⚠️ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
 

      <div
        className="relative w-full py-16 sm:py-24 md:py-32 lg:py-48 overflow-hidden bg-cover bg-no-repeat hidden md:block"
        style={{
          backgroundImage:
            "url('https://www.polypackenterprises.com/assets/new-images/images/banner/new-contact-us.jpg')",
          backgroundPosition: "14% center",
        }}
      />

      <div
        className="relative w-full py-36 sm:py-16 md:py-20 overflow-hidden bg-cover bg-no-repeat block md:hidden"
        style={{
          backgroundImage:
            "url('https://www.polypackenterprises.com/assets/new-images/images/banner/mobile-view-contact-us.jpg')", // ← change this URL
          backgroundPosition: "center center",
        }}
      />

   
      <div className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start">
          
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100 order-1 lg:order-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Send a message
            </h2>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
              Fill in the details below and we'll get back to you within 24
              hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/30 outline-none transition"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/30 outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/30 outline-none transition"
                  placeholder="Enter your number"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/30 outline-none transition resize-none"
                  placeholder="How can we assist you?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2dd4bf] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center text-base sm:text-lg"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          
          <div className="space-y-6 md:space-y-8 order-2 lg:order-2">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">
                Contact Details
              </h3>

              <div className="space-y-5 sm:space-y-6">
          
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-[#2dd4bf]/10 rounded-lg flex items-center justify-center text-[#2dd4bf]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      Office Address
                    </p>
                    <p className="text-sm sm:text-base text-gray-800 mt-0.5 leading-relaxed">
                      2nd Floor, Plot No - 3, KH. NO. 33/6 AMBERHAI,
                      <br />
                      SECTOR-19, DWARKA, NEW DELHI- 110043
                    </p>
                  </div>
                </div>

             
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-[#2dd4bf]/10 rounded-lg flex items-center justify-center text-[#2dd4bf]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502L19 14.28V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      Call us
                    </p>
                    <a
                      href="tel:+918860037218"
                      className="text-sm sm:text-base text-[#2dd4bf] font-medium hover:underline"
                    >
                      +91 88600 37218
                    </a>
                  </div>
                </div>

            
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-[#2dd4bf]/10 rounded-lg flex items-center justify-center text-[#2dd4bf]">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7H3v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      Email us
                    </p>
                    <a
                      href="mailto:care@abheepay.in"
                      className="text-sm sm:text-base text-[#2dd4bf] font-medium hover:underline"
                    >
                      care@abheepay.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="bg-white rounded-3xl shadow-xl p-1.5 sm:p-2 border border-gray-100 overflow-hidden">
              <div className="rounded-2xl overflow-hidden h-56 sm:h-64 md:h-72 lg:h-64 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.750984159696!2d77.0480989!3d28.5772394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b5aa370912d%3A0x67cdd78c943f0f39!2sAbheepay!5e0!3m2!1sen!2sin!4v1770615620221!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Abheepay Location on Google Maps"
                ></iframe>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 text-center lg:text-left">
              We typically reply within one business day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
