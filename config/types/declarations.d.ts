/* eslint-disable */

declare global {
  export const google: any;
}

declare module '*.scss' {
  const content: any;
  export = content;
}

declare module 'react-google-maps' {
  export class BicyclingLayer extends React.PureComponent {}
}

declare module 'react-google-maps/lib/constants' {
  export const MAP: string;
}

declare module 'recompose' {
  import {Observable} from 'rxjs';

  export function fromRenderProps<TInner, TOuter>(
    component: React.ComponentType<React.ConsumerProps<TInner>>,
    propsMapper: mapper<TInner, TOuter>,
  ): InferableComponentEnhancerWithProps<TInner & TOuter, TOuter>;

  export function mapPropsStream<TInner, TOutter>(
    transform: mapper<Observable<TOutter>, Observable<TInner>>,
  ): ComponentEnhancer<TInner, TOutter>;
}
