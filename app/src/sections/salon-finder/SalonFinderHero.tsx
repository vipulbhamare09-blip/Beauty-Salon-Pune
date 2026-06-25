import { motion } from 'framer-motion';

export default function SalonFinderHero() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-8 text-center mt-12 mb-4">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[10px] uppercase tracking-[3px] text-salon-gray mb-4 font-medium"
      >
        Ecosystem Partner Network
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-light text-salon-black mb-4 font-playfair tracking-tight max-w-3xl mx-auto"
      >
        Find Your Perfect Beauty Destination
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-salon-gray font-light max-w-xl mx-auto text-sm leading-relaxed"
      >
        Discover premium salons tailored to your beauty goals, treatments, and preferences. Our intelligence engine recommends the perfect match based on your unique profile.
      </motion.p>
    </div>
  );
}
