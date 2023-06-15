<template>
  <Tabbar v-model="active" class="tabbarBody" @change="(v) => router.push({ name: v })">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="order" icon="bars">订单</TabbarItem>
    <TabbarItem name="personal" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>

<script setup lang="ts">
import { ref, inject, watch, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { Tabbar, TabbarItem } from 'vant';
const active = ref('home');
const router = useRouter();
const currentRoutePath = inject<ComputedRef>('currentRoutePath');
watch(
  () => currentRoutePath,
  (nv) => {
    active.value = nv?.value.replace('/', '');
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.tabbarBody {
  z-index: 9999;
}
</style>
