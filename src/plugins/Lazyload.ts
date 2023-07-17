import type { App, DirectiveBinding } from 'vue';
export default (app: App) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          // 开始加载图片，把 data-origin 的值放到 src
          const el = item.target as any;
          el.src = el.dataset.origin as string;
          el.finish = true;
          el.classList.remove('op-lazyload');
          observer.unobserve(el);
          // 停止监听
        }
      });
    },
    {
      // 交叉视图的 100px，才开始派发事件
      rootMargin: '0px 0px -100px 0px',
    }
  );
  return app.directive('lazy', (el: any, binding: DirectiveBinding) => {
    if (el.tagName === 'IMG' && binding.value && !el.finish) {
      el.classList.add('plugIn-lazyload');
      el.src = 'https://img.tukuppt.com/png_preview/00/07/99/ciZdUefqzm.jpg!/fw/780';
      el.dataset.origin = binding.value;
      observer.observe(el);
    }
  });
};
