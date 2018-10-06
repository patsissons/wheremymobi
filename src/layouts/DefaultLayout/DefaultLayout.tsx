import * as React from 'react';
import {graphql, StaticQuery} from 'gatsby';
import {compose, fromRenderProps} from 'recompose';
import {Header, HeaderProps} from './components';

import * as styles from './DefaultLayout.module.scss';

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
  fromRenderProps<Props, {}>(DefaultLayoutQuery, ({site}) => ({site})),
)(DefaultLayout);
