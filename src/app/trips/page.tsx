'use client';

import React, { useEffect, useState } from 'react';
import { Trip } from '../../types/trips';
import Filters from '@/components/filters';
import TripList from '@/components/tripList';
import { fetchTrips } from '../../lib/fetchTrips';
import dynamic from 'next/dynamic';
import PaginationButton from '@/components/ui/pagination-button';

interface TripsPageProps {
  initialTrips: Trip[];
  initialPage: number;
}

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
});

const TripsPage: React.FC<TripsPageProps> = ({ initialTrips, initialPage }) => {
  const [fetchedTrips, setFetchedTrips] = useState<Trip[]>(initialTrips);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(initialTrips);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    const getTrips = async () => {
      try {
        const tripsData = await fetchTrips(page);
        setFetchedTrips(tripsData);
        setFilteredTrips(tripsData);
      } catch (error) {
        console.error('Failed to fetch trips', error);
      }
    };

    getTrips();
  }, [page]);

  const incrementPage = () => setPage((prev) => prev + 1);
  const decrementPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleFilter = (filters: {
    start_date_time: string | null;
    end_date_time: string | null;
    min_fare: number;
    max_fare: number;
    min_distance: number;
    max_distance: number;
    payment_type: string | null;
  }) => {
    const {
      start_date_time,
      end_date_time,
      min_fare,
      max_fare,
      min_distance,
      max_distance,
      payment_type,
    } = filters;

    const filtered = fetchedTrips.filter((trip) => {
      const isStartDateTimeInRange = start_date_time
        ? new Date(trip.pickup_datetime) >= new Date(start_date_time)
        : true;
      const isEndDateTimeInRange = end_date_time
        ? new Date(trip.dropoff_datetime) <= new Date(end_date_time)
        : true;
      const isFareInRange =
        trip.fare_amount >= min_fare && trip.fare_amount <= max_fare;
      const isDistanceInRange =
        trip.trip_distance >= min_distance &&
        trip.trip_distance <= max_distance;
      const isPaymentTypeInRange = payment_type
        ? trip.payment_type === payment_type
        : true;

      return (
        isStartDateTimeInRange &&
        isEndDateTimeInRange &&
        isFareInRange &&
        isDistanceInRange &&
        isPaymentTypeInRange
      );
    });

    setFilteredTrips(filtered);
  };

  return (
    <div className='p-10 flex flex-col gap-y-10 w-full'>
      <h1 className='text-center text-xl md:text-4xl font-semibold'>
        <span className='text-[#ffa702]'>Yellow Taxi</span> Analytics Dashboard
      </h1>

      <TripList trips={filteredTrips}>
        <PaginationButton
          decrement={decrementPage}
          increment={incrementPage}
          page={page}
        />
      </TripList>

      <div className='flex flex-col lg:flex-row gap-y-10 gap-x-20 justify-center items-center'>
        <Filters onFilter={handleFilter} />
        <Map trips={filteredTrips} />
      </div>
    </div>
  );
};

export default TripsPage;
