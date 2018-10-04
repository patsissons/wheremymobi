export interface StationData {
  name: string;
  coordinates: string;
  total_slots: number;
  free_slots: number;
  avl_bikes: number;
  operative: boolean;
  style: string;
}

export interface StationNodeNameAndNumber {
  name: string;
  number: number;
  error_name?: string;
}

export interface StationNodeLatLng {
  lat: number;
  lng: number;
  error_coordinates?: string;
}

export interface UnvalidatedStationNode
  extends StationNodeNameAndNumber,
    StationNodeLatLng {
  bikes: number;
  free: number;
  operative: boolean;
  style: string;
  total: number;
}

export interface StationNode extends UnvalidatedStationNode {
  valid: boolean;
}

export function parseNameAndNumber({
  name,
}: StationData): StationNodeNameAndNumber {
  try {
    const match = /^(\d+)\s+(.*)$/.exec(name);

    if (!match) {
      throw new Error(`Unable to parse "number name" from ${name}`);
    }

    return {
      name: match[2],
      number: Number(match[1]),
    };
  } catch (e) {
    return {
      name,
      number: 0,
      error_name: e.message,
    };
  }
}

export function parseLatLng({coordinates}: StationData): StationNodeLatLng {
  try {
    const match = /^(-?\d+\.\d+),\s+(-?\d+\.\d+)$/.exec(coordinates);

    if (!match) {
      throw new Error(`Unable to parse "lat, lng" from ${coordinates}`);
    }

    return {
      lat: Number(match[1]),
      lng: Number(match[2]),
    };
  } catch (e) {
    return {
      lat: 0,
      lng: 0,
      error_coordinates: e.message,
    };
  }
}

export function validate(node: UnvalidatedStationNode): StationNode {
  return {
    ...node,
    valid: [
      Number.isInteger(node.bikes),
      Number.isInteger(node.free),
      Number.isInteger(node.total),
      Number.isInteger(node.number),
      Number.isFinite(node.lat),
      node.lat !== 0,
      Number.isFinite(node.lng),
      node.lng !== 0,
      /^\w/.test(node.name),
      !node.error_coordinates,
      !node.error_name,
    ].every((x) => x),
  };
}

export function createStationNode(stationData: StationData): StationNode {
  return validate({
    ...parseNameAndNumber(stationData),
    ...parseLatLng(stationData),
    bikes: stationData.avl_bikes,
    free: stationData.free_slots,
    operative: Boolean(stationData.operative),
    style: stationData.style,
    total: stationData.total_slots,
  });
}
