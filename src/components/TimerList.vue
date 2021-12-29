<script setup>
  import TimerItem from './TimerItem.vue';
</script>

<script>
  export default {
    methods: {
      deleteAllTimers: function () {
        this.$store.dispatch('deleteAllTimers');
      },
      getTimers: function () {
        return this.$store.getters.allTimers;
      }
    },
  };
</script>

<template>
  <div>
    <ul>
      <li
        v-for="timer in getTimers()"
        :key="timer.id"
      >
        <TimerItem :id="timer.id" />
      </li>
    </ul>
    <button @click="deleteAllTimers">
      Delete all timers
    </button>
  </div>
</template>
