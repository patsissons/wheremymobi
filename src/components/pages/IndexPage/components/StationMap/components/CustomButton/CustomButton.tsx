import React, {ButtonHTMLAttributes} from 'react';
import classNames from 'classnames';

import * as styles from './CustomButton.module.scss';

export function CustomButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames(styles.CustomButton, className)}
      type="button"
      {...props}
    />
  );
}
