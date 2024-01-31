import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginRequire from 'vite-plugin-require'

// https://vitejs.dev/config/
export default defineConfig({
// @ts-ignore
  plugins: [vue()],
  define: {
    'process.env': {}
  }
})
