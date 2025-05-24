<script setup>
  import { useRouter } from 'vue-router' // 导入 useRouter
  const router = useRouter() // 创建 router 实例

  const navigateToDiary = () => {
    console.log('Navigating to diary...')
    router.push({ name: 'Diary' }) // 编程导航到登录页面
  }

  const navigateToConsultation = () => {
    console.log('Navigating to consultation...')
    router.push({ name: 'Consultation' }) // 编程导航到主页面
  }

  const navigateToCommunity = () => {
    console.log('Navigating to community...')
    router.push({ name: 'Community' }) // 编程导航到主页面
  }
</script>

<template>
    <div class = "main">

      <div class="functions">
      <div class="helloword" >
        <h2 id="introduction" class="introduction-style">What are you looking for ?</h2>
      </div>

      <div class="function">
        <div class="diary" @click="navigateToDiary">
          <h2>Diary</h2>
          <h3>Record your mood...</h3>
          <img src="../assets/diary.png" alt="Diary Image" class="function-image"/>
        </div>
        <div class="consultation" @click="navigateToConsultation">
          <h2>Consultation</h2>
          <h3>Start your consultation...</h3>
          <img src="../assets/consultation.png" alt="Consultation Image" class="function-image"/>
        </div>
        <div class="community" @click="navigateToCommunity">
          <h2>Community</h2>
          <h3>Join our community...</h3>
          <img src="../assets/community.png" alt="Community Image" class="function-image"/>
        </div>
      </div>
      </div>

      <div class="articles">
      <div class="article_head">
        <h3>Today's featured article</h3>
        <h4 id="more-articles">+ more articles</h4>
      </div>
      <div class="article">
        <img src="../assets/today_pic.png" alt="Article Image" class="article-image"/>
        <div class="article_content">
          <h2>How to be happy</h2>
          <h3>content...content...content...content...content...</h3>
        </div>
      </div>
      </div>
      <router-view></router-view>
    </div>

</template>

<style scoped>
.function-image{
  width: 330px;
  height: 330px;
}

.example-image{
  width: 100px;
  height: auto;
  margin-right: 10px;
}

.helloword {
  margin-top: 50px;
  text-align: center;
}

.introduction-style{
  background-color: rgba(255, 255, 255, 0.7);
  display: inline-block;
}

.logo-title {
  display: flex;
  align-items: center;
}

.button-container {
  display: flex;
  align-items: center;
}

.function{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
}

.diary{
  width: 300px;
  height: 400px;
  margin-left: 150px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}

.consultation{
  width: 300px;
  height: 400px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}

.community{
  width: 300px;
  height: 400px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  margin-right: 150px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 228, 196, 0.7);
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

.function > div:hover {
  background-color: rgba(255, 228, 196, 0.7); /* 选中后的背景颜色 */
}

.articles{
  margin-top: 50px;
  /* display: flex; */
  align-items: center;
  background-color: rgba(255, 228, 196, 0.7);
}

.article_head{
  display: flex;
}

.article_head > h4{
  margin-left: 50px;
}

.article{
  display: flex;
}

.article_content{
  margin-left: 50px;
}

.article-image{
  width: 200px;
  height: 150px;
}

.article:hover{
  background-color: rgba(251, 217, 175, 0.7);
}
</style>