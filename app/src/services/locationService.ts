export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface UserLocation {
  coordinates: Coordinates;
  isFallback: boolean;
  cityOrArea?: string;
}

class LocationService {
  /**
   * Tries to get the user's current position using the browser's Geolocation API.
   */
  public async getCurrentLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }
    });
  }

  /**
   * Simulates geocoding for a given city/area input.
   * If "Pune" or similar is entered, returns a central coordinate in Pune.
   */
  public async getFallbackLocation(_input: string): Promise<Coordinates> {
    // In a real application, you would call Google Geocoding API or Mapbox Geocoding API here.
    // For this mock, we will return a central coordinate for Pune if any input is provided.
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          latitude: 18.5204, // Central Pune
          longitude: 73.8567
        });
      }, 800);
    });
  }

  /**
   * Uses the Haversine formula to calculate the distance between two coordinates in kilometers.
   */
  public calculateDistanceKm(coord1: Coordinates, coord2: Coordinates): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    
    const R = 6371; // Earth radius in kilometers
    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);
    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
  }
}

export const locationService = new LocationService();
