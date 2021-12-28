<script>
  import { onUnmounted } from 'vue';

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

  export default {
    props: {
      id: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        elapsedTime: 0,
      };
    },
    computed: {
      timer() {
        const timerIndex = this.$store.getters.timers.findIndex(
          (timer) => timer.id === this.id,
        );

        return new Timer(this.$store.getters.timers[timerIndex]);
      },
    },
    mounted() {
      const intervalId = setInterval(this.updateElapsedTime, 1000);

      onUnmounted(() => clearInterval(intervalId));
    },
    methods: {
      deleteTimer: function () {
        this.$store.dispatch('deleteTimer', this.id);
      },
      updateElapsedTime: function () {
        this.elapsedTime = Math.round(
          this.timer.getElapsedTime(Date.now()) / 1000
        );
      },
      toggleTimer: function () {
        this.$store.dispatch(
          'toggleTimer',
          {
            id: this.id,
            dateTime: Date.now(),
          },
        );
        this.updateElapsedTime();
      }
    },
  };
</script>

<template>
  <h2>{{ timer.id }}: {{ timer.name }}</h2>
  <p>Total time: {{ elapsedTime }} seconds</p>

  <button @click="toggleTimer()">
    Toggle timer
  </button>
  <button @click="deleteTimer()">
    Delete timer
  </button>
</template>
