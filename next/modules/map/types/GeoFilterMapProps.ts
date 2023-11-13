import RectBounds from '@/modules/map/types/RectBounds';

export default interface GeoFilterMapProps {
  filterBounds: RectBounds | null,
  setFilter: React.Dispatch<React.SetStateAction<RectBounds | null>>,
  apiPath: string | null,
  mapping: (mkr: any) => React.ReactNode,
  initialBounds?: RectBounds | null,
  setCsvData: React.Dispatch<React.SetStateAction<any[] | null>>,
  limit: number,
  openModal: Function,
}
