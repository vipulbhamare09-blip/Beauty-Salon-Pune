import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  stage: string;
}

export default function ExportLoadingModal({ isOpen, stage }: Props) {
  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-salon-light/80 backdrop-blur-md flex items-center justify-center font-poppins"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white p-12 rounded-[2rem] shadow-2xl border border-salon-gray/10 flex flex-col items-center max-w-sm w-full"
        >
          {/* Animated Spinner matching luxury vibe */}
          <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[0.5px] border-salon-gray/20 rounded-full border-t-salon-black"
            ></motion.div>
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 border-[0.5px] border-salon-gray/20 rounded-full border-b-salon-black/50"
            ></motion.div>
            <Loader2 className="animate-spin text-salon-black" size={24} />
          </div>

          <h3 className="text-xl font-playfair mb-2 text-salon-black">Compiling Report</h3>
          
          <div className="h-6 overflow-hidden w-full text-center mt-2 relative">
             <motion.p
                key={stage}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-[10px] uppercase tracking-widest text-salon-gray absolute inset-0 font-medium"
             >
               {stage}
             </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
