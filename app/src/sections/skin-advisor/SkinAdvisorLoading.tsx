import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanFace } from 'lucide-react';

interface SkinAdvisorLoadingProps {
  image: string;
  onComplete: () => void;
}

const PHASES = [
  "Analyzing skin texture...",
  "Detecting hydration...",
  "Mapping pores...",
  "Detecting pigmentation...",
  "Generating skincare routine...",
  "Preparing personalized report..."
];

export default function SkinAdvisorLoading({ image, onComplete }: SkinAdvisorLoadingProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total duration between 4 to 7 seconds
    const totalDuration = Math.random() * 3000 + 4000;
    const intervalTime = totalDuration / 100;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500); // small delay before completing
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const phaseTime = 100 / PHASES.length;
    const newPhase = Math.min(Math.floor(progress / phaseTime), PHASES.length - 1);
    if (newPhase !== currentPhase) {
      setCurrentPhase(newPhase);
    }
  }, [progress, currentPhase]);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-salon-gray/20 shadow-2xl mb-12 bg-salon-black"
      >
        <img 
          src={image} 
          alt="Scanning" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        
        {/* Scanner Line */}
        <motion.div
          animate={{
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute left-0 right-0 h-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10"
          style={{ top: '0%' }}
        />

        {/* Scan Overlay Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
        
        {/* Reticle UI */}
        <div className="absolute inset-0 border-[8px] border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <ScanFace className="w-16 h-16 text-white/30 animate-pulse" strokeWidth={1} />
        </div>
      </motion.div>

      <div className="w-full max-w-md bg-salon-light p-8 rounded-3xl text-center border border-salon-gray/10 shadow-sm relative overflow-hidden">
        <h3 className="text-xl text-salon-black mb-6 font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
          AI Skin Analysis in Progress
        </h3>
        
        <div className="h-1.5 w-full bg-salon-gray/20 rounded-full overflow-hidden mb-6">
          <motion.div 
            className="h-full bg-salon-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="h-6 relative">
          <motion.p
            key={currentPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-salon-gray text-xs tracking-widest uppercase font-poppins absolute inset-0"
          >
            {PHASES[currentPhase]}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
