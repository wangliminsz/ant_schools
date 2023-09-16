import { createApp } from 'vue'
import App from './App.vue'

import './styles.css'

import './assets/styles.css'

import './assets/tailwind.css'

// fontawesome
import '@fortawesome/fontawesome-free/css/all.css'

import router from './router'
import store from './store'; // Import the Vuex store

const app = createApp(App);

app.use(store); // Use the Vuex store
app.use(router);

app.mount('#app');

// createApp(App).mount('#app')
