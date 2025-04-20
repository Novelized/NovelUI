import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { HstVue } from '@histoire/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'NovelUI',
      fileName: 'novelui',
      formats: ['es', 'umd'] 
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    cssCodeSplit: true,
  },
  hst: {
    viteIgnorePlugins: [
      'vite-plugin-checker',
    ],
    plugins: [
      HstVue(),
    ],
  },
})
