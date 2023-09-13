'use client';

import { useEffect, useState } from 'react';

import GeoFilterMapProps from '@/modules/map/types/GeoFilterMapProps';

export default function GeoFilterMapBarrel(
  { setFilter, apiPath, mapping }: GeoFilterMapProps,
): React.ReactNode {
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
    <Client setFilter={setFilter} apiPath={apiPath} mapping={mapping} />
  ) : null;
}
