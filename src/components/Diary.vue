<template>
  <div class="diary-container">
    <div class="header">
      <div class="logo-title">
        <img id="logo" src="../assets/logo.png" alt="Logo Image" class="example-image" @click="navigateToMain" />
        <h1 id="title">Record your mood...</h1>
      </div>
      <div class="button-container">
<!--        <button id="decoration" class="button-style" @click="toggleDecoration">decoration</button>-->
        <button id="decoration" class="button-style" @click="backtoMain">exit</button>
      </div>

    </div>

    <div class="diary-head"></div>

    <!-- Sticker Panel -->
    <div v-if="showDecoration" @click.self="toggleDecoration">
      <div class="sticker-panel">
        <div class="sticker-list">
          <img
              v-for="(url, index) in stickers"
              :key="index"
              :src="url"
              class="sticker_type"
              draggable="true"
              @dragstart="onStickerDragStart"
          />
        </div>
      </div>
    </div>

    <!-- Editor Area -->
    <div class="ql-container" @drop.prevent="onDrop" @dragover.prevent>
      <quill-editor
          :modelValue="diaryContent"
          @update:modelValue="diaryContent = $event"
          @change="onQuillChange"
          content-type="html"
          :toolbar="toolbarOptions"
          class="custom-quill-editor"
          ref="quillEditor"
      />
    </div>

    <!-- Footer Buttons -->
    <div class="diary-footer">
      <div class="left-buttons">
        <div class="diary-container_foot">
          <!-- Visibility Modal -->
          <button id="public-button" class="button-style" @click="toggleVisibilityModal">visibility</button>
          <div v-if="showVisibilityModal" class="modal-overlay" @click.self="toggleVisibilityModal">
            <div class="modal">
              <h3>Select Visibility</h3>
              <ul>
                <li
                    v-for="option in visibilityOptions"
                    :key="option"
                    @click="selectVisibility(option)"
                    class="visibility-option"
                >
                  {{ option }}
                  <span v-if="selectedVisibility === option" class="checkmark">✔️</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Location Button -->
          <button id="location-button" class="button-style" @click="getLocation">add location</button>

          <!-- Tag Modal -->
          <button id="tag-button" class="button-style" @click="toggleTagModal">tag</button>
          <div v-if="showTagModal" class="modal-overlay" @click.self="toggleTagModal">
            <div class="modal">
              <h3>Select Tags</h3>
              <ul>
                <li
                    v-for="tag in defaulTags"
                    :key="tag"
                    @click="selectTag(tag)"
                    class="tag-option"
                    :class="{ active: selectedTags.includes(tag) }"
                >
                  {{ tag }}
                  <span v-if="selectedTags.includes(tag)" class="checkmark">✔️</span>
                </li>
                <li
                    @click="selectTag('custom')"
                    class="tag-option"
                    :class="{ active: selectedTags.includes('custom') }"
                >
                  custom
                  <span v-if="selectedTags.includes('custom')" class="checkmark">✔️</span>
                </li>
              </ul>

              <!-- Custom Tag Input -->
              <div v-if="isCustomSelected" class="custom-tag-input">
                <input type="text" v-model="customTag" placeholder="Please enter custom tag" />
              </div>

              <div class="modal-actions">
                <button class="button-style" @click="toggleTagModal">confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Buttons -->
      <div class="right-buttons">
        <button id="save-button" class="button-style" @click="save_diary">Save</button>
        <button id="cancel-button" class="button-style" @click="clearContent">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// import clap from '../assets/stickers/clap.png'
// import heart from '../assets/stickers/heart.png'
// import fireworks from '../assets/stickers/fireworks.gif'

export default {
  name: 'saveDiary',
  components: {
    QuillEditor
  },
  data() {
    return {
      diaryContent: '',
      showVisibilityModal: false,
      selectedVisibility: 'public',
      visibilityOptions: ['public', 'protected', 'private'],

      location: '',
      showLocation: false,

      showTagModal: false,
      defaulTags: ['anxious', 'excited', 'happy', 'lost', 'sad'],
      selectedTags: [],
      customTag: '',
      isCustomSelected: false,

      imagePreview: null,

      toolbarOptions: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['image']
      ],

      // 贴纸图片路径列表
      stickers: [],
      draggedStickerSrc: null,

      showDecoration: false,
    }
  },
  // mounted() {
  //   this.stickers = stickerNames.map(name =>
  //       require(`../assets/stickers/${name}.png`)
  //   )
  // },
  methods: {
    onQuillChange(content) {
      this.diaryContent = content
      console.log('Quill content changed:', content)
    },
    onDrop(event) {
      if (this.draggedStickerSrc) {
        const quill = this.$refs.quillEditor.getQuill()
        const range = quill.getSelection()

        if (range) {
          // const html = `<img src="${this.draggedStickerSrc}" style="width:50px;height:50px;object-fit:contain;" alt="Sticker"/>`
          // quill.clipboard.dangerouslyPasteHTML(range.index, html)
          const html = `<img src="${this.draggedStickerSrc}" class="sticker-img" alt="Sticker"/>`
          quill.clipboard.dangerouslyPasteHTML(range.index, html)
          // quill.insertEmbed(range.index, 'image', this.draggedStickerSrc, 'user')

          quill.setSelection(range.index + 1)
        }
      }
    },

    navigateToMain() {
      this.$router.push({ name: 'Main' })
    },
    toggleVisibilityModal() {
      this.showVisibilityModal = !this.showVisibilityModal
    },
    selectVisibility(option) {
      this.selectedVisibility = option
      setTimeout(() => {
        this.toggleVisibilityModal()
      }, 500)
    },
    toggleLocationModal() {
      this.showLocation = !this.showLocation
    },

    async getLocation() {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser')
        return
      }

      navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            this.location = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`

            try {
              const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              )
              const data = await response.json()

              const city = data.address.city || data.address.town || data.address.village || 'Unknown'
              this.location += ` - ${city}`

              console.log(`Location: ${this.location}`)
              alert(`Current Location: ${city}`)
            } catch (error) {
              console.error('Failed to fetch location name:', error)
              alert('Could not get city name.')
            }
          },
          (error) => {
            alert('Failed to get location: ' + error.message)
          }
      )
    },
    async save_diary() {
      const user = JSON.parse(localStorage.getItem('user'))
      const email = user ? user.email : 'anonymous'
      const quill = this.$refs.quillEditor.getQuill()
      if (!quill.getText().trim()) {
        alert('Please enter some content before saving.')
        return
      }
       // 获取 HTML 内容
      this.diaryContent = quill.root.innerHTML

      try {
        const response = await this.$axios.post('http://localhost:8080/api/diary/save_diary', {
          content: this.diaryContent,
          email: email
        })

        console.log('Save diary succeeded:', response.data)
        alert('Diary saved successfully!')
      } catch (error) {
        console.error('Save diary failed:', error.response?.data || error.message)
        alert('Failed to save diary.')
      }

      localStorage.setItem('previewDiaryContent', this.diaryContent)
      this.$router.push({ name: 'Preview' })

    },

    clearContent() {
      this.diaryContent = ''
      this.showVisibilityModal = false
      this.selectedVisibility = 'public'
      this.visibilityOptions = ['public', 'protected', 'private']

      this.location = ''
      this.showLocation = false

      this.showTagModal = false
      this.defaulTags = ['anxious', 'excited', 'happy', 'lost', 'sad']
      this.selectedTags = []
      this.customTag = ''
      this.isCustomSelected = false

      this.imagePreview = null

      if (this.$refs.quillEditor) {
        const quill = this.$refs.quillEditor.getQuill()
        if (quill) {
          quill.setText('')
          quill.setSelection(0)
        }
      }

      this.showDecoration  = false
    },

    toggleTagModal() {
      this.showTagModal = !this.showTagModal
      if (!this.showTagModal) {
        this.isCustomSelected = false
        this.selectedTags = this.selectedTags.filter((tag) => this.defaulTags.includes(tag))
        if (this.customTag.trim() !== '') {
          this.selectedTags = this.selectedTags.filter((tag) => tag !== 'custom')
          this.selectedTags.push(this.customTag)
        }
        this.customTag = ''
        alert(`Selected tags: ${this.selectedTags}`)
      }
    },
    selectTag(tag) {
      const index = this.selectedTags.indexOf(tag)
      if (index === -1) {
        this.selectedTags.push(tag)
      } else {
        this.selectedTags.splice(index, 1)
      }
      this.isCustomSelected = this.selectedTags.includes('custom')
    },

    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Image = e.target.result
        this.imagePreview = base64Image

        const quill = this.$refs.quillEditor.getQuill()
        const range = quill.getSelection()

        if (range) {
          quill.insertEmbed(range.index, 'image', base64Image)
          quill.setSelection(range.index + 1)
        }
      }

      reader.readAsDataURL(file)
    },

    onStickerDragStart(event) {
      this.draggedStickerSrc = event.target.src
    },

    toggleDecoration(){
      this.showDecoration = !this.showDecoration;
      console.log(this.showDecoration)
    },

    backtoMain(){
      this.$router.push({ name: 'Main' })
    }
  }
}
</script>

<style scoped>
.diary-container {
  flex: 1;
  overflow-y: auto;
}

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

.sticker_type {
  width: 50px;
  height: 50px;
  object-fit: contain;
  cursor: move;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: transform 0.2s ease-in-out;
}

.sticker_type:hover {
  transform: scale(1.1);
}

.sticker-panel {
  margin: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
}

.sticker-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.ql-container {
  margin: 20px;
  height: 500px;
  background-color: rgba(249, 249, 249, 0.7);
  font-size: 16px;
  overflow-y: auto;
  position: relative;
}

.ql-editor img {
  width: 50px !important;
  height: 50px !important;
  object-fit: contain;
}

.custom-quill-editor {
  height: auto;
  background-color: #f9f9f9;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal ul {
  list-style: none;
  padding: 0;
}

.modal li {
  padding: 10px;
  cursor: pointer;
}

.modal li:hover {
  background-color: #f0f0f0;
}

.checkmark {
  margin-right: 10px;
  color: green;
  font-weight: bold;
}

.tag-badge {
  display: inline-block;
  background-color: #f9c90a;
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  margin-right: 8px;
}

.tag-option.active {
  background-color: #f0f0f0;
}

.custom-tag-input input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-actions {
  margin-top: 15px;
  text-align: right;
}

.diary-footer {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center;             /* 垂直居中 */
  padding: 10px 20px;              /* 可选：增加内边距 */
}

.left-buttons,
.right-buttons {
  display: flex;
  align-items: center;
}


</style>
