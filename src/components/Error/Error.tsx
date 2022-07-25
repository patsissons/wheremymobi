import {JsonData} from 'components/JsonData';

export interface Props {
  error: any;
}

export function Error({error}: Props) {
  return <JsonData data={error} />;
}
