<template>
  <Tabbar v-model="active" class="tabbarBody">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="order" icon="bars">订单</TabbarItem>
    <TabbarItem name="me" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>

<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant';
import { ref } from 'vue';
const active = ref('home');
</script>

<style lang="scss" scoped>
.tabbarBody {
  z-index: 9999;
}
</style>
