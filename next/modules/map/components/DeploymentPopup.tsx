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

  const formatSpecies = (data: { species: string, count: number, nid: number }[]): string => {
    const species = [];
    data.map((speciesObject) => (
      species.push(speciesObject.species)
    ));
    const result = species.join(', ');
    if (result.length > 25) {
      return `${result.slice(0, 22)}...`;
    }
    return result;
  };

  return (
    <Marker
      position={[marker.latitude, marker.longitude]}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup>
        <div>
          {marker.label}
        </div>
        {speciesData && speciesData.length > 0 ? (
          <div className="popup-species">
            {formatSpecies(speciesData)}
          </div>
        ) : (
          <div>...</div>
        )}
      </Popup>
    </Marker>
  );
}
