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
