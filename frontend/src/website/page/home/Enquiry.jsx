import React, { useState } from "react";

const EnquirySection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/care@abheepay.in",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        console.log("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="bg-[#F6F8FC] py-12" id="bottomform">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
          <div>
            <h2 className="text-black text-2xl font-semibold mb-6 tracking-wide">
              JOIN FORM
            </h2>

            {submitted && (
              <p className="text-green-400 mb-4 text-sm">
                ✅ Your enquiry has been submitted successfully!
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
             
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_subject"
                value="New Enquiry From Website"
              />
              <input type="text" name="_honey" style={{ display: "none" }} />

              <input
                type="text"
                name="name"
                placeholder="FULL NAME"
                required
                className="bg-transparent border border-black/60 text-white px-3 py-2.5 text-sm outline-none placeholder-black/70"
              />

              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                required
                className="bg-transparent border border-black/60 text-white px-3 py-2.5 text-sm outline-none placeholder-black/70"
              />

              <input
                type="tel"
                name="phone"
                placeholder="PHONE NUMBER"
                className="bg-transparent border border-black/60 text-white px-3 py-2.5 text-sm outline-none placeholder-black/70"
              />

              <input
                type="text"
                name="city"
                placeholder="CITY"
                className="bg-transparent border border-black/60 text-white px-3 py-2.5 text-sm outline-none placeholder-black/70"
              />

              <textarea
                name="message"
                placeholder="MESSAGE"
                rows="2"
                required
                className="bg-transparent border border-black/60 text-white px-3 py-2.5 text-sm outline-none placeholder-black/70 resize-none"
              />

              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="bg-[#2DD4BF] text-white px-8 py-2.5 text-sm font-semibold"
                >
                  SEND NOW
                </button>
              </div>
            </form>
          </div>

       
          <div className="w-full h-[340px] border border-white/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.750984159696!2d77.0480989!3d28.5772394!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x390d1b5aa370912d%3A0x67cdd78c943f0f39!2sAbheepay!5e0!3m2!1sen!2sin!4v1770614721648!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquirySection;
