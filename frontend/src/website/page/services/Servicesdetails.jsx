import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import servicesData from "./servicesdata.json";
import EnquiryPopup from "../../components/Enquiryform";

const ServicesDetail = () => {
  const { id } = useParams();
  const popupRef = useRef();

  const service = servicesData.find(
    (s) => s.id?.toLowerCase() === id?.toLowerCase()
  );

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="text-lg font-semibold border-b-2 border-[#00D3CD]">
          Service not found
        </p>
      </div>
    );
  }

  // ✅ IMAGE FIX (public/ auto remove)
  const mainImg = (service.imageUrl ||
    service.image ||
    "/assets/fallback-service.png"
  ).replace(/^public\//, "/");

  const features = service.features || [];
  const highlights = service.benefits || [];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-white min-h-screen font-sans text-gray-800 py-12 px-6 md:px-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <motion.div variants={fadeInUp} className="md:w-1/2">
            {/* ❌ Category removed */}

            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-6 leading-tight">
              {service.name}
            </h1>

            <div className="flex items-center gap-3 mt-6 text-gray-500 text-sm">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="h-[2px] bg-[#00D3CD]"
              />
              <span>Abheepay Team • 2024</span>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5 },
              },
            }}
            className="md:w-1/2 relative w-full"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute -top-4 -left-4 w-full h-[280px] sm:h-[350px] md:h-[380px] border-2 border-[#00D3CD] rounded-lg -z-10"
            />

            {/* IMAGE BOX */}
            <div className="w-full h-[280px] sm:h-[350px] md:h-[380px] overflow-hidden rounded-lg shadow-2xl bg-white p-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={mainImg}
                alt={service.name}
                className="w-full h-full object-fill object-center"
              />
            </div>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-3 gap-12 mt-20">
          <div className="md:col-span-2 space-y-10">
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              {service.longDescription || service.description}
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 border border-gray-200"
            >
              {features.map((text, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    transition: { duration: 0.2 },
                  }}
                  className="p-8 border-b md:border-r border-gray-100 flex items-center gap-4 bg-white text-gray-900 transition-colors cursor-default"
                >
                  <span className="text-[#00D3CD] font-bold text-xl">→</span>
                  <span className="font-bold text-lg">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* BENEFITS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#00D3CD] p-10 flex flex-col min-h-[450px] shadow-lg relative overflow-hidden"
          >
            <h2 className="text-2xl font-black mb-10 tracking-tighter text-black">
              BENEFITS
            </h2>

            <div className="space-y-8">
              {highlights.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <p className="text-black font-bold text-lg leading-tight uppercase">
                    {benefit}
                  </p>

                  {idx !== highlights.length - 1 && (
                    <div className="w-full h-[1px] bg-black/20 mt-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FOOTER CTA */}
        <motion.div
          variants={fadeInUp}
          className="mt-20 flex flex-col md:flex-row items-center justify-between border-t border-gray-200 pt-10 gap-6"
        >
          <Link
            to="/services"
            className="text-sm font-bold border border-black px-10 py-3 hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest"
          >
            — BACK TO SERVICES
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => popupRef.current?.openPopup()}
            className="bg-[#00D3CD] text-white font-bold px-12 py-4 rounded-full shadow-[0_10px_20px_rgba(0,211,205,0.3)] hover:shadow-[0_15px_40px_rgba(0,211,205,0.5)] transition-all"
          >
            ENQUIRE NOW
          </motion.button>
        </motion.div>
      </div>

      <EnquiryPopup ref={popupRef} />
    </motion.div>
  );
};

export default ServicesDetail;