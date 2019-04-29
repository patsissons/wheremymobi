import * as React from 'react';

import * as styles from './Control.module.scss';

export interface Props {
  children?: React.ReactNode;
  onClick?(): void;
}

export function Control({onClick, ...props}: Props) {
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={styles.Container}
        {...props}
      />
    );
  }
  return <div className={styles.Container} {...props} />;
}

export default Control;
