/**
 * Geocoding utility using Nominatim (OpenStreetMap)
 * Free and no API key required
 */

export interface GeocodingResult {
  lat: number;
  lng: number;
  displayName: string;
}

/**
 * Geocode an address using Nominatim API
 * @param address - The address to geocode
 * @returns Promise with coordinates and display name
 */
export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  if (!address || !address.trim()) {
    return null;
  }

  try {
    // Use Nominatim API (OpenStreetMap) - free and no API key required
    const encodedAddress = encodeURIComponent(address.trim());
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Cherio-Showcase/1.0', // Required by Nominatim
      },
    });

    if (!response.ok) {
      console.error('Geocoding API error:', response.statusText);
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        displayName: result.display_name,
      };
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

/**
 * Reverse geocode coordinates to get an address
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns Promise with address string
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Cherio-Showcase/1.0',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.display_name || null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

