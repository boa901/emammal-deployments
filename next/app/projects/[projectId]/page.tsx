import Filter from '@/modules/map/components/Filter';
import MapBarrel from '@/modules/map/components/MapBarrel';
import deploymentMapping from '@/modules/map/utils/deploymentMapping';

export default function Page({ params }: { params: { projectId: string } }) {
  return (
    <>
      <Filter projectId={params.projectId} />
      <MapBarrel
        apiPath={`/api/projects/${params.projectId}`}
        mapping={deploymentMapping}
      />
    </>
  );
}
