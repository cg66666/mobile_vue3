<template>
  <div class="back">
    <div class="setting">
      <span @click="moveApp">设置</span>
      <span @click="router.push({ name: 'service' })">客服</span>
    </div>
    <div class="goLogin" @click="() => !accountName && router.push({ name: 'login' })">
      <img :src="getAssetsFile('shop_page/comment/avatar.png')" alt="" />
      <div>{{ accountName || '点击登录' }}</div>
    </div>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '150px',
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '90px',
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '130px',
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '100px',
      }"
    ></WhiteCard>
    <WhiteCard
      class="oneTest"
      :style="{
        height: '140px',
      }"
    ></WhiteCard>
    <Teleport :to="app">
      <div class="toBody">
        <WhiteCard
          class="oneTest"
          :style="{
            height: '140px',
            borderRadius: '0',
          }"
        >
          <SvgIcon name="left" class="settingBack" @click="appBack" />
          设置页
        </WhiteCard>
        <WhiteCard
          class="oneTest"
          :style="{
            height: '140px',
            borderRadius: '0',
          }"
        >
        </WhiteCard>
        <WhiteCard
          class="oneTest"
          :style="{
            height: '140px',
            borderRadius: '0',
          }"
        >
        </WhiteCard>
        <Button v-show="accountName" @click="logOut" class="logOut" color="rgb(255, 209, 0)"
          >退出登录</Button
        >
      </div>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getAssetsFile } from '@/utils';
import { Button } from 'vant';
import { useLogin } from '@/stores';
const app = ref('#app');
const router = useRouter();
const loginStore = useLogin();
const accountName = ref('');
const appContainer = document.getElementById('app');
const moveApp = () => {
  if (appContainer) {
    appContainer.style.left = '-100%';
  }
};
const appBack = () => {
  if (appContainer) {
    appContainer.style.left = '0';
  }
};
const logOut = () => {
  loginStore.clearLocalUserInfo();
  appBack();
};
watch(
  () => loginStore.name,
  (nv) => {
    accountName.value = nv;
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.toBody {
  position: absolute;
  left: 100%;
  top: 0;
  transition: all 1s ease;
  width: 100%;
  height: 100%;
  background: $backgroundColor;
  // .settingBack{
  //   left: 0;
  //   top: 0;
  // }
  .logOut {
    position: absolute;
    bottom: 30px;
    width: 60%;
    left: 50%;
    transform: translateX(-50%);
  }
}
.back {
  background: $backgroundColor;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 10px 10px 55px 10px;
  overflow: scroll;
  box-sizing: border-box;
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
    // width: 200px;
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
