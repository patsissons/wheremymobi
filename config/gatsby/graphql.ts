import {writeFile} from 'fs-extra';
import {graphql, introspectionQuery, printSchema} from 'graphql';
import {resolve} from 'path';

export const outputPath = resolve(process.cwd(), 'build');
export const graphqlPath = resolve(process.cwd(), 'src', 'graphql');

export async function writeGraphQLSchema(store: any) {
  try {
    const {schema} = store.getState();
    const data = await graphql(schema, introspectionQuery);

    await Promise.all([
      writeFile(
        resolve(outputPath, 'schema.json'),
        JSON.stringify(data, null, 2)
      ),
      writeFile(resolve(outputPath, 'schema.graphql'), printSchema(schema)),
    ]);
  } catch (e) {
    console.log('Failed to write schema: ', e);
  }
}
