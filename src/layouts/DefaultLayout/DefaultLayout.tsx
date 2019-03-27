import * as React from 'react';

import {graphql, StaticQuery} from 'gatsby';
import {compose, defaultProps, fromRenderProps} from 'recompose';
import {Header, HeaderProps} from './components';

import * as styles from './DefaultLayout.module.scss';

export interface Props {
  errors: any[];
}

interface QueryProps {
  site: {
    siteMetadata: HeaderProps;
  };
}

type ComposedProps = Props & QueryProps;

export function DefaultLayout({
  errors,
  site: {
    siteMetadata: {description, logo, logoUrl},
  },
  ...props
}: ComposedProps) {
  return (
    <div className={styles.Container}>
      <Header description={description} logo={logo} logoUrl={logoUrl} />
      <div className={styles.Content} {...props} />
      {errors.length === 0 ? false : <div>{errors}</div>}
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

export default compose<ComposedProps, {}>(
  defaultProps({
    errors: [],
  }),
  fromRenderProps<QueryProps, {}>(DefaultLayoutQuery, ({site}) => ({site})),
)(DefaultLayout);
