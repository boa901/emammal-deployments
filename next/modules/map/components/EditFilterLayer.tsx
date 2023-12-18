/* eslint-disable no-underscore-dangle */

'use client';

import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import 'leaflet-easybutton/src/easy-button';

import getLatLngs from '@/modules/map/utils/getLatLngs';

export default function EditFilterLayer({ setFilter, layer, setLayer }) {
  const buttonAdded = useRef<boolean>(false);
  const map = useMap();

  if (layer.current) {
    if (!map.hasLayer(layer.current)) {
      layer.current.addTo(map);
    }
  }

  useEffect(() => {
    if (!buttonAdded.current) {
      L.easyButton(
        `<a class="leaflet-control-deployment" href="#" title="Show Deployment Info">
          <span aria-hidden="true"><</span>
        </a>`,
        () => console.log('button clicked'),
      ).addTo(map);
      buttonAdded.current = true;
    }
  }, []);

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
