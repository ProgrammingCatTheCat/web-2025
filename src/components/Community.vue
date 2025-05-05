  <script setup>
  import { inject } from 'vue';
  const navigateToMain = inject('navigateToMain');
</script>

<template>
    <div class = "header">
  
      <div class ="logo-title">
        <img id = "logo" src="../assets/logo.png" alt="Logo Image" class="example-image" @click="navigateToMain"/>
        <h1 id="title">Chat forum for everyone ...</h1>
      </div>
  
      <div class="button-container">
        <button id="post" class="button-style" @click="navigateToLogin">create a post</button>
        <button id="upload" class="button-style" @click="navigateToRegister">upload a diary</button>
      </div>
      
    </div>
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
    width: 200px;
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