import dynamic from 'next/dynamic';

import projectMapping from '@/modules/map/utils/projectMapping';

const MapBarrel = dynamic(() => import('@/modules/map/components/MapBarrel'), { ssr: false });

export default function Page() {
  return (
    <MapBarrel
      apiPath="/api/projects"
      mapping={projectMapping}
    />
  );
}
