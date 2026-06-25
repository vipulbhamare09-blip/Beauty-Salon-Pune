import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SIMULATION_STEPS = [
  "Analyzing face shape...",
  "Evaluating hair density...",
  "Finding compatible styles...",
  "Matching current trends...",
  "Generating recommendations..."
];

interface SimulatorLoadingProps {
  image: string;
  onComplete: () => void;
}

export default function SimulatorLoading({ image, onComplete }: SimulatorLoadingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Random duration between 3 and 5 seconds (3000 to 5000 ms)
    const totalDuration = Math.floor(Math.random() * 2000) + 3000;
    const stepDuration = totalDuration / SIMULATION_STEPS.length;
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
      if (stepIndex < SIMULATION_STEPS.length) {
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
          AI Simulation in Progress
        </h2>
        <div className="h-6">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-salon-gray font-poppins text-sm tracking-widest uppercase"
          >
            {SIMULATION_STEPS[currentStep]}
          </motion.p>
        </div>
      </div>

      <div className="relative w-full max-w-md aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-salon-black">
        {/* Uploaded Image */}
        <img
          src={image}
          alt="Simulation target"
          className="w-full h-full object-cover opacity-60"
        />

        {/* Pulse effect background */}
        <motion.div
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-salon-black mix-blend-overlay pointer-events-none"
        />

        {/* Grid scanning effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />

        {/* Vertical laser line mapping features */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-salon-white shadow-[0_0_15px_3px_rgba(255,255,255,0.7)] z-10"
          animate={{ left: ['0%', '100%', '0%'] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
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
