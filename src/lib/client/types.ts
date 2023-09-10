export interface StationInfo {
  capacity: number;
  is_charging_station: boolean;
  lat: number;
  lon: number;
  name: string;
  station_id: string;
  vehicle_type_capacity: Record<number, number>;
}

export interface StationVehicleDocksAvailable {
  count: number;
  vehicle_type_ids: string[];
}

export interface StationVehicleTypesAvailable {
  count: number;
  vehicle_type_id: string;
}

export interface StationStatus {
  is_installed: boolean;
  is_renting: boolean;
  is_returning: boolean;
  last_reported: number;
  num_bikes_available: number;
  num_bikes_disabled: number;
  num_docks_available: number;
  station_id: string;

  vehicle_docks_available: StationVehicleDocksAvailable[];
  vehicle_types_available: StationVehicleTypesAvailable[];
}

export interface Bike {
  bike_id: string;
  current_range_meters?: number;
  is_disabled: boolean;
  is_reserved: boolean;
  last_reported: number;
  station_id: string;
  vehicle_type_id: string;
}

export interface Metadata {
  last_updated: number;
  ttl: number;
  version: string;
}

export interface Response<T> extends Metadata {
  data: T;
}

export type StationInfoResponse = Response<{ stations: StationInfo[] }>;
export type StationStatusResponse = Response<{ stations: StationStatus[] }>;
export type BikeResponse = Response<{ bikes: Bike[] }>;

export type Station = StationInfo &
  StationStatus & { bikes: Bike[]; valid?: boolean };
