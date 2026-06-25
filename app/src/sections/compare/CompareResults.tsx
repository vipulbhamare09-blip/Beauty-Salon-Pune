import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CompareMetrics } from '../../services/compareService';
import ImageSlider from './ImageSlider';
import AIOverlay from './AIOverlay';
import AIPanel from './AIPanel';
import { RefreshCcw, LayoutTemplate, SplitSquareHorizontal, Scan } from 'lucide-react';
import { usePDFExport } from '../../contexts/PDFExportContext';

interface Props {
  beforeImage: string;
  afterImage: string;
  metrics: CompareMetrics;
  onReset: () => void;
}

type ViewMode = 'slider' | 'side-by-side' | 'overlay';

export default function CompareResults({ beforeImage, afterImage, metrics, onReset }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('slider');
  const { exportReport } = usePDFExport();

  const handleDownload = async () => {
    await exportReport('compare');
  };

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* Top Header & Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-playfair text-salon-black">Your Transformation</h2>
          <p className="text-sm font-light text-salon-gray mt-1">AI-powered comparison and metrics.</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Mode Toggles (Desktop only, mobile defaults to slider) */}
          <div className="hidden md:flex items-center p-1 bg-white border border-salon-gray/10 rounded-full shadow-sm">
            <ModeBtn active={viewMode === 'slider'} onClick={() => setViewMode('slider')} icon={<SplitSquareHorizontal size={16}/>} label="Slider" />
            <ModeBtn active={viewMode === 'side-by-side'} onClick={() => setViewMode('side-by-side')} icon={<LayoutTemplate size={16}/>} label="Side by Side" />
            <ModeBtn active={viewMode === 'overlay'} onClick={() => setViewMode('overlay')} icon={<Scan size={16}/>} label="AI Overlay" />
          </div>
          
          <button onClick={onReset} className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-salon-gray hover:text-salon-black transition-colors">
            <RefreshCcw size={14} /> Start Over
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left: Visual Comparison */}
        <div className="w-full lg:w-3/5 xl:w-2/3">
          <AnimatePresence mode="wait">
            
            {viewMode === 'slider' && (
              <motion.div key="slider" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ImageSlider beforeImage={beforeImage} afterImage={afterImage} />
              </motion.div>
            )}

            {viewMode === 'side-by-side' && (
              <motion.div key="side" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 w-full">
                <div className="w-1/2 relative rounded-3xl overflow-hidden aspect-[3/4] shadow-sm">
                  <img src={beforeImage} className="w-full h-full object-cover" alt="Before" />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full"><span className="text-[10px] uppercase tracking-[3px] text-white">Before</span></div>
                </div>
                <div className="w-1/2 relative rounded-3xl overflow-hidden aspect-[3/4] shadow-sm">
                  <img src={afterImage} className="w-full h-full object-cover" alt="After" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full"><span className="text-[10px] uppercase tracking-[3px] text-salon-black">After</span></div>
                </div>
              </motion.div>
            )}

            {viewMode === 'overlay' && (
              <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AIOverlay image={afterImage} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right: AI Metrics Dashboard */}
        <div className="w-full lg:w-2/5 xl:w-1/3">
          <AIPanel metrics={metrics} onDownload={handleDownload} />
        </div>

      </div>

    </div>
  );
}

function ModeBtn({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-medium transition-all ${
        active ? 'bg-salon-black text-white shadow-md' : 'bg-transparent text-salon-gray hover:text-salon-black'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
