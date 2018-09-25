import * as React from 'react';
import {DefaultLayout} from '~/layouts';
import StationMap, {StationMapProps} from '~/components/StationMap';

export interface Props {
  // data?: {
  //   allStation: StationMapProps['stations'];
  // };
  pageContext: {
    allStation: StationMapProps['stations'];
  };
}

export function IndexPage({pageContext: {allStation}}: Props) {
  return (
    <DefaultLayout>
      <StationMap stations={allStation} />
    </DefaultLayout>
  );
}

export default IndexPage;
