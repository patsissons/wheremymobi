import * as React from 'react';
import {Marker, MarkerProps} from 'react-google-maps';

export interface Props extends MarkerProps {
  coords: Coordinates;
  timestamp: number;
}

type ComposedProps = Props;

export function GpsMarker({coords, timestamp, ...props}: ComposedProps) {
  const {accuracy, heading, latitude: lat, longitude: lng} = coords;

  return (
    <Marker
      icon={{
        anchor: new google.maps.Point(3, 3),
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        strokeColor: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.5,
        rotation: heading || 0,
        scale: 10,
        strokeOpacity: 1 - 1.0 / accuracy,
        strokeWeight: 1,
      }}
      position={new google.maps.LatLng(lat, lng)}
      {...props}
    />
  );
}

export default GpsMarker;
