/**
 * @name 节流函数
 * @param fn 需要进行防抖处理的函数
 * @param delay 延迟时间
 * @returns
 */
export function debounce<T>(fn: (...arg: T[]) => void | Promise<void>, delay: number) {
  let timer: number | null = null;
  return function (...args: T[]) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
/**
 * @name 防抖函数
 * @param fn 需要进行防抖处理的函数
 * @param delay 延迟时间
 * @returns
 */
export function throttle<T>(fn: (...arg: T[]) => void | Promise<void>, delay: number) {
  let timer: number | null = null;
  return function (...args: T[]) {
    if (timer !== null) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/**
 * @name 获取assets静态资源
 * @param url 从src/assets/imgs开始的地址
 * @returns
 */
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/imgs/${url}`, import.meta.url).href;
};

/**
 * @name px转换rem
 * @description 根据设计稿比例转换 1rem，39px
 * @param px 需要转换的px
 * @returns
 */
export const pxToRem = (px: number) => {
  return Number((px / 39).toFixed(3));
};
