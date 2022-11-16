import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyLoad from 'vue3-lazyload';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store';
import './assets/main.scss';

//////ADD ICONS//////
import { faFishFins } from '@fortawesome/free-solid-svg-icons';
library.add(faFishFins);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueLazyLoad);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
