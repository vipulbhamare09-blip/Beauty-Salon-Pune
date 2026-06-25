"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for booking! We will contact you soon.");
    setFormData({ name: "", phone: "", email: "", company: "", notes: "" });
  };

  return (
    <section id="booking" className="bg-salon-light py-20 lg:py-28">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative h-[400px] lg:h-[500px] overflow-hidden"
          >
            <img
              src="/images/booking-hair.jpg"
              alt="Hair styling"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2
              className="text-salon-black text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              BOOK YOUR VISIT
            </h2>
            <div className="mt-4 w-10 h-[2px] bg-salon-black mb-10" />

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 - Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-salon-black/30 py-3 text-sm font-poppins text-salon-black placeholder:text-salon-gray/60 focus:outline-none focus:border-salon-black transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-salon-black/30 py-3 text-sm font-poppins text-salon-black placeholder:text-salon-gray/60 focus:outline-none focus:border-salon-black transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Row 2 - Email & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-salon-black/30 py-3 text-sm font-poppins text-salon-black placeholder:text-salon-gray/60 focus:outline-none focus:border-salon-black transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-salon-black/30 py-3 text-sm font-poppins text-salon-black placeholder:text-salon-gray/60 focus:outline-none focus:border-salon-black transition-colors"
                  />
                </div>
              </div>

              {/* Row 3 - Notes */}
              <div>
                <textarea
                  name="notes"
                  placeholder="Other Notes..."
                  value={formData.notes}
                  onChange={handleChange}
                  rows={1}
                  className="w-full bg-transparent border-b border-salon-black/30 py-3 text-sm font-poppins text-salon-black placeholder:text-salon-gray/60 focus:outline-none focus:border-salon-black transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="mt-8 bg-salon-black text-salon-white text-[10px] sm:text-[11px] tracking-[0.2em] px-10 py-3.5 font-poppins hover:bg-salon-dark transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                BOOK NOW
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
