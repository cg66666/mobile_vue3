<template>
  <div class="searchPage">
    <div class="headContainer">
      <SvgIcon
        name="left"
        size="14px"
        @click="
          () => {
            setStatus();
          }
        "
      />
      <div class="searchContainer">
        <Field
          class="vantField"
          v-model="searchWord"
          :placeholder="props.defaultSearchWord"
          clearable
        />
        <div class="searchButton">
          <div>搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Field } from 'vant';
const props = defineProps<{
  defaultSearchWord: string;
}>();
const searchWord = ref('');
const isOpen = ref(true);
const setStatus = () => {
  if (isOpen.value) {
    isOpen.value = false;
    return;
  }
  isOpen.value = true;
};
defineExpose({ setStatus });
</script>

<style lang="scss" scoped>
.searchPage {
  width: 100%;
  height: 100rem;
  position: absolute;
  background: white;
  top: v-bind("isOpen ? '0' : '100rem'");
  transition: all 0.2s;
  z-index: 999;
  .headContainer {
    display: flex;
    background: rgb(245, 245, 245);
    height: 40px;
    box-sizing: border-box;
    padding: 12px;
    // .back {
    //   padding: 10px;
    // }
  }
  .searchContainer {
    width: 340px;
    height: 30px;
    border-radius: 25px;
    position: relative;
    background: white;
    left: 14px;
    top: -7px;

    .vantField {
      width: 290px;
      height: 28px;
      border-radius: 25px;
      padding: 3px 10px;
      background: transparent;
      box-sizing: content-box;
    }
    .searchButton {
      font-size: 12px;
      width: 40px;
      height: 23px;
      position: absolute;
      right: 3.5px;
      top: 3.5px;
      background: $brandColor;
      border-radius: 25px;
      line-height: 23px;
      div {
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
<style lang="scss">
.searchContainer {
  .vantField {
    .van-icon {
      position: relative;
      left: -5px;
    }
  }
}
</style>
