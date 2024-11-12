'use client';

import React, { useState, useEffect } from 'react';
import { Trip } from '../types/trips';

interface TripListProps {
  trips: Trip[];
}

const TripList: React.FC<TripListProps> = ({ trips }) => {
  const [minFare, setMinFare] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  // Ensures client-side hydration is correct by delaying rendering until after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until after component is mounted on the client
  if (!isMounted) {
    return null; // Or you can show a loading spinner here
  }

  const filteredTrips = trips.filter((trip) => trip.fare_amount >= minFare);

  if (filteredTrips.length === 0) {
    return <p>No trips available.</p>;
  }

  return (
    <div className="w-full border rounded-lg p-4 backdrop-blur-sm bg-black bg-transparent/30">
      <h2 className="text-4xl font-semibold mb-4 text-center">TRIP LIST</h2>
      <div className="mb-4 w-full">
        <label htmlFor="minFare" className="mr-2">Filter by minimum fare:</label>
        <input
          type="number"
          id="minFare"
          value={minFare}
          onChange={(e) => setMinFare(Number(e.target.value))}
          className="border p-2 rounded text-black"
        />
      </div>

      <ul className="flex flex-row md:flex-wrap gap-[7px] items-center">
        {filteredTrips.map((trip) => (
          <li key={trip.id} className="mb-4 p-4 border rounded shadow-sm w-[22rem] text-white backdrop-blur-sm bg-[#ffab00]/70">
            <div>
              <strong>Vendor ID:</strong> {trip.vendor_id}
            </div>
            <div>
              <strong>Fare Amount:</strong> ${trip.fare_amount}
            </div>
            <div>
              <strong>Pickup Location:</strong> 
              {trip.pickup_location.coordinates[1]}, {trip.pickup_location.coordinates[0]}
            </div>
            <div>
              <strong>Dropoff Location:</strong> 
              {trip.dropoff_location.coordinates[1]}, {trip.dropoff_location.coordinates[0]}
            </div>
            <div>
              <strong>Pickup Time:</strong> {new Date(trip.pickup_datetime).toLocaleString()}
            </div>
            <div>
              <strong>Dropoff Time:</strong> {new Date(trip.dropoff_datetime).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
