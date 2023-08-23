<template>
  <div class="container">
    <div class="title">案例（单位秒），与下方结算后的倒计时同步</div>
    {{ showTime }}
    <button @click="startCountdown()">开始</button>
    <button @click="pauseCountdown()">暂停</button>
    <button @click="cancelCountdown()">取消</button>
    <Dialog
      v-model:show="show"
      :showConfirmButton="false"
      :showCancelButton="true"
      @cancel="cancelDialog"
      class="vant_Dialog"
    >
      <div class="dialogContainer">
        <div class="countdown">{{ minute }}:{{ second }}</div>
        <div ref="qrCodeUrl" class="qrCode"></div>
      </div>
    </Dialog>
    <div class="settleAccounts">
      <Checkbox v-model="checked" icon-size="0.513rem" checked-color="#FFD100" class="vant_Checkbox"
        >全选</Checkbox
      >
      <div class="priceContainer">
        <div>
          已选3件，<span>合计</span
          ><span class="price" :style="{ fontSize: '0.5123rem' }">29.3</span>
        </div>
        <div class="discount">共减<span class="price">37.2</span></div>
      </div>
      <Button class="settleAccountsButton" @click="waitPay">结算</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';
import QRCode from 'qrcodejs2-fix';
import { Checkbox, Button, Dialog } from 'vant';
import { usePolling, useCountdown } from '@/hooks';
const qrCodeUrl = ref<HTMLElement>();
const checked = ref(true);
const show = ref(false);
const minute = computed(() =>
  String(Math.floor((currentDiffTime.value % (1000 * 60 * 60)) / 60 / 1000)).padStart(2, '0')
);
const second = computed(() =>
  String(Math.floor((currentDiffTime.value % (1000 * 60)) / 1000)).padStart(2, '0')
);
// 模拟轮询请求
const testRequest = () => {
  return new Promise<void>((resolve) => {
    const delay = Math.round(Math.random() * (1000 - 200) + 200);
    setTimeout(() => {
      console.log('轮询触发', delay);
      resolve();
    }, delay);
  });
};
const { doPolling, cancelPooling } = usePolling(testRequest, 600);
const waitPay = async () => {
  show.value = true;
  doPolling();
  await nextTick();
  new QRCode(qrCodeUrl.value, {
    text: 'https://www.baidu.com/', // 二维码承载信息
    width: 150,
    height: 150,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H, // 容错级别
  });
};
const cancelDialog = () => {
  cancelPooling();
  qrCodeUrl!.value!.innerHTML = '';
};
// 假定的付款倒计时时间
const testTimeStamp = ref(3600000);
// 倒计时hooks，可直接封装使用
const { startCountdown, cancelCountdown, pauseCountdown, currentDiffTime } =
  useCountdown(testTimeStamp);
startCountdown();
const showTime = computed(() => (currentDiffTime.value / 1000).toFixed(0));
</script>
<style lang="scss">
.vant_Dialog {
  padding: 20px !important;
}
</style>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  // background: $backgroundColor;
  position: relative;
  .title {
    font-size: 25px;
  }
  .dialogContainer {
    .countdown {
      font-size: 25px;
      font-weight: 900;
      margin-left: 105px;
      margin-bottom: 10px;
    }
    .qrCode {
      margin-left: 63px;
    }
  }

  .settleAccounts {
    display: flex;
    height: 60px;
    width: calc(100% - 20px);
    background: white;
    position: fixed;
    bottom: 50px;
    margin: 0 10px;
    border-radius: 10px;
    border: 2.5px solid $backgroundColor;
    box-sizing: border-box;
    padding: 8px 7px;
    .vant_Checkbox {
      font-size: 15px;
      margin-top: 4px;
    }
    .priceContainer {
      font-size: 15px;
      margin-left: 63px;
      .price {
        color: red;
        &::before {
          content: '￥';
          font-size: 12px;
        }
      }
      .discount {
        color: red;
        margin-left: 77.3px;
      }
    }

    .settleAccountsButton {
      margin-left: 5.4px;
      background: $brandColor;
      border-radius: 20px;
      font-size: 17px;
      height: 35px;
      border: none;
      padding: 0 20px;
      margin-top: 3px;
    }
  }
}
</style>
