import {Station} from './Station';

export class StationNode {
  public readonly station: Station;

  constructor(station: Station) {
    this.station = station;
  }

  public get isValid() {
    return [
      Number.isInteger(this.station.bikes),
      Number.isInteger(this.station.free),
      Number.isInteger(this.station.total),
      Number.isInteger(this.station.number),
      this.station.number > 0,
      Number.isFinite(this.station.lat),
      this.station.lat !== 0,
      Number.isFinite(this.station.lng),
      this.station.lng !== 0,
      /^\w/.test(this.station.name),
      this.station.errors.length === 0,
    ].every((x) => x);
  }

  toString() {
    return this.isValid
      ? `[${this.station.number}] ${this.station.name} (${
          this.station.bikes
        } | ${this.station.free})`
      : 'INVALID';
  }
}
