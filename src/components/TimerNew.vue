<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';

  const name = ref('');
  const store = useStore();

  function addTimer() {
    store.dispatch('addTimer', { name: name.value });
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
