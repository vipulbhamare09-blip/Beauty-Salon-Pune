import type { Coordinates } from './locationService';

// Fallback Unsplash Real Interior Images
export const STOCK_IMAGES = [
  'https://images.unsplash.com/photo-1521590832167-7bfcfaa6362f?q=80&w=2070&auto=format&fit=crop', // Salon interior 1
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop', // Salon interior 2
  'https://images.unsplash.com/photo-1600948836101-f9ff16e72922?q=80&w=2070&auto=format&fit=crop', // Salon interior 3
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop', // Salon interior 4
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop', // Salon interior 5
  'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=1974&auto=format&fit=crop', // Salon interior 6
];

export interface GooglePlaceResult {
  place_id: string;
  name: string;
  vicinity: string; // address
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
  photos?: {
    photo_reference: string;
  }[];
  types: string[];
}

class GooglePlacesService {
  private readonly CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

  /**
   * Generates a precise cache key based on rounded coordinates.
   * Rounding to 2 decimal places creates a ~1km cache grid.
   */
  private getCacheKey(lat: number, lng: number): string {
    return `salons_${lat.toFixed(2)}_${lng.toFixed(2)}`;
  }

  /**
   * Fetches nearby salons using Google Places API TextSearch or NearbySearch.
   */
  public async fetchNearbySalons(coords: Coordinates): Promise<GooglePlaceResult[] | null> {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    
    // Check Cache
    const cacheKey = this.getCacheKey(coords.latitude, coords.longitude);
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (Date.now() - parsed.timestamp < this.CACHE_TTL_MS) {
          console.log("Returning cached Google Places data.");
          return parsed.results;
        }
      } catch (e) {
        console.warn("Invalid cache data, clearing.");
        localStorage.removeItem(cacheKey);
      }
    }

    if (!apiKey) {
      console.warn("No VITE_GOOGLE_PLACES_API_KEY found. Falling back to mock dataset.");
      return null;
    }

    try {
      // Note: In a real production app, this would be routed through a backend proxy to avoid CORS
      // and expose the secret. We use a proxy URL or direct fetch if CORS allows.
      // Since this is a pure frontend implementation requested to encapsulate the logic:
      
      const radius = 5000; // 5km
      const type = 'beauty_salon';
      // Use proxy or direct depending on setup. If direct from browser, Google Places NearbySearch often fails CORS.
      // We will simulate the exact structure and throw if it fails CORS, which gracefully falls back.
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=${radius}&type=${type}&key=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        const results = data.results as GooglePlaceResult[];
        
        // Cache the successful results
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now(),
          results
        }));

        return results;
      } else {
        console.warn("Google Places API error:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch from Google Places API:", error);
      return null;
    }
  }

  /**
   * Helper to construct a photo URL from a photo reference
   */
  public getPhotoUrl(photoReference: string, maxWidth = 800): string {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    if (!apiKey) return '';
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
  }

  /**
   * Get random authentic stock image
   */
  public getRandomStockImage(): string {
    return STOCK_IMAGES[Math.floor(Math.random() * STOCK_IMAGES.length)];
  }
}

export const googlePlacesService = new GooglePlacesService();
