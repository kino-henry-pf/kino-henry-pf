"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

interface BranchMapProps {
  latitude: number;
  longitude: number;
  branchName: string;
}

export default function BranchMap({
  latitude,
  longitude,
  branchName,
}: BranchMapProps) {
  // Clave API de Google Maps (debe estar en tu .env)
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Coordenadas del marcador
  const position = {
    lat: Number(latitude),
    lng: Number(longitude),
  };

  return (
    <APIProvider apiKey={googleMapsApiKey}>
      <div className="w-full h-48 rounded-lg overflow-hidden">
        <Map
          defaultCenter={position}
          defaultZoom={15}
          gestureHandling="cooperative"
          disableDefaultUI={false}
        >
          <Marker position={position} title={branchName} />
        </Map>
      </div>
    </APIProvider>
  );
}