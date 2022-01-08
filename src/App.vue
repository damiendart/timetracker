<script setup>
  // Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

  import TimerList from './components/TimerList.vue'
  import TimerNew from "./components/TimerNew.vue";
</script>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        originalDocumentTitle: document.title,
      };
    },
    computed: {
      ...mapGetters(['allTimers']),
    },
    watch: {
      allTimers: {
        deep: true,
        handler(timers) {
          this.updateDocumentTitle();
        },
      }
    },
    beforeCreate() {
      const savedStore = localStorage.getItem('store');

      if (savedStore === null) {
        return;
      }

      this.$store.commit('INITIALISE_STORE', JSON.parse(savedStore));
    },
    mounted() {
      this.updateDocumentTitle(this.allTimers);
    },
    methods: {
      updateDocumentTitle: function () {
        for (const timer of this.allTimers) {
          if (timer.isRunning()) {
            document.title = `\u25B6 ${this.originalDocumentTitle}`;
            return;
          }
        }

        document.title = this.originalDocumentTitle;
      },
    }
  };
</script>

<template>
  <h1>Time Tracker</h1>
  <TimerList />
  <TimerNew />
</template>
