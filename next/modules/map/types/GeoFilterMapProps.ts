import RectBounds from '@/modules/map/types/RectBounds';

export default interface GeoFilterMapProps {
  setFilter: React.Dispatch<React.SetStateAction<RectBounds | null>>,
  apiPath: string | null,
  initialBounds?: RectBounds | null,
  setCsvData: React.Dispatch<React.SetStateAction<any[] | null>>,
}
