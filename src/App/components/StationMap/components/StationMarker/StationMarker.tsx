import React, {useEffect, useState} from 'react';
import {Marker} from '@googlemap-react/core';
import {googleMapsAsync} from 'utilities/google';
import {
  MarkerLowImage,
  MarkerMidImage,
  MarkerHighImage,
  MarkerNoneImage,
} from './images';

interface Props {
  bikes: number;
  free: number;
  number: number;
  onClick(): void;
  lat: number;
  lng: number;
  preferBikes: boolean;
  showLabel: boolean;
  total: number;
}

export function StationMarker({
  bikes,
  free,
  number,
  onClick,
  lat,
  lng,
  preferBikes,
  showLabel,
  total,
}: Props) {
  const [opts, setOpts] = useState<google.maps.MarkerOptions>();
  useEffect(() => {
    setOpts(
      createMarkerOpts(bikes, free, lat, lng, preferBikes, showLabel, total),
    );
  }, [bikes, free, lat, lng, preferBikes, showLabel, total]);

  return (
    <Marker
      key={number}
      id={`station-${number}`}
      onClick={onClick}
      opts={opts}
    />
  );
}

function createMarkerOpts(
  bikes: number,
  free: number,
  lat: number,
  lng: number,
  preferBikes: boolean,
  showLabel: boolean,
  total: number,
): google.maps.MarkerOptions {
  const google = googleMapsAsync();

  return {
    icon: {
      url: markerForCount(preferBikes ? bikes : free, total),
      size: new google.maps.Size(50, 50),
      labelOrigin: new google.maps.Point(25, 21),
    },
    label: showLabel
      ? {
          color: 'white',
          text: `${bikes} | ${free}`,
          fontSize: '0.75rem',
          fontWeight: 'bold',
        }
      : undefined,
    position: {lat, lng},
  };
}

function markerForCount(count: number, total: number) {
  if (count <= 0) {
    return MarkerNoneImage;
  }

  const fraction = count / total;

  if (fraction >= 0.5) {
    return MarkerHighImage;
  }

  return fraction >= 0.25 ? MarkerMidImage : MarkerLowImage;
}
