<template>
  <HomeSearchMode defaultSearchWord="烧烤" @click="switchShow" class="fixLogic"></HomeSearchMode>
  <Transition name="coverPage" class="coverPage">
    <SearchCoverPage defaultSearchWord="蜜雪冰城" v-if="showCover" @switchShow="switchShow" />
  </Transition>
  <div class="gradition" />
  <div class="homeBack">
    <div class="homeBody">
      <WhiteCard v-if="firstLists.length" :list-data="firstLists" :title="title" />
      <WhiteCard v-if="twiceLists.length" :list-data="twiceLists" />
      <Countdown
        class="countdown"
        :start-time="countdownTime.startTime"
        :end-time="countdownTime.endTime"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeSearchMode from '@/components/HomeSearchMode.vue';
import SearchCoverPage from '@/components/SearchCoverPage.vue';
import Countdown from '@/components/Countdown.vue';
import WhiteCard from '@/components/WhiteCard.vue';
import { ref, onMounted } from 'vue';
import { getHomeInitData, type firstListType } from '@/service/home';
const showCover = ref(false);
const countdownTime = ref({ startTime: '2023-06-06 13:00:00', endTime: '2023-06-08 20:30:00' });
const firstLists = ref<firstListType[]>([]);
const title = ref('');
const twiceLists = ref<firstListType[]>([]);
const switchShow = () => (showCover.value = !showCover.value);
onMounted(() => {
  getHomeInitData().then((res) => {
    console.log('res', res?.data);
    if (res) {
      const { countdown, firstList, firstListTitle, twiceList } = res.data;
      countdownTime.value = {
        startTime: countdown.startTime,
        endTime: countdown.endTime
      };
      firstLists.value = firstList;
      title.value = firstListTitle;
      twiceLists.value = twiceList;
    }
  });
});
</script>

<style lang="scss" scoped>
.fixLogic {
  position: sticky;
  top: 0;
}
.coverPage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
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
  height: 1500px;
  background: $backgroundColor;
  .homeBody {
    z-index: 999;
    position: relative;
    width: 100%;
    padding: 0 8px;
    box-sizing: border-box;
  }
}
.gradition {
  height: 200px;
  width: 100%;
  position: absolute;
  top: 58px;
  background: linear-gradient($brandColor 60%, $backgroundColor);
  z-index: 1;
}
</style>
