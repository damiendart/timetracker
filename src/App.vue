<script setup>
  // Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

  import { computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  import TimerList from './components/TimerList.vue';
  import TimerNew from './components/TimerNew.vue';

  const originalDocumentTitle = document.title;
  const store = useStore();

  const allTimers = computed(() => store.getters.allTimers);

  function updateDocumentTitle() {
    document.title = originalDocumentTitle;

    allTimers.value.forEach(
      (timer) => {
        if (timer.isRunning()) {
          document.title = `\u25B6 ${originalDocumentTitle}`;
        }
      },
    );
  }

  watch(allTimers, () => updateDocumentTitle(), { deep: true });

  onMounted(() => updateDocumentTitle());

  const savedStore = localStorage.getItem('store');

  if (savedStore !== null) {
    store.commit('INITIALISE_STORE', JSON.parse(savedStore));
  }
</script>

<template>
  <h1>Time Tracker</h1>
  <TimerList />
  <TimerNew />
</template>
