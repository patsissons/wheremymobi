import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import {writeGraphQLSchema} from './config/gatsby';

const tsconfigPathsPlugin = new TsconfigPathsPlugin({});

export function onCreateWebpackConfig({actions, loaders}: any) {
  actions.setWebpackConfig({
    resolve: {
      plugins: [tsconfigPathsPlugin],
    },
    devServer: {
      disableHostCheck: true,
    },
  });
}

export function onPostBootstrap({store}: any) {
  return writeGraphQLSchema(store);
}
