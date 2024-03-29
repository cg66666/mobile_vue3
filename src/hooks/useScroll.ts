import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { throttle } from '@/utils/index';
/**
 *
 * @param elRef 传入的 ref Dom节点
 * @param option 横向滚动范围限制(不包括window)
 * @returns 返回的为ref格式
 */
export function useScroll(elRef: Ref<HTMLElement>, isThrottel: boolean = true) {
  let el: HTMLElement | Window = window;
  const isReachBottom = ref(false);
  const currentClientHeight = ref(0);
  const currentScrollTop = ref(0);
  const currentScrollHeight = ref(0);
  const currentClientWidth = ref(0);
  const currentScrollLeft = ref(0);
  const currentScrollWidth = ref(0);
  const setVal = (el: HTMLElement) => {
    const { clientHeight, scrollHeight, scrollTop, clientWidth, scrollLeft, scrollWidth } = el;
    currentClientHeight.value = clientHeight;
    currentScrollHeight.value = scrollHeight;
    currentScrollTop.value = scrollTop;
    currentClientWidth.value = clientWidth;
    currentScrollLeft.value = scrollLeft;
    currentScrollWidth.value = scrollWidth;
  };
  const handler = () => {
    if (el === window) {
      setVal(document.documentElement);
    } else {
      setVal(el as HTMLElement);
    }
    isReachBottom.value = false;
    // 这里存在1点误差
    if (currentClientHeight.value + currentScrollTop.value >= currentScrollHeight.value - 1) {
      isReachBottom.value = true;
    }
  };
  const scrollListenerHandler = isThrottel ? throttle(handler, 50) : handler;
  onMounted(() => {
    if (elRef?.value) {
      el = elRef.value;
      setVal(el as HTMLElement);
    } else {
      setVal(document.documentElement);
    }
    el.addEventListener('scroll', scrollListenerHandler as unknown as EventListener);
  });
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler as unknown as EventListener);
  });
  return {
    isReachBottom,
    clientHeight: currentClientHeight,
    scrollTop: currentScrollTop,
    scrollHeight: currentScrollHeight,
    clientWidth: currentClientWidth,
    scrollLeft: currentScrollLeft,
    scrollWidth: currentScrollWidth,
  };
}
