<script setup>
  // Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import TimerItem from './TimerItem.vue';

  const store = useStore();

  const deleteAllTimers = () => {
    if (window.confirm('Are you sure you want to delete all timers?')) {
      store.dispatch('deleteAllTimers');
    }
  };
  const allTimers = computed(() => store.getters.allTimers);
</script>

<template>
  <h2>Current timers</h2>
  <ul>
    <li
      v-for="timer in allTimers"
      :key="timer.id"
    >
      <TimerItem :id="timer.id" />
    </li>
  </ul>
  <button
    :disabled="!(allTimers.length > 0)"
    @click="deleteAllTimers"
  >
    Delete all timers
  </button>
</template>
