import * as React from 'react';
import {Circle, Marker, MarkerProps} from 'react-google-maps';

export interface Props extends MarkerProps {
  coords: Coordinates;
  timestamp: number;
}

type ComposedProps = Props;

export function GpsMarker({coords, timestamp, ...props}: ComposedProps) {
  const {accuracy, heading, latitude: lat, longitude: lng} = coords;

  const position = new google.maps.LatLng(lat, lng);

  return (
    <>
      <Circle
        center={position}
        radius={accuracy}
        options={{
          fillColor: 'blue',
          strokeColor: 'blue',
          fillOpacity: 0.25,
          strokeWeight: 1,
        }}
      />
      <Marker
        icon={{
          anchor: new google.maps.Point(0, 2.6),
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          strokeColor: 'blue',
          fillColor: 'blue',
          fillOpacity: 1,
          rotation: heading,
          scale: 6,
          strokeWeight: 1,
        }}
        position={new google.maps.LatLng(lat, lng)}
        {...props}
      />
    </>
  );
}

export default GpsMarker;
