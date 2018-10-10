import {readJSON} from 'fs-extra';
import {resolve} from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import {writeGraphQLSchema} from './config/gatsby';

const tsconfigPathsPlugin = new TsconfigPathsPlugin({});

export function onCreateWebpackConfig({actions, loaders}: any) {
  actions.setWebpackConfig({
    resolve: {
      plugins: [tsconfigPathsPlugin],
    },
  });
}

export function onPostBootstrap({store}: any) {
  return writeGraphQLSchema(store);
}

export function onCreateDevServer({app}: any) {
  app.get('/static_data', async ({}, res: any) => {
    const data = await readJSON(
      resolve(__dirname, 'src', 'content', 'static_data.json'),
    );
    res.json(data);
  });
}
