import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  return {
    debug: url.searchParams.has('debug'),
  };
};
