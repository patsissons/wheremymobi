import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data, url }) => {
  return {
    ...data,
    debug: url.searchParams.has('debug'),
  };
};
