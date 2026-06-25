import { motion } from 'framer-motion';

export default function FaceAnalysisHero() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 relative">
      {/* Animated subtle gradient elements behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-salon-gray/10 via-transparent to-transparent blur-3xl -z-10 pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-light text-salon-black leading-tight tracking-wide mb-6"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        AI Face Analysis
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-salon-gray text-sm sm:text-base lg:text-lg tracking-[0.15em] font-poppins font-light leading-relaxed max-w-2xl mx-auto"
      >
        UPLOAD A SELFIE AND RECEIVE AN IN-DEPTH BEAUTY ANALYSIS POWERED BY OUR PROPRIETARY AI.
      </motion.p>
    </div>
  );
}
