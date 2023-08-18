/* eslint-disable no-underscore-dangle */
import RectBounds from '@/modules/map/types/RectBounds';

interface Bounds {
  _southWest: {
    lat: number,
    lng: number,
  },
  _northEast: {
    lat: number,
    lng: number,
  },
}

export default function getLatLngs(bounds: Bounds): RectBounds {
  return {
    maxLat: bounds._northEast.lat.toString(),
    minLat: bounds._southWest.lat.toString(),
    maxLng: bounds._northEast.lng.toString(),
    minLng: bounds._southWest.lng.toString(),
  };
}
