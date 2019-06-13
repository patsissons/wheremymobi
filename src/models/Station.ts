export interface StationData extends Partial<google.maps.LatLngLiteral> {
  bikes: number;
  errors: any[];
  free: number;
  name: string | undefined;
  number: number | undefined;
  operative: boolean;
  total: number;
}

export interface Station extends StationData {
  data: StationData;
  valid?: boolean;
}

export interface ValidStation extends Station {
  lat: number;
  lng: number;
  name: string;
  number: number;
  valid: true;
}

export function createStation(data: StationData): Station {
  return {
    data,
    valid: [
      Number.isInteger(data.bikes),
      Number.isInteger(data.free),
      Number.isInteger(data.total),
      data.number != null && Number.isInteger(data.number) && data.number > 0,
      data.lat != null && Number.isFinite(data.lat) && data.lat !== 0,
      data.lng != null && Number.isFinite(data.lng) && data.lng !== 0,
      data.name != null && /^\w/.test(data.name),
      data.errors.length === 0,
    ].every((x) => x),
    ...data,
  };
}
