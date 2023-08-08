import MapBarrel from '@/modules/map/components/MapBarrel';
import projectMapping from '@/modules/map/utils/projectMapping';

export default function Page() {
  return (
    <MapBarrel
      apiPath="/api/projects"
      mapping={projectMapping}
    />
  );
}
