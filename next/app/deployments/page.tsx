import DeploymentFilter from '@/modules/map/components/DeploymentFilter';

export default function Page({ searchParams }: { searchParams }) {
  return (
    <DeploymentFilter apiPath={`/api/deployments?${new URLSearchParams(searchParams).toString()}`} />
  );
}
