import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SCAN_STEPS = [
  "Uploading...",
  "Detecting face...",
  "Analyzing facial landmarks...",
  "Checking skin condition...",
  "Estimating face shape...",
  "Finding hairstyle recommendations...",
  "Generating beauty score...",
  "Preparing report..."
];

interface ScanningProcessProps {
  image: string;
  onComplete: () => void;
}

export default function ScanningProcess({ image, onComplete }: ScanningProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Random duration between 4 and 7 seconds (4000 to 7000 ms)
    const totalDuration = Math.floor(Math.random() * 3000) + 4000;
    const stepDuration = totalDuration / SCAN_STEPS.length;
    const updateInterval = 50; // ms

    let currentProgress = 0;
    const progressIncrement = 100 / (totalDuration / updateInterval);

    const progressTimer = setInterval(() => {
      currentProgress += progressIncrement;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressTimer);
        setTimeout(onComplete, 300); // short delay at 100%
      }
      setProgress(currentProgress);
    }, updateInterval);

    let stepIndex = 0;
    const stepTimer = setInterval(() => {
      stepIndex++;
      if (stepIndex < SCAN_STEPS.length) {
        setCurrentStep(stepIndex);
      } else {
        clearInterval(stepTimer);
      }
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [onComplete]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-light text-salon-black mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
          AI Analysis in Progress
        </h2>
        <div className="h-6">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-salon-gray font-poppins text-sm tracking-widest uppercase"
          >
            {SCAN_STEPS[currentStep]}
          </motion.p>
        </div>
      </div>

      <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-salon-black">
        {/* Uploaded Image */}
        <img
          src={image}
          alt="Scanning target"
          className="w-full h-full object-cover opacity-60"
        />

        {/* Pulse effect background */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-salon-black mix-blend-overlay pointer-events-none"
        />

        {/* Scanning Laser */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-salon-white shadow-[0_0_15px_3px_rgba(255,255,255,0.7)] z-10"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
        />
        
        {/* Scanning highlight area */}
        <motion.div
          className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent z-0"
          animate={{ top: ['-20%', '100%', '-20%'] }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
        />

        {/* Framing brackets (corners) */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-salon-white/50 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-salon-white/50 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-salon-white/50 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-salon-white/50 rounded-br-lg" />
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mt-12">
        <div className="h-[2px] bg-salon-gray/20 w-full overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-salon-black"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        <div className="flex justify-between mt-3 text-xs font-poppins text-salon-gray tracking-wider">
          <span>{Math.round(progress)}%</span>
          <span>Please wait</span>
        </div>
      </div>
    </div>
  );
}
