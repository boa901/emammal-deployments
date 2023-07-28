'use client';

import Deployment from '@/common/types/deployment';
import DeploymentPopup from '@/modules/map/components/DeploymentPopup';

const deploymentMapping: (marker: Deployment) => React.ReactNode = (marker: Deployment) => (
  <DeploymentPopup marker={marker} key={marker.nid.toString()} />
);

export default deploymentMapping;
