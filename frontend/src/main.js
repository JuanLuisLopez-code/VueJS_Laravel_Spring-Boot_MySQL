import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyLoad from 'vue3-lazyload';
import Toaster from "@meforma/vue-toaster";
import { library } from '@fortawesome/fontawesome-svg-core'
import vSelect from 'vue-select'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/main.scss';


//////ADD ICONS//////
import { faFishFins, faHeart, faComment, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
library.add(faFishFins);
library.add(faHeart);
library.add(faComment);
library.add(faMagnifyingGlass);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueLazyLoad);
app.use(Toaster);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('v-select', vSelect)
app.mount('#app');
