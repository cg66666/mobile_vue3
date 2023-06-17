import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'amfe-flexible';
import 'vant/lib/index.css';
import 'normalize.css';
import globalComponent from '@/components/global/index';
import Plugin from '@/plugins/index';
import '@/assets/iconfont/iconfont.js';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(Plugin);
// const w = document.documentElement.clientWidth;
// document.documentElement.style.fontSize = w / 10 + 'px';

app.mount('#app');
// 自动注册全局的组件
for (const componentItme in globalComponent) {
  app.component(componentItme, globalComponent[componentItme]);
}
