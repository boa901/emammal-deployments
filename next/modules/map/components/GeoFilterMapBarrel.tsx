'use client';

import { useEffect, useState } from 'react';

export default function GeoFilterMapBarrel(): React.ReactNode {
  const [Client, setClient] = useState<React.FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== 'undefined') {
        const newClient = (await import('./GeoFilterMap')).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  return typeof global.window !== 'undefined' && Client ? (
    <Client />
  ) : null;
}
