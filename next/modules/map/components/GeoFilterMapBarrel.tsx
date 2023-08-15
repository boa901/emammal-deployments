'use client';

import { useEffect, useState } from 'react';

import RectBounds from '@/modules/map/types/RectBounds';

export default function GeoFilterMapBarrel(
  { setFilter }: { setFilter: React.Dispatch<React.SetStateAction<RectBounds>> },
): React.ReactNode {
  const [Client, setClient] = useState<React.FunctionComponent<{
    setFilter: React.Dispatch<React.SetStateAction<RectBounds>>,
  }>>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== 'undefined') {
        const newClient = (await import('./GeoFilterMap')).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  return typeof global.window !== 'undefined' && Client ? (
    <Client setFilter={setFilter} />
  ) : null;
}
