'use client';

import {
  FeatureGroup,
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

export default function GeoFilterMap() {
  return (
    <MapContainer center={[38.9533213, -77.0508073]} zoom={3} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup>
        <EditControl
          position="topleft"
          draw={{
            circle: false,
            polygon: false,
            polyline: false,
            marker: false,
            circlemarker: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
