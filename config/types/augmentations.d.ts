import {ComponentType, ConsumerProps} from 'react';
import {InferableComponentEnhancerWithProps, mapper} from 'recompose';
declare module 'recompose' {
  export function fromRenderProps<TInner, TOuter>(
    component: ComponentType<ConsumerProps<TInner>>,
    propsMapper: mapper<TInner, TOuter>
  ): InferableComponentEnhancerWithProps<TInner & TOuter, TOuter>;
}

declare global {
  export const google: any;
}
