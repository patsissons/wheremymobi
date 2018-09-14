import {RestLink} from 'apollo-link-rest';
import {readFile} from 'fs-extra';
import {buildSchema} from 'graphql';
import {resolve} from 'path';
import {graphqlPath} from './graphql';

const anyGlobal: any = global;
anyGlobal.Headers = anyGlobal.Headers || require('fetch-headers');

const restUri = 'http://vancouver-ca.smoove.pro/api-public/stations';

export function createLink() {
  return new RestLink({
    uri: restUri,
    headers: {},
  });
}

export async function createSchema() {
  const data = await readFile(resolve(graphqlPath, 'stations.graphql'));
  return buildSchema(data.toString());
}
