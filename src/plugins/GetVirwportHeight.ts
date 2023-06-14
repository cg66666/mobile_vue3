import type { App } from 'vue';
// 全局注入视口高度
export default (app: App) => {
  const clientHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  app.provide('viewportHeight', clientHeight);
};
