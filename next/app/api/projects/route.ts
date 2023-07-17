/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

export async function GET() {
  const points = await fetch(`${process.env.API_DOMAIN}/projects`, {
    method: 'GET',
  }).then((res) => res.json());

  return NextResponse.json(points);
}
