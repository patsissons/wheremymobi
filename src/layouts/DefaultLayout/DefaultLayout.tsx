import React from 'react';
import {graphql, StaticQuery} from 'gatsby';
import {Header} from './components';

import * as styles from './DefaultLayout.module.scss';

interface Props {
  children?: any;
}

interface QueryProps {
  site: {
    siteMetadata: {
      description: string;
      logo: string;
      logoUrl: string;
    };
  };
}

export function DefaultLayout(props: Props) {
  return (
    <StaticQuery query={query}>
      {({site: {siteMetadata}}: QueryProps) => (
        <div className={styles.Container}>
          <Header {...siteMetadata} />
          <div className={styles.Content} {...props} />
        </div>
      )}
    </StaticQuery>
  );
}

const query = graphql`
  query {
    site {
      siteMetadata {
        description
        logo
        logoUrl
      }
    }
  }
`;
