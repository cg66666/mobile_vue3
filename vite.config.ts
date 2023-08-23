import { fileURLToPath, URL } from 'node:url';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  console.log(111, env);

  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
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
          target: env.VITE_BASE_URL, // 真实接口地址, 后端给的基地址
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/mobile_Vue3/, ''), // 将ccc替换为空
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 39,
            propList: ['*'],
            selectorBlackList: [':root'],
          }),
          autoprefixer({
            overrideBrowserslist: ['Android >= 4.0', 'iOs >= 7'],
          }),
        ],
      },
      preprocessorOptions: {
        // 全局样式引入
        scss: {
          additionalData: '@import "@/assets/css/global.scss";',
          javascriptEnabled: true,
        },
      },
    },
    build: {
      // outDir: 'ts-super-web', // 生成输出的根目录。如果该目录存在，则会在生成之前将其删除。 默认文件夹名称为dist
      target: 'esnext',
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境去掉控制台 console
          drop_debugger: true, // 生产环境去掉控制台 debugger 默认就是true
          dead_code: true, // 删除无法访问的代码 默认就是true
        },
      },
      chunkSizeWarningLimit: 2000, // 调整区块大小警告限制
    },
  };
});
