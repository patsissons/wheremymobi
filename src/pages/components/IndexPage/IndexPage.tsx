import * as React from 'react';
import moment from 'moment';
import {compose, mapPropsStream} from 'recompose';
import {timer} from 'rxjs';
import {map, mergeMap, startWith} from 'rxjs/operators';
import {Loader, StationMap} from '~/components';
import {FetchResult, fetchObservable} from '~/gatsby-source-stations/source';
import {DefaultLayout} from '~/layouts';

export interface Props {
  result?: FetchResult;
}

export function IndexPage({result}: Props) {
  if (!result) {
    return <Loader />;
  }

  const resolveResults = (): FetchResult => {
    if (result && result.fetchedAt && result.stations) {
      return result;
    }

    return {
      error: new Error('fail'),
      fetchedAt: moment(),
      stations: [],
    };
  };

  const {error, fetchedAt, stations} = resolveResults();

  return (
    <DefaultLayout>
      {Boolean(error) && <div>{error.message}</div>}
      <StationMap fetchedAt={fetchedAt} stations={stations} />
    </DefaultLayout>
  );
}

export default compose<Props, {}>(
  mapPropsStream(() => {
    return timer(0, 1000 * 60 * 5).pipe(
      mergeMap(() => fetchObservable()),
      map((result) => {
        return {
          result,
        };
      }),
      startWith({}),
    );
  }),
)(IndexPage);
