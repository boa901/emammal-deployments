'use client';

import { Button } from 'flowbite-react';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import DeploymentMultiselect from '@/modules/map/components/DeploymentMultiselect';

import RectBounds from '@/modules/map/types/RectBounds';

const GeoFilterMap = dynamic(() => import('@/modules/map/components/GeoFilterMap'), { ssr: false });

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
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [speciesUrl, setSpeciesUrl] = useState<string>(`/api/species?${new URLSearchParams({
    projects: JSON.stringify(initialProjects),
    ...initialBounds,
  }).toString()}`);
  const [projectsUrl, setProjectsUrl] = useState<string>(`/api/projects?${new URLSearchParams({
    species: JSON.stringify(initialSpecies),
    ...initialBounds,
  }).toString()}`);
  const [csvData, setCsvData] = useState<any[] | null>(null);

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
          setFilter={setRectBounds}
          apiPath={apiPath}
          initialBounds={initialBounds}
          setCsvData={setCsvData}
          setReady={setMapReady}
        />
      </div>
      {mapReady && (
        <>
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
        </>
      )}
    </div>
  );
}
