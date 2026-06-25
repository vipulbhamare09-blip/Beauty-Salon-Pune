import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'subtitle' | 'progress' | 'pause' | 'exit'>('logo');
  useEffect(() => {
    // Timeline Sequence
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. Logo fades in (handled by initial phase 'logo' and motion initial/animate)
    // 2. Subtitle fades in after 0.8s
    timers.push(setTimeout(() => setPhase('subtitle'), 800));
    
    // 3. Progress line animates after 1.6s
    timers.push(setTimeout(() => setPhase('progress'), 1600));
    
    // 4. Pause after progress completes (progress takes ~1.5s, so at 3.1s we pause)
    timers.push(setTimeout(() => setPhase('pause'), 3200));

    // 5. Entire splash fades away at 3.8s
    timers.push(setTimeout(() => {
      setPhase('exit');
    }, 3800));

    // 6. Trigger onComplete after exit animation finishes
    timers.push(setTimeout(() => {
      onComplete();
    }, 4500));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] bg-salon-black flex flex-col items-center justify-center font-poppins"
        >
          <div className="flex flex-col items-center">
            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-salon-white text-4xl italic tracking-widest mb-4"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Pune Beauty
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'logo' ? 0 : 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-salon-gray uppercase tracking-[0.3em] text-xs font-light"
            >
              AI Luxury Experience
            </motion.p>

            {/* Progress Line */}
            <div className="w-48 h-[1px] bg-salon-gray/20 mt-8 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: phase === 'progress' || phase === 'pause' ? '100%' : '-100%' }}
                transition={{ 
                  duration: 1.5, 
                  ease: 'easeInOut',
                  // Only run once when phase transitions to progress
                }}
                className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-salon-white/80 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
