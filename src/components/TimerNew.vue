<script>
  export default {
    data() {
      return {
        name: '',
      };
    },
    methods: {
      addTimer() {
        this.$store.dispatch('addTimer', this);
        this.name = '';
      },
    },
  };
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
