import * as React from 'react';
import {Link} from 'gatsby';

import * as styles from './DefaultLayout.module.scss';

export function Header() {
  return (
    <div
      style={{
        background: 'rebeccapurple',
        marginBottom: '1.45rem',
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '1.45rem 1.0875rem',
        }}
      >
        <h1 style={{margin: 0}}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Gatsby
          </Link>
        </h1>
      </div>
    </div>
  );
}

export interface Props {
  children: any;
}

type ComposedProps = Props & React.HTMLProps<HTMLDivElement>;

export function DefaultLayout({children}: ComposedProps) {
  return (
    <div>
      <Header />
      <div className={styles.DefaultLayoutContainer}>{children}</div>
    </div>
  );
}

export default DefaultLayout;
