import React, {useCallback, useMemo} from 'react';
import {Marker} from '@googlemap-react/core';
import {createIcon} from './icon';

export interface Props {
  bikes: number;
  free: number;
  id: number;
  lat: number;
  lng: number;
  showInfo(id: number): void;
}

export function StationMarker({bikes, free, id, lat, lng, showInfo}: Props) {
  const opts = useMemo<google.maps.MarkerOptions>(
    () => ({
      icon: createIcon(bikes),
      label: {
        text: `${bikes} | ${free}`,
        fontSize: '0.75rem',
        fontWeight: 'bold',
      },
      position: {lat, lng},
    }),
    [bikes, free, lat, lng],
  );
  const handleClick = useCallback(() => {
    return showInfo(id);
  }, [id, showInfo]);

  return <Marker onClick={handleClick} opts={opts} />;
}
