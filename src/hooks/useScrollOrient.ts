import { computed, ref, onMounted, watch, type Ref } from 'vue';
import { type dataType } from '@/components/global/WhiteCard.vue';
import { useScroll } from '@/hooks/useScroll';
/**
 *
 * @param listData 基本数据数组
 * @param domRef 目标dom元素
 * @returns 处理后需渲染数组
 */
export function useScrollOrient(listData: dataType[], domRef: Ref<HTMLElement>) {
  const scrollRation = 0.35;
  // 目标dom元素滚动监听下的相关数据hook
  const { clientWidth, scrollLeft } = useScroll(domRef);
  const currentIndex = ref<number>(0);
  const scrollData = ref<dataType[][]>([]);
  const initScrollLeft = ref(0);
  const processedData = computed(() => {
    if (!listData || !listData.length) return [];
    let middleArray: dataType[] = [];
    const finalArray: dataType[][] = [];
    listData.forEach((item, index) => {
      if (index && (index + 1) % 15 === 0) {
        middleArray.push(item);
        finalArray.push(middleArray);
        middleArray = [];
      } else {
        middleArray.push(item);
      }
    });
    return finalArray.length ? finalArray : [middleArray];
  });
  watch(
    currentIndex,
    (nv) => {
      if (!processedData.value.length) return;
      const length = processedData.value.length;
      let finalData: dataType[][] = [];
      if (nv === 0) {
        finalData = processedData.value.slice(0, 2);
      } else if (nv + 1 === length) {
        finalData = processedData.value.slice(nv - 1);
      } else {
        finalData = processedData.value.slice(nv - 1, nv + 2);
      }
      setTimeout(() => {
        scrollData.value = finalData;
        if (finalData.length === 3 || nv + 1 === length) {
          initScrollLeft.value = clientWidth.value;
          domRef.value!.scrollLeft = clientWidth.value;
        }
      }, 400);
    },
    { immediate: true }
  );
  onMounted(() => {
    if (domRef.value) {
      domRef.value.addEventListener(
        'touchend',
        () => {
          let index = currentIndex.value;
          let scroll = initScrollLeft.value;
          if (scrollLeft.value > initScrollLeft.value) {
            const remainder = scrollLeft.value % clientWidth.value;
            if (remainder > clientWidth.value * scrollRation) {
              scroll += clientWidth.value;
              index++;
            }
          } else {
            const diffVal = initScrollLeft.value - scrollLeft.value;
            const remainder = diffVal % clientWidth.value;
            if (remainder > clientWidth.value * scrollRation) {
              scroll -= clientWidth.value;
              index--;
            }
          }
          setTimeout(() => {
            domRef.value?.scrollTo({ left: scroll, behavior: 'smooth' });
            initScrollLeft.value = scroll;
            currentIndex.value = index;
          }, 200);
        },
        { passive: true }
      );
    }
  });
  return scrollData;
}
