import React from 'react';

import * as styles from './Header.module.scss';

export interface Props {
  description: string;
  logo: string;
  logoUrl: string;
}

export function Header({description, logo, logoUrl}: Props) {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLogo}>
        <a href={logoUrl}>
          <img alt="logo" src={logo} />
        </a>
      </div>
      <div className={styles.HeaderContent}>
        <h1>{description}</h1>
      </div>
    </div>
  );
}
