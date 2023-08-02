import Filter from '@/modules/map/components/Filter';
import MapBarrel from '@/modules/map/components/MapBarrel';
import deploymentMapping from '@/modules/map/utils/deploymentMapping';

export default function Page({ params: { projectId } }: { params: { projectId: string } }) {
  return (
    <>
      <Filter />
      <MapBarrel
        apiPath={`/api/projects/${projectId}`}
        mapping={deploymentMapping}
      />
    </>
  );
}
