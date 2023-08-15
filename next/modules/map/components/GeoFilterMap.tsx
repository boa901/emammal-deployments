/* eslint-disable no-underscore-dangle */

'use client';

import {
  FeatureGroup,
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import RectBounds from '@/modules/map/types/RectBounds';
import getLatLngs from '@/modules/map/utils/getLatLngs';

export default function GeoFilterMap(
  { setFilter }: { setFilter: React.Dispatch<React.SetStateAction<RectBounds>> },
) {
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
          onCreated={(e) => {
            setFilter(getLatLngs(e.layer._bounds));
          }}
          onDeleted={() => {
            setFilter(null);
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
