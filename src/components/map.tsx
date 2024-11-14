import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L, { LatLngExpression } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { Trip } from '../types/trips';

if (typeof window !== 'undefined' && !L.Routing) {
  require('leaflet-routing-machine');
}

const customIcon = new L.Icon({
  iconUrl: '/taxi_3448637.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const RoutingControl = ({
  pickup,
  dropoff,
  routingControlRef,
}: {
  pickup: LatLngExpression;
  dropoff: LatLngExpression;
  routingControlRef: React.MutableRefObject<L.Routing.Control | null>;
}) => {
  const map = useMap();

  useEffect(() => {
    if (map && L.Routing && !routingControlRef.current) {
      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(pickup), L.latLng(dropoff)],
        lineOptions: {
          styles: [{ color: 'orange', weight: 4, opacity: 1 }],
          extendToWaypoints: false,
          missingRouteTolerance: 1,
        },
        addWaypoints: false,
        routeWhileDragging: false,
        plan: L.Routing.plan([L.latLng(pickup), L.latLng(dropoff)], {
          createMarker: (
            index: number,
            waypoint: L.Routing.Waypoint,
            numberOfWaypoints: number
          ) => {
            return L.marker(waypoint.latLng, {
              icon: customIcon,
            });
          },
        }),
      }).addTo(map);
    }

    return () => {
      if (
        routingControlRef.current &&
        map &&
        routingControlRef.current instanceof L.Layer
      ) {
        map.removeLayer(routingControlRef.current);
      }
    };
  }, [map, pickup, dropoff, routingControlRef]);

  return null;
};

const MapComponent: React.FC<{ trips: Trip[] }> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  const handleMouseOver = (id: number) => setHoveredMarker(id);
  const handleMouseOut = () => setHoveredMarker(null);

  const handleMarkerClick = (trip: Trip) => {
    if (selectedTrip?.id === trip.id) {
      setSelectedTrip(null);
      if (routingControlRef.current) {
        routingControlRef.current
          .getPlan()
          .spliceWaypoints(0, routingControlRef.current.getWaypoints().length);
      }
    } else {
      setSelectedTrip(trip);
    }
  };

  const mapCenter: LatLngExpression =
    trips.length > 0
      ? [
          (trips[0].pickup_location.coordinates[1] +
            trips[0].dropoff_location.coordinates[1]) /
            2,
          (trips[0].pickup_location.coordinates[0] +
            trips[0].dropoff_location.coordinates[0]) /
            2,
        ]
      : [40.7128, -74.006];

  useEffect(() => {
    if (selectedTrip && routingControlRef.current) {
      const pickupCoordinates: LatLngExpression = [
        selectedTrip.pickup_location.coordinates[1],
        selectedTrip.pickup_location.coordinates[0],
      ];
      const dropoffCoordinates: LatLngExpression = [
        selectedTrip.dropoff_location.coordinates[1],
        selectedTrip.dropoff_location.coordinates[0],
      ];
      routingControlRef.current.setWaypoints([
        L.latLng(pickupCoordinates),
        L.latLng(dropoffCoordinates),
      ]);
    }
  }, [selectedTrip]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={12}
      scrollWheelZoom={true}
      className='w-full h-[25rem] lg:h-[35rem]'
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
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

        return (
          <React.Fragment key={trip.id}>
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
                  <h5 className='text-center font-bold mb-1'>Pickup Location</h5>
                  <p>Vendor ID: {trip.vendor_id}</p>
                  <p>Fare Amount: ${trip.fare_amount}</p>
                  <p>Trip Distance: {trip.trip_distance} miles</p>
                  <p>
                    Pickup Time:{' '}
                    {new Date(trip.pickup_datetime).toLocaleString()}
                  </p>
                </div>
              </Popup>
              <Tooltip
                direction='top'
                offset={[0, -20]}
                opacity={1}
                permanent={hoveredMarker === trip.id}
              >
                Pickup
              </Tooltip>
            </Marker>

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
                  <h5 className='text-center font-bold mb-1'>Dropoff Location</h5>
                  <p>Vendor ID: {trip.vendor_id}</p>
                  <p>Fare Amount: ${trip.fare_amount}</p>
                  <p>Trip Distance: {trip.trip_distance} miles</p>
                  <p>
                    Pickup Time:{' '}
                    {new Date(trip.pickup_datetime).toLocaleString()}
                  </p>
                </div>
              </Popup>
              <Tooltip
                direction='top'
                offset={[0, -20]}
                opacity={1}
                permanent={hoveredMarker === trip.id}
              >
                Dropoff
              </Tooltip>
            </Marker>

            {selectedTrip?.id === trip.id && (
              <RoutingControl
                pickup={pickupCoordinates}
                dropoff={dropoffCoordinates}
                routingControlRef={routingControlRef}
              />
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
