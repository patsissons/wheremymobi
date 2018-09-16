import * as React from 'react';
import {Marker, MarkerProps} from 'react-google-maps';
import {StationNode} from '~/source-stations';

export interface Props extends MarkerProps {
  station: StationNode;
  showInfo(id: string): void;
}

export class StationMarker extends React.PureComponent<Props> {
  handleOnClick = () => {
    this.props.showInfo(this.props.station.id);
  };

  render() {
    const {showInfo, ...markerProps} = this.props;

    return <Marker {...markerProps} onClick={this.handleOnClick} />;
  }
}

export default StationMarker;
