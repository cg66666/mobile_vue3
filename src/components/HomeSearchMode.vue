<script setup lang="ts">
import { reactive } from 'vue';
const props = defineProps<{
  defaultSearchWord: string;
}>();
</script>

<template>
  <div id="searchContainer">
    <div class="titleName">
      北京
      <SvgIcon name="Down" size="10px" className="downClass" />
    </div>
    <div class="searchItem">
      {{ props.defaultSearchWord || '烧烤' }}
      <div class="button">
        <div>搜索</div>
      </div>
    </div>
    <SvgIcon name="saoyisao" size="28px" className="sweep" />
  </div>
</template>

<style lang="scss" scoped>
#searchContainer {
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
      // padding: 5px 9px;
      // box-sizing: border-box;
    }
  }
  .sweep {
    position: relative;
    left: 15px;
    top: -3px;
  }
}
</style>
