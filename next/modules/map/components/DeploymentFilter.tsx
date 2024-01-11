'use client';

import { Button } from 'flowbite-react';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import DeploymentMultiselect from '@/modules/map/components/DeploymentMultiselect';
import DeploymentDrawer from '@/modules/map/components/DeploymentDrawer';

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
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedDeployment, setSelectedDeployment] = useState<{
    nid: string,
    label: string,
  } | null>(null);

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

  useEffect(() => {
    if (mapReady) {
      setDrawerOpen(true);
    }
  }, [mapReady]);

  return (
    <>
      <div className="w-full flex flex-row">
        <DeploymentDrawer
          isOpen={drawerOpen}
          deployment={selectedDeployment}
        />
        <div className="flex-grow">
          <GeoFilterMap
            setFilter={setRectBounds}
            apiPath={apiPath}
            initialBounds={initialBounds}
            setCsvData={setCsvData}
            setReady={setMapReady}
            setDrawerOpen={setDrawerOpen}
            setSelectedDeployment={setSelectedDeployment}
          />
        </div>
      </div>
      {mapReady && (
        <div className="w-full flex flex-row my-2">
          <div className="flex flex-row flex-grow">
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
          </div>
          <div className="flex flex-row flex-shrink-0 justify-items-center">
            <Button type="button" onClick={handleSubmit} className="mx-2">Search</Button>
            {(csvData || !apiPath) ? (
              <>
                {csvData && csvData.length > 0 && (
                  <CSVLink
                    data={csvData}
                    filename={`deployment_metadata_${new Date().toISOString().replaceAll(/[^0-9]/g, '')}`}
                  >
                    <Button className="mx-2">
                      Download Deployment Data
                    </Button>
                  </CSVLink>
                )}
              </>
            ) : (
              <Button isProcessing className="mx-2">
                Download Deployment Data
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
