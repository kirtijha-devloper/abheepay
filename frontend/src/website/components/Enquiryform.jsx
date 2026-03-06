import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EnquiryPopup = forwardRef(({ autoOpen = false, delay = 8000 }, ref) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    mobile: "",
    message: "",
  });

  useImperativeHandle(ref, () => ({
    openPopup: () => setShowPopup(true),
    closePopup: () => setShowPopup(false),
  }));

  useEffect(() => {
    if (!autoOpen) return;
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [autoOpen, delay]);

  const handleClose = () => {
    setShowPopup(false);
    setFormData({ name: "", company: "", email: "", mobile: "", message: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    setTimeout(() => {
      setFormData({ name: "", company: "", email: "", mobile: "", message: "" });
    }, 500);
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // Yahan z-50 ko z-[9999] kar diya hai taaki ye Navbar ke upar aaye
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[9999] p-4"
        >
          <motion.div className="absolute inset-0" onClick={handleClose} />

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#00BBB5] to-[#00E0D0]" />

            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-[#00BBB5] transition-all duration-200 z-10 shadow-sm text-sm"
            >
              X
            </motion.button>

            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center px-4 pt-4 pb-2"
            >
              <motion.div
                variants={floatingAnimation}
                animate="animate"
                className="w-12 h-12 bg-gradient-to-br from-[#00BBB5] to-[#00E0D0] rounded-full flex items-center justify-center mx-auto mb-2 shadow-md"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </motion.div>

              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-[#00BBB5] bg-clip-text text-transparent mb-1">
                Enquiry
              </h2>
              <p className="text-gray-600 text-xs">
                We'd love to hear from you! Fill out the form below.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/care@abheepay.in"
              method="POST"
              target="_blank"
              className="px-4 pb-4 space-y-2"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Enquiry Received" />

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 pl-9 text-sm focus:ring-2 focus:ring-[#00BBB5] outline-none"
                  />
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  City Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Enter your city name"
                    className="w-full border border-gray-300 rounded-lg p-2 pl-9 text-sm focus:ring-2 focus:ring-[#00BBB5] outline-none"
                  />
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 pl-9 text-sm focus:ring-2 focus:ring-[#00BBB5] outline-none"
                  />
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 pl-9 text-sm focus:ring-2 focus:ring-[#00BBB5] outline-none"
                  />
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h2l3.6 7.59a1 1 0 00.93.61H19a1 1 0 010 2H9a1 1 0 00-.93.63L6 21H3V5z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    rows={2}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 pl-9 text-sm focus:ring-2 focus:ring-[#00BBB5] outline-none resize-none"
                  />
                  <svg
                    className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00BBB5] to-[#00E0D0] hover:from-[#009c99] hover:to-[#00c2b8] text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1"
              >
                Send
                <motion.svg
                  initial={{ x: -5, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </motion.svg>
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default EnquiryPopup;