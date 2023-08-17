'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import RectBounds from '@/modules/map/types/RectBounds';
import GeoFilterMapBarrel from '@/modules/map/components/GeoFilterMapBarrel';
import DeploymentSpeciesFilter from '@/modules/map/components/DeploymentSpeciesFilter';
import DeploymentProjectFilter from '@/modules/map/components/DeploymentProjectFilter';

export default function DeploymentFilter() {
  const router = useRouter();

  const [rectBounds, setRectBounds] = useState<RectBounds>(null);
  const [filterSpecies, setFilterSpecies] = useState<string[]>([]);
  const [filterProjects, setFilterProjects] = useState<number[]>([]);

  const handleSubmit = () => {
    const params = {
      species: JSON.stringify(filterSpecies),
      projects: JSON.stringify(filterProjects),
      ...rectBounds,
    };
    router.push(`/deployments?${new URLSearchParams(params).toString()}`);
  };

  return (
    <div>
      <GeoFilterMapBarrel setFilter={setRectBounds} />
      <div className="flex flex-row">
        <DeploymentSpeciesFilter setFilter={setFilterSpecies} />
        <DeploymentProjectFilter setFilter={setFilterProjects} />
      </div>
      <button type="button" onClick={handleSubmit}>Search</button>
    </div>
  );
}
