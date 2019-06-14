import React from 'react';
import {GoogleMapProvider} from '@googlemap-react/core';
import {Loader} from 'components';
import {Header, StationMap} from './components';
import {useQueryParams, usePosition, useStations} from './hooks';

import styles from './App.module.scss';

export function App() {
  const {params} = useQueryParams();
  const {position} = usePosition({params});
  const {stationSourceResult, updateStations} = useStations({params});
  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.Content}>
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
      </div>
    </div>
  );
}
