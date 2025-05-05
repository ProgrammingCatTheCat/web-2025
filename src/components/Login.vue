<!-- src/components/Login.vue -->
<template>
  <div class="Login">
  
    <div class="main">
      <div class="login-form">
        <input type="text" placeholder="Email Address" v-model="email" class="input-field">
        <input type="password" placeholder="Password" v-model="password" class="input-field">
        <button class="login-button" @click="login">log in</button>
        <p class="forgot-password">
          <a href="#" @click.prevent="forgotPassword">Forgot password</a> or
          <a href="#" @click.prevent="register">Register</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
   name: 'Login', 
   data() {
    return {
     email: '',
     password: '' 
    };
   },
   methods: {
    async login() {
      console.log('Login button clicked');
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // 添加其他登录逻辑，如验证用户名和密码等
    },
    forgotPassword() {
      console.log('Forgot password button clicked');
    },
    register() {
      // 注册逻辑
      console.log('Register button clicked');
    }
   }
  }
</script>
  
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
  
.example-image {
  width: 100px;
  height: auto;
  margin-right: 10px;
}
  
.main {
  display: flex;
  margin-top:5%;
  margin-right: 5%;
  justify-content: center; /* 使 login-form 靠右对齐 */
  padding: 20px; /* 添加一些内边距 */
}
  
.login-form {
  display: flex;
  flex-direction: column; /* 按列排列 */
  align-items: center; /* 使子元素左对齐 */
  width: 600px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}
  
.input-field {
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 0; /* 移除右侧外边距 */
  box-sizing: border-box; /* 使 padding 和 border 包含在宽度内 */
}
  
.login-button {
  width: 100%;
  padding: 16px;
  background-color: #f9c90a;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 20px;
  margin-top: 20px;
}
  
.login-button:hover {
  background-color: #e97924;
}
  
.forgot-password {
  margin-top: 10px;
  text-align: center; /* 使内容水平居中对齐 */
}
  
.forgot-password a {
  color: #9d8efc;
  text-decoration: none;
  transition: color 0.3s;
}
  
.forgot-password a:hover {
  color: #8c00ff;
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