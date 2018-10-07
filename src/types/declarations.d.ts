import {Observable} from 'rxjs';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'react-google-maps' {
  export class BicyclingLayer extends React.PureComponent {}
}

declare module 'recompose' {
  export function fromRenderProps<T, Props, Outer>(
    RenderPropsComponent: React.ComponentType<React.ConsumerProps<Props>>,
    propsMapper: (props: Props) => T,
    renderPropName?: string,
  ): InferableComponentEnhancerWithProps<T, any>;

  export function mapPropsStream<TInner, TOutter>(
    transform: mapper<Observable<TOutter>, Observable<TInner>>,
  ): ComponentEnhancer<TInner, TOutter>;
}
