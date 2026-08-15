<script setup>
  // Copyright (C) Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

  import { ref } from 'vue';
  import useTimerStore from '../stores/timers';

  const name = ref('');
  const store = useTimerStore();

  function addTimer() {
    store.addTimer(name.value);
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
