'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import RectBounds from '@/modules/map/types/RectBounds';
import GeoFilterMapBarrel from './GeoFilterMapBarrel';

export default function DeploymentFilter() {
  const router = useRouter();

  const [rectBounds, setRectBounds] = useState<RectBounds>(null);

  const handleSubmit = () => {
    router.push(`/deployments?${new URLSearchParams({ ...rectBounds })}`);
  };

  return (
    <div>
      <GeoFilterMapBarrel setFilter={setRectBounds} />
      <button type="button" onClick={handleSubmit}>Search</button>
    </div>
  );
}
