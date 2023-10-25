'use client';

import { useEffect, useState } from 'react';

import GeoFilterMapProps from '@/modules/map/types/GeoFilterMapProps';

export default function GeoFilterMapBarrel({
  filterBounds,
  setFilter,
  apiPath,
  mapping,
  initialBounds,
  setCsvData,
}: GeoFilterMapProps): React.ReactNode {
  const [Client, setClient] = useState<React.FunctionComponent<GeoFilterMapProps>>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== 'undefined') {
        const newClient = (await import('./GeoFilterMap')).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  return typeof global.window !== 'undefined' && Client ? (
    <Client
      filterBounds={filterBounds}
      setFilter={setFilter}
      apiPath={apiPath}
      mapping={mapping}
      initialBounds={initialBounds}
      setCsvData={setCsvData}
    />
  ) : null;
}
