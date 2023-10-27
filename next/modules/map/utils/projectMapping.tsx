'use client';

import dynamic from 'next/dynamic';

import Project from '@/common/types/project';

const ProjectPopup = dynamic(() => import('@/modules/map/components/ProjectPopup'), { ssr: false });

const projectMapping: (marker: Project) => React.ReactNode = (marker: Project) => (
  <ProjectPopup marker={marker} key={marker.nid.toString()} />
);

export default projectMapping;
