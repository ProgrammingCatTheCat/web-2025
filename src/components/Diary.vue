<template>
    <div class="diary-container">
      <div class="header">
        <div class="logo-title">
          <img id="logo" src="../assets/logo.png" alt="Logo Image" class="example-image" @click="navigateToMain" />
          <h1 id="title">Record your mood...</h1>
        </div>
        <div class="button-container">
          <button id="add_picture" class="button-style">add picture</button>
          <button id="decoration" class="button-style">decoration</button>
        </div>
      </div>
  
      <div class="diary-head">
      </div>
  
      <div class="diary-content">
        <textarea id="diary-text" placeholder="Type your diary here..." autofocus></textarea>
      </div>
  
      <div class="diary-footer">
        <div class="left-buttons">
            <button id="public-button" class="button-style">public</button>
            <button id="location-button"  class="button-style">add location</button>
            <button id="tag-button" class="button-style">tag</button>
        </div>
        <div class="right-buttons">
            <button id="save-button" class="button-style">Save</button>
            <button id="cancel-button" class="button-style">Cancel</button>
        </div>
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
  
  .diary-head {
    margin-top: 20px;
    text-align: center;
  }
  
  .diary-content {
    margin: 20px 50px;
  }
  
  #diary-text {
    width: 100%;
    height: 500px;
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 15px;
    background-color: #fff;
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    line-height: 1.5;
    resize: vertical;
    box-sizing: border-box;
    background-image: repeating-linear-gradient(
      to bottom,
      #ccc 0,
      #ccc 1px,
      transparent 1px,
      transparent 1.5em
    );
    background-position: 0 1em;
    background-size: 100% 1.5em;
    background-repeat: repeat-y;
    background-clip: padding-box;
  }
  
  #diary-text::placeholder {
    color: #aaa;
    opacity: 1; /* Firefox */
  }
  
  #diary-text:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #aaa;
  }
  
  #diary-text::-ms-input-placeholder { /* Microsoft Edge */
    color: #aaa;
  }

.diary-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.left-buttons, .right-buttons {
  display: flex;
  align-items: center;
}

.button-style {
  width: 150px;
  height: 50px;
  margin-left: 10px;
  font-size: 18px;
  color: white;
  background-color: #f9c90a;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-style:first-child {
  margin-left: 0;
}

.button-style:hover {
  background-color: #e97924;
}
</style>