import { useState, useEffect } from 'react';
import Footer from '../sections/Footer';
import SalonFinderHero from '../sections/salon-finder/SalonFinderHero';
import SalonSearchAndFilters from '../sections/salon-finder/SalonSearchAndFilters';
import SalonList from '../sections/salon-finder/SalonList';
import InteractiveMap from '../sections/salon-finder/InteractiveMap';
import SEO from '../components/system/SEO';
import { salonService } from '../services/salonService';
import { locationService } from '../services/locationService';
import type { Coordinates, UserLocation } from '../services/locationService';
import type { Salon } from '../services/salonService';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';

export default function SalonFinderPage() {
  const [appState, setAppState] = useState<'permission' | 'loading' | 'results'>('permission');
  const [salons, setSalons] = useState<Salon[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [fallbackInput, setFallbackInput] = useState('');
  
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSpecialty, setActiveSpecialty] = useState<string | null>(null);
  
  // Interaction State
  const [hoveredSalonId, setHoveredSalonId] = useState<string | null>(null);
  const [selectedSalonId, setSelectedSalonId] = useState<string | null>(null); // from map click to list sync

  // Request location immediately upon entering the page (or mounting component)
  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    setAppState('loading');
    try {
      const coords = await locationService.getCurrentLocation();
      setUserLocation({ coordinates: coords, isFallback: false });
      fetchSalons(coords);
    } catch (error) {
      console.warn("Geolocation failed or denied. Automatically falling back to Pune, Maharashtra, India.");
      const fallbackCoords = await locationService.getFallbackLocation('Pune');
      setUserLocation({ coordinates: fallbackCoords, isFallback: true, cityOrArea: 'Pune, Maharashtra, India' });
      fetchSalons(fallbackCoords);
    }
  };

  const handleFallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fallbackInput.trim()) return;
    setAppState('loading');
    const coords = await locationService.getFallbackLocation(fallbackInput);
    setUserLocation({ coordinates: coords, isFallback: true, cityOrArea: fallbackInput });
    fetchSalons(coords);
  };

  const fetchSalons = async (coords: Coordinates) => {
    const data = await salonService.getSalonsNearby(coords);
    setSalons(data);
    setAppState('results');
  };

  const filteredSalons = salons.filter(salon => {
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      if (!salon.name.toLowerCase().includes(lowerQuery) && !salon.address.toLowerCase().includes(lowerQuery)) return false;
    }
    if (activeCategory && !salon.services.includes(activeCategory)) return false;
    if (activeSpecialty && !salon.specialists.includes(activeSpecialty)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col font-poppins selection:bg-salon-black selection:text-salon-white">
      <SEO title="Find a Salon" description="Discover premium beauty salons near you." />
      
      <main className="flex-grow pt-24 pb-0 flex flex-col relative">
        <SalonFinderHero />
        
        <AnimatePresence mode="wait">
          {appState === 'permission' && (
            <motion.div 
              key="permission" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="max-w-xl mx-auto w-full px-4 mt-12 mb-32"
            >
              <div className="bg-white rounded-3xl p-8 border border-salon-gray/10 shadow-xl text-center">
                <div className="w-16 h-16 bg-salon-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin size={24} className="text-salon-black" />
                </div>
                <h2 className="text-2xl font-playfair text-salon-black mb-2">Location Required</h2>
                <p className="text-salon-gray font-light text-sm mb-8">Please allow location access to discover premium salons near you, or enter your area below.</p>
                
                <button onClick={requestLocation} className="w-full bg-salon-black text-white py-4 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-gray-800 transition-colors mb-4">
                  Allow Location Access
                </button>

                <div className="flex items-center gap-4 my-6 opacity-50">
                  <div className="h-px bg-salon-gray flex-grow"></div>
                  <span className="text-xs uppercase tracking-widest">OR</span>
                  <div className="h-px bg-salon-gray flex-grow"></div>
                </div>

                <form onSubmit={handleFallbackSubmit} className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter City, Area, or Pincode (e.g., Pune)" 
                    value={fallbackInput}
                    onChange={e => setFallbackInput(e.target.value)}
                    className="w-full pl-4 pr-12 py-4 bg-salon-light border border-salon-gray/20 rounded-full text-sm outline-none focus:border-salon-black"
                    required
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-salon-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <Search size={16} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {appState === 'loading' && (
            <motion.div 
              key="loading" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-2 border-salon-gray/20 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-salon-black rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h2 className="text-2xl font-playfair text-salon-black mb-2">Finding premium salons near you...</h2>
              <div className="h-6 overflow-hidden">
                <motion.p 
                  animate={{ y: [0, -24, -24, -48] }} 
                  transition={{ duration: 2, times: [0, 0.4, 0.6, 1], repeat: Infinity }} 
                  className="text-salon-gray font-light flex flex-col items-center"
                >
                  <span>Locating nearby premium salons...</span>
                  <span>Fetching authentic real-world photos...</span>
                  <span>Preparing your personalized list...</span>
                  <span>Locating nearby premium salons...</span>
                </motion.p>
              </div>
            </motion.div>
          )}

          {appState === 'results' && userLocation && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col flex-grow w-full"
            >
              <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 mt-4 mb-8 flex-shrink-0">
                <SalonSearchAndFilters 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  activeSpecialty={activeSpecialty}
                  setActiveSpecialty={setActiveSpecialty}
                />
              </div>

              {/* 2-Column Map & List Layout */}
              <div className="flex-grow w-full max-w-[1600px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-6 mb-12">
                
                {/* Left: Scrollable List */}
                <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col gap-6 order-2 lg:order-1 h-[600px] lg:h-[calc(100vh-22rem)] overflow-y-auto custom-scrollbar pr-2">
                  <SalonList 
                    salons={filteredSalons} 
                    loading={false}
                    onHoverChange={setHoveredSalonId}
                    externalSelectedSalonId={selectedSalonId}
                  />
                </div>

                {/* Right: Sticky Map Placeholder */}
                <div className="w-full lg:w-1/2 xl:w-3/5 order-1 lg:order-2 h-[400px] lg:h-[calc(100vh-22rem)] lg:sticky lg:top-32 rounded-3xl overflow-hidden shadow-md z-0">
                  <InteractiveMap 
                    salons={filteredSalons} 
                    hoveredSalonId={hoveredSalonId}
                    userLocation={userLocation}
                    onMarkerClick={(id) => setSelectedSalonId(id)}
                  />
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </div>
  );
}
