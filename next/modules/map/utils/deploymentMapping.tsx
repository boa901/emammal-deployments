'use client';

import dynamic from 'next/dynamic';

import Deployment from '@/common/types/deployment';

const DeploymentPopup = dynamic(() => import('@/modules/map/components/DeploymentPopup'));

const deploymentMapping: (marker: Deployment) => React.ReactNode = (marker: Deployment) => (
  <DeploymentPopup marker={marker} key={marker.nid.toString()} />
);

export default deploymentMapping;
