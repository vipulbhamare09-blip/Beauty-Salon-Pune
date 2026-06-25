"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, X } from "lucide-react";

export default function SalonInterior() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="bg-salon-light pb-20 lg:pb-28">
      <div ref={ref} className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:w-[85%] mx-auto aspect-[16/9] overflow-hidden group cursor-pointer"
          onClick={() => setShowVideo(true)}
        >
          {/* Salon Interior Image */}
          <img
            src="/images/salon-interior.jpg"
            alt="Pune Beauty Salon Interior"
            className="w-full h-full object-cover"
          />

          {/* Subtle Overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Play Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-salon-black/80 flex items-center justify-center group-hover:bg-salon-black transition-colors duration-300">
              <Play
                size={24}
                className="text-salon-white ml-1"
                fill="white"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            className="absolute top-6 right-6 text-salon-white hover:opacity-70 transition-opacity"
            onClick={() => setShowVideo(false)}
          >
            <X size={32} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video bg-salon-dark flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-salon-white/60 text-sm tracking-wider">
              Video Coming Soon
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}
