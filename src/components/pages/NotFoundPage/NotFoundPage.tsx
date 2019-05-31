import React from 'react';

import * as styles from './NotFoundPage.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles.Container}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  );
}
