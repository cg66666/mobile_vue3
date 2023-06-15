<template>
  <div class="searchContainer">
    <div class="titleName">
      北京
      <SvgIcon name="Down" size="0.33rem" class="downClass" />
    </div>
    <div class="searchItem">
      <div class="button">
        <div>搜索</div>
      </div>
    </div>
    <div class="carouselContainer">
      <div
        :class="`carousel ${animationClassName}`"
        :style="{ top: `${initPosition - move}rem` }"
        ref="swiperDom"
      >
        <div class="item" v-for="(item, index) in wordList" :key="index">{{ item }}</div>
      </div>
    </div>
    <SvgIcon name="saoyisao" size="0.72rem" class="sweep" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watchEffect } from 'vue';
import { pxToRem } from '@/utils/index';
let timer: number;
// 轮播图初始位置
const initPosition = pxToRem(0);
// 轮播图每次位移距离
const moveDistance = pxToRem(30);
// 携带动画属性的class
const className = 'animation';
const props = defineProps<{
  defaultSearchWord: string[];
}>();
const move = ref(0);
const animationClassName = ref(className);
const index = ref(1);
const swiperDom = ref<HTMLElement>();
const wordList = computed(() => {
  const usedArray = [...props.defaultSearchWord];
  usedArray.push(props.defaultSearchWord[0]);
  return usedArray;
});
watchEffect(() => {
  if (wordList.value.length && swiperDom.value) {
    clearInterval(timer);
    swiperDom.value.addEventListener('transitionend', () => {
      if (index.value === wordList.value.length) {
        animationClassName.value = '';
        move.value = 0;
        index.value = 1;
      }
    });
    timer = setInterval(async () => {
      animationClassName.value = className;
      index.value++;
      move.value += moveDistance;
    }, 3000);
  }
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.searchContainer {
  background: $brandColor;
  height: 60px;
  padding: 20px 15px;
  box-sizing: border-box;
  display: flex;
  .titleName {
    font-size: 17px;
    // line-height: 60px;
    .downClass {
      position: relative;
      top: -4px;
    }
  }
  .searchItem {
    width: 265px;
    height: 33px;
    left: 5px;
    border-radius: 25px;
    position: relative;
    top: -6px;
    background: white;
    font-size: 14px;
    padding: 8px 16px;
    box-sizing: border-box;
    position: relative;
    .button {
      background: $brandColor;
      width: 50px;
      height: 26px;
      position: absolute;
      right: 4px;
      border-radius: 25px;
      top: 4px;
      div {
        width: 100%;
        text-align: center;
        line-height: 26px;
      }
    }
  }
  .carouselContainer {
    position: absolute;
    left: 90px;
    height: 20px;
    width: 185px;
    overflow: hidden;
    .carousel {
      position: absolute;
      font-size: 14px;
      top: 0;
      line-height: 20px;
      // overflow: hidden;
      .item {
        margin-bottom: 10px;
      }
    }
    .animation {
      transition: all 1s;
    }
  }

  .sweep {
    position: relative;
    left: 15px;
    top: -3px;
  }
}
</style>
