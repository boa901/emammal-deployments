import DeploymentFilter from '@/modules/map/components/DeploymentFilter';

export default async function Page() {
  const projectOptions = await fetch(`${process.env.API_DOMAIN}/projects`, {
    method: 'GET',
  }).then((res) => res.json());

  projectOptions.map((projectObj) => ({
    value: projectObj.nid,
    label: projectObj.name,
  }));
  return (
    <DeploymentFilter projectOptions={projectOptions} />
  );
}
