import {env, metadata} from './config/gatsby';

export const siteMetadata = {
  env,
  author: metadata.author,
  description: metadata.description,
  logo: 'https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png',
  logoUrl: 'https://www.mobibikes.ca/en#the-map',
  siteUrl: metadata.homepage,
  title: metadata.name,
};

export const plugins = [
  {
    resolve: `gatsby-plugin-sass`,
    options: {
      data: '@import "shared.scss";@import "global.scss";',
      includePaths: ['src/styles'],
    },
  },
  'gatsby-plugin-typescript',
];

export const pathPrefix = '/';
