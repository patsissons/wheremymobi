import {graphql} from 'gatsby';
import {IndexPage} from '~/components';

export const query = graphql`
  query {
    ...IndexPageFragment
  }
`;

export default IndexPage;
