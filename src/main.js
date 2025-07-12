// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由配置
import './assets/main.css';
import axios from 'axios';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

// 使用路由配置
app.use(router);
app.mount('#app');