import React from 'react';
import {Circle, Marker} from '@googlemap-react/core';
import {useGoogleNamespace} from 'utils/google';

interface Props {
  color?: string;
  coords: GeolocationCoordinates;
  timestamp: number;
}

export function GpsMarker({color = 'magenta', coords, timestamp}: Props) {
  const [google] = useGoogleNamespace();
  const {accuracy: radius, heading, latitude, longitude} = coords;

  const position: google.maps.LatLngLiteral = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <>
      <Circle
        opts={{
          center: position,
          radius,
          fillColor: color,
          strokeColor: color,
          fillOpacity: 0.25,
          strokeWeight: 1,
        }}
      />
      <Marker
        opts={{
          icon: {
            anchor: new google.maps.Point(0, 2.6),
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            strokeColor: color,
            fillColor: color,
            fillOpacity: 1,
            rotation: heading || 0,
            scale: 10,
            strokeWeight: 1,
          },
          position,
          zIndex: google.maps.Marker.MAX_ZINDEX,
        }}
      />
    </>
  );
}
