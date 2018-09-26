import * as React from 'react';
import {graphql} from 'gatsby';
import {DefaultLayout} from '~/layouts';
import StationMap, {StationMapProps} from '~/components/StationMap';

export interface Props {
  data?: {
    allStation: StationMapProps['stations'];
  };
}

export function IndexPage({
  data: {allStation} = {allStation: {totalCount: 0, edges: []}},
}: Props) {
  return (
    <DefaultLayout>
      <StationMap stations={allStation} />
    </DefaultLayout>
  );
}

export const query = graphql`
  query {
    ...StationMapFragment
  }
`;

export default IndexPage;
