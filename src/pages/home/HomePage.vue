<template>
  <HomeSearchMode defaultSearchWord="烧烤" @click="switchShow"></HomeSearchMode>
  <Transition name="coverPage" class="coverPage">
    <SearchCoverPage defaultSearchWord="蜜雪冰城" v-if="showCover" @switchShow="switchShow" />
  </Transition>
</template>

<script setup lang="ts">
import HomeSearchMode from '@/components/HomeSearchMode.vue';
import SearchCoverPage from '@/components/SearchCoverPage.vue';
import { ref } from 'vue';
const showCover = ref(false);
const switchShow = () => (showCover.value = !showCover.value);
</script>

<style lang="scss" scoped>
.coverPage {
  position: absolute;
  width: 100%;
  height: 100rem;
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
</style>
