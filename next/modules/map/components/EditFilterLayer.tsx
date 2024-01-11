/* eslint-disable no-underscore-dangle */

'use client';

import L from 'leaflet';
import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import 'leaflet-easybutton/src/easy-button';

import getLatLngs from '@/modules/map/utils/getLatLngs';

export default function EditFilterLayer({
  setFilter,
  layer,
  setLayer,
  setDrawerOpen,
}) {
  const buttonAdded = useRef<boolean>(false);
  const map = useMap();

  if (layer.current) {
    if (!map.hasLayer(layer.current)) {
      layer.current.addTo(map);
    }
  }

  useEffect(() => {
    if (!buttonAdded.current) {
      L.easyButton({
        states: [
          {
            stateName: 'drawerOpen',
            // icon: `<a class="leaflet-control-deployment" href="#" title="Hide Deployment Info">
            //   <
            //   </a>`,
            icon: `
              <a class="leaflet-control-deployment" href="#" title="Hide Deployment Info">
                <div class="h-full grid place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </div>
              </a>`,
            onClick: (btn) => {
              setDrawerOpen(false);
              btn.state('drawerClosed');
            },
            title: 'Hide Deployment Info',
          },
          {
            stateName: 'drawerClosed',
            icon: `
              <a class="leaflet-control-deployment" href="#" title="Hide Deployment Info">
                <div class="h-full grid place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </a>`,
            onClick: (btn) => {
              setDrawerOpen(true);
              btn.state('drawerOpen');
            },
            title: 'Show Deployment Info',
          },
        ],
      }).addTo(map);
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
