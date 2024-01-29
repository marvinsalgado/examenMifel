import { createApp } from 'vue'
import './style.css'
import axios from './axios.js'
import store from './store';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css';
import 'primeflex/primeflex.scss';


const app = createApp(App);
app.use(PrimeVue);
app.use(store);
app.config.globalProperties.$axios = axios;
app.mount('#app');

