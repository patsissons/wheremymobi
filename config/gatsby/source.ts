import {} from '../../plugins/source-stations/gatsby-node';

export const stationApiSource = {
  resolve: 'source-stations',
  options: {
    // auth: false,
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // method: 'get',
    name: 'stations',
    // typePrefix: 'Station',
    localData: 'data/stations.json',
    useLocalData: true,
    url: 'http://vancouver-ca.smoove.pro/api-public/stations',
    verboseOutput: true,
  },
};
