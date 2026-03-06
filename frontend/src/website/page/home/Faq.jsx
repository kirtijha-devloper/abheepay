import { section } from "framer-motion/client";
import React, { useState } from "react";

const faqs = [
  {
    question: "When and how is the commission credited?",
    answer:
      "Commission is automatically credited to your wallet after every successful transaction. The settlement process is fast and completely transparent.",
  },
  {
    question: "What happens if an AePS transaction fails?",
    answer:
      "If a transaction is unsuccessful, the amount is either instantly reversed to the customer’s bank account or processed through an automatic refund system.",
  },
  {
    question: "What services can be provided through a Micro ATM?",
    answer:
      "Micro ATM services include cash withdrawal, balance enquiry, mini statement, and Aadhaar-based banking transactions.",
  },
  {
    question: "How can I start offering digital financial services at my shop?",
    answer:
      "After a simple registration process, you receive the required device and training support, enabling you to start services easily from your store.",
  },
  {
    question: "What are the benefits of working with this platform?",
    answer:
      "Low investment, multiple earning opportunities, quick payouts, and dedicated support help merchants grow their business smoothly.",
  },
  {
    question: "Can I provide utility bill payments and recharge services?",
    answer:
      "Yes, you can offer electricity bill payments, mobile recharges, DTH, and many other utility services from a single platform.",
  },
  {
    question: "How secure are digital banking and transactions?",
    answer:
      "The platform uses advanced security standards and encrypted systems to ensure all transactions remain safe and reliable.",
  },
  {
    question: "Do I earn extra commission for providing financial services?",
    answer:
      "Yes, each service comes with its own commission structure, which can significantly increase your monthly income.",
  },
];


const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#F6F8FC]">
      <h2 className="text-3xl md:text-3xl text-center font-bold text-gray-800 mb-3">
        Frequently Asked Questions
      </h2>
      <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent to-[#2DD4BF]"></div>
            <div className="w-2 h-2 bg-[#2DD4BF] rounded-full"></div>
            <div className="w-16 h-1 bg-gradient-to-l from-transparent to-[#2DD4BF]"></div>
          </div>

      <div className="w-full bg-[#F6F8FC] py-6  px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-10">
    

        <div className="w-full lg:w-1/2">
        
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-3 shadow-md rounded-md px-2 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-md font-semibold text-gray-700">
                    {faq.question}
                  </h3>
                  <span className="text-gray-500 text-2xl">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>
                {activeIndex === index && (
                  <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

     
        <div className="w-full lg:w-1/2 flex justify-center">
          <video
            src="public/assets/video/services/faq.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-[95%] h-[380px]  rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
