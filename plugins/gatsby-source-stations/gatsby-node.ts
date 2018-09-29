import {createHash, HexBase64Latin1Encoding} from 'crypto';
import {readJson} from 'fs-extra';
import moment from 'moment';
import {resolve} from 'path';
import {fetch, FetchOptions, FetchResponse, FetchResult} from './source';
import {createStationNode, StationNode} from './Station';

export interface GatsbyNode extends StationNode {
  id: string;
  parent: any;
  children: any[];
  internal: {
    content: string;
    contentDigest: string;
    description: string;
    mediaType: string;
    type: string;
  };
}

export interface GatsbyStationNode extends StationNode, GatsbyNode {}

export interface GatsbyOptions {
  name: string;
  typePrefix: string;
  url?: string;
  useLocalData?: boolean;
}

type ComposedOptions = FetchOptions & GatsbyOptions;

export async function sourceNodes(
  {actions: {createNode, setPluginStatus}, createNodeId}: any,
  {
    name,
    typePrefix,
    url,
    useLocalData = true,
    ...fetchOptions
  }: ComposedOptions,
) {
  const {error, fetchedAt, stations} = useLocalData
    ? await fetchLocal()
    : await fetch(url, fetchOptions);

  if (error) {
    throw error;
  }

  stations.forEach((stationNode) => {
    createNode(createGatsbyNode(stationNode, createNodeId));
  });

  setPluginStatus({fetchedAt: fetchedAt.utc().unix()});
}

export async function fetchLocal(): Promise<FetchResult> {
  try {
    const {result} = (await readJson(
      resolve(__dirname, 'data', 'stations.json'),
    )) as FetchResponse;

    return {
      fetchedAt: moment(),
      stations: result.map((stationData) => createStationNode(stationData)),
    };
  } catch (error) {
    return {
      error,
      fetchedAt: moment(),
      stations: [],
    };
  }
}

export function digest(
  content: string,
  algorithm = 'md5',
  encoding: HexBase64Latin1Encoding = 'hex',
) {
  return {
    content,
    contentDigest: createHash(algorithm)
      .update(content)
      .digest(encoding),
  };
}

export function createGatsbyNode(
  stationNode: StationNode,
  createNodeId: (id: string, namespace?: string) => string,
): GatsbyStationNode {
  return {
    id: createNodeId(stationNode.name, 'Station'),
    parent: null,
    children: [],
    internal: {
      ...digest(JSON.stringify(stationNode)),
      description: 'Mobi Bike Station',
      mediaType: 'application/json',
      type: 'Station',
    },
    ...stationNode,
  };
}
