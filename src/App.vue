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
  <!-- 开发模式水印 -->
  <canvas
    v-if="mode === 'development'"
    ref="watermark"
    width="200"
    height="140"
    :style="{
      zIndex: 99999,
      position: 'absolute',
      top: '100px',
      opacity: 0.3,
      pointerEvents: 'none',
    }"
  />
</template>

<script setup lang="ts">
import { onMounted, provide, computed, ref } from 'vue';
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
const watermark = ref<HTMLCanvasElement>();
const mode = import.meta.env.MODE;
let startX = 0;
let startY = 0;
onMounted(() => {
  document.addEventListener('touchstart', function (e) {
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;
  });
  document.addEventListener(
    'touchmove',
    function (e) {
      let moveX = e.targetTouches[0].pageX;
      let moveY = e.targetTouches[0].pageY;
      if (Math.abs(moveX - startX) > Math.abs(moveY - startY)) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
  window.localStorage.removeItem('searchHistory');
  getInfo(111);
  getInfoPost(111);
  if (watermark.value) {
    var ctx = watermark.value.getContext('2d');
    ctx!.font = '30px Arial';
    ctx!.fillStyle = 'blue';
    ctx!.rotate((-20 * Math.PI) / 180);
    ctx!.fillText('开发模式', 0, watermark.value.height / 2);
  }
});
</script>

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
