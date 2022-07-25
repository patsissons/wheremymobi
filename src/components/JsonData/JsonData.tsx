import styles from './JsonData.module.css';

export interface Props {
  data: any;
  replacer?: (number | string)[] | null;
}

export function JsonData({data, replacer = null}: Props) {
  return <pre className={styles.data}>{JSON.stringify(data, replacer, 2)}</pre>;
}
