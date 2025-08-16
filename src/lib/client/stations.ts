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
import * as sample from './sample';

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
  if (enableSampleData) {
    console.log('using sample stations');
    return sample.fetchSampleStations();
  }

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

    const invalidStations = stationsInfo.filter((station) => !station.valid);
    if (invalidStations.length > 0) {
      console.warn(
        `${invalidStations.length} invalid stations`,
        invalidStations,
      );
    }

    const stationIds = new Set(
      stationsInfo.map((station) => station.station_id),
    );
    const bikesWithStation = bikes.filter((bike) =>
      stationIds.has(bike.station_id),
    );

    const stations: Station[] = values(
      merge(
        keyBy(stationsInfo, 'station_id'),
        keyBy(stationsStatus, 'station_id'),
        mapValues(groupBy(bikesWithStation, 'station_id'), (bikes) => ({
          bikes,
        })),
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

    const response = {
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

    // uncomment to update the sample data
    // await sample.saveSampleStations(response);

    return response;
  } catch (error) {
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
