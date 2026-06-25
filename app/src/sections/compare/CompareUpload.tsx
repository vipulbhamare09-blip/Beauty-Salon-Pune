import { motion } from 'framer-motion';
import { UploadCloud, Sparkles } from 'lucide-react';

interface Props {
  beforeImage: string | null;
  setBeforeImage: (url: string | null) => void;
  afterImage: string | null;
  setAfterImage: (url: string | null) => void;
  onAnalyze: () => void;
}

export default function CompareUpload({ beforeImage, setBeforeImage, afterImage, setAfterImage, onAnalyze }: Props) {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isBefore: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        if (isBefore) setBeforeImage(url);
        else setAfterImage(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const isReady = beforeImage && afterImage;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-12">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] uppercase tracking-[3px] text-salon-gray mb-4 font-medium"
        >
          Transformation Analysis
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-light text-salon-black mb-4 font-playfair tracking-tight"
        >
          Compare Your Journey
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-salon-gray font-light max-w-lg mx-auto text-sm leading-relaxed"
        >
          Upload your before and after photos. Our intelligence engine will auto-align your features and generate a premium transformation report.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
        {/* Before Upload */}
        <UploadZone 
          label="Before" 
          image={beforeImage} 
          onChange={(e) => handleFileChange(e, true)} 
          delay={0.3}
        />
        {/* After Upload */}
        <UploadZone 
          label="After" 
          image={afterImage} 
          onChange={(e) => handleFileChange(e, false)} 
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={onAnalyze}
          disabled={!isReady}
          className={`px-8 py-4 rounded-full text-xs uppercase tracking-widest font-medium flex items-center gap-3 transition-all duration-300 ${
            isReady 
              ? 'bg-salon-black text-white hover:bg-gray-800 hover:scale-105 shadow-xl' 
              : 'bg-salon-gray/10 text-salon-gray/50 cursor-not-allowed'
          }`}
        >
          <Sparkles size={16} />
          Analyze Transformation
        </button>
      </motion.div>
    </div>
  );
}

interface UploadZoneProps {
  label: string;
  image: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  delay: number;
}

function UploadZone({ label, image, onChange, delay }: UploadZoneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group w-full aspect-[3/4] bg-white rounded-3xl border border-salon-gray/20 shadow-sm overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-salon-black transition-colors"
    >
      {image ? (
        <>
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-salon-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-xs uppercase tracking-widest font-medium px-6 py-2 border border-white/30 rounded-full bg-black/20">Change Photo</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-salon-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud size={24} className="text-salon-black" />
          </div>
          <p className="text-lg font-playfair text-salon-black mb-1">{label} Image</p>
          <p className="text-[10px] uppercase tracking-widest text-salon-gray">Click or Drag & Drop</p>
        </div>
      )}
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      {/* Label Badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
        <span className="text-[10px] uppercase tracking-[3px] font-medium text-salon-black">{label}</span>
      </div>
    </motion.div>
  );
}
