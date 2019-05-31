import React from 'react';
import Spinner, {SpinnerProps} from 'react-spinkit';

import * as styles from './Loader.module.scss';

type SpinnerNames = 'double-bounce' | 'chasing-dots' | 'circle' | 'cube-grid';
export const loaders: Required<SpinnerProps['name']>[] = [
  'double-bounce',
  'chasing-dots',
  'circle',
  'cube-grid',
];

export function randomLoaderName() {
  return loaders[Math.floor(Math.random() * loaders.length)];
}

export interface Props {
  name?: SpinnerNames;
}

export function Loader({name}: Props) {
  if (name) {
    return (
      <div className={styles.LoadingContainer}>
        <Spinner className={styles.Loader} name={name || randomLoaderName()} />
      </div>
    );
  }

  return null;
}
