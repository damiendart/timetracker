<script setup>
  // Copyright (C) Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information, please refer to the accompanying "LICENCE" file.

  import { storeToRefs } from 'pinia';
  import { onMounted, watch } from 'vue';
  import useTimerStore from './stores/timers';
  import TimerList from './components/TimerList.vue';
  import TimerNew from './components/TimerNew.vue';

  const originalDocumentTitle = document.title;
  const store = useTimerStore();
  const { allTimers } = storeToRefs(store);

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
</script>

<template>
  <h1>Time Tracker</h1>
  <TimerList />
  <TimerNew />
</template>
