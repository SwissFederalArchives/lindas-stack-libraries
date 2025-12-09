import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.js',
      name: 'VueGraphLayout',
      fileName: 'vue-graph-layout'
    },
    rollupOptions: {
      external: ['vue', 'd3', 'dagre'],
      output: {
        globals: {
          vue: 'Vue',
          d3: 'd3',
          dagre: 'dagre'
        }
      }
    }
  }
})
