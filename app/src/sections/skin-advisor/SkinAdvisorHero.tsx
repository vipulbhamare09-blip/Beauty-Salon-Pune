import { motion } from 'framer-motion';

export default function SkinAdvisorHero() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-salon-black text-salon-white text-[10px] uppercase tracking-[0.2em] mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        AI Dermatologist & Beauty Consultant
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-5xl lg:text-7xl font-light text-salon-black mb-6 leading-tight"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        Discover Your <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-salon-gray via-salon-black to-salon-gray">
          Perfect Skin Routine
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-salon-gray font-poppins font-light text-lg lg:text-xl"
      >
        Upload a selfie and receive an in-depth, personalized skin health report and routine powered by our premium AI model.
      </motion.p>
    </div>
  );
}
