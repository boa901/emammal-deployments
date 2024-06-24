/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';

import RectBounds from '@/modules/map/types/RectBounds';

export async function GET(request: NextRequest) {
  const { nextUrl: { searchParams } } = request;

  const bounds = searchParams.get('bounds');
  const species = searchParams.get('species');
  const projects = searchParams.get('projects');

  const apiSearchParams = new URLSearchParams();

  if (bounds) {
    const latlngs = JSON.parse(bounds) as RectBounds | null;
    if (latlngs && Object.keys(latlngs).length > 0) {
      apiSearchParams.set('maxLat', latlngs.maxLat);
      apiSearchParams.set('minLat', latlngs.minLat);
      apiSearchParams.set('maxLng', latlngs.maxLng);
      apiSearchParams.set('minLng', latlngs.minLng);
    }
  }

  if (species) {
    apiSearchParams.set('species', species);
  }

  if (projects) {
    apiSearchParams.set('projects', projects);
  }

  const points = await fetch(
    `${process.env.API_DOMAIN}/deployments?${apiSearchParams.toString()}`,
    { method: 'GET' },
  ).then((res) => res.json());

  return NextResponse.json(points);
}
