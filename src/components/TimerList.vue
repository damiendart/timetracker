<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import TimerItem from './TimerItem.vue';

  const store = useStore();

  const deleteAllTimers = () => { store.dispatch('deleteAllTimers') };
  const allTimers = computed(() => store.getters.allTimers);
</script>

<template>
  <div>
    <ul>
      <li
        v-for="timer in allTimers"
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
