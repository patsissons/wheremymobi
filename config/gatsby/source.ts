import {} from '../../plugins/source-stations/gatsby-node';

export const stationApiSource = {
  resolve: 'source-stations',
  options: {
    name: 'stations',
    localData: 'data/stations.json',
    // useLocalData: true,
    url: 'http://vancouver-ca.smoove.pro/api-public/stations',
    verboseOutput: true,
  },
};
