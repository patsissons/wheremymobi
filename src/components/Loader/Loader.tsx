import * as React from 'react';

import Spinner, {SpinnerProps} from 'react-spinkit';
import {compose, withProps} from 'recompose';

import * as styles from './Loader.module.scss';

const loaders: Required<SpinnerProps['name']>[] = [
  'double-bounce',
  'chasing-dots',
  'circle',
  'cube-grid',
];

function randomLoaderName() {
  return loaders[Math.floor(Math.random() * loaders.length)];
}

export interface Props {
  name?: SpinnerProps['name'];
}

export function Loader({name}: Props) {
  return (
    Boolean(name) && (
      <div className={styles.LoadingContainer}>
        <Spinner className={styles.Loader} name={name} />
      </div>
    )
  );
}

export default compose<Props, {}>(
  withProps(({name}: Props) => ({name: name || randomLoaderName()})),
)(Loader as any);
