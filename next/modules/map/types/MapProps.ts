import Project from '@/common/types/project';

export default interface MapProps {
  apiPath: string,
  mapping: (mkr: Project) => React.ReactNode,
}
