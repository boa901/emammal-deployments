import dynamic from 'next/dynamic';

import deploymentMapping from '@/modules/map/utils/deploymentMapping';

const Filter = dynamic(() => import('@/modules/map/components/Filter'), { ssr: false });
const MapBarrel = dynamic(() => import('@/modules/map/components/MapBarrel'), { ssr: false });

export default function Page(
  { params, searchParams }: { params: { projectId: string }, searchParams },
) {
  return (
    <>
      <Filter projectId={params.projectId} />
      <MapBarrel
        apiPath={`/api/projects/${params.projectId}?${new URLSearchParams(searchParams).toString()}`}
        mapping={deploymentMapping}
      />
    </>
  );
}
