'use client';

import L from 'leaflet';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

import 'leaflet.markercluster/dist/leaflet.markercluster-src';

import Deployment from '@/common/types/deployment';

export default function MarkerCluster({
  markers,
  layer,
  setLayer,
}: {
  markers: Deployment[] | null,
  layer: any,
  setLayer: Function,
}) {
  const map = useMap();

  useEffect(() => {
    if (markers && markers.length > 0) {
      const markerGroup = L.markerClusterGroup();

      markers?.forEach((marker) => {
        const newMarker = L.marker(L.latLng(marker.latitude, marker.longitude), {
          icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
          }),
        });
        newMarker.addTo(markerGroup);
      });

      if (layer.current) {
        map.removeLayer(layer.current);
      }
      markerGroup.addTo(map);
      setLayer(markerGroup);
    }
  }, [markers]);

  return null;
}
