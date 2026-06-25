import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Salon } from '../../services/salonService';
import { Star, MapPin, Sparkles, Heart } from 'lucide-react';
import SalonDetailsModal from './SalonDetailsModal';

interface Props {
  salons: Salon[];
  loading: boolean;
  onHoverChange: (id: string | null) => void;
  externalSelectedSalonId?: string | null;
}

export default function SalonList({ salons, loading, onHoverChange, externalSelectedSalonId }: Props) {
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (externalSelectedSalonId) {
      const salon = salons.find(s => s.id === externalSelectedSalonId);
      if (salon) {
        setSelectedSalon(salon);
        // Scroll the list to this card
        cardRefs.current[externalSelectedSalonId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [externalSelectedSalonId, salons]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/50 animate-pulse rounded-3xl h-64 w-full border border-salon-gray/10"></div>
        ))}
      </div>
    );
  }

  if (salons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-salon-gray font-light">No salons match your exact search criteria.</p>
        <p className="text-xs uppercase tracking-widest mt-2 text-salon-black">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full pb-12">
        {salons.map((salon, idx) => (
          <div key={salon.id} ref={el => { cardRefs.current[salon.id] = el; }}>
            <SalonCard 
              salon={salon} 
              index={idx}
              onMouseEnter={() => onHoverChange(salon.id)}
              onMouseLeave={() => onHoverChange(null)}
              onClick={() => setSelectedSalon(salon)}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedSalon && (
          <SalonDetailsModal 
            salon={selectedSalon} 
            onClose={() => setSelectedSalon(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface CardProps {
  salon: Salon;
  index: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function SalonCard({ salon, index, onMouseEnter, onMouseLeave, onClick }: CardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const PREMIUM_FALLBACKS = [
    "https://images.unsplash.com/photo-1600948836101-f9ff16e72922?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="bg-white rounded-3xl overflow-hidden border border-salon-gray/10 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0 bg-neutral-100 rounded-t-3xl">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse z-10"></div>
        )}
        <img 
          src={salon.imageUrl} 
          alt="" 
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PREMIUM_FALLBACKS[index % PREMIUM_FALLBACKS.length];
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Heart / Save Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10"
        >
          <Heart size={16} className={isSaved ? "fill-red-500 text-red-500" : "text-salon-black"} />
        </button>
        {/* Open Status Tag */}
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm z-10">
          <div className={`w-1.5 h-1.5 rounded-full ${salon.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-[9px] uppercase tracking-widest font-medium text-salon-black">
            {salon.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-playfair text-salon-black group-hover:text-gray-600 transition-colors leading-tight pr-4">{salon.name}</h3>
            <div className="flex items-center gap-1 bg-salon-light px-2 py-1 rounded-md flex-shrink-0">
              <Star size={12} className="fill-salon-black text-salon-black" />
              <span className="text-xs font-medium">{salon.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-salon-gray font-light mb-4 flex-wrap">
            <span className="flex items-center gap-1"><MapPin size={12} /> {salon.distanceKm} km</span>
            <span>•</span>
            <span className="font-medium text-salon-black">{salon.priceRange}</span>
            <span>•</span>
            <span>{salon.totalReviews} reviews</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {salon.services.slice(0, 4).map(srv => (
              <span key={srv} className="text-[9px] uppercase tracking-wider px-2 py-1 bg-salon-light text-salon-black rounded-md">
                {srv}
              </span>
            ))}
          </div>
        </div>

        {/* Beauty Match Highlight */}
        <div className="bg-gradient-to-r from-salon-black to-gray-800 p-3 rounded-xl flex items-center gap-3 text-white mt-auto">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
             <div className="absolute inset-0 bg-white/10" style={{ height: `${salon.matchScore}%`, bottom: 0, top: 'auto' }}></div>
             <span className="text-xs font-medium relative z-10">{salon.matchScore}%</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-1"><Sparkles size={10} /> Beauty Match</p>
            <p className="text-xs font-light line-clamp-1">{salon.matchReason}</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
