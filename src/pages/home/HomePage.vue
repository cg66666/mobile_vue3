<template>
  <div>
    <HomeSearchMode
      :defaultSearchWord="searchWordList"
      @click="switchShow"
      class="fixLogic"
    ></HomeSearchMode>
    <Transition name="coverPage">
      <SearchCoverPage
        class="coverPage"
        defaultSearchWord="蜜雪冰城"
        v-if="showCover"
        @switchShow="switchShow"
      />
    </Transition>

    <div class="homeBack">
      <div class="gradition" />
      <div class="homeBody">
        <WhiteCard v-if="firstLists.length" :list-data="firstLists" :title="title" />
        <WhiteCard v-if="twiceLists.length" :list-data="twiceLists" />
        <div></div>
        <!-- https://img.zcool.cn/community/01f5845b5ad6b1a801206a353a53a9.jpg?x-oss-process=image/auto-orient,0/resize,w_420/format,webp -->
        <DelicacyList :showDelicacyList="showDelicacyList" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeSearchMode from '@/components/HomeSearchMode.vue';
import SearchCoverPage from '@/components/SearchCoverPage.vue';
import DelicacyList from '@/components/DelicacyList.vue';
import { ref, onMounted, inject, type TransitionProps } from 'vue';
import { getHomeInitData, type firstListType, type delicacyListType } from '@/service/home';
// 获取视口高度
const viewportHeight = (inject('viewportHeight') as number) / 39 - 1.282 + 'rem';
const showCover = ref(false);
const firstLists = ref<firstListType[]>([]);
const title = ref('');
const twiceLists = ref<firstListType[]>([]);
const searchWordList = ref<string[]>([]);
const showDelicacyList = ref<delicacyListType[]>([]);
const switchShow = () => (showCover.value = !showCover.value);
onMounted(() => {
  getHomeInitData().then((res) => {
    if (res) {
      const { firstList, firstListTitle, twiceList, searchDefultWordList, delicacyList } = res.data;
      firstLists.value = firstList;
      title.value = firstListTitle;
      twiceLists.value = twiceList;
      searchWordList.value = searchDefultWordList;
      showDelicacyList.value = delicacyList;
    }
  });
});
</script>

<style lang="scss" scoped>
.fixLogic {
  position: sticky;
  top: 0;
  z-index: 1000;
}
.coverPage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  z-index: 10000;
}
.coverPage-enter-from,
.coverPage-leave-to {
  top: 100rem;
}
.coverPage-enter-active {
  transition: all 0.2s ease;
}
.coverPage-enter-to,
.coverPage-leave-from {
  top: 0;
}
.coverPage-leave-active {
  transition: all 1s ease;
}
.homeBack {
  position: relative;
  top: -1px;
  margin-bottom: 50px;
  background: $backgroundColor;
  min-height: v-bind(viewportHeight);
  height: 100%;
  overflow: scroll;
  .gradition {
    height: 200px;
    width: 100%;
    position: absolute;
    top: 0;
    background: linear-gradient($brandColor 60%, $backgroundColor);
    z-index: 1;
  }
  .homeBody {
    z-index: 999;
    position: absolute;
    top: 0;
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
  }
}
</style>
