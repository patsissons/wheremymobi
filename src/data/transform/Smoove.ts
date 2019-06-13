import {createStation, StationData} from 'models';

export interface SmooveStation {
  name: string;
  coordinates: string;
  // eslint-disable-next-line babel/camelcase
  total_slots: number;
  // eslint-disable-next-line babel/camelcase
  free_slots: number;
  // eslint-disable-next-line babel/camelcase
  avl_bikes: number;
  operative: boolean;
  style: string;
}

export interface Response {
  result: SmooveStation[];
}

export function parseLatLng({coordinates}: SmooveStation) {
  try {
    const match = /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/.exec(coordinates);

    if (!match) {
      throw new Error(`Unable to parse "lat, lng" from ${coordinates}`);
    }

    return {
      lat: Number(match[1]),
      lng: Number(match[2]),
    };
  } catch (error) {
    return {
      latLngError: error,
    };
  }
}

export function parseNameAndNumber({name}: SmooveStation) {
  try {
    const match = /^(\d+)\s+(.*)$/.exec(name);

    if (!match) {
      throw new Error(`Unable to parse "number name" from ${name}`);
    }

    return {
      name: match[2],
      number: Number(match[1]),
    };
  } catch (error) {
    return {
      nameNumberError: error,
    };
  }
}

export function create(smooveData: SmooveStation) {
  const {nameNumberError, name, number} = parseNameAndNumber(smooveData);
  const {lat, latLngError, lng} = parseLatLng(smooveData);
  const data: StationData = {
    ...smooveData,
    bikes: smooveData.avl_bikes,
    free: smooveData.free_slots,
    lat,
    lng,
    name,
    number,
    operative: smooveData.operative,
    total: smooveData.total_slots,
    errors: [],
  };

  if (nameNumberError) {
    data.errors.push(nameNumberError);
  }

  if (latLngError) {
    data.errors.push(latLngError);
  }

  return createStation(data);
}

export function Smoove({result}: Response) {
  return result.map(create);
}
