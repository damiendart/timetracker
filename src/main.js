// Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

import { createApp, watch } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const application = createApp(App);
const pinia = createPinia();
const savedState = localStorage.getItem('state');

if (savedState !== null) {
  pinia.state.value = JSON.parse(savedState);
}

watch(
  pinia.state,
  (state) => {
    localStorage.setItem('state', JSON.stringify(state));
  },
  { deep: true },
);

application.use(pinia);
application.mount('#app');
