<template>
  <div class="DelicacyContainer">
    <div>
      <div v-for="(item, index) in state.leftList" :key="index">
        <Countdown
          v-if="index === 0"
          class="card"
          :start-time="item.startTime"
          :end-time="item.endTime"
          :imgUrl="item.goods.imgUrl"
        />
        <WhiteCard v-else className="card">
          <div>
            <img v-lazy="item.goods.imgUrl" />
            <div>{{ item.goods.name }}</div>
            <div class="price">￥ {{ item.goods.price }}</div>
          </div>
        </WhiteCard>
      </div>
    </div>
    <div>
      <div v-for="(item, index) in state.leftList" :key="index">
        <WhiteCard className="card">
          <div>
            <img v-lazy="item.goods.imgUrl" />
            <div>{{ item.goods.name }}</div>
            <div class="price">￥ {{ item.goods.price }}</div>
          </div>
        </WhiteCard>
      </div>
    </div>
    <!-- width: 183px; -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect, watch, ref, onUpdated, reactive } from 'vue';
import Countdown from '@/components/Countdown.vue';
import { type delicacyListType } from '@/service/home';
const props = defineProps<{ showDelicacyList: delicacyListType[] }>();
const state = reactive<{ leftList: delicacyListType[]; rightList: delicacyListType[] }>({
  leftList: [],
  rightList: []
});
const countdownTime = ref({
  startTime: '2023-06-06 13:00:00',
  endTime: '2023-06-08 20:30:00',
  imgUrl: ''
});

// const leftList = ref<delicacyListType[]>([]);
// const rightList = ref<delicacyListType[]>([]);
watch(props, (nv) => {
  if (nv.showDelicacyList.length) {
    countdownTime.value = {
      startTime: nv.showDelicacyList[0].startTime || '',
      endTime: nv.showDelicacyList[0].endTime || '',
      imgUrl: nv.showDelicacyList[0].goods.imgUrl
    };
    console.log('countdownTime', countdownTime.value);
    const leftList: delicacyListType[] = [];
    const rightList: delicacyListType[] = [];
    nv.showDelicacyList.forEach((item, index) => {
      if ((index + 1) % 2 === 0) {
        leftList.push(item);
      } else {
        rightList.push(item);
      }
    });
    state.rightList = rightList;
    state.leftList = leftList;
  }
});
</script>

<style lang="scss" scoped>
.DelicacyContainer {
  display: flex;
  justify-content: space-between;
  .card {
    width: 183px;
    font-size: 16px;
    img {
      width: 100px;
      height: 100px;
    }
    .price {
      color: rgb(255, 101, 9);
    }
  }
}
</style>
