import {createLink, createSchema} from './config/gatsby';
import config from './package.json';

export const siteMetadata = {
  title: config.name,
  description: config.description,
  siteUrl: config.homepage,
  author: config.author,
};

export const plugins = [
  'gatsby-plugin-typescript',
  {
    resolve: 'gatsby-source-graphql',
    options: {
      createLink,
      createSchema,
      fieldName: 'stations',
      typeName: 'MobiStations',
    },
  },
];
