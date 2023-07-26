'use client';

import {
  Marker,
  Popup,
} from 'react-leaflet';

import Deployment from '@/common/types/deployment';

const deploymentMapping: (marker: Deployment) => React.ReactNode = (marker: Deployment) => (
  <Marker key={marker.nid.toString()} position={[marker.latitude, marker.longitude]}>
    <Popup>
      {marker.label}
    </Popup>
  </Marker>
);

export default deploymentMapping;
