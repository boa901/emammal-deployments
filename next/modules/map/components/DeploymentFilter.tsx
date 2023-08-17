'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import RectBounds from '@/modules/map/types/RectBounds';
import GeoFilterMapBarrel from '@/modules/map/components/GeoFilterMapBarrel';
import DeploymentSpeciesFilter from '@/modules/map/components/DeploymentSpeciesFilter';

export default function DeploymentFilter() {
  const router = useRouter();

  const [rectBounds, setRectBounds] = useState<RectBounds>(null);
  const [filterSpecies, setFilterSpecies] = useState<string[]>([]);

  const handleSubmit = () => {
    const params = {
      species: JSON.stringify(filterSpecies),
      ...rectBounds,
    };
    router.push(`/deployments?${new URLSearchParams(params).toString()}`);
  };

  return (
    <div>
      <GeoFilterMapBarrel setFilter={setRectBounds} />
      <DeploymentSpeciesFilter setFilter={setFilterSpecies} />
      <button type="button" onClick={handleSubmit}>Search</button>
    </div>
  );
}
