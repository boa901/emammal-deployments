import RectBounds from '@/modules/map/types/RectBounds';

export default interface GeoFilterMapProps {
  filterBounds: RectBounds,
  setFilter: React.Dispatch<React.SetStateAction<RectBounds>>,
  apiPath: string,
  mapping: (mkr: any) => React.ReactNode,
  initialBounds?: RectBounds,
}
