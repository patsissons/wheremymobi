import {OperatorFunction} from 'rxjs';
import {Station} from '~/station';
import {Smoove} from './transform';

enum StationSourceType {
  Smoove,
}

export interface StationSourceConfig {
  location: google.maps.LatLngLiteral;
  name: string;
  options?: any;
  type: keyof typeof StationSourceType;
  uri: string;
}

const configMap = new Map<string, StationSourceConfig>([
  [
    'vancouver',
    {
      location: {
        lat: 49.279627,
        lng: -123.121116,
      },
      name: 'Mobi Bike Vancouver',
      type: 'Smoove',
      uri: 'http://vancouver-ca.smoove.pro/api-public/stations',
    },
  ],
]);

export function getConfig(key: string) {
  const config = configMap.get(key.toLowerCase());

  if (!config) {
    throw new Error(`No station data for source '${key}'`);
  }

  return config;
}

export function getConfigByLocation(location: google.maps.LatLng) {
  return Array.from(configMap.values())
    .map((config) => ({
      config,
      distance: google.maps.geometry.spherical.computeDistanceBetween(
        location,
        new google.maps.LatLng(config.location.lat, config.location.lng),
      ),
    }))
    .sort((a, b) => a.distance - b.distance)[0].config;
}

export type StationSourceTransform = OperatorFunction<any, Station[]>;

export function mapTransform({
  type,
}: StationSourceConfig): StationSourceTransform {
  switch (type) {
    case 'Smoove':
      return Smoove;
    default:
      throw new Error(`Invalid Configuration '${type}'`);
  }
}
