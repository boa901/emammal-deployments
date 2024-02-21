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

  const speciesOptions = await fetch(`${process.env.API_DOMAIN}/species`, {
    method: 'GET',
  }).then((res) => res.json());

  const filtersApplied = (filterParams: {
    maxLat: number | null,
    minLat: number | null,
    maxLng: number | null,
    minLng: number | null,
    projects: any[] | null,
    species: any[] | null,
  }) => {
    if (Object.keys(filterParams).length === 0) {
      return false;
    }
    const projectsSet = (projects && JSON.parse(projects).length > 0);
    const speciesSet = (species && JSON.parse(species).length > 0);
    if (projectsSet
      || speciesSet
      || (maxLat
      && minLat
      && maxLng
      && minLng
      )) {
      return true;
    }
    return false;
  };

  return filtersApplied(searchParams) ? (
    <DeploymentFilter
      searchParams={searchParams}
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
      speciesOptions={speciesOptions.map((speciesObj) => ({
        value: speciesObj.species,
        label: speciesObj.name || speciesObj.species,
      }))}
    />
  ) : (
    <DeploymentFilter
      projectOptions={projectOptions.map((projectObj) => ({
        value: projectObj.nid,
        label: projectObj.name,
      }))}
      speciesOptions={speciesOptions.map((speciesObj) => ({
        value: speciesObj.species,
        label: speciesObj.name || speciesObj.species,
      }))}
    />
  );
}
