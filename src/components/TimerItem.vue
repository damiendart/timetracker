<script setup>
  // Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
  // This file is distributed under the MIT licence. For more
  // information,please refer to the accompanying "LICENCE" file.

  // eslint-disable-next-line object-curly-newline
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import { useStore } from 'vuex';
  import formatDuration from '../utilities/formatDuration';

  const elapsedTime = ref(0);
  const store = useStore();

  const props = defineProps(
    {
      id: {
        type: Number,
        required: true,
      },
    },
  );

  const elapsedTimeFormatted = computed(() => formatDuration(elapsedTime.value));
  const timer = computed(() => store.getters.timerById(props.id));
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
      store.dispatch('deleteTimer', props.id);
    }
  }

  function editTimerName() {
    const name = window.prompt('Edit timer name', timerName.value);

    if (name !== null) {
      store.dispatch('updateTimerName', { id: props.id, name });
    }
  }

  function updateElapsedTime() {
    elapsedTime.value = Math.round(
      timer.value.getElapsedTime(Date.now()) / 1000,
    );
  }

  function toggleTimer() {
    store.dispatch(
      'toggleTimer',
      {
        id: props.id,
        dateTime: Date.now(),
      },
    );

    updateElapsedTime();
  }

  onMounted(
    () => {
      updateElapsedTime();

      const intervalId = setInterval(updateElapsedTime, 1000);

      onUnmounted(() => clearInterval(intervalId));
    },
  );
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
