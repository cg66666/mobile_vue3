<template>
  <div class="container">
    <div class="head">
      <SvgIcon name="left" class="icon" size="0.65rem" @click="router.push('/personal')" />
      <img :src="getAssetsFile('shop_page/comment/avatar.png')" />
      <span class="name"
        ><div class="top">美团客服</div>
        <div class="bottom">提供专业服务</div></span
      >
      <div class="schedule">
        <SvgIcon name="moxingguanli" class="icon" size="0.55rem" />
        <div>服务进度</div>
      </div>
    </div>
    <div class="scrollContainer" ref="scrollRef">
      <div class="greet">Hi，团团很高兴为您服务</div>
      <template v-for="(item, index) in showList" :key="index">
        <div v-if="loginStore.name !== item?.user" class="msgContainer left">{{ item?.msg }}</div>
        <div v-else class="msgContainer right">{{ item?.msg }}</div>
      </template>
    </div>
    <div class="inputContainer">
      <SvgIcon
        name="yuyin"
        class="icon"
        size="0.76rem"
        :style="{ top: '0.012rem', marginLeft: '7px' }"
      />
      <input
        type="text"
        placeholder="请描述您的问题"
        v-model="inputVal"
        :style="{ width: inputVal ? '5.385rem' : '6.154rem' }"
      />
      <SvgIcon
        name="biaoqing"
        class="icon"
        size="0.93rem"
        :style="{ top: '0.12rem', marginLeft: '6px' }"
      />
      <SvgIcon
        v-if="!inputVal"
        name="jiahao"
        class="icon"
        size="0.88rem"
        :style="{ top: '0.105rem', marginLeft: '9px' }"
      />
      <Button v-else class="vant_button" @click="addList">发送</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { getAssetsFile } from '@/utils';
import { useWebSocket } from '@/hooks';
import { useLogin } from '@/stores';
import { Button } from 'vant';
// webSocket传输类型
type wsType = {
  type: 'message';
  user: string;
  msg: string;
  time: number;
};
const router = useRouter();
const loginStore = useLogin();
const { sendMsg, backMsg } = useWebSocket<wsType>(true);
const scrollRef = ref<HTMLElement>();
const inputVal = ref('');
const showList = ref<(wsType | undefined)[]>([]);
const addList = async () => {
  const handleMsg = {
    type: 'message',
    user: loginStore.name,
    time: Date.now(),
    msg: inputVal.value
  };
  showList.value.push(handleMsg as wsType);
  await nextTick();
  scrollRef.value!.scrollTop = scrollRef.value?.scrollHeight || 0;
  sendMsg(handleMsg as wsType);
  inputVal.value = '';
};
watch(backMsg, async (nv) => {
  showList.value.push(nv);
  await nextTick();
  scrollRef.value!.scrollTop = scrollRef.value?.scrollHeight || 0;
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: $backgroundColor;
  position: relative;
  .icon {
    top: -13px;
    position: relative;
  }
  .head {
    padding: 10px;
    position: relative;
    img {
      width: 40px;
      border-radius: 50%;
      margin-left: 15px;
    }
    .name {
      display: inline-block;
      position: relative;
      top: -3px;
      left: 10px;
      .top {
        font-size: 19px;
      }
      .bottom {
        font-size: 15px;
        font-weight: lighter;
      }
    }
    .schedule {
      font-size: 15px;
      font-weight: lighter;
      position: absolute;
      right: 20px;
      top: 0;
      height: 100%;
      .icon {
        // margin-top: 10px;
        position: relative;
        top: 10px;
        left: 18px;
      }
      div {
        position: relative;
        top: 12px;
      }
    }
  }
  .scrollContainer {
    width: 100%;
    height: calc(100% - 68.6px - 50px);
    overflow: scroll;
    display: flex;
    flex-direction: column;
    .greet {
      font-size: 15px;
      margin-left: auto;
      margin-right: auto;
      padding: 5px;
      color: gray;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
    }
    .msgContainer {
      display: inline-block;
      padding: 12px 8px;
      font-size: 18px;
      border-radius: 16px;
      margin-top: 10px;
      max-width: 250px;
    }
    .left {
      margin-right: auto;
      margin-left: 5px;
      background: white;
    }

    .right {
      margin-left: auto;
      margin-right: 5px;
      background: $brandColor;
    }
  }
  .inputContainer {
    height: 50px;
    position: fixed;
    bottom: 0;
    width: 100%;
    .icon {
      position: relative;
    }
    input {
      position: relative;
      top: -1px;
      width: 210px;
      height: 35px;
      margin-left: 10px;
      border-radius: 8px;
      border: none;
      font-size: 15px;
      padding-left: 10px;
      caret-color: $brandColor;
    }
    .vant_button {
      margin-left: 10px;
      display: inline-block;
      width: 60px;
      height: 30px;
      position: relative;
      top: -7px;
      background: $brandColor;
      border-radius: 20px;
    }
  }
}
</style>
