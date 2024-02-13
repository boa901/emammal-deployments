'use client';

import { Button, Modal } from 'flowbite-react';
import { CSVLink } from 'react-csv';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import DeploymentMultiselect from '@/modules/map/components/DeploymentMultiselect';
import DeploymentDrawer from '@/modules/map/components/DeploymentDrawer';
import SequenceDownload from '@/modules/sequence/components/SequenceDownload';

import RectBounds from '@/modules/map/types/RectBounds';
import Deployment from '@/common/types/deployment';

const GeoFilterMap = dynamic(() => import('@/modules/map/components/GeoFilterMap'), { ssr: false });

export default function DeploymentFilter({
  searchParams = null,
  initialBounds = null,
  initialSpecies = [],
  initialProjects = [],
  projectOptions,
  speciesOptions,
}: {
  searchParams?: URLSearchParams | null,
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
  const [markersEndpoint, setMarkersEndpoint] = useState<string | null>(null);
  const [markers, setMarkers] = useState<Deployment[] | null>(null);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [mapLoading, setMapLoading] = useState<boolean>(false);
  const [speciesUrl, setSpeciesUrl] = useState<string>(`/api/species?${new URLSearchParams({
    projects: JSON.stringify(initialProjects),
    ...initialBounds,
  }).toString()}`);
  const [projectsUrl, setProjectsUrl] = useState<string>(`/api/projects?${new URLSearchParams({
    species: JSON.stringify(initialSpecies),
    ...initialBounds,
  }).toString()}`);
  const [deploymentNids, setDeploymentNids] = useState<bigint[] | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [sequenceData, setSequenceData] = useState<any[] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDeployment, setSelectedDeployment] = useState<{
    nid: string,
    label: string,
  } | null>(null);

  useEffect(() => {
    if (searchParams) {
      setMarkersEndpoint(`/api/deployments?${new URLSearchParams(searchParams).toString()}`);
    }
  }, [searchParams]);

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

  useEffect(() => {
    const fetchPoints = async () => {
      if (markersEndpoint && markersEndpoint.length > 0) {
        setCsvData(null);
        setMapLoading(true);
        const deployments: Deployment[] = await fetch(markersEndpoint, {
          method: 'GET',
        }).then((res) => res.json());

        setMarkers(deployments);
        const nids = deployments.map((deployment) => deployment.nid);
        setDeploymentNids(nids);

        if (setCsvData) {
          const csvRows = await fetch('/api/deployments/csv', {
            method: 'POST',
            body: JSON.stringify(nids),
          }).then((res) => res.json());
          setCsvData(csvRows);
        }
      } else {
        setMarkers([]);
      }
    };

    fetchPoints();
  }, [markersEndpoint]);

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

  useEffect(() => {
    if (markers) {
      setMapLoading(false);
    }
  }, [markers]);

  const downloadSequenceData = async () => {
    const sequences = await fetch('/api/deployments/sequences', {
      method: 'POST',
      body: JSON.stringify(deploymentNids),
    }).then((res) => res.json());

    setSequenceData(sequences);
  };

  return (
    <div className="h-screen flex flex-col">
      {mapReady && (
        <div className="w-full flex flex-col my-2 lg:flex-row">
          <div className="grow flex flex-col sm:flex-row">
            <div className="p-2 sm:w-1/2">
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
            </div>
            <div className="p-2 sm:w-1/2">
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
          </div>
          <div className="flex flex-row flex-shrink-0 justify-end p-2">
            <Button type="button" onClick={handleSubmit} className="mx-2">Search</Button>
            {(csvData || !markersEndpoint) ? (
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
            {(markersEndpoint) && (
              <Button
                onClick={() => {
                  setModalOpen(true);
                  setSequenceData(null);
                  downloadSequenceData();
                }}
                className="mx-2"
              >
                Download Sequence Data
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="flex-grow flex flex-row">
        <DeploymentDrawer
          isOpen={drawerOpen}
          deployment={selectedDeployment}
        />
        <div className="h-full flex-grow">
          <GeoFilterMap
            markers={markers}
            loading={mapLoading}
            initialBounds={initialBounds}
            onReady={() => setMapReady(true)}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            setFilter={setRectBounds}
            setSelectedDeployment={setSelectedDeployment}
          />
        </div>
      </div>
      <Modal
        show={modalOpen}
        size="lg"
        onClose={() => {
          setModalOpen(false);
          setSequenceData(null);
        }}
      >
        <Modal.Header>Download Sequence Data</Modal.Header>
        <Modal.Body>
          <SequenceDownload sequenceData={sequenceData} />
        </Modal.Body>
        <Modal.Footer className="flex flex-row">
          {sequenceData && sequenceData.length > 0 ? (
            <CSVLink
              data={sequenceData}
              filename={`sequence_data_${new Date().toISOString().replaceAll(/[^0-9]/g, '')}`}
            >
              <Button onClick={() => setModalOpen(false)} className="mr-2">Download</Button>
            </CSVLink>
          ) : (
            <Button className="mr-2" disabled>Download</Button>
          )}
          <Button onClick={() => setModalOpen(false)} color="gray">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
