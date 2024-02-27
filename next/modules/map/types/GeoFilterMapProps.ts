import Deployment from '@/common/types/deployment';
import RectBounds from '@/modules/map/types/RectBounds';

export default interface GeoFilterMapProps {
  markers: Deployment[] | null,
  loading: boolean,
  initialBounds?: RectBounds | null,
  onReady: Function,
  drawerOpen: boolean,
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setFilter: React.Dispatch<React.SetStateAction<RectBounds | null>>,
  setSelectedDeployment: React.Dispatch<React.SetStateAction<{
    nid: string,
    label: string,
  } | null>>,
}
