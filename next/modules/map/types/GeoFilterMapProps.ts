import RectBounds from '@/modules/map/types/RectBounds';

export default interface GeoFilterMapProps {
  setFilter: React.Dispatch<React.SetStateAction<RectBounds>>,
  apiPath: string,
  mapping: (mkr: any) => React.ReactNode,
}
