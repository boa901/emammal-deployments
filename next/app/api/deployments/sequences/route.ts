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
  );

  if (sequences.status !== 200) {
    return new Response(sequences.statusText, {
      status: sequences.status,
    });
  }

  const sequenceJson = await sequences.json();
  return NextResponse.json(sequenceJson);
}
