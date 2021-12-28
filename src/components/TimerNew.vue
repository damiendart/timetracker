<script>
  export default {
    data() {
      return {
        id: 0,
        name: '',
      };
    },
    methods: {
      addTimer: function () {
        this.$store.dispatch('addTimer', this);
        this.id++;
        this.name ='';
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
