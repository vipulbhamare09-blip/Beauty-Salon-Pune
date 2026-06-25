import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalImage: string;
  previewImage: string;
  styleName: string;
}

export default function ComparisonModal({ isOpen, onClose, originalImage, previewImage, styleName }: ComparisonModalProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSaved, setIsSaved] = useState(false);

  const handleDownload = () => {
    toast('Download complete.', {
      description: 'Your comparison preview has been saved to your device.',
    });
  };

  const handleToggleFavorite = () => {
    setIsSaved(!isSaved);
    toast(isSaved ? 'Removed from favorites' : 'Saved to favorites', {
      description: styleName,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-5xl bg-salon-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>

            {/* Slider Area */}
            <div className="relative w-full md:w-2/3 aspect-square md:aspect-auto md:min-h-[600px] bg-salon-dark flex-shrink-0 select-none touch-none">
              <img src={originalImage} alt="Original" className="absolute inset-0 w-full h-full object-cover" />
              <img 
                src={previewImage} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              />

              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="flex gap-[2px]">
                    <div className="w-[2px] h-3 bg-salon-gray rounded-full" />
                    <div className="w-[2px] h-3 bg-salon-gray rounded-full" />
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0"
              />

              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] tracking-widest uppercase z-10 pointer-events-none">
                Original
              </div>
              <div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-salon-black text-[10px] tracking-widest uppercase font-medium z-10 pointer-events-none">
                Preview
              </div>
            </div>

            {/* Details Area */}
            <div className="p-8 md:p-12 flex flex-col justify-between w-full">
              <div>
                <p className="text-white/50 text-xs font-poppins uppercase tracking-widest mb-3">AI Recommendation</p>
                <h3 className="text-3xl lg:text-4xl font-light text-white mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                  {styleName}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70 font-poppins text-sm">Match Score</span>
                    <span className="text-white font-medium">95%</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70 font-poppins text-sm">Trend Score</span>
                    <span className="text-white font-medium">High</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-white/70 font-poppins text-sm">Face Shape Compatibility</span>
                    <span className="text-white font-medium">Perfect</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <button
                  onClick={handleDownload}
                  className="w-full py-4 bg-white text-salon-black font-poppins text-xs tracking-[0.2em] uppercase hover:bg-salon-light transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download Preview
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={`w-full py-4 border font-poppins text-xs tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 ${
                    isSaved ? 'bg-white/10 border-white text-white' : 'border-white/20 text-white hover:border-white'
                  }`}
                >
                  <Heart size={16} className={isSaved ? "fill-white" : ""} />
                  {isSaved ? 'Saved to Favorites' : 'Save to Favorites'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
