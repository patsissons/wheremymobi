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

export async function createPages({graphql, actions: {createPage}}: any) {
  const {data, errors} = await graphql(
    `
      {
        allStation {
          totalCount
          edges {
            node {
              id
              number
              name
              lat
              lng
              bikes
              free
              total
              operative
              style
              valid
            }
          }
        }
      }
    `
  );

  if (errors) {
    console.log(errors);
    throw new Error(errors);
  }

  createPage({
    path: '/',
    component: resolve('src', 'components', 'pages', 'IndexPage', 'index.ts'),
    context: data,
  });
}
