import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/MentalHealthPlateform/',
  plugins: [vue()],
  server: {
    port: 5174, // 设置固定端口
    open: true
  }
})
