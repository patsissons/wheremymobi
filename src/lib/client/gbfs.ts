import { config } from '$lib/config';
import { fetchJson, type FetchOptions } from './json';
import type {
  BikeResponse,
  Response,
  StationInfo,
  StationInfoResponse,
  StationStatusResponse,
} from './types';

const stationsStatusEndpoint = `${config.dataSource.gbfs.baseUrl}/station_status.json`;
const stationsInfoEndpoint = `${config.dataSource.gbfs.baseUrl}/station_information.json`;
const bikesEndpoint = `${config.dataSource.gbfs.baseUrl}/free_bike_status.json`;

class ResponseError<T = unknown> extends Error {
  constructor(message: string, public response: T) {
    super(message);
  }
}

function isValidResponse<T extends Response<unknown>>(
  response: unknown,
): response is T {
  if (!response || typeof response !== 'object') return false;
  if (
    !('data' in response) ||
    !response.data ||
    typeof response.data !== 'object'
  )
    return false;
  if (!('last_updated' in response)) return false;
  if (!('ttl' in response)) return false;
  if (!('version' in response)) return false;

  return true;
}

function isStationValid(station: StationInfo): boolean {
  if (typeof station.capacity !== 'number' || station.capacity <= 0)
    return false;
  if (typeof station.is_charging_station !== 'boolean') return false;
  if (
    typeof station.lat !== 'number' ||
    station.lat < -90 ||
    station.lat > 90 ||
    station.lat === 0
  )
    return false;
  if (
    typeof station.lon !== 'number' ||
    station.lon < -180 ||
    station.lon > 180 ||
    station.lon === 0
  )
    return false;
  if (typeof station.name !== 'string' || station.name.length === 0)
    return false;
  if (typeof station.station_id !== 'string' || station.station_id.length === 0)
    return false;
  if (
    typeof station.vehicle_type_capacity !== 'object' ||
    typeof station.vehicle_type_capacity[1] !== 'number' ||
    typeof station.vehicle_type_capacity[2] !== 'number'
  )
    return false;

  return true;
}

export async function fetchStationsInfo(options?: FetchOptions) {
  const response = await fetchJson(stationsInfoEndpoint, options);

  if (
    !isValidResponse<StationInfoResponse>(response) ||
    !response.data.stations ||
    !Array.isArray(response.data.stations)
  )
    throw new ResponseError('invalid stations info response', response);

  const {
    data: { stations },
    ...metadata
  } = response;

  return {
    metadata,
    stations: stations.map((station) => ({
      ...station,
      valid: isStationValid(station),
    })),
  };
}

export async function fetchStationsStatus(options?: FetchOptions) {
  const response = await fetchJson(stationsStatusEndpoint, options);

  if (
    !isValidResponse<StationStatusResponse>(response) ||
    !response.data.stations ||
    !Array.isArray(response.data.stations)
  )
    throw new ResponseError('invalid stations status response', response);

  const {
    data: { stations },
    ...metadata
  } = response;

  return {
    metadata,
    stations,
  };
}

export async function fetchBikes(options?: FetchOptions) {
  const response = await fetchJson(bikesEndpoint, options);

  if (
    !isValidResponse<BikeResponse>(response) ||
    !response.data.bikes ||
    !Array.isArray(response.data.bikes)
  )
    throw new ResponseError('invalid bikes response', response);

  const {
    data: { bikes },
    ...metadata
  } = response;

  return {
    metadata,
    bikes,
  };
}
