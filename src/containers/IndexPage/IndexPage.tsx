// import React from 'react';
import {GoogleMapProvider} from '@googlemap-react/core';
import {Loader} from 'components/Loader';
// import {JsonData} from 'components/JsonData';

import {StationMap} from './components';
import {useQueryParams, usePosition, useStations} from './hooks';

export function IndexPage() {
  const {params} = useQueryParams();
  const {position} = usePosition({params});
  const {stationSourceResult, updateStations} = useStations({params});

  if (!stationSourceResult) {
    return <Loader />;
  }

  // return <JsonData data={{params, position, stationSourceResult}} />;
  return (
    <GoogleMapProvider>
      <StationMap
        fetchedAt={stationSourceResult.fetchedAt}
        location={stationSourceResult.config.location}
        stations={stationSourceResult.stations}
        position={position}
        updateStations={updateStations}
      />
    </GoogleMapProvider>
  );
}
