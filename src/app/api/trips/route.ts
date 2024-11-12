import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/yellow-taxi-trips`);
  
  if (!response.ok) {
    return NextResponse.error();
  }

  const trips = await response.json();
    return NextResponse.json(trips);
}
