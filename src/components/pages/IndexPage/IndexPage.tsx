import * as React from 'react';
import {DefaultLayout} from '~/layouts';
import StationMap, {StationMapProps} from '~/components/StationMap';

export interface Props extends StationMapProps {}

export function IndexPage({data}: Props) {
  return (
    <DefaultLayout>
      <StationMap data={data} />
    </DefaultLayout>
  );
}

export default IndexPage;
