// ./frontend/src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Importer le store

import '@fortawesome/fontawesome-free/css/all.css';
import './styles/global.css';

const app = createApp(App);

app.use(router);
app.use(store); // Utiliser le store

store.dispatch('checkLoginState');

app.mount('#app');
