'use client';

import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import RectBounds from '@/modules/map/types/RectBounds';
import GeoFilterMapBarrel from '@/modules/map/components/GeoFilterMapBarrel';
import DeploymentMultiselect from '@/modules/map/components/DeploymentMultiselect';

export default function DeploymentFilter() {
  const router = useRouter();

  const [rectBounds, setRectBounds] = useState<RectBounds>(null);
  const [filterSpecies, setFilterSpecies] = useState<string[]>([]);
  const [filterProjects, setFilterProjects] = useState<number[]>([]);
  const [speciesUrl, setSpeciesUrl] = useState<string>('/api/species');
  const [projectsUrl, setProjectsUrl] = useState<string>('/api/projects');

  useEffect(() => {
    const speciesParams = {
      projects: JSON.stringify(filterProjects),
      ...rectBounds,
    };
    setSpeciesUrl(`/api/species?${new URLSearchParams(speciesParams).toString()}`);
    setProjectsUrl(`/api/projects?${new URLSearchParams({ ...rectBounds }).toString()}`);
  }, [rectBounds, filterProjects]);

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
        <GeoFilterMapBarrel setFilter={setRectBounds} />
      </div>
      <div className="w-full flex flex-row justify-left">
        <DeploymentMultiselect
          setFilter={setFilterSpecies}
          optionUrl={speciesUrl}
          optionValue="species"
          optionLabel="species"
          fieldLabel="Species"
        />
        <DeploymentMultiselect
          setFilter={setFilterProjects}
          optionUrl={projectsUrl}
          optionValue="nid"
          optionLabel="name"
          fieldLabel="Projects"
        />
        <Button type="button" onClick={handleSubmit}>Search</Button>
      </div>
    </div>
  );
}
