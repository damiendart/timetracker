// Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

class Timer {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.timestamps = props.timestamps;
  }

  getElapsedTime(currentTime) {
    return this.getTimestampPairs().reduce(
      (carry, pair) => carry + ((pair.length > 1) ? pair[1] : currentTime) - pair[0],
      0,
    );
  }

  isRunning() {
    return this.timestamps.length > 0
      && this.getTimestampPairs().pop().length === 1;
  }

  getTimestampPairs() {
    let i = 0;
    const pairs = [];

    while (i < this.timestamps.length) {
      pairs.push(this.timestamps.slice(i, i += 2));
    }

    return pairs;
  }
}

export default Timer;
