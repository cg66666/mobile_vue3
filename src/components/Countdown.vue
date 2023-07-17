<template>
  <div class="FlashSaleContainer">
    <WhiteCard title="特价团购">
      <div class="timeContainer">
        <div>天：{{ formatTime.Day }}</div>
        &nbsp; &nbsp; &nbsp;
        <div>时：{{ formatTime.Hour }}</div>
        &nbsp; &nbsp; &nbsp;
        <div>分：{{ formatTime.Minute }}</div>
        &nbsp; &nbsp; &nbsp;
        <div>秒：{{ formatTime.Second }}</div>
      </div>
      <img v-lazy="props.imgUrl" />
      <div class="goodInfo">
        <div>{{ props.title || '岩小石-韩式炸鸡' }}</div>
        <div class="price">￥ {{ props.price || 19.8 }}</div>
      </div>
    </WhiteCard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue';
import { useCountdown } from '@/hooks';
let timer: number = 0;
type formatTimeType = {
  Day: string;
  Hour: string;
  Minute: string;
  Second: string;
};
const props = withDefaults(
  defineProps<{
    startTime?: string;
    endTime?: string;
    title?: string;
    imgUrl?: string;
    price?: number;
  }>(),
  {
    startTime: '2023-06-06 13:00:00',
    endTime: '2023-06-08 20:30:00',
    title: '',
  }
);

const formatTime = ref<formatTimeType>({
  Day: '00',
  Hour: '00',
  Minute: '00',
  Second: '00',
});
const diffTime = computed(
  () => new Date(props.endTime).getTime() - new Date(props.startTime).getTime()
);
const { startCountdown, currentDiffTime } = useCountdown(diffTime);
startCountdown();
const setFormatTime = (time: number) => {
  const Day = String(Math.floor(time / 60 / 60 / 1000 / 24)).padStart(2, '0');
  const Hour = String(Math.floor((time % (1000 * 60 * 60 * 24)) / 60 / 60 / 1000)).padStart(2, '0');
  const Minute = String(Math.floor((time % (1000 * 60 * 60)) / 60 / 1000)).padStart(2, '0');
  const Second = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, '0');
  formatTime.value = {
    Day: Day === String(time) ? '00' : Day,
    Hour: Hour === String(time) ? '00' : Hour,
    Minute: Minute === String(time) ? '00' : Minute,
    Second: Second === String(time) ? '00' : Second,
  };
};
watch(currentDiffTime, (nv) => {
  setFormatTime(nv);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(timer);
});
</script>

<style lang="scss" scoped>
.FlashSaleContainer {
  font-size: 20px;
  display: flex;
  justify-content: space-between;

  img {
    width: 100px;
    height: 50px;
  }
  .timeContainer {
    display: flex;
  }
  .price {
    color: rgb(255, 101, 9);
  }
}
</style>
