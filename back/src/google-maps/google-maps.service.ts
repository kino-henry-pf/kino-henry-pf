import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, PlaceInputType } from '@googlemaps/google-maps-services-js';

export interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  formattedAddress: string;
  phoneNumber?: string;
  website?: string;
  rating?: number;
  openingHours?: string[];
}

@Injectable()
export class GoogleMapsService {
  private readonly logger = new Logger(GoogleMapsService.name);
  private client: Client;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    this.client = new Client({});
  }

  /**
   * Busca lugares por texto (ej: "Cine Hoyts Buenos Aires")
   */
  async searchPlaces(query: string, location?: { lat: number; lng: number }) {
    try {
      const response = await this.client.findPlaceFromText({
        params: {
          input: query,
          inputtype: PlaceInputType.textQuery,
          fields: [
            'place_id',
            'name',
            'formatted_address',
            'geometry',
            'rating',
            'opening_hours',
          ],
          key: this.apiKey,
          ...(location && { locationbias: `point:${location.lat},${location.lng}` }),
        },
      });

      if (response.data.status !== 'OK') {
        this.logger.warn(`Search failed: ${response.data.status}`);
        return [];
      }

      return response.data.candidates.map((place) => ({
        placeId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        latitude: place.geometry?.location.lat,
        longitude: place.geometry?.location.lng,
        rating: place.rating,
      }));
    } catch (error) {
      this.logger.error('Error searching places:', error);
      throw new Error('Failed to search places on Google Maps');
    }
  }

  /**
   * Obtiene detalles completos de un lugar por su Place ID
   */
  async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    try {
      const response = await this.client.placeDetails({
        params: {
          place_id: placeId,
          fields: [
            'place_id',
            'name',
            'formatted_address',
            'geometry',
            'formatted_phone_number',
            'website',
            'rating',
            'opening_hours',
          ],
          key: this.apiKey,
        },
      });

      if (response.data.status !== 'OK') {
        throw new Error(`Place not found: ${response.data.status}`);
      }

      const place = response.data.result;

      return {
        placeId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        latitude: place.geometry?.location.lat,
        longitude: place.geometry?.location.lng,
        formattedAddress: place.formatted_address,
        phoneNumber: place.formatted_phone_number,
        website: place.website,
        rating: place.rating,
        openingHours: place.opening_hours?.weekday_text,
      };
    } catch (error) {
      this.logger.error(`Error getting place details for ${placeId}:`, error);
      throw new Error('Failed to get place details from Google Maps');
    }
  }

  /**
   * Geocodifica una dirección a coordenadas
   */
  async geocodeAddress(address: string) {
    try {
      const response = await this.client.geocode({
        params: {
          address,
          key: this.apiKey,
        },
      });

      if (response.data.status !== 'OK' || response.data.results.length === 0) {
        throw new Error('Address not found');
      }

      const result = response.data.results[0];

      return {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        formattedAddress: result.formatted_address,
        placeId: result.place_id,
      };
    } catch (error) {
      this.logger.error('Error geocoding address:', error);
      throw new Error('Failed to geocode address');
    }
  }

  /**
   * Geocodifica coordenadas a dirección (reverse geocoding)
   */
  async reverseGeocode(latitude: number, longitude: number) {
    try {
      const response = await this.client.reverseGeocode({
        params: {
          latlng: { lat: latitude, lng: longitude },
          key: this.apiKey,
        },
      });

      if (response.data.status !== 'OK' || response.data.results.length === 0) {
        throw new Error('Location not found');
      }

      const result = response.data.results[0];

      return {
        address: result.formatted_address,
        placeId: result.place_id,
      };
    } catch (error) {
      this.logger.error('Error reverse geocoding:', error);
      throw new Error('Failed to reverse geocode coordinates');
    }
  }

  /**
   * Calcula la distancia entre dos puntos (en km)
   */
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}