import MapBarrel from '@/modules/map/components/MapBarrel';
import deploymentMapping from '@/modules/map/utils/deploymentMapping';

export default function Page({ searchParams }: { searchParams }) {
  return (
    <MapBarrel
      apiPath={`/api/deployments?${new URLSearchParams(searchParams).toString()}`}
      mapping={deploymentMapping}
    />
  );
}
