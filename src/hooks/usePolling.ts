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
    let isPolling = false;
    const startTime = Date.now();
    let time = 1;
    const polling = () => {
      const nowTime = Date.now();
      if (isPolling) return;
      if (nowTime > startTime + delay * time) {
        time++;
        isPolling = true;
        fn().finally(() => {
          if (isCanceled) return;
          isPolling = false;
          timer = requestAnimationFrame(polling);
        });
      } else {
        timer = requestAnimationFrame(polling);
      }
    };
    requestAnimationFrame(polling);
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
