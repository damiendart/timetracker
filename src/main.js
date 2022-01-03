// Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

import { createApp } from 'vue'

import App from './App.vue'
import store from './store';

const application = createApp(App);

application.use(store);
application.mount('#app');
