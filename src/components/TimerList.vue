<script>
  export default {
    computed: {
      timers() {
        return this.$store.getters.timers;
      },
    },
    methods: {
      deleteTimer: function (id) {
        this.$store.dispatch('deleteTimer', id);
      },
      deleteAllTimers: function () {
        this.$store.dispatch('deleteAllTimers');
      }
    },
  };
</script>

<template>
  <div>
    <ul>
      <li
        v-for="timer in timers"
        :key="timer.id"
      >
        <h2>{{ timer.id }}: {{ timer.name }}</h2>
        <button @click="deleteTimer(timer.id)">
          Delete timer
        </button>
      </li>
    </ul>
    <button @click="deleteAllTimers">
      Delete all timers
    </button>
  </div>
</template>
