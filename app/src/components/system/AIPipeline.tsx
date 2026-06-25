import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface AIPipelineProps {
  steps: string[];
  onComplete: () => void;
  stepDuration?: number; // 200-300ms
}

export default function AIPipeline({ steps, onComplete, stepDuration = 300 }: AIPipelineProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      const timeout = setTimeout(onComplete, 400); // small delay before complete
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1);
    }, stepDuration);

    return () => clearTimeout(timeout);
  }, [currentStepIndex, steps.length, onComplete, stepDuration]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col space-y-3">
      <AnimatePresence>
        {steps.map((step, index) => {
          if (index > currentStepIndex) return null;
          
          const isCurrent = index === currentStepIndex;
          const isPast = index < currentStepIndex;

          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 p-4 bg-salon-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-salon-gray/10"
            >
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {isPast ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="w-6 h-6 rounded-full bg-salon-black text-salon-white flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </motion.div>
                ) : isCurrent ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-salon-gray/30 border-t-salon-black rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-salon-gray/20" />
                )}
              </div>
              <span className={`text-[15px] tracking-wide transition-colors duration-300 ${isPast ? 'text-salon-black font-medium' : isCurrent ? 'text-salon-black font-medium' : 'text-salon-gray'}`}>
                {step}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
