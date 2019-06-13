import React from 'react';
import {metadata} from 'config';

import styles from './Header.module.scss';

export function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLogo}>
        <a href="https://www.mobibikes.ca/en#the-map">
          <img
            alt="logo"
            src="https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png"
          />
        </a>
      </div>
      <div className={styles.HeaderContent}>
        <h1>{metadata.description}</h1>
      </div>
    </div>
  );
}
