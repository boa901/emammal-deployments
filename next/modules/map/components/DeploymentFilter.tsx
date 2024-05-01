'use client';

import { Button, Modal } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import DeploymentMultiselect from '@/modules/map/components/DeploymentMultiselect';
import DeploymentDrawer from '@/modules/map/components/DeploymentDrawer';
import DeploymentDownload from '@/modules/export/components/DeploymentDownload';
import SequenceDownload from '@/modules/export/components/SequenceDownload';

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
  const [modalError, setModalError] = useState<string | null>(null);
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

  const downloadDeploymentData = async () => {
    const csvRows = await fetch('/api/deployments/csv', {
      method: 'POST',
      body: JSON.stringify(deploymentNids),
    }).then((res) => res.json());
    setCsvData(csvRows);
  };

  const downloadSequenceData = async () => {
    const params = {
      species: JSON.stringify(initialSpecies),
      projects: JSON.stringify(initialProjects),
      ...initialBounds,
    };
    const sequences = await fetch(
      `/api/deployments/sequences?${new URLSearchParams(params).toString()}`,
      { method: 'POST', body: JSON.stringify(deploymentNids) },
    );

    if (sequences.status === 200) {
      const sequenceJson = await sequences.json();
      setSequenceData(sequenceJson);
    } else if (sequences.status !== 413) {
      setModalError('There was a problem loading the sequence data. Please try again later.');
    } else {
      setModalError('Too many deployments selected. Please change the filters to choose fewer deployments.');
    }
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
            {(markersEndpoint) && (
              <Button
                onClick={() => {
                  setModalOpen(true);
                  setCsvData(null);
                  setSequenceData(null);
                  setModalError(null);
                  downloadDeploymentData();
                  downloadSequenceData();
                }}
                className="mx-2"
              >
                Data Export
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="grow flex flex-row overflow-y-auto">
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
          setCsvData(null);
          setSequenceData(null);
          setModalError(null);
        }}
      >
        <Modal.Header>Data Export</Modal.Header>
        <Modal.Body>
          <DeploymentDownload
            deploymentData={csvData}
            fileName={`deployment_metadata_${new Date().toISOString().replaceAll(/[^0-9]/g, '')}`}
          />
          <SequenceDownload
            sequenceData={sequenceData}
            modalError={modalError}
            fileName={`sequence_data_${new Date().toISOString().replaceAll(/[^0-9]/g, '')}`}
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={() => setModalOpen(false)} color="gray">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
