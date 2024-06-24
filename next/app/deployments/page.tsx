import DeploymentFilter from '@/modules/map/components/DeploymentFilter';

export default async function Page({ searchParams }: { searchParams }) {
  const projectOptions = await fetch(`${process.env.API_DOMAIN}/projects`, {
    method: 'GET',
  }).then((res) => res.json());

  const speciesOptions = await fetch(`${process.env.API_DOMAIN}/species`, {
    method: 'GET',
  }).then((res) => res.json());

  const filtersApplied = (filterParams: { bounds: string, species: string, projects: string }) => {
    const bounds = (filterParams && 'bounds' in filterParams ? JSON.parse(filterParams.bounds) : null);
    const species = (filterParams && 'species' in filterParams ? JSON.parse(filterParams.species) : null);
    const projects = (filterParams && 'projects' in filterParams ? JSON.parse(filterParams.projects) : null);

    return bounds || (species && species.length > 0) || (projects && projects.length > 0);
  };

  return filtersApplied(searchParams) ? (
    <DeploymentFilter
      searchParams={searchParams}
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
