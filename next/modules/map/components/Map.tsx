'use client';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';

export default function Map() {
  return (
    <MapContainer center={[38.9533213, -77.0508073]} zoom={3} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
