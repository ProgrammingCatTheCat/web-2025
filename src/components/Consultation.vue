<template>
    <div class="consultation-container">
      <div class="header">
        <div class="logo-title">
          <img id="logo" src="../assets/logo.png" alt="Logo Image" class="example-image" @click="navigateToMain" />
          <h1 id="title">Chat with our AI therapist ...</h1>
        </div>
      </div>
  
      <div class="consultation-box">
        <img src="../assets/robot.png" alt="Consultation Image" class="robot-image" />
        <div class="robot-content">
          <p>Hello! I'm your AI therapist. How can I help you today?</p>
        </div>
      </div>
  
      <div class="consultation-content">
        <textarea id="consultation-text" placeholder="What can we talk..." autofocus></textarea>
        <button id="save-button" class="button-style">Send</button>
      </div>

    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  const navigateToMain = inject('navigateToMain');
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
  
  .button-container {
    display: flex;
    align-items: center;
  }
  
  .button-style {
    width: 200px;
    height: 50px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 20px;
    color: white;
    background-color: #f9c90a;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .button-style:hover {
    background-color: #e97924;
  }
  
  .consultation-box {
    display: flex;
    align-items: flex-start; 
    height: 400px;
    margin-top: 30px;
    margin-left: 50px;
    margin-bottom: 30px;
    margin-right: 200px;
    background: rgba(255, 255, 255, 0.7);
    padding: 20px;
    box-sizing: border-box; 
  }

  .robot-content {
    flex-grow: 1;
  }

  .robot-image {
    margin-right: 20px;
    width: 50px;
    height: 50px;
  }
  
  .consultation-content {
    display: flex;
    align-items: flex-end; /* Align items at the bottom */
    margin: 20px 50px;
  }

#consultation-text {
  width: 100%; /* Adjust width to make space for the button */
  height: 150px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 15px;
  background-color: #fff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  box-sizing: border-box;
  /* background-image: repeating-linear-gradient(
    to bottom,
    #ccc 0,
    #ccc 1px,
    transparent 1px,
    transparent 1.5em
  ); */
  background-position: 0 1em;
  background-size: 100% 1.5em;
  background-repeat: repeat-y;
  background-clip: padding-box;
}

#consultation-text::placeholder {
  color: #aaa;
  opacity: 1; /* Firefox */
}

#consultation-text:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #aaa;
}

#consultation-text::-ms-input-placeholder { /* Microsoft Edge */
  color: #aaa;
}

.button-style {
  width: 150px;
  height: 50px;
  margin-left: 20px; /* Add some margin between textarea and button */
  font-size: 18px;
  color: white;
  background-color: #f9c90a;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-style:hover {
  background-color: #e97924;
}
</style>