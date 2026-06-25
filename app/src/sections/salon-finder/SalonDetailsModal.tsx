import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Salon } from '../../services/salonService';
import { X, MapPin, Star, Clock, CheckCircle2, MessageSquareHeart, Calendar, Phone, Globe } from 'lucide-react';
import { useNavigate } from 'react-router';
import BookingModal from './BookingModal';

interface Props {
  salon: Salon;
  onClose: () => void;
}

export default function SalonDetailsModal({ salon, onClose }: Props) {
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [validatedImages, setValidatedImages] = useState<string[]>([]);
  const [imagesValidating, setImagesValidating] = useState(true);

  // Lock body scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Async Image Preload Validation Pipeline
  useEffect(() => {
    let isMounted = true;

    const PREMIUM_FALLBACKS = [
      "https://images.unsplash.com/photo-1600948836101-f9ff16e72922?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop"
    ];
    
    async function validateImage(url: string): Promise<boolean> {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    }

    async function normalizeGallery() {
      setImagesValidating(true);
      
      const rawImages = [salon.imageUrl, ...(salon.galleryImages || [])];
      const validStrings = rawImages.filter(url => typeof url === 'string' && url.trim().length > 0 && (url.startsWith('http') || url.startsWith('/')));
      const uniqueStrings = [...new Set(validStrings)];

      // Validate concurrently
      const validationResults = await Promise.all(
        uniqueStrings.map(async (url) => {
          const isValid = await validateImage(url);
          return { url, isValid };
        })
      );

      let finalImages = validationResults.filter(res => res.isValid).map(res => res.url);

      // Force Minimum 4 Valid Images (1 hero + 3 gallery)
      if (finalImages.length < 4) {
        const needed = 4 - finalImages.length;
        const availableFallbacks = PREMIUM_FALLBACKS.filter(url => !finalImages.includes(url));
        finalImages = [...finalImages, ...availableFallbacks.slice(0, needed)];
      }

      // Max 7 images (1 hero + 6 gallery)
      finalImages = finalImages.slice(0, 7);

      if (isMounted) {
        setValidatedImages(finalImages);
        setImagesValidating(false);
      }
    }

    normalizeGallery();

    return () => { isMounted = false; };
  }, [salon]);

  // Data is now guaranteed by the strict validation layer in salonService.ts

  // Safely grab data
  const name = salon.name ?? "Luxury Salon";
  const address = salon.address ?? "Location unavailable";
  const rating = salon.rating ?? "N/A";
  const reviews = salon.totalReviews ?? "0";
  const hours = salon.hours ?? "Hours unavailable";
  const phone = salon.phone ?? "Contact unavailable";
  const website = salon.website ?? null;
  const services = salon.services ?? [];
  const specialists = salon.specialists ?? [];
  const priceRange = salon.priceRange ?? "$$";
  // Price Range Interceptor
  let displayPrice = salon.priceRange ?? "$$";
  if (name.toLowerCase().includes("juice salon kothrud")) {
    displayPrice = "₹999 - ₹2,999";
  }

  // Dynamic font sizing for long price ranges
  const priceFontSize = displayPrice.length > 5 ? "text-[26px] sm:text-[32px]" : "text-[48px]";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-salon-black/60 backdrop-blur-sm"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-[1100px] bg-[#F8F7F5] rounded-[28px] md:rounded-[36px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] overflow-y-auto max-h-[90vh] custom-scrollbar"
        >
          {/* Header Section */}
          <div className="relative w-full h-[280px] md:h-[340px] lg:h-[420px] bg-neutral-100 overflow-hidden shrink-0 rounded-t-[28px] md:rounded-t-[36px]">
            {imagesValidating || !heroImageLoaded ? (
              <div className="absolute inset-0 bg-neutral-200 animate-pulse z-10"></div>
            ) : null}
            {!imagesValidating && validatedImages.length > 0 && (
              <img 
                src={validatedImages[0]} 
                alt=""
                onLoad={() => setHeroImageLoaded(true)}
                className="w-full h-full object-cover object-center"
              />
            )}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-salon-black hover:scale-105 transition-all z-20"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="p-6 sm:p-10 grid lg:grid-cols-[1.7fr_0.9fr] gap-10 items-start">
            
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-playfair text-salon-black mb-4 break-words leading-tight">{name}</h2>
                <div className="flex flex-col gap-3 text-sm text-salon-gray font-light">
                  <span className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 flex-shrink-0" /> <span className="break-words">{address}</span></span>
                  <span className="flex items-center gap-2"><Star size={16} className="fill-yellow-500 text-yellow-500 flex-shrink-0"/> <span className="font-medium text-salon-black">{rating}</span> ({reviews} reviews)</span>
                  <span className="flex items-center gap-2"><Clock size={16} className="flex-shrink-0" /> {hours}</span>
                  <span className="flex items-center gap-2"><Phone size={16} className="flex-shrink-0" /> {phone}</span>
                  {website && (
                     <span className="flex items-center gap-2">
                       <Globe size={16} className="flex-shrink-0" /> 
                       <a href={website} target="_blank" rel="noreferrer" className="underline hover:text-salon-black break-all">{website}</a>
                     </span>
                  )}
                </div>
              </div>

              {services.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-[3px] text-salon-gray mb-4 font-medium">Available Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {services.map(s => (
                      <span key={s} className="px-4 py-2 bg-white border border-salon-gray/10 text-salon-black text-xs font-medium rounded-full shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {specialists.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-[3px] text-salon-gray mb-4 font-medium">Specializations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {specialists.map(s => (
                      <div key={s} className="flex items-center gap-3 text-sm text-salon-black"><CheckCircle2 size={16} className="text-salon-gray flex-shrink-0"/> <span className="break-words">{s}</span></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 self-start">
              <div className="rounded-[28px] bg-white border border-black/5 shadow-sm px-8 py-7 flex flex-col items-center justify-center gap-3">
                <p className="text-[13px] tracking-[0.22em] uppercase text-black/55 font-medium text-center">Price Range</p>
                <p className={`font-sans ${priceFontSize} leading-none font-light tracking-tight text-salon-black text-center break-words`}>{displayPrice}</p>
              </div>

              <div className="bg-white p-6 rounded-[28px] shadow-sm border border-salon-gray/5 flex flex-col gap-4">
                <button 
                  onClick={() => setShowBooking(true)}
                  className="w-full bg-salon-black text-white py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:-translate-y-1 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Calendar size={16} /> Book Appointment
                </button>

                <button 
                  onClick={() => navigate('/beauty-concierge')}
                  className="w-full bg-[#F8F7F5] border border-salon-gray/10 text-salon-black py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:-translate-y-1 hover:shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <MessageSquareHeart size={16} className="text-salon-gray group-hover:text-salon-black transition-colors" />
                  Ask Concierge
                </button>
              </div>
            </div>

          </div>

          {/* Gallery Section */}
          <div className="p-6 sm:p-10 pt-0">
            <h4 className="text-[10px] uppercase tracking-[3px] text-salon-gray mb-6 font-medium">Gallery</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {imagesValidating ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="relative w-full aspect-[4/3] rounded-3xl bg-neutral-200 animate-pulse"></div>
                ))
              ) : (
                validatedImages.slice(1).map((img, i) => (
                  <GalleryImage key={i} src={img} />
                ))
              )}
            </div>
          </div>

        </motion.div>
      </div>

      <AnimatePresence>
        {showBooking && <BookingModal salon={salon} onClose={() => setShowBooking(false)} />}
      </AnimatePresence>
    </>
  );
}

function GalleryImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null; // Failsafe to never show broken icon

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100 shrink-0">
      {!loaded && <div className="absolute inset-0 bg-neutral-200 animate-pulse z-10"></div>}
      <img 
        src={src} 
        alt="" 
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}
