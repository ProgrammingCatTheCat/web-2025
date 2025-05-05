<script setup>
  import { ref, watch } from 'vue';
  import { provide } from 'vue';
  import { useRouter, useRoute } from 'vue-router' // 导入 useRouter

  const router = useRouter() // 创建 router 实例
  const route = useRoute();

  const showHeader = ref(true);
  const navigateToLogin = () => {
    console.log('Navigating to login...')
    router.push({ name: 'Login' }) // 编程导航到登录页面
  }

  watch(
    () => route.name,
    (newName) => {
      showHeader.value = (newName !== 'Diary' && newName !== 'Consultation' && newName!== 'Community');
    },
    { immediate: true }
 );


  const navigateToRegister = () => {
    console.log('Navigating to register...')
    router.push({ name: 'Register' }) // 编程导航到注册页面
  }

  const navigateToMain = () => {
    console.log('Navigating to main...')
    router.push({ name: 'Main' }) // 编程导航到主页面
  }

  provide('navigateToMain', navigateToMain);
</script>

<template>
  <div v-if  = "showHeader" class = "header">

    <div class ="logo-title">
      <img id = "logo" src="./assets/logo.png" alt="Logo Image" class="example-image" @click="navigateToMain"/>
      <h1 id="title">You deserve to be happy, what can I help you today :)</h1>
    </div>

    <div class="button-container">
      <button id="login" class="button-style" @click="navigateToLogin">log in</button>
      <button id="register" class="button-style" @click="navigateToRegister">register</button>
    </div>
    
  </div>
  <router-view></router-view>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 228, 196, 0.7);
}

.logo-title {
  display: flex;
  align-items: center;
}

.example-image{
  width: 100px;
  height: auto;
  margin-right: 10px;
}

.button-container {
  display: flex;
  align-items: center;
}

.button-style {
  width: 100px;
  height: 50px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 20px; /* 按钮的文字大小 */
  color: white; /* 按钮的文字颜色 */
  background-color: #f9c90a; /* 按钮的背景颜色 */
  border: none; /* 去掉边框 */
  border-radius: 10px; /* 圆角 */
  cursor: pointer; /* 鼠标悬停时显示为指针 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
}

.button-style:hover {
  background-color: #e97924; /* 鼠标悬停时的背景颜色 */
}
</style>
