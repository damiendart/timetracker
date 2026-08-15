// Copyright (C) Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Timer from '../entities/Timer';
import uuidv7 from '../utilities/uuidv7';

export default defineStore(
  'timers',
  () => {
    const timers = ref(new Map());

    const allTimers = computed(
      () => Array.from(timers.value.entries()).map(([id, v]) => new Timer({ id, ...v })),
    );

    const timerById = computed(
      () => (id) => new Timer(timers.value.get(id)),
    );

    function addTimer(name) {
      timers.value.set(uuidv7(), { name, timestamps: [] });
    }

    function deleteTimer(id) {
      timers.value.delete(id);
    }

    function deleteAllTimers() {
      timers.value.clear();
    }

    function toggleTimer(id, timestamp) {
      timers.value.get(id)?.timestamps.push(timestamp);
    }

    function updateTimerName(id, name) {
      timers.value.get(id).name = name;
    }

    return {
      addTimer,
      allTimers,
      deleteAllTimers,
      deleteTimer,
      timers,
      timerById,
      toggleTimer,
      updateTimerName,
    };
  },
);
