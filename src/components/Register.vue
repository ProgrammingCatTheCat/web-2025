<!-- src/components/Login.vue -->
<template>
    <div class="Login">
    
      <div class="main">
        <div class="login-form">
            <input type="text" placeholder="User name" v-model="username" class="input-field">
            <div class="email-container">
                <input type="text" placeholder="Email Address" v-model="email" class="input-field">
                <button class="send-code-button" @click="sendVerifyCode">Send Verify Code</button>
            </div>
            <input type="password" placeholder="Password" v-model="password" class="input-field">
            <input type="text" placeholder="Verify code" v-model="verifycode" class="input-field">
            <button class="login-button" @click="register">register & log in</button>
        </div>
      </div>
    </div>
  </template>

  <script>
    export default {
      name: 'register',
     data() {
      return {
        username: '',
        email: '',
        password: '',
        verifycode: ''
      };
     },
     methods: {
      async register() {
          try{
            const response = await fetch('http://localhost:8080/api/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username: this.username,
                email: this.email,
                password: this.password,
                verifycode: this.verifycode
              })
            });
            if (response.ok) {
              const data = await response.json();
              console.log(data);

              localStorage.setItem('user', JSON.stringify({
                email: this.email,
                isLoggedIn: true
              }));

              this.$router.push({ name: 'Main' });
            } else {
              const errorData = await response.json();
              console.log(errorData);
              alert('failed to register, ' + errorData.message);
            }
          }
          catch (error) {
            console.error('Error during registration:', error);
            alert('failed to register');
          }
      },

      async sendVerifyCode() {
        try {
          const response = await fetch('http://localhost:8080/api/auth/sendVerifyCode', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.email
            })
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            this.verifycode = data.verifycode;
            alert('Verify code sent to your email.');
          } else {
            const errorData = await response.json();
            console.log(errorData);
            alert('failed to send verify code, ' + errorData.message);
          }
        }
        catch (error){
          console.error('Error during sending verify code:', error);
          alert('failed to send verify code');
        }
      },
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
    justify-content: center;
    padding: 20px; /* 添加一些内边距 */
  }
    
  .login-form {
    display: flex;
    justify-content: center;
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

  .email-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.email-container .input-field {
  flex: 1; /* 使输入框占据剩余空间 */
  margin-right: 10px; /* 添加右侧外边距 */
}

.send-code-button {
  padding: 16px;
  background-color: #f9c90a;
  /* border: none; */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;
  height: fit-content;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  margin-top: 20px;
  margin-right: 0;
  box-sizing: border-box;
}

.send-code-button:hover {
  background-color: #e97924;
}
  </style>