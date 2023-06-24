<template>
  <!-- <router-view #default="{ route, Component }">
    <transition
      :enter-active-class="`animate__animated ${route.meta?.transition?.enter}`"
      :leave-active-class="`animate__animated ${route.meta?.transition?.leave}`"
    >
      <component :is="Component"></component>
    </transition>
  </router-view> -->
  <RouterView />
  <BottomTabs class="tabbar" />
</template>

<script setup lang="ts">
import { onMounted, provide, computed } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { getInfo, getInfoPost } from '@/service/test';
import 'animate.css';
import BottomTabs from '@/pages/bottomTabs/BottomTabs.vue';
// 注入路由
const router = useRouter();
provide(
  'currentRoutePath',
  computed(() => router.currentRoute.value.path)
);
onMounted(() => {
  window.localStorage.removeItem('searchHistory');
  getInfo(111);
  getInfoPost(111);
});
</script>

<style scoped></style>
<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
  width: 100%;
  height: 100%;
  color: rgb(54, 54, 54);
  position: relative;
  transition: 0.2s all ease;
  left: 0;
  .plugIn-lazyload {
    width: 100px;
    height: 80px;
  }
  .tabbar {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
