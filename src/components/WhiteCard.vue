<template>
  <div :class="`container ${props.className || ''}`">
    <div v-if="props.title" class="title">{{ props.title }}</div>
    <slot v-if="slots"></slot>
    <!-- <template v-if="props.listData?.length"> -->
    <div v-if="props.listData?.length" class="listContainer" ref="List">
      <div class="pageConmtainer" v-for="(item, index) in scrollData" :key="index">
        <div class="listItem" v-for="(item2, index2) in item" :key="index2">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">{{ item2.label }}</div>
        </div>
      </div>
      <!-- <div class="listItem" v-for="(item, index) in props.listData" :key="index">
        <SvgIcon :name="item.img" size="0.9rem" color="rgb(255, 209, 0)" />
        <div class="name">{{ item.label }}</div>
      </div> -->
      <!-- <div class="pageConmtainer">
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
      </div>
      <div class="pageConmtainer">
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
      </div>
      <div class="pageConmtainer">
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed, ref, onMounted, type Ref, watch } from 'vue';
import { useScroll } from '@/hooks/useScroll';
type dataType = {
  label: string;
  img: string;
};
const props = defineProps<{
  className?: string;
  title?: string;
  // mode?: modeEnum;
  listData?: dataType[];
  productData?: dataType;
}>();
const scrollRation = 0.35;
const List = ref<HTMLElement>();
const { clientWidth, scrollLeft } = useScroll(List as Ref<HTMLElement>);
const initScrollLeft = ref(0);
const scrollData = ref<dataType[][]>([]);
const currentIndex = ref<number>(0);
const slots = computed(() => !!useSlots().default);
const processedData = computed(() => {
  if (!props.listData) return [];
  let middleArray: dataType[] = [];
  let finalArray: dataType[][] = [];
  props.listData.forEach((item, index) => {
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
        List.value!.scrollLeft = clientWidth.value;
      }
    }, 400);
  },
  { immediate: true }
);
onMounted(() => {
  if (List.value) {
    List.value.addEventListener('touchend', () => {
      let index = currentIndex.value;
      let scroll = initScrollLeft.value;
      if (scrollLeft.value > initScrollLeft.value) {
        let remainder = scrollLeft.value % clientWidth.value;
        if (remainder > clientWidth.value * scrollRation) {
          scroll += clientWidth.value;
          index++;
        }
      } else {
        let diffVal = initScrollLeft.value - scrollLeft.value;
        let remainder = diffVal % clientWidth.value;
        if (remainder > clientWidth.value * scrollRation) {
          scroll -= clientWidth.value;
          index--;
        }
      }
      setTimeout(() => {
        List.value?.scrollTo({ left: scroll, behavior: 'smooth' });
        initScrollLeft.value = scroll;
        currentIndex.value = index;
      }, 200);
    });
  }
});
</script>

<style lang="scss" scoped>
.container {
  //   border: 1px solid red;
  background: white;
  border-radius: 10px;
  max-width: 100%;
  padding: 15px 7px;
  box-sizing: border-box;
  margin-bottom: 10px;
  .title {
    font-size: 15px;
    font-weight: bolder;
    margin: 0px 0px 15px 5px;
  }
  .listContainer {
    width: 100%;
    display: flex;
    flex-wrap: no-wrap;
    overflow: scroll;
    .pageConmtainer {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      overflow: scroll;
      flex: 0 0 100%;
      // width: 100%;
      // flex-shrink: 0;
      .listItem {
        text-align: center;
        // width: 72px;
        width: 72px;
        font-size: 15px;
        margin-bottom: 10px;
        .name {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
