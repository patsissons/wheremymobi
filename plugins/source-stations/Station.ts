import {createHash, HexBase64Latin1Encoding} from 'crypto';

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

export interface StationNodeGatsby {
  id: string;
  parent: null;
  children: [];
  internal: {
    content: string;
    contentDigest: string;
    description: string;
    mediaType: string;
    type: string;
  };
}

export interface StationNode
  extends StationNodeNameAndNumber,
    StationNodeLatLng,
    StationNodeGatsby {
  bikes: number;
  free: number;
  operative: boolean;
  style: string;
  total: number;
}

export interface ValidatedStationNode extends StationNode {
  valid: boolean;
}

export function digest(
  content: string,
  algorithm = 'md5',
  encoding: HexBase64Latin1Encoding = 'hex'
) {
  return {
    content,
    contentDigest: createHash(algorithm)
      .update(content)
      .digest(encoding),
  };
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

export function validate(node: StationNode): ValidatedStationNode {
  return {
    ...node,
    valid: Boolean(
      Number.isInteger(node.bikes) &&
        Number.isInteger(node.free) &&
        Number.isInteger(node.total) &&
        Number.isInteger(node.number) &&
        Number.isFinite(node.lat) &&
        Number.isFinite(node.lng) &&
        /^\w/.test(node.name) &&
        !node.error_coordinates &&
        !node.error_name
    ),
  };
}

export function createStationNode(
  data: StationData,
  createId: (id: string, namespace?: string) => string
): ValidatedStationNode {
  return validate({
    ...parseNameAndNumber(data),
    ...parseLatLng(data),
    bikes: data.avl_bikes,
    free: data.free_slots,
    operative: Boolean(data.operative),
    style: data.style,
    total: data.total_slots,
    id: createId(data.name, 'Station'),
    parent: null,
    children: [],
    internal: {
      ...digest(JSON.stringify(data)),
      description: 'Mobi Bike Station',
      mediaType: 'application/json',
      type: 'Station',
    },
  });
}
