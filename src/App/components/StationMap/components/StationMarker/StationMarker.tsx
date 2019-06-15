import React from 'react';
import {Marker} from '@googlemap-react/core';

export const colors = {
  low: 'salmon',
  mid: 'sandybrown',
  high: 'mediumseagreen',
};

export interface Props {
  bikes: number;
  free: number;
  id: number;
  lat: number;
  lng: number;
  preferBikes: boolean;
  showInfo(id: number): void;
  total: number;
}

export function StationMarker({
  bikes,
  free,
  id,
  lat,
  lng,
  preferBikes,
  showInfo,
  total,
}: Props) {
  return (
    <Marker
      id={`station-${id}`}
      onClick={() => showInfo(id)}
      opts={{
        icon: {
          path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
          fillColor: colorForCount(preferBikes ? bikes : free, total),
          fillOpacity: 1,
          strokeColor: 'white',
          strokeOpacity: 1,
        },
        label: {
          color: 'white',
          text: `${bikes} | ${free}`,
          fontSize: '0.75rem',
          fontWeight: 'bold',
        },
        position: {lat, lng},
      }}
    />
  );
}

export function colorForCount(count: number, total: number) {
  const fraction = count / total;
  if (fraction >= 0.5) {
    return colors.high;
  }

  return count >= 0.25 ? colors.mid : colors.low;
}
