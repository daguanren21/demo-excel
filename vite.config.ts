import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueRouter from 'unplugin-vue-router/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    host:'0.0.0.0'
  },
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'canvas-datagrid'
      }
    }
  }), tailwindcss(), VueRouter({}), AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
})
