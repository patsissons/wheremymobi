import {metadata, stationApiSource} from './config/gatsby';

export const siteMetadata = {
  title: metadata.name,
  description: metadata.description,
  siteUrl: metadata.homepage,
  author: metadata.author,
};

export const plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-typescript',
  stationApiSource,
];
