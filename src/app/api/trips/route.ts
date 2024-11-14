import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/yellow-taxi-trips?page=1&limit=10`
    );

    if (response.status !== 200) {
      return NextResponse.error();
    }

    const trips = response.data;
    return NextResponse.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.error();
  }
}
