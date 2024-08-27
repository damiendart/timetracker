<script setup>
  // Copyright (C) Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

  // eslint-disable-next-line object-curly-newline
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import useTimerStore from '../stores/timers';
  import formatDuration from '../utilities/formatDuration';

  const intervalId = ref(0);
  const elapsedTime = ref(0);
  const store = useTimerStore();

  const props = defineProps(
    {
      id: {
        type: Number,
        required: true,
      },
    },
  );

  const elapsedTimeFormatted = computed(() => formatDuration(elapsedTime.value));
  const timer = computed(() => store.timerById(props.id));
  const timerName = computed(
    () => {
      if (timer.value.name.length > 0) {
        return timer.value.name;
      }

      return `Timer #${timer.value.id + 1}`;
    },
  );

  function deleteTimer() {
    if (window.confirm(`Are you sure you want to delete "${timerName.value}"?`)) {
      store.deleteTimer(props.id);
    }
  }

  function editTimerName() {
    const name = window.prompt('Edit timer name', timerName.value);

    if (name !== null) {
      store.updateTimerName(props.id, name);
    }
  }

  function updateElapsedTime() {
    elapsedTime.value = Math.round(
      timer.value.getElapsedTime(Date.now()) / 1000,
    );
  }

  function updateTimer() {
    if (timer.value.isRunning()) {
      intervalId.value = setInterval(updateElapsedTime, 100);
    } else {
      clearInterval(intervalId.value);
      intervalId.value = 0;
    }

    updateElapsedTime();
  }

  function toggleTimer() {
    store.toggleTimer(props.id, Date.now());
    updateTimer();
  }

  onMounted(() => updateTimer());
  onUnmounted(() => clearInterval(intervalId.value));
</script>

<template>
  <h3>
    <template v-if="timer.isRunning()">
      &#x25B6;
    </template>
    {{ timerName }}
    <button @click="editTimerName()">
      Edit name
    </button>
  </h3>
  <p>Total time: {{ elapsedTimeFormatted }}</p>

  <button @click="toggleTimer()">
    <template v-if="timer.isRunning()">
      Stop timer
    </template>
    <template v-else>
      Start timer
    </template>
  </button>
  <button @click="deleteTimer()">
    Delete timer
  </button>
</template>
