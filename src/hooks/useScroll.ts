import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { throttle } from '@/utils/index';
export enum directionEnum {
  VERTICAL,
  LEVAL
}
interface IOption {
  initScroll: Ref<number>;
  direction: directionEnum;
}
// interface IFunParameter {
//   clientHeight: number;
//   scrollHeight: number;
//   scrollTop: number;
//   clientWidth: number;
//   scrollLeft: number;
//   scrollWidth: number;
// }
/**
 *
 * @param elRef 传入的 ref Dom节点
 * @param option 横向滚动范围限制(不包括window)
 * @returns 返回的为ref格式
 */
export function useScroll(elRef: Ref<HTMLElement>, option?: IOption) {
  let el: HTMLElement | Window = window;
  const isReachBottom = ref(false);
  const currentClientHeight = ref(0);
  const currentScrollTop = ref(0);
  const currentScrollHeight = ref(0);
  const currentClientWidth = ref(0);
  const currentScrollLeft = ref(0);
  const currentScrollWidth = ref(0);
  // const optionHandler = (el: HTMLElement, funOption: IOption) => {
  //   const { clientWidth, scrollLeft, scrollWidth } = el;
  //   const { initScroll, direction } = funOption;
  //   if (direction === directionEnum.LEVAL) {
  //     const diff = scrollLeft - initScroll.value;
  //     if (Math.abs(diff) > clientWidth) {
  //       if (diff > 0) {
  //         el.scrollLeft = initScroll.value + scrollWidth;
  //       } else {
  //         el.scrollLeft = initScroll.value - scrollWidth;
  //       }
  //     }
  //   }
  // };
  const setVal = (el: HTMLElement) => {
    const { clientHeight, scrollHeight, scrollTop, clientWidth, scrollLeft, scrollWidth } = el;
    currentClientHeight.value = clientHeight;
    currentScrollHeight.value = scrollHeight;
    currentScrollTop.value = scrollTop;
    currentClientWidth.value = clientWidth;
    currentScrollLeft.value = scrollLeft;
    currentScrollWidth.value = scrollWidth;
  };
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      setVal(document.documentElement);
    } else {
      setVal(el as HTMLElement);
      // console.log('clientWidth', (el as HTMLElement).clientWidth);
    }
    if (currentClientHeight.value + currentScrollTop.value >= currentScrollHeight.value) {
      // homeStore.fetchHouselistData()
      isReachBottom.value = true;
    }
  }, 50);
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
    scrollWidth: currentScrollWidth
  };
}
