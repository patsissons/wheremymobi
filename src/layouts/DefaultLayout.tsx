import * as React from 'react';
import {graphql, Link, StaticQuery} from 'gatsby';

import * as styles from './DefaultLayout.module.scss';

const query = graphql`
  query {
    site {
      siteMetadata {
        description
      }
    }
  }
`;

export interface HeaderProps {
  description: string;
}

export function Header({description}: HeaderProps) {
  return (
    <div className={styles.Header}>
      <h1 className={styles.HeaderContent}>{description}</h1>
    </div>
  );
}

export interface Props {
  children: any;
}

export interface QueryProps {
  data: {
    site: {
      siteMetadata: {
        description: string;
      };
    };
  };
}

type ComposedProps = Props & QueryProps;

export function DefaultLayout({
  children,
  data: {
    site: {
      siteMetadata: {description},
    },
  },
}: ComposedProps) {
  return (
    <div className={styles.Container}>
      <Header description={description} />
      <div className={styles.Content}>{children}</div>
    </div>
  );
}

export default function({children}: Props) {
  return (
    <StaticQuery query={query}>
      {(data) => <DefaultLayout data={data}>{children}</DefaultLayout>}
    </StaticQuery>
  );
}
