import {withProps, InferableComponentEnhancerWithProps} from 'recompose';

export interface WithMapsApiKeyProps {
  mapsApiKey: string;
}

export function withMapsApiKey(): InferableComponentEnhancerWithProps<
  WithMapsApiKeyProps,
  any
> {
  return withProps({
    mapsApiKey: 'AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc',
  });
}
