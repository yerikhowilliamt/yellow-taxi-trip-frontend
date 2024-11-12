export interface GeoJSONPoint {
  type: 'Point';
  coordinates: [number, number];
}

export interface Trip {
  id: number;
  vendor_id: string;
  pickup_datetime: string;
  dropoff_datetime: string;
  pickup_location: GeoJSONPoint;
  dropoff_location: GeoJSONPoint;
  fare_amount: number;
  payment_type: string;
  trip_distance: number;
}