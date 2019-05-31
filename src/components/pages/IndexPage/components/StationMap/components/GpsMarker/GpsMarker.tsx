import React from 'react';
import {Circle, Marker} from '@googlemap-react/core';

interface Props {
  color?: string;
  coords: Coordinates;
  timestamp: number;
}

export function GpsMarker({color = 'magenta', coords, timestamp}: Props) {
  const {accuracy: radius, heading, latitude: lat, longitude: lng} = coords;

  const position = new google.maps.LatLng(lat, lng);

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
