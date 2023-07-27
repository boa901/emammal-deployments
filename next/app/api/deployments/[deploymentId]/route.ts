/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function GET(
  request: Request, { params: { deploymentId } }: { params: { deploymentId: string } },
) {
  const points = await fetch(`${process.env.API_DOMAIN}/deployments/${deploymentId}`, {
    method: 'GET',
  }).then((res) => res.json());

  return NextResponse.json(points);
}
