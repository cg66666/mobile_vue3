<template>
  <div class="DelicacyContainer">
    <div>
      <template v-for="(item, index) in state.leftList" :key="index">
        <Countdown
          v-if="index === 0"
          class="card"
          :start-time="item.startTime"
          :end-time="item.endTime"
          :imgUrl="item.goods.imgUrl"
          :title="item.goods.name"
          :price="item.goods.price"
          @click="goDetail(item.goods.id)"
        />
        <WhiteCard v-else class="card">
          <div @click="goDetail(item.goods.id)">
            <img v-lazy="item.goods.imgUrl" />
            <div>{{ item.goods.name }}</div>
            <div class="price">￥ {{ item.goods.price }}</div>
          </div>
        </WhiteCard>
      </template>
    </div>
    <div>
      <template v-for="(item, index) in state.rightList" :key="index">
        <WhiteCard class="card">
          <div @click="goDetail(item.goods.id)">
            <img v-lazy="item.goods.imgUrl" />
            <div>{{ item.goods.name }}</div>
            <div class="price">￥ {{ item.goods.price }}</div>
          </div>
        </WhiteCard>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Countdown from '@/components/Countdown.vue';
import { type delicacyListType } from '@/service/home';
const router = useRouter();
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
const goDetail = (id: number) => {
  router.push({
    name: 'productDetails',
    query: { id }
  });
};
watch(props, (nv) => {
  if (nv.showDelicacyList.length) {
    countdownTime.value = {
      startTime: nv.showDelicacyList[0].startTime || '',
      endTime: nv.showDelicacyList[0].endTime || '',
      imgUrl: nv.showDelicacyList[0].goods.imgUrl
    };
    const leftList: delicacyListType[] = [];
    const rightList: delicacyListType[] = [];
    nv.showDelicacyList.forEach((item, index) => {
      if ((index + 1) % 2 === 0) {
        rightList.push(item);
      } else {
        leftList.push(item);
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
  // overflow: scroll;
  // height: 350px;
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
