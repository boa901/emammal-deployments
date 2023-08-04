import Filter from '@/modules/map/components/Filter';
import MapBarrel from '@/modules/map/components/MapBarrel';
import deploymentMapping from '@/modules/map/utils/deploymentMapping';

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
