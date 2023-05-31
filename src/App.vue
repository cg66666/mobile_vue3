<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { getInfo, getInfoPost } from '@/ajax/test';
import BottomTabs from '@/pages/bottomTabs/BottomTabs.vue';
import '@/assets/iconfont/iconfont.js';
onMounted(() => {
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
}
</style>
