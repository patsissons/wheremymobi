import {resolve} from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import {writeGraphQLSchema} from './config/gatsby';

export {sourceNodes} from './plugins/gatsby-source-stations/gatsby-node';

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

export function createPages({graphql, actions: {createPage}}: any) {
  return new Promise((done) => {
    createPage({
      path: '/',
      component: resolve(
        'src',
        'components',
        'pages',
        'IndexPage',
        'IndexPage.tsx'
      ),
    });

    done();
  });
}
