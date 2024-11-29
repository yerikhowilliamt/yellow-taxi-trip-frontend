
import { fetchTrips } from '@/lib/fetchTrips';
import TripsPage from './trips/page';

export const revalidate = 0;

export default async function Home() {
  const trips = await fetchTrips(1);

  return <TripsPage initialTrips={trips} initialPage={1} />;
}
