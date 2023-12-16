import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

createApp(App).config.globalProperties.$axios = axios;
createApp(App).use(router).mount('#app')
