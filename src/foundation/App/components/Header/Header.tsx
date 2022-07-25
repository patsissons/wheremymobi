import React from 'react';

import styles from './Header.module.scss';

export const logoUri =
  'https://www.mobibikes.ca/sites/all/themes/smoove_bootstrap/logo.png';

export function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLogo}>
        <a href="https://www.mobibikes.ca/en#the-map">
          <img alt="logo" src={logoUri} />
        </a>
      </div>
    </div>
  );
}
