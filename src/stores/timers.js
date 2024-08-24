// Copyright (C) Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Timer from '../entities/Timer';

export default defineStore(
  'timer',
  () => {
    const lastTimerId = ref(0);
    const timers = ref([]);

    const allTimers = computed(() => timers.value.map((props) => new Timer(props)));
    const timerById = computed(
      () => (id) => new Timer(timers.value[timers.value.findIndex((timer) => timer.id === id)]),
    );

    function addTimer(payload) {
      const timer = {
        id: payload.id ?? lastTimerId.value,
        name: payload.name,
        timestamps: payload.timestamps ?? [],
      };

      timers.value.push(timer);
      lastTimerId.value += 1;
    }

    function deleteTimer(id) {
      timers.value.splice(
        timers.value.findIndex((timer) => timer.id === id),
        1,
      );
    }

    function deleteAllTimers() {
      timers.value = [];
    }

    function toggleTimer(id, timestamp) {
      const index = timers.value.findIndex((timer) => timer.id === id);

      timers.value[index].timestamps.push(timestamp);
    }

    function updateTimerName(id, name) {
      const index = timers.value.findIndex((timer) => timer.id === id);

      timers.value[index].name = name;
    }

    return {
      addTimer,
      allTimers,
      deleteAllTimers,
      deleteTimer,
      lastTimerId,
      timers,
      timerById,
      toggleTimer,
      updateTimerName,
    };
  },
);
