import { onBeforeUnmount } from 'vue';
/**
 *
 * @param fn Promise执行函数（用于异步函数）
 * @param delay 轮询间隔时间
 * @returns
 */
export function usePolling(fn: () => Promise<any>, delay: number) {
  let timer = 0;
  let isCanceled = false;
  const doPolling = () => {
    !isCanceled && cancelPooling();
    isCanceled = false;
    const startTime = Date.now();
    let time = 1;
    const a = () => {
      const nowTime = Date.now();
      if (startTime + delay * time > nowTime) return (timer = requestAnimationFrame(a));
      time++;
      fn().finally(() => {
        if (isCanceled) return;
        timer = requestAnimationFrame(a);
      });
    };
    requestAnimationFrame(a);
  };
  const cancelPooling = () => {
    isCanceled = true;
    cancelAnimationFrame(timer);
  };
  onBeforeUnmount(() => {
    cancelPooling();
  });
  return { doPolling, cancelPooling };
}
