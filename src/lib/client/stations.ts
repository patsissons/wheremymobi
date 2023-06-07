import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import merge from 'lodash/merge';
import values from 'lodash/values';
import { fetchBikes, fetchStationsInfo, fetchStationsStatus } from './gbfs';
import type { FetchOptions } from './json';
import { isDevelopment } from '$lib/utils/env';
import type { Metadata, Station } from './types';

type Options = FetchOptions;

export interface Data {
  stations: Station[];
  metadata: {
    stationsInfo: Metadata;
    stationsStatus: Metadata;
    bikes: Metadata;
  };
}

export async function fetchStations(options?: Options): Promise<Data> {
  try {
    const [
      { stations: stationsInfo, metadata: stationsInfoMetadata },
      { stations: stationsStatus, metadata: stationsStatusMetadata },
      { bikes, metadata: bikesMetadata },
    ] = await Promise.all([
      fetchStationsInfo(options),
      fetchStationsStatus(options),
      fetchBikes(options),
    ]);

    const stations = values(
      merge(
        keyBy(stationsInfo, 'station_id'),
        keyBy(stationsStatus, 'station_id'),
        mapValues(groupBy(bikes, 'station_id'), (bikes) => ({ bikes })),
      ),
    );

    return {
      stations,
      metadata: {
        stationsInfo: stationsInfoMetadata,
        stationsStatus: stationsStatusMetadata,
        bikes: bikesMetadata,
      },
    };
  } catch (error) {
    if (!isDevelopment) throw error;

    return fetchSampleStations();
  }
}

async function fetchSampleStations(): Promise<Data> {
  const { default: sample } = await import('$lib/data/sample.json');
  return sample as Data;
}
