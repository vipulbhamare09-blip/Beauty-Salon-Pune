import { useState, useRef, useEffect, useCallback } from 'react';

import { ChevronsLeftRight } from 'lucide-react';

interface Props {
  beforeImage: string;
  afterImage: string;
}

export default function ImageSlider({ beforeImage, afterImage }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);

  // Handle Dragging
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let newPosition = (x / rect.width) * 100;
    
    // Bounds checking
    if (newPosition < 0) newPosition = 0;
    if (newPosition > 100) newPosition = 100;
    
    setSliderPosition(newPosition);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  // Handle Keyboard & Double Click
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition(prev => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(prev => Math.min(100, prev + 5));
    }
  };

  const handleDoubleClick = () => {
    setSliderPosition(50);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/3] bg-salon-light rounded-3xl overflow-hidden select-none outline-none group cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After Transformation" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
        draggable={false}
      />
      
      {/* Before Image (Foreground, Clipped) */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before Transformation" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          style={{ width: '100%', maxWidth: 'none' }} // Ensure inner image doesn't squish
          draggable={false}
        />
      </div>

      {/* Interactive Divider */}
      <div 
        className="absolute top-0 bottom-0 pointer-events-none transition-transform duration-75"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Glowing Line */}
        <div className="absolute top-0 bottom-0 -ml-[1px] w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
        
        {/* Draggable Handle */}
        <div className={`absolute top-1/2 -translate-y-1/2 -ml-6 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-90' : 'scale-100 group-hover:scale-110'}`}>
          <ChevronsLeftRight size={20} className="text-salon-black" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[3px] font-medium text-white shadow-sm">Before</span>
      </div>
      <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-black/10 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[3px] font-medium text-salon-black shadow-sm">After</span>
      </div>

      {/* Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <span className="text-[9px] uppercase tracking-widest text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
          Drag • Arrow Keys • Double Click to Reset
        </span>
      </div>
    </div>
  );
}
