import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



// https://vitejs.dev/config/
export default defineConfig({
  // server: {    
  //   proxy: {      
  //     '^/api/archi-search': {
  //       target: 'https://archimista-api.provincia.lucca.it/archi-search',
  //       ws: true,
  //       changeOrigin: true
  //     },
  //   }
  // },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
