import * as React from 'react';
import {graphql} from 'gatsby';
import moment from 'moment';
import {
  compose,
  // mapPropsStreamWithConfig,
  mapPropsStream,
} from 'recompose';
// import rxjsConfig from 'recompose/rxjsObservableConfig';
import {timer} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {DefaultLayout} from '~/layouts';
import StationMap from '~/components/StationMap';
import {fetch} from '~/gatsby-source-stations';
import {FetchResult} from '~/gatsby-source-stations/source';
import {createStationNode, StationNode} from '~/gatsby-source-stations/Station';

export interface QueryProps {
  allStation: {
    edges: {
      node: StationNode;
    }[];
  };
}

export interface Props {
  data?: QueryProps;
  result?: FetchResult;
}

export function IndexPage({data, result}: Props) {
  if (!data && !result) {
    return <div>Loading...</div>;
  }

  const resolveResults = (): FetchResult => {
    if (result) {
      return result;
    }

    if (data) {
      return {
        fetchedAt: moment(),
        stations: data.allStation.edges.map(({node}) => node),
      };
    }

    return {
      error: new Error('fail'),
      fetchedAt: moment(),
      stations: [],
    };
  };

  const {error, fetchedAt, stations} = resolveResults();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <DefaultLayout>
      <StationMap fetchedAt={fetchedAt} stations={stations} />
    </DefaultLayout>
  );
}

export const fragment = graphql`
  fragment IndexPageFragment on Query {
    allStation {
      totalCount
      edges {
        node {
          id
          number
          name
          lat
          lng
          bikes
          free
          total
          operative
          style
          valid
        }
      }
    }
  }
`;

export default IndexPage;
// export default compose<Props, {}>(
//   mapPropsStream(() => {
//     return timer(0, 1000 * 60 * 5).pipe(
//       mergeMap(() => fetch()),
//       map((result) => {
//         return {
//           result,
//         };
//       }),
//       startWith({}),
//     );
//   }),
// )(IndexPage);
