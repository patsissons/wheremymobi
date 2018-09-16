import * as React from 'react';
import {graphql, Link, StaticQuery} from 'gatsby';

import * as styles from './DefaultLayout.module.scss';

const query = graphql`
  query {
    site {
      siteMetadata {
        description
        logo
      }
    }
  }
`;

export interface HeaderProps {
  description: string;
  logo: string;
}

export function Header({description, logo}: HeaderProps) {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLogo}>
        <a href="https://www.mobibikes.ca/en#the-map">
          <img src={logo} />
        </a>
      </div>
      <div className={styles.HeaderContent}>
        <h1>{description}</h1>
      </div>
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
        logo: string;
      };
    };
  };
}

type ComposedProps = Props & QueryProps;

export function DefaultLayout({
  children,
  data: {
    site: {
      siteMetadata: {description, logo},
    },
  },
}: ComposedProps) {
  return (
    <div className={styles.Container}>
      <Header description={description} logo={logo} />
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
