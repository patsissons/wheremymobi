import React from 'react';
import classNames from 'classnames';
import {CustomButton} from '../CustomButton';

import styles from './GpsCenterButton.module.scss';

interface Props {
  followGps: boolean;
  position: Position | undefined;
  onClick(): void;
}

export function GpsCenterButton({followGps, position, onClick}: Props) {
  return (
    <CustomButton
      aria-label="Gps Center"
      className={styles.GpsButton}
      disabled={!isValidPosition(position) || followGps}
      onClick={onClick}
    >
      <span
        className={classNames(
          styles.GpsIcon,
          position &&
            (followGps ? styles.GpsIconActive : styles.GpsIconInactive),
        )}
      />
    </CustomButton>
  );
}

export function isValidPosition(position: Position | undefined) {
  return (
    position &&
    position.coords.latitude !== 0 &&
    position.coords.longitude !== 0
  );
}
