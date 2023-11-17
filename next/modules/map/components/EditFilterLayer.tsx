/* eslint-disable no-underscore-dangle */

'use client';

import { useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import getLatLngs from '@/modules/map/utils/getLatLngs';

export default function EditFilterLayer({ setFilter, layer, setLayer }) {
  const map = useMap();

  if (layer.current) {
    if (!map.hasLayer(layer.current)) {
      layer.current.addTo(map);
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
        if (layer.current) {
          map.removeLayer(layer.current);
        }
        setLayer(e.layer);
        setFilter(getLatLngs(e.layer._bounds));
      }}
      onEdited={() => {
        setFilter(getLatLngs(layer.current?._bounds));
      }}
      onDeleted={() => {
        setFilter(null);
        setLayer(null);
      }}
    />
  );
}
