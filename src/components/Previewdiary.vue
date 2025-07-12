<!-- PreviewDiary.vue -->
<template>
  <div class="button-container">
    <button id="decoration_stickers" class="button-style" @click="decorate_diary">add stickers</button>
<!--    <button id="decoration_background" class="button-style" @click="decorate_background">background</button>-->
    <button class="button-style" @click="save_html_diary">Save</button>
    <button id="decoration_exit" class="button-style" @click="backtoMain">exit</button>
  </div>

  <div v-if="decorate_diary_flag" class="decoration-panel">
    <!-- 贴纸选择 -->
    <div class="sticker-picker">
      <div class="sticker-list">
        <img
            v-for="(url, index) in stickers"
            :key="index"
            :src="url"
            class="sticker_type"
            draggable="true"
            @dragstart="onStickerDragStart"/>
      </div>
    </div>

    <div class="preview-wrapper-stick">
      <div class="preview-container" ref="previewContainer" v-html="diaryContent"></div>

      <!-- 浮动贴纸层 -->
      <div class="overlay" ref="overlay" @dragover.prevent @drop.prevent="onDrop">
        <img
            v-for="(sticker, index) in overlayStickers"
            :key="index"
            :src="sticker.src"
            class="floating-sticker"
            :style="{ left: sticker.left + 'px', top: sticker.top + 'px', width: sticker.width + 'px', height: sticker.height + 'px' }"
            draggable="true"
            @dragstart="onStickerDragStart"/>
      </div>
    </div>
  </div>
<!--  <div v-if="decorate_diary_background_flag" class="decoration-panel">-->
<!--    &lt;!&ndash; 贴纸选择 &ndash;&gt;-->
<!--    <div class="sticker-picker">-->
<!--      <div class="sticker-list">-->
<!--        <img-->
<!--            v-for="(url, index) in folders"-->
<!--            :key="index"-->
<!--            :src="url"-->
<!--            class="sticker_type"-->
<!--            draggable="true"-->
<!--            @dragstart="onBackgroundDragStart"/>-->

<!--        <img-->
<!--            v-for="(url, index) in background_gif"-->
<!--            :key="index"-->
<!--            :src="url"-->
<!--            class="sticker_type"-->
<!--            draggable="true"-->
<!--            @dragstart="onBackgroundDragStart"/>-->

<!--        <img-->
<!--            v-for="(url, index) in back_paper"-->
<!--            :key="index"-->
<!--            :src="url"-->
<!--            class="sticker_type"-->
<!--            draggable="true"-->
<!--            @dragstart="onBackgroundDragStart"/>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="preview-wrapper-stick">-->
<!--      <div class="preview-container" ref="previewContainer" v-html="diaryContent"></div>-->

<!--      &lt;!&ndash; 浮动贴纸层 &ndash;&gt;-->
<!--      <div class="overlay" ref="overlay" @dragover.prevent @drop.prevent="onDrop">-->
<!--        <img-->
<!--            v-for="(sticker, index) in overlayStickers"-->
<!--            :key="index"-->
<!--            :src="sticker.src"-->
<!--            class="floating-sticker"-->
<!--            :style="{ left: sticker.left + 'px', top: sticker.top + 'px' }"-->
<!--            draggable="true"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

  <!-- 日记内容容器 -->
  <div v-if="!decorate_diary_flag" class="preview-wrapper">
    <div class="preview-container" ref="previewContainer" v-html="diaryContent"></div>

    <!-- 浮动贴纸层 -->
    <div class="overlay" ref="overlay" @dragover.prevent @drop.prevent="onDrop">
      <img
          v-for="(sticker, index) in overlayStickers"
          :key="index"
          :src="sticker.src"
          class="floating-sticker"
          :style="{ left: sticker.left + 'px', top: sticker.top + 'px' }"
          draggable="true"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: ['content'],
  data() {
    return {
      stickers: [],
      overlayStickers: [],
      overlayBackground: [],
      diaryContent: this.content,
      decorate_diary_flag: false,
      draggedStickerSrc: null,
      draggedBackgroundSrc: null
    }
  },
  methods: {
    injectStickersIntoHTML(contentHTML, stickers) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(contentHTML, 'text/html');

      const overlay = document.createElement('div');
      overlay.style.position = 'relative';

      stickers.forEach(sticker => {
        const img = document.createElement('img');
        img.src = sticker.src;
        img.style.position = 'absolute';
        img.style.left = sticker.left + 'px';
        img.style.top = sticker.top + 'px';
        img.style.width = '50px';
        img.style.height = '50px';
        overlay.appendChild(img);
      });

      doc.body.innerHTML += overlay.innerHTML;

      return doc.body.innerHTML;
    },
    backtoMain(){
      this.$router.push({ name: 'Main' })
    },
    decorate_diary(){
      this.decorate_diary_flag = true
      this.decorate_diary_background_flag = false
    },
    decorate_background(){
      this.decorate_diary_flag = false
      this.decorate_diary_background_flag = true
    },
    onStickerDragStart(event) {
      this.draggedStickerSrc = event.target.src
    },
    onBackgroundDragStart(event) {
      this.draggedBackgroundSrc = event.target.src
    },
    async loadStickers() {
      this.stickers = await Promise.all(
          Object.entries(import.meta.glob('../assets/stickers/*.{png,jpg,gif,svg}')).map(
              async ([path, module]) => {
                const response = await module()
                return response.default
              }
          )
      )
    },
    async loadBackgrounds() {
      this.folders = await Promise.all(
          Object.entries(import.meta.glob('../assets/folders/*.{png,jpg,gif,svg}')).map(
              async ([path, module]) => {
                const response = await module()
                return response.default
              }
          )
      )
      this.background_gif = await Promise.all(
          Object.entries(import.meta.glob('../assets/backgrounds/*.{png,jpg,gif,svg}')).map(
              async ([path, module]) => {
                const response = await module()
                return response.default
              }
          )
      )
      this.back_paper = await Promise.all(
          Object.entries(import.meta.glob('../assets/back_paper/*.{png,jpg,gif,svg}')).map(
              async ([path, module]) => {
                const response = await module()
                return response.default
              }
          )
      )
    },
    onDrop(event) {
      if (!this.draggedStickerSrc) return

      const rect = this.$refs.previewContainer.getBoundingClientRect()

      // 计算相对于 previewContainer 的坐标
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // 添加新贴纸到 overlayStickers 数组中
      this.overlayStickers.push({
        src: this.draggedStickerSrc,
        left: x,
        top: y
      })

      this.draggedStickerSrc = null
    },
    adjustStickerSize(index, delta) {
      const minSize = 20;
      const maxSize = 200;
      this.overlayStickers[index].width = Math.max(
        minSize,
        Math.min(maxSize, this.overlayStickers[index].width + delta)
      );
      this.overlayStickers[index].height = this.overlayStickers[index].width; // 保持宽高一致
      this.overlayStickers = [...this.overlayStickers]; // 触发响应式更新
    },

    onFloatingStickerDragStart(index, event) {
      this.draggedStickerIndex = index;
      event.dataTransfer.setData('text/plain', index);
      const img = event.target
      const offsetX = event.offsetX
      const offsetY = event.offsetY

      document.onmousemove = (e) => {
        const x = e.pageX - this.$refs.overlay.offsetLeft - offsetX
        const y = e.pageY - this.$refs.overlay.offsetTop - offsetY
        img.style.left = `${x}px`
        img.style.top = `${y}px`

        this.overlayStickers[index].left = x
        this.overlayStickers[index].top = y
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },

    async save_html_diary() {
      const user = JSON.parse(localStorage.getItem('user'))
      const email = user ? user.email : 'anonymous'

      // 直接使用已有的 diaryContent 数据
      let htmlContent = this.diaryContent

      // 注入贴纸
      htmlContent = this.injectStickersIntoHTML(htmlContent, this.overlayStickers)

      try {
        const response = await this.$axios.post('http://localhost:8080/api/diary/save_diary', {
          content: htmlContent,
          email: email
        })

        console.log('Save diary succeeded:', response.data)
        alert('Diary saved successfully!')
      } catch (error) {
        console.error('Save diary failed:', error.response?.data || error.message)
        alert('Failed to save diary.')
      }

      localStorage.setItem('previewDiaryContent', htmlContent)
      this.$router.push({ name: 'Preview' })
      this.decorate_diary_flag = false
    },

  },
  mounted() {
    this.diaryContent = localStorage.getItem('previewDiaryContent') || '<p>No content found.</p>'
    this.loadStickers()
    this.loadBackgrounds()
  }
}
</script>

<!--<style scoped>-->
<!--.preview-container {-->
<!--  padding: 20px;-->
<!--  font-size: 16px;-->
<!--  line-height: 1.6;-->
<!--  background-color: #fff;-->
<!--  border-radius: 8px;-->
<!--  margin: 20px auto;-->
<!--  max-width: 800px;-->
<!--}-->
<!--</style>-->
<style scoped>.preview-container {
  padding: 30px;
  font-size: 16px;
  line-height: 1.6;
  background-color: #fbf5dc; /* 浅色背景 */
  border: 4px dashed #f3ce58; /* 黄色虚线边框 */
  border-radius: 15px;
  margin: 30px auto;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.decoration-panel {
  display: flex;
}

.sticker-picker {
  position: fixed;
  top: 70px;
  margin: 60px auto;
  width: 40%;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.sticker-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.preview-wrapper-stick {
  width: 60%;

  transition: margin-left 0.3s ease;
  position: relative;
  display: inline-block;
  margin-left: 680px;
  max-width: 800px;
}

.preview-wrapper {
  width: 60%;
  
  transition: margin-left 0.3s ease;
  position: relative;
  display: inline-block;
  margin: 30px auto;
  max-width: 800px;
}

.preview-container {
  padding: 30px;
  font-size: 16px;
  line-height: 1.6;
  background-color: #fbf5dc;
  border: 4px dashed #f3ce58;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 10;
}

.floating-sticker {
  position: absolute;
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: move;
  z-index: 11;
  user-select: none;
  transition: width 0.2s, height 0.2s; /* 添加平滑过渡 */
}

.bg-sticker {
  position: absolute;
  width: 500px;
  height: 500px;
  object-fit: contain;
  cursor: move;
  z-index: 11;
  user-select: none;
  transition: width 0.2s, height 0.2s; /* 添加平滑过渡 */
}

.decoration_save {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
}

</style>
