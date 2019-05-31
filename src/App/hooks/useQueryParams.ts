import {useDebugValue, useEffect, useState} from 'react';

export type QueryParams = Map<string, string>;

export function useQueryParams() {
  const [params, setParams] = useState<QueryParams>();
  useEffect(() => {
    if (typeof window !== 'undefined' && !params) {
      const params = new Map<string, string>();

      new URLSearchParams(window.location.search).forEach((value, key) => {
        params.set(key.toLowerCase(), value);
      });

      setParams(params);
    }
  }, [params]);
  useDebugValue(
    typeof window === 'undefined' ? 'Loading...' : window.location.search,
  );

  return {
    params,
  };
}
