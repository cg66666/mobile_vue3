<template>
  <div class="back">
    <div class="setting">
      <span>设置</span>
      <span>客服</span>
    </div>
    <div class="goLogin" @click="() => router.push({ name: 'login' })">
      <img :src="getAssetsFile('shop_page/comment/avatar.png')" alt="" />
      <div>点击登录</div>
    </div>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '150px'
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '90px'
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '130px'
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '100px'
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '140px'
      }"
    ></WhiteCard>
  </div>
</template>
<script setup lang="ts">
import { getAssetsFile } from '@/utils';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="scss" scoped>
.back {
  background: $backgroundColor;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px;
  .setting {
    font-size: 20px;
    margin-left: 250px;
    width: 110px;
    display: flex;
    justify-content: space-between;
  }
  .goLogin {
    font-size: 28px;
    display: flex;
    margin: 20px 0 20px 15px;
    width: 200px;
    img {
      border-radius: 50%;
    }
    div {
      margin-left: 20px;
      height: 100%;
      line-height: 70px;
    }
  }
  .oneTest:nth-of-type(1) {
    margin-top: 20px;
    width: 100%;
    height: 90px;
  }
  .oneTest:nth-of-type(2) {
    margin-top: 20px;
    width: 100%;
    height: 190px;
  }
}
</style>
