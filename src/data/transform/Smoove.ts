import {map} from 'rxjs/operators';
import {createStation, parseLatLng, Station} from '~/station';

export interface SmooveStation {
  name: string;
  coordinates: string;
  total_slots: number;
  free_slots: number;
  avl_bikes: number;
  operative: boolean;
  style: string;
}

export interface Response {
  result: SmooveStation[];
}

export function parseNameAndNumber({name}: SmooveStation, station: Station) {
  try {
    const match = /^(\d+)\s+(.*)$/.exec(name);

    if (!match) {
      throw new Error(`Unable to parse "number name" from ${name}`);
    }

    station.number = Number(match[1]);
    station.name = match[2];
  } catch (error) {
    station.errors.push(error);
  }
}

export function create(data: SmooveStation) {
  const station = createStation({
    data,
    bikes: data.avl_bikes,
    free: data.free_slots,
    operative: data.operative,
    total: data.total_slots,
  });

  parseNameAndNumber(data, station);
  parseLatLng(data.coordinates, station);

  return station;
}

export default map<Response, Station[]>(({result}) => result.map(create));
