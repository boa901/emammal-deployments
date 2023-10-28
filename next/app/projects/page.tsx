import dynamic from 'next/dynamic';

import projectMapping from '@/modules/map/utils/projectMapping';

const Map = dynamic(() => import('@/modules/map/components/Map'), { ssr: false });

export default function Page() {
  return (
    <Map
      apiPath="/api/projects"
      mapping={projectMapping}
    />
  );
}
