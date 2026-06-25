"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Welcome() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-salon-light py-20 lg:py-28">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
      >
        {/* Left Column - Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-salon-gray text-[10px] tracking-[0.3em] uppercase mb-4">
            PREMIUM BEAUTY EXPERIENCE
          </span>
          <h2
            className="text-salon-black text-2xl sm:text-3xl lg:text-4xl font-normal leading-[1.3] tracking-wide"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            WELCOME TO
            <br />
            PUNE BEAUTY SALON
          </h2>
          <div className="mt-6 w-10 h-[2px] bg-salon-black" />
        </motion.div>

        {/* Right Column - Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-salon-gray text-sm leading-[1.8] font-light">
            At Pune Beauty Salon, we blend luxury beauty services with advanced AI-powered experiences to redefine self-care. From precision hair styling and skin treatments to personalized beauty consultations, every service is designed around your unique needs.
          </p>
          <p className="text-salon-gray text-sm leading-[1.8] font-light mt-4">
            Located in Pune, our salon combines expert professionals, premium products, and intelligent beauty technology to help you look and feel your best. We are committed to delivering exceptional service in a modern, relaxing environment.
          </p>
          <motion.a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("services-list-section") || document.getElementById("services");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/services";
              }
            }}
            className="inline-block mt-8 bg-salon-black text-salon-white text-[10px] sm:text-[11px] tracking-[0.2em] px-8 py-3.5 font-poppins hover:bg-salon-dark transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            EXPLORE SERVICES
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
