'use client';

import {
  useEffect,
  useState,
} from 'react';
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';

import Project from '@/common/types/project';
import MapProps from '@/modules/map/types/MapProps';

export default function Map({ apiPath, mapping }: MapProps) {
  const [markers, setMarkers] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      const points: Project[] = await fetch(apiPath, {
        method: 'GET',
      }).then((res) => res.json());

      const markerComponents: React.ReactNode = points.map(mapping);
      setMarkers(markerComponents);
    };

    fetchPoints();
  }, []);

  return (
    <MapContainer center={[38.9533213, -77.0508073]} zoom={3} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
}
