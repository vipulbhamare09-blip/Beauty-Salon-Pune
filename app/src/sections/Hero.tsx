"use client";

import { motion } from "framer-motion";
import { useNavigate } from 'react-router';
import React from 'react';

const Hero = React.memo(function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[650px] lg:h-[700px] xl:h-[750px] overflow-hidden transform-gpu">
      {/* Background Video is now globally persistent in App.tsx */}

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-center transform-gpu">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl transform-gpu"
          style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
        >
          <h1
            className="text-salon-white text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-light leading-[1.1] tracking-wide"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            BEAUTY &
            <br />
            HAIR SALON
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-salon-white text-[10px] sm:text-[11px] tracking-[0.35em] font-poppins font-light transform-gpu"
            style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
          >
            CHANGE YOUR LOOK WITH OUR TALENTED STYLISTS
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onClick={() => navigate('/services')}
            className="inline-block mt-8 bg-salon-black text-salon-white text-[10px] sm:text-[11px] tracking-[0.2em] px-8 py-3.5 font-poppins hover:bg-salon-dark transition-colors duration-300 transform-gpu"
            style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
          >
            OUR SERVICES
          </motion.button>
        </motion.div>
      </div>

      {/* Vertical Text - Right Side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-10 hidden md:block transform-gpu"
        style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
      >
        <span className="text-vertical text-salon-white text-[10px] tracking-[0.3em] font-poppins opacity-80">
          MON - SUN 7:00AM - 8:00PM
        </span>
      </motion.div>


    </section>
  );
});

export default Hero;
