<script setup>
  import TimerList from './components/TimerList.vue'
  import TimerNew from "./components/TimerNew.vue";
</script>

<script>
  export default {
    beforeCreate() {
      const savedStore = localStorage.getItem('store');

      if (savedStore === null) {
        return;
      }

      this.$store.commit('INITIALISE_STORE', JSON.parse(savedStore));
    }
  };
</script>

<template>
  <h1>Time Tracker</h1>
  <TimerList />
  <TimerNew />
</template>
