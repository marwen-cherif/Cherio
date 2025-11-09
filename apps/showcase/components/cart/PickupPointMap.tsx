'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PickupPoint } from '@shared/index';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
});

interface PickupPointMapProps {
  selectedPoint: PickupPoint | null;
  searchAddress?: string;
  searchCoordinates?: { lat: number; lng: number } | null;
  pickupPoints?: PickupPoint[];
}

// Component to handle map view updates
function MapViewUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

export default function PickupPointMap({
  selectedPoint,
  searchAddress,
  searchCoordinates,
  pickupPoints = [],
}: PickupPointMapProps) {
  // Default center (Paris)
  const defaultCenter: [number, number] = [48.8566, 2.3522];
  const defaultZoom = 13;

  // Determine center and zoom based on selection
  let center: [number, number] = defaultCenter;
  let zoom = defaultZoom;

  if (selectedPoint) {
    center = [selectedPoint.latitude, selectedPoint.longitude];
    zoom = 15;
  } else if (searchCoordinates) {
    center = [searchCoordinates.lat, searchCoordinates.lng];
    zoom = 14;
  }

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapViewUpdater center={center} zoom={zoom} />

        {/* Search location marker - Custom blue icon to differentiate from pickup points */}
        {searchCoordinates && !selectedPoint && (
          <Marker
            position={[searchCoordinates.lat, searchCoordinates.lng]}
            icon={L.divIcon({
              className: 'custom-search-marker',
              html: `
                <div style="
                  width: 32px;
                  height: 40px;
                  background-color: #3B82F6;
                  border: 2px solid white;
                  border-radius: 50% 50% 50% 0;
                  transform: rotate(-45deg);
                  position: relative;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                ">
                  <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                    width: 12px;
                    height: 12px;
                    background-color: white;
                    border-radius: 50%;
                  "></div>
                </div>
              `,
              iconSize: [32, 40],
              iconAnchor: [16, 40],
              popupAnchor: [0, -40],
            })}
          >
            <Popup>
              <div>
                <strong>📍 {searchAddress || 'Adresse recherchée'}</strong>
                {searchAddress && (
                  <p className="text-sm mt-1 text-gray-600">{searchAddress}</p>
                )}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Selected pickup point marker */}
        {selectedPoint && (
          <Marker position={[selectedPoint.latitude, selectedPoint.longitude]}>
            <Popup>
              <div>
                <strong>{selectedPoint.name}</strong>
                <p className="text-sm">{selectedPoint.address}</p>
                <p className="text-sm">
                  {selectedPoint.postalCode} {selectedPoint.city}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Other pickup points markers (lighter) */}
        {pickupPoints
          .filter((point) => !selectedPoint || point.id !== selectedPoint.id)
          .slice(0, 20) // Limit to 20 markers for performance
          .map((point) => (
            <Marker
              key={point.id}
              position={[point.latitude, point.longitude]}
              icon={L.icon({
                iconUrl: '/images/marker-icon.png',
                iconSize: [20, 30],
                iconAnchor: [10, 30],
                popupAnchor: [0, -30],
              })}
            >
              <Popup>
                <div>
                  <strong>{point.name}</strong>
                  <p className="text-sm">{point.address}</p>
                  {point.distance !== undefined && (
                    <p className="text-xs text-gray-500">{point.distance.toFixed(1)} km</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
