import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'flowbite';
import 'animate.css';
import './style.css'
import { useHttpStore } from './stores/HttpStore';

import router from './router/routes'


import App from './App.vue'

const pinia = createPinia()

const app = createApp(App);

app.use(pinia)

app.config.globalProperties.$http = useHttpStore();

app.use(router).mount('#app')
