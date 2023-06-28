import type { App } from 'vue';
import LazyLoad from './Lazyload';
import GetViewportHeight from './GetVirwportHeight';

export default {
  install(app: App) {
    // 配置图片懒加载的自定义命令
    LazyLoad(app);
    // 全局注入视口高度
    GetViewportHeight(app);
  }
};
