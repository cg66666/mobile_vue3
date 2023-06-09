import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { throttle } from '@/utils/index';
export default function useScroll(elRef: Ref<HTMLElement>) {
  let el: HTMLElement | Window = window;
  const isReachBottom = ref(false);
  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollHeight.value = document.documentElement.scrollHeight;
      scrollTop.value = document.documentElement.scrollTop;
    } else {
      clientHeight.value = (el as HTMLElement).clientHeight;
      scrollTop.value = (el as HTMLElement).scrollTop;
      scrollHeight.value = (el as HTMLElement).scrollHeight;
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // homeStore.fetchHouselistData()
      isReachBottom.value = true;
    }
    console.log('clientWidth', (el as HTMLElement).clientWidth);
    console.log('scrollLeft', (el as HTMLElement).scrollLeft);
    console.log('scrollWidth', (el as HTMLElement).scrollWidth);
  }, 100);
  onMounted(() => {
    console.log(111, elRef.value);
    if (elRef?.value) {
      el = elRef.value;
    }
    el.addEventListener('scroll', scrollListenerHandler as unknown as EventListener);
  });
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler as unknown as EventListener);
  });
  return { isReachBottom, clientHeight, scrollTop, scrollHeight };
}
