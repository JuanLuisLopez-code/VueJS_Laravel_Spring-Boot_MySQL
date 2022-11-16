import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyLoad from 'vue3-lazyload';
import store from './store';

import './assets/main.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueLazyLoad);

app.mount('#app');
