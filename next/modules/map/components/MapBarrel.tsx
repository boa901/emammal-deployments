'use client';

import { useEffect, useState } from 'react';

import MapProps from '@/modules/map/types/MapProps';

export default function MapBarrel({ apiPath, mapping }: MapProps): React.ReactNode {
  const [Client, setClient] = useState<React.FunctionComponent<MapProps>>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== 'undefined') {
        const newClient = (await import('./Map')).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  return typeof global.window !== 'undefined' && Client ? (
    <Client apiPath={apiPath} mapping={mapping} />
  ) : null;
}
