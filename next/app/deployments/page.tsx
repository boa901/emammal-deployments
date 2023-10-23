import DeploymentFilter from '@/modules/map/components/DeploymentFilter';

export default async function Page({ searchParams }: { searchParams }) {
  const {
    maxLat,
    minLat,
    maxLng,
    minLng,
    projects,
    species,
  } = searchParams;

  const projectOptions = await fetch(`${process.env.API_DOMAIN}/projects`, {
    method: 'GET',
  }).then((res) => res.json());

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
      projectOptions={projectOptions.map((projectObj) => ({
        value: projectObj.nid,
        label: projectObj.name,
      }))}
    />
  );
}
