// Copyright (C) Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const application = createApp(App);
const pinia = createPinia();
const savedState = localStorage.getItem('state');

if (savedState !== null) {
  pinia.state.value = JSON.parse(
    savedState,
    (key, value) => {
      if (
        typeof value === 'object'
        && value !== null
        // eslint-disable-next-line no-underscore-dangle
        && value.__type === 'Map'
      ) {
          return new Map(value.value);
      }

      return value;
    },
  );
}

watch(
  pinia.state,
  (state) => {
    localStorage.setItem(
      'state',
      JSON.stringify(
        state,
        (key, value) => {
          if (value instanceof Map) {
            return { __type: 'Map', value: Array.from(value.entries()) };
          }

          return value;
        },
      ),
    );
  },
  { deep: true },
);

application.use(pinia);
application.mount('#app');
