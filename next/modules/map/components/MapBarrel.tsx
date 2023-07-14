'use client';

import { useEffect, useState } from 'react';

export default function MapBarrel() {
  const [Client, setClient] = useState<React.FunctionComponent>();

  useEffect(() => {
    (async () => {
      if (typeof global.window !== 'undefined') {
        const newClient = (await import('./Map')).default;
        setClient(() => newClient);
      }
    })();
  }, []);

  return typeof global.window !== 'undefined' && Client ? (
    <Client />
  ) : null;
}
