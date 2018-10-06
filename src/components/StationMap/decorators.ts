import {defaultProps, InferableComponentEnhancerWithProps} from 'recompose';

export interface WithMapsApiKeyProps {
  mapsApiKey: string;
}

// export function withMapsApiKey(): InferableComponentEnhancerWithProps<
//   WithMapsApiKeyProps,
//   any
// > {
//   return defaultProps({
//     mapsApiKey: 'AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc',
//   });
// }

export const withMapsApiKey = defaultProps({
  mapsApiKey: 'AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc',
});
