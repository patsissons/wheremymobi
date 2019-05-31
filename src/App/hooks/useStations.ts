import {useCallback, useDebugValue, useEffect, useMemo, useState} from 'react';
import {SourceName, StationSource, StationSourceResult} from 'data';
import {QueryParams} from './useQueryParams';

interface UseStationsProps {
  params: QueryParams | undefined;
}

export const defaultSourceName: SourceName = 'vancouver';

function getSourceName(params: QueryParams | undefined) {
  if (!params) {
    return {};
  }

  return {
    debug: Boolean(params.get('debug')),
    sourceName: (params.get('source') ||
      (params.get('test') && 'test') ||
      defaultSourceName) as SourceName,
  };
}

export function useStations({params}: UseStationsProps) {
  const {debug, sourceName} = getSourceName(params);
  const [stationSourceResult, setStationSourceResult] = useState<
    StationSourceResult
  >();
  const source = useMemo(() => {
    if (sourceName) {
      return StationSource.create(sourceName, {debug});
    }

    return null;
  }, [debug, sourceName]);
  const updateStations = useCallback(() => {
    if (source) {
      return source.getStations().then(setStationSourceResult);
    }

    return undefined;
  }, [source]);
  useEffect(() => {
    if (source) {
      updateStations();
    }
  }, [source, updateStations]);
  useDebugValue(
    stationSourceResult
      ? `${
          stationSourceResult.stations.length
        } stations loaded (${stationSourceResult.fetchedAt.fromNow()})`
      : 'Loading...',
  );

  return {
    stationSourceResult,
    updateStations,
  };
}
