import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'amfe-flexible';
import 'vant/lib/index.css';
import 'normalize.css';
import SvgIcon from '@/components/SvgIcon.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component('SvgIcon', SvgIcon);

// const w = document.documentElement.clientWidth;
// document.documentElement.style.fontSize = w / 10 + 'px';

app.mount('#app');
