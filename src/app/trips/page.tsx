'use client';

import React, { useEffect, useState } from 'react';
import { Trip } from '../../types/trips';
import Filters from '@/components/filters';
import MapComponent from '@/components/map';
import TripList from '@/components/tripList';
import { fetchTrips } from '../../lib/fetchTrips';
import dynamic from 'next/dynamic';

interface TripsPageProps {
  initialTrips: Trip[];
  initialPage: number;
  initialLimit: number;
}

const Map = dynamic(() => import('@/components/map'), {
  ssr: false
})

const TripsPage: React.FC<TripsPageProps> = ({
  initialTrips,
  initialPage,
  initialLimit,
}) => {
  const [fetchedTrips, setFetchedTrips] = useState<Trip[]>(initialTrips);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>(initialTrips);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const getTrips = async () => {
      try {
        const tripsData = await fetchTrips(page, limit);
        setFetchedTrips(tripsData);
        setFilteredTrips(tripsData);
      } catch (error) {
        console.error('Failed to fetch trips', error);
      }
    };

    getTrips();
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

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
    <div className='p-10 flex flex-col gap-y-10 w-full text-white bg-[#ffab00]'>
      <h1 className='text-center text-xl md:text-4xl font-semibold'>
        Yellow Taxi Analytics Dashboard
      </h1>
      <div className='mb-4'>
        <label>Page: </label>
        <input
          type='number'
          value={page}
          min={1}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          className='border px-2 py-1 text-black'
        />

        <label className='ml-4'>Limit: </label>
        <input
          type='number'
          value={limit}
          min={1}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
          className='border px-2 py-1 text-black'
        />
      </div>

      <TripList trips={filteredTrips} />

      <div className='flex flex-col md:flex-row gap-y-10 gap-x-20 justify-center items-center'>
        <Filters onFilter={handleFilter} />
        <div className='h-[15rem] md:h-[50rem] w-full'>
          <Map trips={filteredTrips} />
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
