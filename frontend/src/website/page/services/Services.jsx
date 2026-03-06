import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  QrCode,
  Speaker,
  Wallet,
  ShieldCheck,
  Banknote,
  CreditCard,
  Landmark,
  Receipt,
  ArrowRightLeft,
  Smartphone,
  Monitor,
  SmartphoneNfc,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";

import servicesData from "./servicesdata.json";

const iconMap = {
  qr: QrCode,
  "sound-box": Speaker,
  "payment-gateway": Wallet,
  insurance: ShieldCheck,
  loan: Banknote,
  "credit-card": CreditCard,
  payout: Landmark,
  bbps: Receipt,
  dmt: ArrowRightLeft,
  aeps: Smartphone,
  "pos-machine": Monitor,
  matm: SmartphoneNfc,
};

const ServiceCardWithImage = ({
  title,
  icon: Icon,
  slug,
  image,
  index,
  shortDesc,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const safeTitle = title || "service";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
    >
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0"
      >
        <img
          src={image}
          alt={safeTitle}
          className="w-full h-full object-fit"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1556742044-3c52d6e88c02?auto=format&fit=crop&q=80&w=2070";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
      </motion.div>

      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <motion.h3
          animate={{ y: isHovered ? -5 : 0 }}
          className="text-2xl font-bold mb-2"
        >
          {safeTitle}
        </motion.h3>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-white/80 text-sm mb-4">
                {shortDesc ||
                  `Secure and reliable ${safeTitle.toLowerCase()} services for your business needs.`}
              </p>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs">Instant</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  <span className="text-xs">Secure</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-xs">24/7</span>
                </div>
              </div>

              <Link
                to={`/services/${slug}`}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative"
        >
          <img
            src="public/assets/image/logo/abheepays.jpeg"
            alt="Hero"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </section>

      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[#2DD4BF] font-semibold text-sm tracking-wider uppercase bg-purple-100 px-6 py-2 rounded-full mb-6">
              🚀 All Services
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Complete Financial Ecosystem
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of financial services designed for
              modern businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {servicesData.map((service, index) => {
              const Icon = iconMap[service.id];
              return (
                <ServiceCardWithImage
                  key={service.id}
                  title={service.name}
                  slug={service.id}
                  icon={Icon}
                  image={service.image || service.imageUrl}
                  shortDesc={service.shortDesc || service.description}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556742044-3c52d6e88c02?auto=format&fit=crop&q=80&w=2070"
            alt="CTA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2DD4BF]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-4xl md:text-4xl font-black mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of businesses already using our platform
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-md overflow-hidden"
              >
                <span className="relative z-10">Get Started Now</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gray-100"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;