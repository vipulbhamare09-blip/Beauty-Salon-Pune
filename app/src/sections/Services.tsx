"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "HAIR STYLING",
    subtitle: "SERVICES",
    image: "/images/service-hair.jpg",
  },
  {
    title: "MAKE-UP",
    subtitle: "SERVICES",
    image: "/images/service-makeup.jpg",
  },
  {
    title: "COSMETOLOGY",
    subtitle: "SERVICES",
    image: "/images/service-cosmetology.jpg",
  },
  {
    title: "NAIL POLISH",
    subtitle: "SERVICES",
    image: "/images/service-nails.jpg",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="bg-salon-white py-20 lg:py-28">
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
            OUR SERVICES
          </h2>
          <div className="mt-4 mx-auto w-10 h-[2px] bg-salon-black" />
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative h-[380px] lg:h-[420px] overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={service.image}
                  alt={`${service.title} ${service.subtitle}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3
                  className="text-salon-white text-xl lg:text-2xl font-normal tracking-wide"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-salon-white/80 text-xl lg:text-2xl font-normal tracking-wide mt-0.5"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {service.subtitle}
                </p>
                <motion.a
                  href="#booking"
                  className="inline-block mt-5 bg-salon-black text-salon-white text-[10px] tracking-[0.2em] px-6 py-3 font-poppins hover:bg-salon-dark transition-colors duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  READ MORE
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
