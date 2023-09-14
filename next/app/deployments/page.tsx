import DeploymentFilter from '@/modules/map/components/DeploymentFilter';

export default function Page({ searchParams }: { searchParams }) {
  const {
    maxLat,
    minLat,
    maxLng,
    minLng,
    projects,
    species,
  } = searchParams;

  return (
    <DeploymentFilter
      apiPath={`/api/deployments?${new URLSearchParams(searchParams).toString()}`}
      initialBounds={{
        maxLat,
        minLat,
        maxLng,
        minLng,
      }}
      initialSpecies={JSON.parse(species)}
      initialProjects={JSON.parse(projects)}
    />
  );
}
