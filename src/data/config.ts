import {Station} from 'data/models';
import {googleMapsAsync} from 'utils/google';

import {Smoove} from './transform';

enum StationSourceType {
  Smoove,
}

export type SourceName = 'vancouver' | 'test';

export interface StationSourceConfig {
  location: google.maps.LatLngLiteral;
  name: string;
  options?: any;
  type: keyof typeof StationSourceType;
  uri: string;
  cors?: boolean;
}

const configMap = new Map<SourceName, StationSourceConfig>([
  [
    'test',
    {
      location: {
        lat: 49.279627,
        lng: -123.121116,
      },
      name: 'Test Data',
      type: 'Smoove',
      uri: '/test_data',
    },
  ],
  [
    'vancouver',
    {
      location: {
        lat: 49.279627,
        lng: -123.121116,
      },
      name: 'Mobi Bike Vancouver',
      type: 'Smoove',
      uri: 'https://vancouver-ca.smoove.pro/api-public/stations',
      cors: true,
    },
  ],
]);

export function getConfig(key: SourceName) {
  const config = configMap.get(key);

  if (!config) {
    throw new Error(`No station data for source '${key}'`);
  }

  return config;
}

export function getConfigByLocation(location: google.maps.LatLngLiteral) {
  const google = googleMapsAsync(false);

  return Array.from<StationSourceConfig>(configMap.values())
    .map((config) => ({
      config,
      distance: google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(location),
        new google.maps.LatLng(config.location.lat, config.location.lng),
      ),
    }))
    .sort((left, right) => left.distance - right.distance)[0].config;
}

// for a list of proxies,
// see: https://gist.github.com/jimmywarting/ac1be6ea0297c16c477e17f8fbe51347
export function getCorsUri(uri: string) {
  return `/api/stations?uri=${uri}`;
}

export type StationSourceTransform = (response: any) => Station[];

export function mapTransform({type}: StationSourceConfig) {
  switch (type) {
    case 'Smoove':
      return Smoove;
    default:
      throw new Error(`Invalid Configuration '${type}'`);
  }
}
