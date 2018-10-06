import * as React from 'react';
import Spinner, {SpinnerProps} from 'react-spinkit';

import * as styles from './Loader.module.scss';

const loaders: Required<SpinnerProps['name']>[] = [
  'double-bounce',
  'chasing-dots',
  'circle',
  'cube-grid',
];

function randomLoader() {
  return loaders[Math.floor(Math.random() * loaders.length)];
}

export function Loader() {
  return (
    <div className={styles.LoadingContainer}>
      <Spinner className={styles.Loader} name={randomLoader()} />
    </div>
  );
}

export default Loader;
