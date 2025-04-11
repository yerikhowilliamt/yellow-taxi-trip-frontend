'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, { useState, useEffect } from 'react';
import { Trip } from '../types/trips';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Label } from './ui/label';
import { Input } from './ui/input';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

interface TripListProps {
  trips: Trip[];
  children: React.ReactNode;
}

const TripList: React.FC<TripListProps> = ({ trips, children }) => {
  const [minFare, setMinFare] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const filteredTrips = trips.filter((trip) => trip.fare_amount >= minFare);

  if (filteredTrips.length === 0) {
    return <p>No trips available.</p>;
  }

  return (
    <div className='w-full border rounded-lg p-4 backdrop-blur-sm bg-black bg-transparent/30'>
      <h2 className='text-4xl font-semibold mb-4 text-center text-white'>
        TRIP LIST
      </h2>
      <div className='mb-4 w-full md:max-w-[15rem]'>
        <Label htmlFor='minFare' className=' text-white text-base md:text-lg'>
          Filter by minimum fare :
        </Label>
        <Input
          type='number'
          id='minFare'
          value={minFare}
          onChange={(e) => setMinFare(Number(e.target.value))}
          className='border p-2 rounded text-black'
        />
      </div>
      <div className='w-full'>
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
        >
          {filteredTrips.map((trip, index) => (
            <SwiperSlide key={index}>
              <div className='border rounded-md shadow-sm w-full text-white p-4 relative pt-2 pb-6'>
                <Image
                  src={'/yellow-taxi-city.jpg'}
                  fill
                  alt='image'
                  className='object-cover absolute -z-10 brightness-[30%] border rounded-lg'
                />
                <div className='flex flex-col py-2 items-center'>
                  <h5 className='font-bold text-sm md:text-lg'>Vendor ID:</h5>
                  <p className='text-sm md:text-base'>{trip.vendor_id}</p>
                </div>
                <div className='flex flex-col py-2 items-center'>
                  <h5 className='font-bold text-sm md:text-lg'>Fare Amount:</h5>
                  <p className='text-sm md:text-base'>${trip.fare_amount}</p>
                </div>
                <div className='flex flex-col py-2 items-center'>
                  <h5 className='font-bold text-sm md:text-lg'>
                    Pickup Location:
                  </h5>
                  <p className='text-sm md:text-base'>
                    {trip.pickup_location.coordinates[1]},{' '}
                    {trip.pickup_location.coordinates[0]}
                  </p>
                </div>
                <div className='flex flex-col py-2 items-center'>
                  <h5 className='font-bold text-sm md:text-lg'>
                    Dropoff Location:
                  </h5>
                  <p className='text-sm md:text-base'>
                    {trip.dropoff_location.coordinates[1]},{' '}
                    {trip.dropoff_location.coordinates[0]}
                  </p>
                </div>
                <div className='flex flex-col py-2 items-center'>
                  <h5 className='font-bold text-sm md:text-lg'>Distance:</h5>
                  <p className='text-sm md:text-base'>
                    {trip.trip_distance} miles
                  </p>
                </div>
                <div className='flex flex-col py-2 items-center'>
                  <h5 className='font-bold text-sm md:text-lg'>Pickup Time:</h5>
                  <p className='text-sm md:text-base'>
                    {new Date(trip.pickup_datetime).toLocaleString()}
                  </p>
                </div>
                <div className='flex flex-col py-2 items-center'>
                  <h5 className='font-bold text-sm md:text-lg'>
                    Dropoff Time:
                  </h5>
                  <p className='text-sm md:text-base'>
                    {new Date(trip.dropoff_datetime).toLocaleString()}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {children}
    </div>
  );
};

export default TripList;
