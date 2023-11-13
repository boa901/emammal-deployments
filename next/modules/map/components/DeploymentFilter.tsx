'use client';

import { Button } from 'flowbite-react';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import RectBounds from '@/modules/map/types/RectBounds';
import deploymentMapping from '@/modules/map/utils/deploymentMapping';

const GeoFilterMap = dynamic(() => import('@/modules/map/components/GeoFilterMap'), { ssr: false });
const DeploymentMultiselect = dynamic(() => import('@/modules/map/components/DeploymentMultiselect'), { ssr: false });

export default function DeploymentFilter({
  apiPath = null,
  initialBounds = null,
  initialSpecies = [],
  initialProjects = [],
  projectOptions,
  speciesOptions,
}: {
  apiPath?: string | null,
  initialBounds?: RectBounds | null,
  initialSpecies?: string[],
  initialProjects?: number[],
  projectOptions: { value: number, label: string }[],
  speciesOptions: { value: string, label: string }[],
}) {
  const router = useRouter();

  const [rectBounds, setRectBounds] = useState<RectBounds | null>(initialBounds);
  const [filterSpecies, setFilterSpecies] = useState<string[]>(initialSpecies);
  const [filterProjects, setFilterProjects] = useState<number[]>(initialProjects);
  const [speciesUrl, setSpeciesUrl] = useState<string>(`/api/species?${new URLSearchParams({
    projects: JSON.stringify(initialProjects),
    ...initialBounds,
  }).toString()}`);
  const [projectsUrl, setProjectsUrl] = useState<string>(`/api/projects?${new URLSearchParams({
    species: JSON.stringify(initialSpecies),
    ...initialBounds,
  }).toString()}`);
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [deploymentLimit, setDeploymentLimit] = useState<number>(500);

  useEffect(() => {
    const speciesParams = {
      projects: JSON.stringify(filterProjects),
      ...rectBounds,
    };
    const projectsParams = {
      species: JSON.stringify(filterSpecies),
      ...rectBounds,
    };
    setSpeciesUrl(`/api/species?${new URLSearchParams(speciesParams).toString()}`);
    setProjectsUrl(`/api/projects?${new URLSearchParams(projectsParams).toString()}`);
  }, [rectBounds, filterSpecies, filterProjects]);

  const handleSubmit = () => {
    const params = {
      species: JSON.stringify(filterSpecies),
      projects: JSON.stringify(filterProjects),
      ...rectBounds,
    };
    router.push(`/deployments?${new URLSearchParams(params).toString()}`);
  };

  return (
    <div className="container w-3/4 mx-auto flex flex-col justify-center items-center">
      <div className="w-full">
        <GeoFilterMap
          filterBounds={rectBounds}
          setFilter={setRectBounds}
          apiPath={apiPath}
          mapping={deploymentMapping}
          initialBounds={initialBounds}
          setCsvData={setCsvData}
          limit={deploymentLimit}
        />
      </div>
      <div className="w-full flex flex-row justify-left">
        <DeploymentMultiselect
          setFilter={setFilterSpecies}
          optionUrl={speciesUrl}
          optionValue="species"
          optionLabel="name"
          fieldLabel="Species"
          defaultValues={speciesOptions.filter((speciesOption) => (
            initialSpecies.includes(speciesOption.value)
          ))}
        />
        <DeploymentMultiselect
          setFilter={setFilterProjects}
          optionUrl={projectsUrl}
          optionValue="nid"
          optionLabel="name"
          fieldLabel="Projects"
          defaultValues={projectOptions.filter((projectOption) => (
            initialProjects.includes(projectOption.value)
          ))}
        />
        <Button type="button" onClick={handleSubmit}>Search</Button>
      </div>
      {(csvData || !apiPath) ? (
        <>
          {csvData && csvData.length > 0 && (
            <CSVLink
              data={csvData}
              filename={`deployment_metadata_${new Date().toISOString().replaceAll(/[^0-9]/g, '')}`}
            >
              <Button>
                Download Deployment Data
              </Button>
            </CSVLink>
          )}
        </>
      ) : (
        <Button isProcessing>
          Download Deployment Data
        </Button>
      )}
    </div>
  );
}
