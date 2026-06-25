import { motion } from 'framer-motion';

interface Props {
  image: string;
}

export default function AIOverlay({ image }: Props) {
  return (
    <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[4/3] bg-salon-black rounded-3xl overflow-hidden select-none">
      
      {/* Base Image with slight desaturation */}
      <img 
        src={image} 
        alt="AI Overlay Base" 
        className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale-[20%]"
      />

      {/* Mock AI Overlays - Silver Monochrome Glows */}
      
      {/* Facial Zone Scan */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-48 h-48 border-[0.5px] border-white/50 rounded-full blur-[2px] shadow-[0_0_30px_rgba(255,255,255,0.3)] pointer-events-none"
      >
        <div className="absolute inset-0 border-[0.5px] border-dashed border-white/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
      </motion.div>

      {/* Skin Texture Highlights */}
      <motion.div
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute top-[40%] left-[30%] w-16 h-16 bg-white/10 blur-xl rounded-full pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        className="absolute top-[35%] right-[30%] w-20 h-20 bg-white/10 blur-xl rounded-full pointer-events-none"
      ></motion.div>

      {/* Scanline Sweep */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-white/30 blur-[1px] pointer-events-none"
        style={{ boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
      ></motion.div>

      {/* Grid Pattern overlay for tech feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMjAgMEwwIDBMMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')] pointer-events-none"></div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]"></div>
          <span className="text-[9px] uppercase tracking-widest text-white/80">Skin Enhancement Zones</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white/40 rounded-full border border-white/60"></div>
          <span className="text-[9px] uppercase tracking-widest text-white/80">Texture Refinement</span>
        </div>
      </div>
    </div>
  );
}
