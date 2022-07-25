import React, {PropsWithChildren} from 'react';
import {GoogleMapProvider} from '@googlemap-react/core';
import {Loader} from 'components';

import {Header} from './components';
import styles from './App.module.scss';

export function App({children}: PropsWithChildren) {
  return (
    <div className={styles.Container}>
      <Header />
      <div className={styles.Content}>{children}</div>
    </div>
  );
}
