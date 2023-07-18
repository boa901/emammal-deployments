'use client';

import {
  Marker,
  Popup,
} from 'react-leaflet';

import Project from '@/common/types/project';

const projectMapping: (marker: Project) => React.ReactNode = (marker: Project) => (
  <Marker key={marker.id.toString()} position={[marker.latitude, marker.longitude]}>
    <Popup>
      {marker.project_name}
    </Popup>
  </Marker>
);

export default projectMapping;
