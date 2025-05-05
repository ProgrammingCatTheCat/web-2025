// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../components/Main.vue' // 导入 Main.vue
import Login from '../components/Login.vue' // 导入 Login.vue

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main // 使用 Main.vue 作为主页组件
  },
  {
    path: '/login',
    name: 'Login',
    component: Login // 使用 Login.vue 作为登录组件
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue') // 注册组件
  },
  {
    path: '/diary',
    name: 'Diary',
    component: () => import('../components/Diary.vue') // 用户组件
  },
  {
    path: '/consultation',
    name: 'Consultation',
    component: () => import('../components/Consultation.vue')
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('../components/Community.vue') 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router