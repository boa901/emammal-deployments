/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const deployments = await request.json();
  const sequences = await fetch(
    `${process.env.API_DOMAIN}/deployments/sequences?${request.nextUrl.searchParams.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deployments),
    },
  ).then((res) => res.json());

  return NextResponse.json(sequences);
}
