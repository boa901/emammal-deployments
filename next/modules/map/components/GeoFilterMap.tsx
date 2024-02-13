'use client';

import { Spinner } from 'flowbite-react';
import { useRef } from 'react';
import L from 'leaflet';
import {
  FeatureGroup,
  MapContainer,
  TileLayer,
} from 'react-leaflet';

import MarkerCluster from '@/modules/map/components/MarkerCluster';
import EditFilterLayer from '@/modules/map/components/EditFilterLayer';

import GeoFilterMapProps from '@/modules/map/types/GeoFilterMapProps';

export default function GeoFilterMap({
  markers,
  loading,
  setFilter,
  initialBounds,
  onReady,
  drawerOpen,
  setDrawerOpen,
  setSelectedDeployment,
}: GeoFilterMapProps) {
  const markersLayer = useRef<any>(null);
  const rectLayer = useRef<any>(null);

  const handleMapReady = () => {
    if (initialBounds && Object.keys(initialBounds).length > 0) {
      const {
        maxLat,
        minLat,
        maxLng,
        minLng,
      } = initialBounds;
      rectLayer.current = L.rectangle(L.latLngBounds([
        parseFloat(minLat), parseFloat(minLng),
      ], [
        parseFloat(maxLat), parseFloat(maxLng),
      ]), {
        color: '#3388ff',
        opacity: 0.5,
        fillColor: '#3388ff',
        fillOpacity: 0.2,
      });
    }
    onReady();
  };

  return (
    <div className="h-full relative">
      <MapContainer
        center={[0, 0]}
        zoom={2.25}
        maxBounds={[
          [-90, 180],
          [90, -180],
        ]}
        scrollWheelZoom
        whenReady={handleMapReady}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerCluster
          markers={markers}
          layer={markersLayer}
          drawerOpen={drawerOpen}
          setLayer={(layer) => { markersLayer.current = layer; }}
          setSelectedDeployment={setSelectedDeployment}
        />
        <FeatureGroup>
          <EditFilterLayer
            setFilter={setFilter}
            layer={rectLayer}
            setLayer={(layer) => {
              rectLayer.current = layer;
            }}
            setDrawerOpen={setDrawerOpen}
          />
        </FeatureGroup>
      </MapContainer>
      {loading && (
        <div className="absolute bg-gray-400 opacity-50 inset-0 flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      )}
    </div>
  );
}
