import React from 'react';
import {GoogleMapProvider} from '@googlemap-react/core';
import {Loader} from '~/components';
import {DefaultLayout} from '~/layouts';
import {StationMap} from './components';
import {useQueryParams, usePosition, useStations} from './hooks';

export function IndexPage() {
  const {params} = useQueryParams();
  const {position} = usePosition({params});
  const {stationSourceResult, updateStations} = useStations({params});

  return (
    <DefaultLayout>
      {stationSourceResult ? (
        <GoogleMapProvider>
          <StationMap
            fetchedAt={stationSourceResult.fetchedAt}
            location={stationSourceResult.config.location}
            stations={stationSourceResult.stations}
            position={position}
            updateStations={updateStations}
          />
        </GoogleMapProvider>
      ) : (
        <Loader />
      )}
    </DefaultLayout>
  );
}
