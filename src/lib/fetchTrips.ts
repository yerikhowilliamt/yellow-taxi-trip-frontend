export async function fetchTrips(page: number, limit: number) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  }).toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/yellow-taxi-trips?${params}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch trips');

  const response = await res.json();
  return Array.isArray(response.data) ? response.data : [];
}
