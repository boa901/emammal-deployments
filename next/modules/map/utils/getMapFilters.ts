import RectBounds from '@/modules/map/types/RectBounds';

export default function getMapFilters(searchParams: {
  bounds?: string,
  species?: string,
  projects?: string,
} | undefined): {
    bounds: RectBounds | null,
    species: string[] | null,
    projects: number[] | null,
  } {
  const bounds = (searchParams && 'bounds' in searchParams && typeof searchParams.bounds === 'string' ? JSON.parse(searchParams.bounds) : null);
  const species = (searchParams && 'species' in searchParams && typeof searchParams.species === 'string' ? JSON.parse(searchParams.species) : null);
  const projects = (searchParams && 'projects' in searchParams && typeof searchParams.projects === 'string' ? JSON.parse(searchParams.projects) : null);

  return { bounds, species, projects };
}
