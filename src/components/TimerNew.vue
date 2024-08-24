<script setup>
  import { ref } from 'vue';
  import useTimerStore from '../stores/timers';

  const name = ref('');
  const store = useTimerStore();

  function addTimer() {
    store.addTimer({ name: name.value });
    name.value = '';
  }
</script>

<template>
  <h2>Add a timer</h2>
  <form @submit.prevent="addTimer">
    <input
      v-model="name"
      type="text"
      placeholder="Create mockup"
    >
    <input
      type="submit"
      value="Add timer"
    >
  </form>
</template>
