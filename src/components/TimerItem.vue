<script>
  // Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

  import { onUnmounted } from 'vue';
  import formatDuration from '../utilities/formatDuration';

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
      elapsedTimeFormatted() {
        return formatDuration(this.elapsedTime)
      },
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
        if (window.confirm(`Are you sure you want to delete "${this.timerName}"?`)) {
          this.$store.dispatch('deleteTimer', this.id);
        }
      },
      editTimerName: function () {
        const name = window.prompt('Edit timer name', this.timerName);

        if (name !== null) {
          this.$store.dispatch('updateTimerName', { id: this.id, name });
        }
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
  <h2>
    <template v-if="timer.isRunning()">&#x25B6; </template>{{ timerName }}
    <button @click="editTimerName()">
      Edit name
    </button>
  </h2>
  <p>Total time: {{ elapsedTimeFormatted }}</p>

  <button @click="toggleTimer()">
    <template v-if="timer.isRunning()">
      Stop timer
    </template>
    <template v-else>
      Start timer
    </template>
  </button>
  <button @click="deleteTimer()">
    Delete timer
  </button>
</template>
