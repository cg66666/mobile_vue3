<template>
  <div class="container">
    <div class="qrCode">
      <div ref="qrCodeUrl"></div>
      <div>暂时不支持pc端，请手机扫码在移动端查看</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import QRCode from 'qrcodejs2-fix';
const qrCodeUrl = ref<HTMLElement>();
onMounted(() => {
  new QRCode(qrCodeUrl.value, {
    text: 'http://110.40.134.47/', // 二维码承载信息
    width: 150,
    height: 150,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H, // 容错级别
  });
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .qrCode {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
