import {writeFile} from 'fs-extra';
import {graphql, introspectionQuery, printSchema} from 'graphql';
import {join, resolve} from 'path';

export async function writeGraphQLSchema(store: any) {
  try {
    const outputPath = resolve(process.cwd(), 'src', 'graphql', 'generated');
    const {schema} = store.getState();
    const data = await graphql(schema, introspectionQuery);

    await Promise.all([
      writeFile(join(outputPath, 'schema.json'), JSON.stringify(data, null, 2)),
      writeFile(join(outputPath, 'schema.graphql'), printSchema(schema)),
    ]);
  } catch (e) {
    console.log('Failed to write schema: ', e);
  }
}
