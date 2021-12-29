class Timer {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.timestamps = props.timestamps;
  }

  getElapsedTime(currentTime) {
    return this._getTimestampPairs().reduce(
      (carry, pair) => carry + ((pair.length > 1) ? pair[1] : currentTime) - pair[0],
      0,
    );
  }

  _getTimestampPairs() {
    let pairs = [];
    let i = 0;

    while (i < this.timestamps.length) {
      pairs.push(this.timestamps.slice(i, i += 2));
    }

    return pairs;
  }
}

export default Timer;
