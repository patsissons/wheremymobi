import {useCallback, useDebugValue, useEffect, useState} from 'react';
import moment from 'moment';

import {QueryParams} from './useQueryParams';

interface UsePositionProps {
  options?: PositionOptions;
  params: QueryParams | undefined;
}

const defaultOptions: PositionOptions = {
  enableHighAccuracy: true,
};

export function usePosition({options}: UsePositionProps) {
  const [watchId, setWatchId] = useState<number>();
  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<GeolocationPositionError>();
  const updatePosition = useCallback(() => {
    if (typeof navigator !== 'undefined') {
      navigator.geolocation.getCurrentPosition(
        setPosition,
        setError,
        options || defaultOptions,
      );
    }
  }, [options]);
  useEffect(() => {
    if (!watchId && typeof navigator !== 'undefined') {
      const id = navigator.geolocation.watchPosition(
        setPosition,
        setError,
        options || defaultOptions,
      );

      setWatchId(id);

      return () => {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);

          setWatchId(undefined);
        }
      };
    }

    return undefined;
  }, [options, watchId]);
  useDebugValue(
    position
      ? `[${position.coords.latitude}, ${position.coords.longitude}] @ ${moment(
          position.timestamp,
        ).fromNow()}`
      : 'Loading...',
  );

  return {
    error,
    position,
    updatePosition,
  };
}
