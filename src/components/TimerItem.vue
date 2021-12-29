<script>
  import { onUnmounted } from 'vue';

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
        return this.$store.getters.timerById(this.id);
      },
      timerName() {
        if (this.timer.name.length > 0) {
          return this.timer.name;
        }

        return `Timer #${this.timer.id + 1}`;
      }
    },
    mounted() {
      this.updateElapsedTime();

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
  <h2>{{ timerName }}</h2>
  <p>Total time: {{ elapsedTime }} seconds</p>

  <button @click="toggleTimer()">
    Toggle timer
  </button>
  <button @click="deleteTimer()">
    Delete timer
  </button>
</template>
