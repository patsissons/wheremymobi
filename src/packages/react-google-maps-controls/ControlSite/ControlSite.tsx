import * as React from 'react';

import * as PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import {MAP} from 'react-google-maps/lib/constants';
import {compose} from 'recompose';

import * as styles from './ControlSite.module.scss';

export interface Props {
  position?: google.maps.ControlPosition;
}

export class ControlSite extends React.PureComponent<Props> {
  static contextTypes = {[MAP]: PropTypes.object};

  private readonly containerRef = React.createRef<HTMLDivElement>();

  get map(): google.maps.Map {
    return this.context[MAP];
  }

  componentDidMount() {
    const {position = google.maps.ControlPosition.BOTTOM_CENTER} = this.props;

    if (this.containerRef.current) {
      this.map.controls[position].push(this.containerRef.current);
    }
  }

  componentWillUnmount() {
    const {position = google.maps.ControlPosition.BOTTOM_CENTER} = this.props;

    if (this.containerRef.current) {
      this.map.controls[position].removeAt(
        this.map.controls[position]
          .getArray()
          .indexOf(this.containerRef.current),
      );
    }
  }

  render() {
    const {children} = this.props;

    return createPortal(
      <div className={styles.Container} ref={this.containerRef}>
        {children}
      </div>,
      this.map.getDiv(),
    );
  }
}

export default ControlSite;
