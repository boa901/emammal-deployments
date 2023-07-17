'use client';

import {
  useEffect,
  useState,
} from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';

import Project from '@/common/types/project';

export default function Map() {
  const [markers, setMarkers] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      const points: Project[] = await fetch('/api/projects', {
        method: 'GET',
      }).then((res) => res.json());

      const markerComponents: React.ReactNode = points.map((mkr: Project) => (
        <Marker key={mkr.id.toString()} position={[mkr.latitude, mkr.longitude]}>
          <Popup>
            {mkr.project_name}
          </Popup>
        </Marker>
      ));
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
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup.
          {' '}
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
