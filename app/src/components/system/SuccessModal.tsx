import { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useSuccessSound } from '../../hooks/useSuccessSound';

// Lazy load confetti to respect performance requirements
const Confetti = lazy(() => import('./Confetti'));

interface SuccessModalProps {
  onComplete: () => void;
  title?: string;
  subtitle?: string;
}

export default function SuccessModal({ 
  onComplete, 
  title = "Analysis Complete", 
  subtitle = "Your personalized AI insights are ready." 
}: SuccessModalProps) {
  const playSound = useSuccessSound();

  useEffect(() => {
    // Play sound on mount
    playSound();

    // Trigger completion after 2.5s
    const timeout = setTimeout(onComplete, 2500);
    return () => clearTimeout(timeout);
  }, [onComplete, playSound]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
      {/* Blurred Background with very subtle tint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-salon-light/40 backdrop-blur-md"
      />

      <Suspense fallback={null}>
        <Confetti />
      </Suspense>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Apple-like spring/easeOut
        className="relative bg-salon-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-salon-white/50 p-10 flex flex-col items-center justify-center text-center max-w-[400px] w-full mx-auto overflow-hidden pointer-events-auto"
      >
        {/* Subtle gradient border effect via pseudo element */}
        <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-br from-white/60 to-white/10 opacity-50 pointer-events-none [mask-image:linear-gradient(white,white)] [mask-composite:exclude]" />

        {/* Icon - Large animated checkmark inside glowing circle */}
        <div className="relative mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-salon-black to-salon-dark flex items-center justify-center shadow-lg relative z-10"
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Check className="w-10 h-10 text-salon-white" strokeWidth={3} />
            </motion.div>
          </motion.div>
          {/* Subtle glow behind circle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute inset-0 bg-salon-black/10 blur-xl rounded-full z-0"
          />
        </div>

        {/* Text */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-2xl font-playfair font-semibold text-salon-black mb-2"
        >
          {title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-salon-gray font-poppins text-sm"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </div>
  );
}
