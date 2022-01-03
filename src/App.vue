<script setup>
  // Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

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
