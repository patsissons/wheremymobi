import {defaultProps} from 'recompose';

export interface WithMapsApiKeyProps {
  mapsApiKey: string;
}

export const withMapsApiKey = defaultProps({
  mapsApiKey: 'AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc',
});
