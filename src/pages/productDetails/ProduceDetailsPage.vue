<template>
  <div class="container">
    <div @click="router.push({ name: 'home' })">{{ `<` }}</div>
    <div>商品详情页</div>
    <div>商品id：{{ router.currentRoute.value.query.id }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getProductInfo } from '@/service/detail';
const router = useRouter();
const productId = +(router.currentRoute.value.query.id as string);
onMounted(() => {
  getProductInfo(productId);
});
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: $backgroundColor;
}
</style>
