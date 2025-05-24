// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由配置
import './assets/main.css';

const app = createApp(App);

// 使用路由配置
app.use(router);
app.mount('#app');