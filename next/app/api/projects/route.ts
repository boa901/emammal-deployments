/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const points = await fetch(`${process.env.API_DOMAIN}/projects?${request.nextUrl.searchParams.toString()}`, {
    method: 'GET',
  }).then((res) => res.json());

  return NextResponse.json(points);
}
