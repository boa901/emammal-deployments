/* eslint-disable no-underscore-dangle */
import { LatLng } from 'leaflet';

import RectBounds from '@/modules/map/types/RectBounds';

export default function getBounds(bounds: LatLng[]): RectBounds {
  const lats = bounds.map((latlng) => latlng.lat);
  const lngs = bounds.map((latlng) => latlng.lng);

  return {
    maxLat: Math.max(...lats).toString(),
    minLat: Math.min(...lats).toString(),
    maxLng: Math.max(...lngs).toString(),
    minLng: Math.min(...lngs).toString(),
  };
}
