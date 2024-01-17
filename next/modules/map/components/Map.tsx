'use client';

import { Spinner } from 'flowbite-react';
import {
  useEffect,
  useState,
} from 'react';
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import Project from '@/common/types/project';
import MapProps from '@/modules/map/types/MapProps';

export default function Map({ apiPath, mapping }: MapProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [markers, setMarkers] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      const points: Project[] = await fetch(apiPath, {
        method: 'GET',
      }).then((res) => res.json());

      const markerComponents: React.ReactNode = points.map(mapping);
      setMarkers(markerComponents);
    };

    setLoading(true);
    fetchPoints();
  }, [apiPath]);

  useEffect(() => {
    if (markers) {
      setLoading(false);
    }
  }, [markers]);

  return (
    <div className="h-screen relative">
      <MapContainer
        zoom={2.25}
        bounds={[
          [61.3, -121.3],
          [-41.64008, 146.31592],
        ]}
        maxBounds={[
          [-90, 180],
          [90, -180],
        ]}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markers}
        </MarkerClusterGroup>
      </MapContainer>
      {loading && (
        <div className="absolute bg-gray-400 opacity-50 inset-0 flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      )}
    </div>
  );
}
