<template>
  <Tabbar
    v-show="tabbarList.includes(active)"
    v-model="active"
    class="tabbarBody"
    @change="(v) => router.push({ name: v })"
  >
    <TabbarItem :name="tabbarEnum.HOME" icon="home-o">首页</TabbarItem>
    <TabbarItem :name="tabbarEnum.ORDER" icon="bars">订单</TabbarItem>
    <TabbarItem :name="tabbarEnum.PERSONAL" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { ref, inject, watch, type ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { Tabbar, TabbarItem } from 'vant';
enum tabbarEnum {
  HOME = 'home',
  ORDER = 'order',
  PERSONAL = 'personal'
}
const tabbarList: string[] = [tabbarEnum.HOME, tabbarEnum.ORDER, tabbarEnum.PERSONAL];
const active = ref(tabbarEnum.HOME);
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
