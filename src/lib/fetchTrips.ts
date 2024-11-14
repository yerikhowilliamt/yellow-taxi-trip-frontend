import axios from 'axios';

export async function fetchTrips(page: number, limit: number) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  }).toString();

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/yellow-taxi-trips?${params}`
    );

    return Array.isArray(response.data.data) ? response.data.data : [];
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw new Error('Failed to fetch trips');
  }
}
