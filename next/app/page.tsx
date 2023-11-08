import DeploymentFilter from '@/modules/map/components/DeploymentFilter';

export default async function Page() {
  const projectOptions = await fetch(`${process.env.API_DOMAIN}/projects`, {
    method: 'GET',
  }).then((res) => res.json());

  const speciesOptions = await fetch(`${process.env.API_DOMAIN}/species`, {
    method: 'GET',
  }).then((res) => res.json());

  return (
    <DeploymentFilter
      projectOptions={projectOptions.map((projectObj) => ({
        value: projectObj.nid,
        label: projectObj.name,
      }))}
      speciesOptions={speciesOptions.map((speciesObj) => ({
        value: speciesObj.species,
        label: speciesObj.name,
      }))}
    />
  );
}
