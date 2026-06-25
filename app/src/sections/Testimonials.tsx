"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    text: "I booked a hair spa and styling session here and the experience was amazing. The staff was professional, friendly, and understood exactly what I wanted. My hair has never looked this healthy and beautiful.",
    name: "Priya Sharma",
    role: "Hair Styling & Spa",
    image: "/images/client-1-indian.png",
  },
  {
    id: 2,
    text: "I visited for hair coloring and absolutely loved the results. The consultation was detailed and personalized. One of the best luxury salon experiences I've had in Pune.",
    name: "Aditi Kulkarni",
    role: "Hair Color Styling",
    image: "/images/client-2-indian.png",
  },
  {
    id: 3,
    text: "I chose Pune Beauty Salon for my pre-bridal services and I couldn't be happier. Everything from skin care to styling was handled beautifully. Highly recommended.",
    name: "Sneha Joshi",
    role: "Pre-Bridal & Skincare",
    image: "/images/client-3-indian.png",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);

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
            className="text-salon-black text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide uppercase"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            WHAT OUR CLIENTS SAY
          </h2>
          <div className="mt-4 mx-auto w-10 h-[2px] bg-salon-black" />
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              style={{ display: (index === activeIndex || index === (activeIndex + 1) % testimonials.length) ? 'block' : 'none' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-salon-white shadow-card p-8 lg:p-10 text-center"
            >
              {/* Quote Text */}
              <p className="text-salon-gray text-xs sm:text-sm leading-[1.8] font-light italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Profile */}
              <div className="mt-8 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="mt-3 text-salon-black text-sm font-poppins font-medium tracking-wide">
                  {testimonial.name}
                </h4>
                <p className="text-salon-gray text-[10px] tracking-[0.15em] font-poppins mt-1">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-2 mt-10"
        >
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveIndex(dot)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                dot === activeIndex ? "bg-salon-black" : "bg-salon-gray/30"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
