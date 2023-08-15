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
      setLoading(false);
    };

    setLoading(true);
    fetchPoints();
  }, [apiPath]);

  return (
    <div className="container mx-auto my-2 relative">
      <MapContainer center={[38.9533213, -77.0508073]} zoom={3} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
      {loading && (
        <div className="absolute bg-gray-400 opacity-50 inset-0 flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      )}
    </div>
  );
}
