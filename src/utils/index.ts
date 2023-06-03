/**
 * 节流函数
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
 * 防抖函数
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