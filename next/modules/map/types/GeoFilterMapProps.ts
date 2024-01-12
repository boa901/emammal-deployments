import RectBounds from '@/modules/map/types/RectBounds';

export default interface GeoFilterMapProps {
  setFilter: React.Dispatch<React.SetStateAction<RectBounds | null>>,
  apiPath: string | null,
  initialBounds?: RectBounds | null,
  setCsvData: React.Dispatch<React.SetStateAction<any[] | null>>,
  setReady: React.Dispatch<React.SetStateAction<boolean>>,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedDeployment: React.Dispatch<React.SetStateAction<{
    nid: string,
    label: string,
  } | null>>,
}
