<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { getInfo, getInfoPost } from '@/service/test';
import BottomTabs from '@/pages/bottomTabs/BottomTabs.vue';
import '@/assets/iconfont/iconfont.js';
onMounted(() => {
  window.localStorage.removeItem('searchHistory');
  getInfo(111);
  getInfoPost(111);
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
  color: rgb(54, 54, 54);
  .plugIn-lazyload {
    width: 100px;
    height: 80px;
  }
}
</style>
