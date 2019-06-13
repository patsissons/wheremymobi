import React from 'react';
import Spinner, {SpinnerProps} from 'react-spinkit';

import styles from './Loader.module.scss';

type SpinnerName = 'double-bounce' | 'chasing-dots' | 'circle' | 'cube-grid';
export const loaders: Required<SpinnerProps['name']>[] = [
  'double-bounce',
  'chasing-dots',
  'circle',
  'cube-grid',
];

export function randomLoaderName() {
  return loaders[Math.floor(Math.random() * loaders.length)] as SpinnerName;
}

export interface Props {
  name?: SpinnerName;
}

export function Loader({name = randomLoaderName()}: Props) {
  if (name) {
    return (
      <div className={styles.LoadingContainer}>
        <Spinner className={styles.Loader} name={name} />
      </div>
    );
  }

  return null;
}
