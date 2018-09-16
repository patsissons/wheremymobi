import {metadata, stationApiSource} from './config/gatsby';

export const siteMetadata = {
  author: metadata.author,
  description: metadata.description,
  logo: 'https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png',
  siteUrl: metadata.homepage,
  title: metadata.name,
};

export const plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-typescript',
  stationApiSource,
];
