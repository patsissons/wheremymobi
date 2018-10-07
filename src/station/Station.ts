export interface Station extends google.maps.LatLngLiteral {
  bikes: number;
  data: any;
  errors: any[];
  free: number;
  name: string;
  number: number;
  operative: boolean;
  total: number;
}

export function createStation(station: Partial<Station> = {}): Station {
  return {
    data: null,
    errors: [],
    bikes: 0,
    free: 0,
    lat: 0,
    lng: 0,
    name: '',
    number: 0,
    operative: false,
    total: 0,
    ...station,
  };
}

export function parseLatLng(position: string, station: Station) {
  try {
    const match = /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/.exec(position);

    if (!match) {
      throw new Error(`Unable to parse "lat, lng" from ${position}`);
    }

    station.lat = Number(match[1]);
    station.lng = Number(match[2]);
  } catch (error) {
    station.errors.push(error);
  }
}
