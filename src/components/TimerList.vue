<script setup>
  // Copyright (C) Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information, please refer to the accompanying "LICENCE" file.

  import TimerItem from './TimerItem.vue';
  import useTimerStore from '../stores/timers';

  const store = useTimerStore();

  function deleteAllTimers() {
    if (window.confirm('Are you sure you want to delete all timers?')) {
      store.deleteAllTimers();
    }
  }
</script>

<template>
  <h2>Current timers</h2>
  <ul>
    <li
      v-for="timer in store.allTimers"
      :key="timer.id"
    >
      <TimerItem :id="timer.id" />
    </li>
  </ul>
  <button
    :disabled="!(store.allTimers.length > 0)"
    @click="deleteAllTimers"
  >
    Delete all timers
  </button>
</template>
