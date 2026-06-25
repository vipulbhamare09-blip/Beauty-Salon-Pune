import { motion } from 'framer-motion';

export default function AppLoader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[99999] bg-salon-black flex items-center justify-center font-poppins"
    >
      <div className="w-16 h-16 relative">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-salon-white/40"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-salon-gray/30"
        />
      </div>
    </motion.div>
  );
}
