import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Trip } from '../types/trips';
import L from 'leaflet';
import React, { useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet';

const customIcon = new L.Icon({
  iconUrl: '/taxi_3448637.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const MapComponent: React.FC<{ trips: Trip[] }> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const handleMouseOver = (id: number) => {
    setHoveredMarker(id);
  };

  const handleMouseOut = () => {
    setHoveredMarker(null);
  };

  const handleMarkerClick = (trip: Trip) => {
    // Toggle the selected trip on marker click
    setSelectedTrip(selectedTrip?.id === trip.id ? null : trip);
  };

  const mapCenter: LatLngExpression = trips.length > 0
    ? [
        (trips[0].pickup_location.coordinates[1] + trips[0].dropoff_location.coordinates[1]) / 2,
        (trips[0].pickup_location.coordinates[0] + trips[0].dropoff_location.coordinates[0]) / 2,
      ]
    : [40.7128, -74.006]; // Default to NYC coordinates if no trips

  return (
    <MapContainer
      center={mapCenter}
      zoom={12}
      scrollWheelZoom={true}
      className="w-full h-[15rem] md:h-[50rem]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      {trips.map((trip) => {
        const pickupCoordinates: LatLngExpression = [
          trip.pickup_location.coordinates[1],
          trip.pickup_location.coordinates[0],
        ];
        const dropoffCoordinates: LatLngExpression = [
          trip.dropoff_location.coordinates[1],
          trip.dropoff_location.coordinates[0],
        ];

        const routeCoordinates: LatLngExpression[] = [
          pickupCoordinates,
          dropoffCoordinates,
        ];

        return (
          <React.Fragment key={trip.id}>
            {/* Pickup Marker */}
            <Marker
              position={pickupCoordinates}
              icon={customIcon}
              eventHandlers={{
                mouseover: () => handleMouseOver(trip.id),
                mouseout: handleMouseOut,
                click: () => handleMarkerClick(trip),
              }}
            >
              <Popup>
                <div>
                  <strong>Pickup Location</strong>
                  <br />
                  Vendor ID: {trip.vendor_id}
                  <br />
                  Fare Amount: ${trip.fare_amount}
                  <br />
                  Pickup Time: {new Date(trip.pickup_datetime).toLocaleString()}
                </div>
              </Popup>
              <Tooltip
                direction="top"
                offset={[0, -20]}
                opacity={1}
                permanent={hoveredMarker === trip.id}
              >
                Pickup
              </Tooltip>
            </Marker>

            {/* Dropoff Marker */}
            <Marker
              position={dropoffCoordinates}
              icon={customIcon}
              eventHandlers={{
                mouseover: () => handleMouseOver(trip.id),
                mouseout: handleMouseOut,
                click: () => handleMarkerClick(trip),
              }}
            >
              <Popup>
                <div>
                  <strong>Dropoff Location</strong>
                  <br />
                  Vendor ID: {trip.vendor_id}
                  <br />
                  Fare Amount: ${trip.fare_amount}
                  <br />
                  Dropoff Time: {new Date(trip.dropoff_datetime).toLocaleString()}
                </div>
              </Popup>
              <Tooltip
                direction="top"
                offset={[0, -20]}
                opacity={1}
                permanent={hoveredMarker === trip.id}
              >
                Dropoff
              </Tooltip>
            </Marker>

            {/* Route Polyline */}
            {selectedTrip?.id === trip.id && (
              <Polyline
                pathOptions={{
                  color: 'orange',
                  weight: 4,
                  opacity: 0.7,
                }}
                positions={routeCoordinates}
              />
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
