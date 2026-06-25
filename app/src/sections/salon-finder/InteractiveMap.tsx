import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Salon } from '../../services/salonService';
import type { UserLocation } from '../../services/locationService';
import { mapConfig } from '../../services/mapService';

interface Props {
  salons: Salon[];
  hoveredSalonId: string | null;
  userLocation: UserLocation;
  onMarkerClick: (id: string) => void;
}

// Map center synchronizer
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

export default function InteractiveMap({ salons, hoveredSalonId, userLocation, onMarkerClick }: Props) {
  
  // Custom User Marker (Glowing white dot)
  const userIcon = L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative w-6 h-6 flex items-center justify-center">
        <div class="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
        <div class="relative w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] border-2 border-salon-black"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  // Create markers for salons dynamically
  const createSalonIcon = (salon: Salon, isHovered: boolean) => {
    return L.divIcon({
      className: 'custom-leaflet-icon',
      html: `
        <div class="relative flex flex-col items-center group cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-110 z-50' : 'z-10'}">
          ${isHovered ? `
            <div class="absolute bottom-full mb-2 bg-white text-salon-black px-3 py-1.5 rounded-lg shadow-xl text-xs font-medium whitespace-nowrap pointer-events-none origin-bottom">
              ${salon.name}
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white"></div>
            </div>
            <div class="absolute inset-0 bg-white rounded-full blur-md opacity-50"></div>
          ` : ''}
          <div class="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 shadow-lg border-2 ${
            isHovered ? 'bg-white text-salon-black border-white' : 'bg-salon-black text-white border-white/20'
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16] // Center bottom
    });
  };

  // Determine map center. If a salon is hovered, fly to it. Otherwise stay on user.
  const hoveredSalon = salons.find(s => s.id === hoveredSalonId);
  const mapCenter: [number, number] = hoveredSalon 
    ? [hoveredSalon.latitude, hoveredSalon.longitude]
    : [userLocation.coordinates.latitude, userLocation.coordinates.longitude];

  return (
    <div className="relative w-full h-full bg-[#121212] group z-0">
      <MapContainer 
        center={[userLocation.coordinates.latitude, userLocation.coordinates.longitude]} 
        zoom={mapConfig.defaultZoom} 
        style={{ height: '100%', width: '100%', background: '#121212' }}
        zoomControl={false}
      >
        <MapUpdater center={mapCenter} zoom={hoveredSalon ? 15 : mapConfig.defaultZoom} />
        
        <TileLayer
          url={mapConfig.tileUrl}
          attribution={mapConfig.attribution}
        />

        {/* User Location Marker */}
        <Marker 
          position={[userLocation.coordinates.latitude, userLocation.coordinates.longitude]} 
          icon={userIcon} 
        />

        {/* Salon Markers */}
        {salons.map(salon => (
          <Marker 
            key={salon.id}
            position={[salon.latitude, salon.longitude]}
            icon={createSalonIcon(salon, hoveredSalonId === salon.id)}
            eventHandlers={{
              click: () => onMarkerClick(salon.id)
            }}
          />
        ))}

      </MapContainer>

      {/* Decorative Gradient Overlay (edges only so center remains clickable) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212] pointer-events-none opacity-20"></div>
    </div>
  );
}
