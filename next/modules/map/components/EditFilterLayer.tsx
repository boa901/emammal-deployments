/* eslint-disable no-underscore-dangle */

'use client';

import { useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import getLatLngs from '@/modules/map/utils/getLatLngs';

export default function EditFilterLayer({ setFilter, layer, setLayer }) {
  const map = useMap();

  if (layer) {
    if (!map.hasLayer(layer)) {
      layer.addTo(map);
    }
  }

  return (
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
        if (layer) {
          map.removeLayer(layer);
        }
        setLayer(e.layer);
        setFilter(getLatLngs(e.layer._bounds));
      }}
      onEdited={() => {
        setFilter(getLatLngs(layer?._bounds));
      }}
      onDeleted={() => {
        setFilter(null);
      }}
    />
  );
}
