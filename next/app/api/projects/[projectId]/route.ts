/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function GET(
  request: Request, { params: { projectId } }: { params: { projectId: string } },
) {
  const points = await fetch(`${process.env.API_DOMAIN}/projects/${projectId}`, {
    method: 'GET',
  }).then((res) => res.json());

  return NextResponse.json(points);
}
