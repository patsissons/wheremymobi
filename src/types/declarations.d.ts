declare module 'recompose' {
  export function fromRenderProps<T, Props, Outer>(
    RenderPropsComponent: React.ComponentType<React.ConsumerProps<Props>>,
    propsMapper: (props: Props) => T,
    renderPropName?: string,
  ): InferableComponentEnhancerWithProps<T, any>;
}
