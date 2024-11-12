export interface Trip {
  id: number;
  vendor_id: string;
  pickup_datetime: string;
  dropoff_datetime: string;
  passenger_count: number;
  trip_distance: number;
  pickup_location: {
    type: string;
    coordinates: [number, number];
  };
  dropoff_location: {
    type: string;
    coordinates: [number, number];
  };
  payment_type: string;
  fare_amount: number;
  mta_tax: number;
  tip_amount: number;
  tolls_amount: number;
  total_amount: number;
  imp_surcharge: number;
  rate_code: string;
}
