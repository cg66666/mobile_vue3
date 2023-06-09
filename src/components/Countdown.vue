<template>
  <div class="FlashSaleContainer">
    <WhiteCard className="card">
      <img :src="getAssetsFile('index_page/count-down.png')" alt="" />
      <div class="timeContainer">
        <div>天：{{ formatTime.Day }}</div>
        <div>时：{{ formatTime.Hour }}</div>
        <div>分：{{ formatTime.Minute }}</div>
        <div>秒：{{ formatTime.Second }}</div>
      </div>
    </WhiteCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { getAssetsFile } from '@/utils/index';
import WhiteCard from '@/components/WhiteCard.vue';
type formatTimeType = {
  Day: string;
  Hour: string;
  Minute: string;
  Second: string;
};
const props = withDefaults(defineProps<{ startTime?: string; endTime?: string }>(), {
  startTime: '2023-06-06 13:00:00',
  endTime: '2023-06-08 20:30:00'
});
const formatTime = ref<formatTimeType>({
  Day: '00',
  Hour: '00',
  Minute: '00',
  Second: '00'
});
const startTimeStamp = computed(() => {
  return new Date(props.startTime).getTime();
});
const endTimeStamp = computed(() => {
  return new Date(props.endTime).getTime();
});

const setFormatTime = (time: number) => {
  const Day = String(Math.floor(time / 60 / 60 / 1000 / 24)).padStart(2, '0');
  const Hour = String(Math.floor((time % (1000 * 60 * 60 * 24)) / 60 / 60 / 1000)).padStart(2, '0');
  const Minute = String(Math.floor((time % (1000 * 60 * 60)) / 60 / 1000)).padStart(2, '0');
  const Second = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, '0');
  formatTime.value = {
    Day: Day === String(time) ? '00' : Day,
    Hour: Hour === String(time) ? '00' : Hour,
    Minute: Minute === String(time) ? '00' : Minute,
    Second: Second === String(time) ? '00' : Second
  };
};

onBeforeMount(() => {
  let timer: number;
  const setTime = () => {
    const nowTime = new Date().getTime();
    if (nowTime < startTimeStamp.value || nowTime > endTimeStamp.value) {
      formatTime.value = {
        Day: '00',
        Hour: '00',
        Minute: '00',
        Second: '00'
      };
      cancelAnimationFrame(timer);
    } else {
      setFormatTime(endTimeStamp.value - nowTime);
      requestAnimationFrame(setTime);
    }
  };
  timer = requestAnimationFrame(setTime);
});
</script>

<style lang="scss" scoped>
.FlashSaleContainer {
  font-size: 20px;
  .card {
    .timeContainer {
      display: flex;
    }
  }
}
</style>
