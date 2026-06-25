"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stylers = [
  {
    name: "ANANYA DESHMUKH",
    role: "SENIOR HAIR STYLIST",
    image: "/images/stylist-1-indian.png",
  },
  {
    name: "RIYA MEHTA",
    role: "HAIR COLOR SPECIALIST",
    image: "/images/stylist-2-indian.png",
  },
  {
    name: "ARJUN KAPOOR",
    role: "BEAUTY & GROOMING EXPERT",
    image: "/images/stylist-3-indian.png",
  },
];

export default function Stylers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-salon-white py-20 lg:py-28">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2
            className="text-salon-black text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            OUR STYLERS
          </h2>
          <div className="mt-4 mx-auto w-10 h-[2px] bg-salon-black" />
        </motion.div>

        {/* Styler Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {stylers.map((styler, index) => (
            <motion.div
              key={styler.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-salon-light aspect-[3/4]">
                <img
                  src={styler.image}
                  alt={styler.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info Bar */}
              <div className="bg-salon-black py-4 px-6 text-center">
                <h3 className="text-salon-white text-sm tracking-[0.15em] font-poppins font-medium">
                  {styler.name}
                </h3>
                <p className="text-salon-white/60 text-[10px] tracking-[0.2em] font-poppins mt-1">
                  {styler.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
