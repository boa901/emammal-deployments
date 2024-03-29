'use client';

import L, { LatLngBoundsExpression } from 'leaflet';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

import 'leaflet.markercluster/dist/leaflet.markercluster-src';

import Deployment from '@/common/types/deployment';

export default function MarkerCluster({
  markers,
  layer,
  drawerOpen,
  setLayer,
  setSelectedDeployment,
}: {
  markers: Deployment[] | null,
  layer: any,
  drawerOpen: boolean,
  setLayer: Function,
  setSelectedDeployment: Function,
}) {
  const map = useMap();

  useEffect(() => {
    if (markers) {
      const markerGroup = L.markerClusterGroup();
      const markerLatLngs: LatLngBoundsExpression = [];

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
        const newPopup = L.popup();
        newPopup.setContent(marker.label);
        newPopup.on('remove', () => {
          setSelectedDeployment(null);
        });
        newMarker.bindPopup(newPopup);
        newMarker.addTo(markerGroup).on('click', () => setSelectedDeployment({
          nid: marker.nid,
          label: marker.label,
        }));
        markerLatLngs.push([marker.latitude, marker.longitude]);
      });

      if (layer.current) {
        map.removeLayer(layer.current);
      }
      markerGroup.addTo(map);
      setLayer(markerGroup);
      if (markerLatLngs.length > 0) {
        const bounds = new L.LatLngBounds(markerLatLngs);
        if (drawerOpen) {
          const boundWidth = bounds.getEast() - bounds.getWest();
          bounds.extend([bounds.getNorth(), bounds.getEast() + boundWidth]);
          bounds.extend([bounds.getSouth(), bounds.getWest() - boundWidth * 0.25]);
        }
        map.fitBounds(bounds);
      }
    }
  }, [markers]);

  return null;
}
