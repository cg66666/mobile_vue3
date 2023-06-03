import { fileURLToPath, URL } from 'node:url';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // host: '127.0.0.1',
    // cors: true,
    port: 3000,
    // open: false, //自动打开
    proxy: {
      // 这里的ccc可乱写, 是拼接在url后面的地址 如果接口中没有统一的后缀可自定义
      // 如果有统一后缀, 如api, 直接写api即可, 也不用rewrite了
      '/mobile_Vue3': {
        target: 'http://localhost:8080', // 真实接口地址, 后端给的基地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/mobile_Vue3/, '') // 将ccc替换为空
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 39,
          propList: ['*'],
          selectorBlackList: [':root']
        }),
        autoprefixer({
          overrideBrowserslist: ['Android >= 4.0', 'iOs >= 7']
        })
      ]
    },
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        additionalData: '@import "@/assets/css/global.scss";',
        javascriptEnabled: true
      }
    }
  }
});
