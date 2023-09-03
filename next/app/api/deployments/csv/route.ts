/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const deployments = await request.json();
  const points = await fetch(
    `${process.env.API_DOMAIN}/deployments/csv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deployments),
    },
  ).then((res) => res.json());

  return NextResponse.json(points);
}
