import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: true,  // 允许局域网访问
    open: true,
    cors: true   // 启用CORS
  }
})
