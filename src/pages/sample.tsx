import * as React from 'react';
import {graphql as gql} from 'gatsby';
import {IndexPage} from '~/components';

export default IndexPage;

export const query = gql`
  query {
    ...StationMapFragment
  }
`;
