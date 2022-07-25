import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {App} from 'foundation';

import 'styles/_global.scss';

export default function WhereMyMobiApp({
  Component,
  pageProps: {...props},
}: AppProps) {
  return (
    <App {...props}>
      <Component {...props} />
    </App>
  );
}
