import dynamic from 'next/dynamic';

import deploymentMapping from '@/modules/map/utils/deploymentMapping';

const Filter = dynamic(() => import('@/modules/map/components/Filter'), { ssr: false });
const Map = dynamic(() => import('@/modules/map/components/Map'), { ssr: false });

export default function Page(
  { params, searchParams }: { params: { projectId: string }, searchParams },
) {
  return (
    <>
      <Filter projectId={params.projectId} />
      <Map
        apiPath={`/api/projects/${params.projectId}?${new URLSearchParams(searchParams).toString()}`}
        mapping={deploymentMapping}
      />
    </>
  );
}
