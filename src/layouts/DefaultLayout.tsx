import * as React from 'react';
import {graphql, Link, StaticQuery} from 'gatsby';
import {compose, fromRenderProps} from 'recompose';

import * as styles from './DefaultLayout.module.scss';

export interface HeaderProps {
  description: string;
  logo: string;
  logoUrl: string;
}

export function Header({description, logo, logoUrl}: HeaderProps) {
  return (
    <div className={styles.Header}>
      <div className={styles.HeaderLogo}>
        <a href={logoUrl}>
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
  site: {
    siteMetadata: HeaderProps;
  };
}

export function DefaultLayout({
  site: {
    siteMetadata: {description, logo, logoUrl},
  },
  ...props
}: Props) {
  return (
    <div className={styles.Container}>
      <Header description={description} logo={logo} logoUrl={logoUrl} />
      <div className={styles.Content} {...props} />
    </div>
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

function DefaultLayoutQuery({...props}: any) {
  return <StaticQuery query={query} {...props} />;
}

export default compose<Props, {}>(
  fromRenderProps<Props, {}>(DefaultLayoutQuery, ({site}) => ({site}))
)(DefaultLayout);
