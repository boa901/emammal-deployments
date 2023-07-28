'use client';

import { useState } from 'react';
import {
  Marker,
  Popup,
} from 'react-leaflet';

import Deployment from '@/common/types/deployment';

export default function DeploymentPopup({ marker }: { marker: Deployment }) {
  const [speciesData, setSpeciesData] = useState(null);

  const onClick = () => {
    const fetcher = async () => {
      const results = await fetch(`/api/deployments/${marker.nid}`, {
        method: 'GET',
      }).then((res) => res.json());
      setSpeciesData(results);
    };
    fetcher();
  };

  return (
    <Marker
      position={[marker.latitude, marker.longitude]}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        {marker.label}
        {speciesData && speciesData.length > 0 ? (
          <div>
            {speciesData.map((species) => (
              <p key={species.species}>{species.species}</p>
            ))}
          </div>
        ) : (
          <div>...</div>
        )}
      </Popup>
    </Marker>
  );
}
