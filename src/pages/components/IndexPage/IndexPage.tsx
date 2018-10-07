import * as React from 'react';
import {compose} from 'recompose';
import {Loader, StationMap} from '~/components';
import {DefaultLayout} from '~/layouts';
import {
  withPosition,
  WithPositionProps,
  withQueryParams,
  WithQueryParamProps,
  withStations,
  WithStationsProps,
} from './decorators';

type ComposedProps = WithPositionProps &
  WithQueryParamProps &
  WithStationsProps;

export function IndexPage({params, position, stations}: ComposedProps) {
  const isLoading = !params || !stations;

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <StationMap fetchedAt={stations.fetchedAt} nodes={stations.nodes} />
      )}
    </DefaultLayout>
  );
}

export default compose<ComposedProps, {}>(
  withQueryParams,
  withPosition(),
  withStations('vancouver'),
)(IndexPage);
