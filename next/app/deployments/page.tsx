import MapBarrel from '@/modules/map/components/MapBarrel';
import deploymentMapping from '@/modules/map/utils/deploymentMapping';

export default function Page({ searchParams }: { searchParams }) {
  return (
    <div className="container w-3/4 mx-auto flex flex-col justify-center items-center">
      <MapBarrel
        apiPath={`/api/deployments?${new URLSearchParams(searchParams).toString()}`}
        mapping={deploymentMapping}
      />
    </div>
  );
}
