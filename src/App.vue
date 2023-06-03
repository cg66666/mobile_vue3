<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';
import { getInfo, getInfoPost } from '@/service/test';
import BottomTabs from '@/pages/bottomTabs/BottomTabs.vue';
import '@/assets/iconfont/iconfont.js';
onMounted(() => {
  getInfo(111);
  getInfoPost(111);
});
onUnmounted(() => {
  window.localStorage.removeItem('searchHistory');
});
</script>

<template>
  <RouterView />
  <BottomTabs />
</template>

<style scoped></style>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
  width: 100%;
  height: 100%;
}
</style>
