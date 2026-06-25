import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCcw } from 'lucide-react';
import ComparisonModal from './ComparisonModal';
import { useBeautyEcosystemStore } from '../../store/useBeautyEcosystemStore';

interface SimulatorResultsProps {
  originalImage: string;
  detectedGender: 'male' | 'female' | 'unknown';
  onRetake: () => void;
}

const WOMEN_STYLES = [
  { id: 'w1', name: 'Long Layers', image: '/images/simulator/w_long_layers.png', match: 95, trend: '+12%' },
  { id: 'w2', name: 'Curtain Bangs', image: '/images/simulator/w_curtain_bangs.png', match: 92, trend: '+18%' },
  { id: 'w3', name: 'Textured Bob', image: '/images/simulator/w_textured_bob.png', match: 88, trend: '+5%' },
  { id: 'w4', name: 'Pixie Cut', image: '/images/simulator/w_pixie_cut.png', match: 85, trend: '+22%' },
  { id: 'w5', name: 'Wolf Cut', image: '/images/simulator/w_wolf_cut.png', match: 90, trend: '+15%' },
  { id: 'w6', name: 'Curly Shag', image: '/images/simulator/w_curly_shag.png', match: 87, trend: '+8%' },
];

const MEN_STYLES = [
  { id: 'm1', name: 'Classic Fade', image: '/images/simulator/m_classic_fade.png', match: 91, trend: '+10%' },
  { id: 'm2', name: 'Textured Crop', image: '/images/simulator/m_textured_crop.png', match: 96, trend: '+15%' },
  { id: 'm3', name: 'Pompadour', image: '/images/simulator/m_pompadour.png', match: 88, trend: '+9%' },
  { id: 'm4', name: 'Middle Part', image: '/images/simulator/m_middle_part.png', match: 84, trend: '+20%' },
  { id: 'm5', name: 'Buzz Cut', image: '/images/simulator/m_buzz_cut.png', match: 82, trend: '+5%' },
  { id: 'm6', name: 'Long Flow', image: '/images/simulator/m_long_flow.png', match: 89, trend: '+14%' },
];

export default function SimulatorResults({ originalImage, detectedGender, onRetake }: SimulatorResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'women' | 'men'>('women');
  const [comparingStyle, setComparingStyle] = useState<any | null>(null);

  useEffect(() => {
    if (detectedGender === "male") {
      setSelectedCategory("men");
    }
    if (detectedGender === "female") {
      setSelectedCategory("women");
    }
  }, [detectedGender]);

  const menStyles = MEN_STYLES;
  const womenStyles = WOMEN_STYLES;

  const displayedStyles = selectedCategory === "men" ? menStyles : womenStyles;
  const setHairstyleSimulator = useBeautyEcosystemStore(state => state.setHairstyleSimulator);

  useEffect(() => {
    setHairstyleSimulator({
      detectedGender,
      topHairstyleMatches: displayedStyles.slice(0, 3).map(s => ({ name: s.name, match: s.match })),
      recommendedHairstyles: displayedStyles.slice(0, 3).map(s => s.name)
    });
  }, [detectedGender, displayedStyles, setHairstyleSimulator]);

  // Temporary Debug Logs
  console.log("Detected Gender:", detectedGender);
  console.log("Selected Category:", selectedCategory);
  console.log("Dataset Being Rendered:", displayedStyles);

  const headingText = detectedGender === 'unknown' 
    ? "Your Perfect Matches" 
    : `Your Perfect ${detectedGender === 'male' ? "Men's" : "Women's"} Styles`;

  const feedbackText = detectedGender === 'unknown'
    ? null
    : `AI detected a ${detectedGender === 'male' ? 'masculine' : 'feminine'} style profile and curated hairstyles specifically for you.`;

  return (
    <div className="max-w-[1200px] mx-auto w-full pb-20">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-light text-salon-black mb-4" 
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {headingText}
        </motion.h2>
        {detectedGender === 'unknown' && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-salon-gray font-poppins tracking-[0.2em] uppercase text-sm"
          >
            Select a style to compare
          </motion.p>
        )}
      </div>

      {/* Categories & Feedback */}
      {detectedGender === 'unknown' && (
        <div className="flex flex-col items-center justify-center mb-12">
          <p className="text-salon-gray text-xs tracking-widest uppercase mb-6 text-center font-poppins">
            We couldn't confidently determine your style profile.<br />
            Please select your preference:
          </p>
          <div className="inline-flex bg-salon-light rounded-full p-1 border border-salon-gray/10">
            <button
              onClick={() => setSelectedCategory('women')}
              className={`px-8 py-3 rounded-full text-xs font-poppins tracking-[0.2em] uppercase transition-all duration-300 ${
                selectedCategory === 'women' ? 'bg-salon-black text-white shadow-md' : 'text-salon-gray hover:text-salon-black'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setSelectedCategory('men')}
              className={`px-8 py-3 rounded-full text-xs font-poppins tracking-[0.2em] uppercase transition-all duration-300 ${
                selectedCategory === 'men' ? 'bg-salon-black text-white shadow-md' : 'text-salon-gray hover:text-salon-black'
              }`}
            >
              Men
            </button>
          </div>
        </div>
      )}

      {detectedGender !== 'unknown' && (
        <div className="flex justify-center mb-12">
          <p className="text-salon-gray text-xs tracking-[0.15em] uppercase text-center font-poppins max-w-md">
            {feedbackText}
          </p>
        </div>
      )}

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
      >
        <AnimatePresence mode="popLayout">
          {displayedStyles.map((style, idx) => (
            <motion.div
              key={style.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-salon-black aspect-[3/4]"
              onClick={() => setComparingStyle(style)}
            >
              <img 
                src={style.image} 
                alt={style.name} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = selectedCategory === 'women' ? '/images/hero-model.jpg' : '/images/about-model.jpg';
                }}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              
              <div className="absolute top-4 left-4">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-poppins uppercase tracking-widest text-salon-black font-medium">{style.match}% Match</span>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <button className="p-2.5 bg-black/30 hover:bg-white/90 text-white hover:text-red-500 rounded-full backdrop-blur-md transition-colors" onClick={(e) => { e.stopPropagation(); /* favorite logic */ }}>
                  <Heart size={16} />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl text-white font-light mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>{style.name}</h3>
                <p className="text-[10px] text-white/70 font-poppins uppercase tracking-widest mb-4">Trending {style.trend}</p>
                <button className="w-full py-3 border border-white/30 text-white font-poppins text-xs tracking-widest uppercase hover:bg-white hover:text-salon-black transition-colors rounded-none">
                  Compare
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Retake Button */}
      <div className="flex justify-center">
        <button
          onClick={onRetake}
          className="px-8 py-4 text-salon-gray text-xs tracking-[0.15em] uppercase hover:text-salon-black transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={14} />
          Upload New Photo
        </button>
      </div>

      <ComparisonModal
        isOpen={!!comparingStyle}
        onClose={() => setComparingStyle(null)}
        originalImage={originalImage}
        previewImage={comparingStyle?.image || ''}
        styleName={comparingStyle?.name || ''}
      />
    </div>
  );
}
