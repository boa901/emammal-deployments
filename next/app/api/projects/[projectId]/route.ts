/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest, { params: { projectId } }: { params: { projectId: string } },
) {
  const points = await fetch(`${process.env.API_DOMAIN}/projects/${projectId}?${request.nextUrl.searchParams.toString()}`, {
    method: 'GET',
  }).then((res) => res.json());

  return NextResponse.json(points);
}
