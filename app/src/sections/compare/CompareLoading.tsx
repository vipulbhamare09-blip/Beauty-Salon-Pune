import { motion } from 'framer-motion';
import { ScanFace, CheckCircle2 } from 'lucide-react';

interface Props {
  stage: 'validating' | 'loading';
}

export default function CompareLoading({ stage }: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20">
      
      {/* Animated Face Scanner Icon */}
      <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
        {/* Pulsing rings */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 border border-salon-gray/20 rounded-full"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
          className="absolute inset-0 border border-salon-gray/10 rounded-full"
        ></motion.div>
        
        {/* Core Icon */}
        <div className="w-20 h-20 bg-salon-black text-white rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
          <ScanFace size={32} />
          {/* Scanning line */}
          <motion.div 
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-1 bg-white/50 blur-[1px]"
          ></motion.div>
        </div>
      </div>

      <h2 className="text-3xl font-playfair text-salon-black mb-2">
        {stage === 'validating' ? 'Validating Images...' : 'Analyzing Transformation...'}
      </h2>

      {/* Text Carousel */}
      <div className="h-6 overflow-hidden mb-12">
        {stage === 'validating' ? (
          <motion.p 
            animate={{ y: [0, -24, -48] }} 
            transition={{ duration: 1.5, times: [0, 0.5, 1], repeat: Infinity }} 
            className="text-salon-gray font-light flex flex-col items-center text-sm"
          >
            <span>Detecting faces and lighting...</span>
            <span>Checking angle alignment...</span>
            <span>Detecting faces and lighting...</span>
          </motion.p>
        ) : (
          <motion.p 
            animate={{ y: [0, -24, -24, -48, -48, -72] }} 
            transition={{ duration: 3, times: [0, 0.2, 0.4, 0.6, 0.8, 1], repeat: Infinity }} 
            className="text-salon-gray font-light flex flex-col items-center text-sm"
          >
            <span>Aligning facial landmarks...</span>
            <span>Measuring skin hydration & glow...</span>
            <span>Calculating hair volume improvements...</span>
            <span>Aligning facial landmarks...</span>
          </motion.p>
        )}
      </div>

      {/* Mock Process Checklist */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <CheckItem text="Image Quality Validated" active={stage === 'loading'} />
        <CheckItem text="Facial Auto-Alignment" active={stage === 'loading'} />
        <CheckItem text="Metrics Calculation" active={false} />
      </div>

    </div>
  );
}

function CheckItem({ text, active }: { text: string, active: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-500 ${
      active 
        ? 'bg-white border-salon-gray/20 text-salon-black shadow-sm' 
        : 'bg-transparent border-salon-gray/10 text-salon-gray/50'
    }`}>
      <motion.div
        initial={false}
        animate={{ scale: active ? 1 : 0.8, opacity: active ? 1 : 0.5 }}
      >
        <CheckCircle2 size={18} className={active ? 'text-green-500' : 'text-salon-gray/30'} />
      </motion.div>
      <span className="text-xs uppercase tracking-widest font-medium">{text}</span>
    </div>
  );
}
