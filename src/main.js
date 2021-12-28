import { createApp } from 'vue'

import App from './App.vue'
import store from './store';

const application = createApp(App);

application.use(store);
application.mount('#app');
