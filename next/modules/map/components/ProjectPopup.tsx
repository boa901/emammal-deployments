'use client';

import L from 'leaflet';
import {
  Marker,
  Popup,
} from 'react-leaflet';

import Project from '@/common/types/project';

export default function ProjectPopup({ marker }: { marker: Project }) {
  return (
    <Marker
      key={marker.nid.toString()}
      position={[marker.latitude, marker.longitude]}
      icon={L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41],
      })}
    >
      <Popup>
        {marker.name}
      </Popup>
    </Marker>
  );
}
