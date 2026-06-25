import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  activeCategory: string | null;
  setActiveCategory: (s: string | null) => void;
  activeSpecialty: string | null;
  setActiveSpecialty: (s: string | null) => void;
}

const CATEGORIES = ['Hair', 'Skin', 'Makeup', 'Spa', 'Nails'];
const SPECIALTIES = ['Bridal Makeup', 'Hair Color Expert', 'Luxury Spa', 'Curly Hair', 'Wedding Specialist'];

export default function SalonSearchAndFilters({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  activeSpecialty,
  setActiveSpecialty
}: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full flex flex-col gap-4"
    >
      
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={18} className="text-salon-gray" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by salon name or location..."
          className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md border border-salon-gray/20 rounded-full text-salon-black text-sm shadow-sm focus:outline-none focus:border-salon-black transition-colors placeholder:text-salon-gray/50"
        />
        <button className="absolute inset-y-2 right-2 px-4 bg-salon-black text-white text-[10px] uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors">
          Search
        </button>
      </div>

      {/* Filters Strip */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 mt-2">
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0 w-full md:w-auto">
          <span className="text-[10px] uppercase tracking-widest text-salon-gray flex items-center gap-1.5 mr-2">
            <SlidersHorizontal size={12} /> Filters
          </span>
          
          <div className="h-4 w-px bg-salon-gray/20 mx-1 hidden md:block"></div>

          {/* Service Categories */}
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-colors border ${
                activeCategory === cat 
                  ? 'bg-salon-black text-white border-salon-black' 
                  : 'bg-white text-salon-black border-salon-gray/20 hover:border-salon-black/50'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="h-4 w-px bg-salon-gray/20 mx-1 hidden md:block"></div>

          {/* Specialties */}
          {SPECIALTIES.map(spec => (
            <button
              key={spec}
              onClick={() => setActiveSpecialty(activeSpecialty === spec ? null : spec)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition-colors border ${
                activeSpecialty === spec 
                  ? 'bg-salon-black text-white border-salon-black' 
                  : 'bg-salon-light text-salon-gray border-salon-gray/10 hover:border-salon-gray/30'
              }`}
            >
              {spec}
            </button>
          ))}

        </div>
      </div>

    </motion.div>
  );
}
