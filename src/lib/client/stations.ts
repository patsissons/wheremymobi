import dayjs from 'dayjs';
import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import merge from 'lodash/merge';
import values from 'lodash/values';
import { enableSampleData } from '$lib/utils/env';
import { fetchBikes, fetchStationsInfo, fetchStationsStatus } from './gbfs';
import type { FetchOptions } from './json';
import type { Bike, Metadata, Station } from './types';

export type FetchStationsOptions = FetchOptions;

export interface FetchStationsResponse {
  stations: Station[];
  bikes: Bike[];
  metadata: {
    stationsInfo: Metadata;
    stationsStatus: Metadata;
    bikes: Metadata;
    source: string;
    timestamp: number;
  };
}

export async function fetchStations(
  options?: FetchStationsOptions,
): Promise<FetchStationsResponse> {
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

    const stations: Station[] = values(
      merge(
        keyBy(stationsInfo, 'station_id'),
        keyBy(stationsStatus, 'station_id'),
        mapValues(groupBy(bikes, 'station_id'), (bikes) => ({ bikes })),
      ),
    );

    // if no bikes are at any particular station, they won't group above
    // (i.e., we don't have an outer group operation), so instead we just run a
    // sanity check and assign an empty array if empty.
    stations.forEach((station: Station) => {
      if (!station.bikes) {
        station.bikes = [];
      }
    });

    return {
      stations,
      bikes,
      metadata: {
        stationsInfo: stationsInfoMetadata,
        stationsStatus: stationsStatusMetadata,
        bikes: bikesMetadata,
        source: 'gbfs',
        timestamp: dayjs().unix() * 1000,
      },
    };
  } catch (error) {
    if (enableSampleData) {
      console.log('using sample stations');
      return fetchSampleStations();
    }

    console.error('error fetching stations', error);

    return {
      stations: [],
      bikes: [],
      metadata: {
        stationsInfo: {
          last_updated: dayjs().unix(),
          ttl: 0,
          version: '2.3',
        },
        stationsStatus: {
          last_updated: dayjs().unix(),
          ttl: 0,
          version: '2.3',
        },
        bikes: {
          last_updated: dayjs().unix(),
          ttl: 0,
          version: '2.3',
        },
        source: 'gbfs',
        timestamp: dayjs().unix() * 1000,
      },
    };
  }
}

async function fetchSampleStations(): Promise<FetchStationsResponse> {
  const { default: sample } = await import('$lib/data/sample.json');
  return sample as FetchStationsResponse;
}
