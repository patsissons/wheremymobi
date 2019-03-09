import * as React from 'react';
import {compose} from 'recompose';
import {Loader, StationMap} from '~/components';
import {DefaultLayout} from '~/layouts';
import {
  // withPosition,
  WithPositionProps,
  // withQueryParams,
  WithQueryParamProps,
  withStations,
  WithStationsProps,
} from './decorators';

type ComposedProps = WithPositionProps &
  WithQueryParamProps &
  WithStationsProps;

export function IndexPage({position, reload, stations}: ComposedProps) {
  console.log('reload', reload);
  return (
    <DefaultLayout>
      {!stations ? (
        <Loader />
      ) : (
        <StationMap
          fetchedAt={stations.fetchedAt}
          location={stations.config.location}
          nodes={stations.nodes}
          position={position}
        />
      )}
    </DefaultLayout>
  );
}

export default compose<ComposedProps, {}>(
  // withQueryParams,
  // withPosition(),
  withStations(),
)(IndexPage);
