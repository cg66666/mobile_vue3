<template>
  <div :class="`container ${props.className || ''}`">
    <div v-if="props.title" class="title">{{ props.title }}</div>
    <slot v-if="slots"></slot>
    <!-- <template v-if="props.listData?.length"> -->
    <div v-if="props.listData?.length" class="listContainer" ref="List">
      <!-- <div class="listItem" v-for="(item, index) in props.listData" :key="index">
        <SvgIcon :name="item.img" size="35px" color="rgb(255, 209, 0)" />
        <div class="name">{{ item.label }}</div>
      </div> -->
      <!-- <div class="pageConmtainer">
        <div>22222222222222</div>
        <div>22222222222222</div>
      </div>
      <div class="pageConmtainer">
        <div>22222222222222</div>
        <div>22222222222222</div>
      </div> -->
      <div class="pageConmtainer">
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
      </div>
      <div class="pageConmtainer">
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
        <div class="listItem">
          <SvgIcon name="dengpao" size="35px" color="rgb(255, 209, 0)" />
          <div class="name">外卖</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed, ref, onMounted, watchEffect, nextTick, getCurrentInstance } from 'vue';
import useScroll from '@/hooks/useScroll';
type dataType = {
  label: string;
  img: string;
};
const props = defineProps<{
  className?: string;
  title?: string;
  // mode?: modeEnum;
  listData?: dataType[];
  productData?: dataType;
}>();
const List = ref();
const slots = computed(() => !!useSlots().default);
useScroll(List);
onMounted(() => {
  nextTick(() => {
    console.log(222, List.value);
  });
  const instance = getCurrentInstance();
  console.log(333, instance);
  console.log(444, props.listData);
});
</script>

<style lang="scss" scoped>
.container {
  //   border: 1px solid red;
  background: white;
  border-radius: 10px;
  max-width: 100%;
  padding: 15px 7px;
  box-sizing: border-box;
  margin-bottom: 10px;
  .title {
    font-size: 15px;
    font-weight: bolder;
    margin: 0px 0px 15px 5px;
  }
  .listContainer {
    width: 100%;
    display: flex;
    flex-wrap: no-wrap;
    overflow: scroll;
    .pageConmtainer {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      overflow: scroll;
      flex: 0 0 100%;
      // width: 100%;
      // flex-shrink: 0;
      .listItem {
        text-align: center;
        // width: 72px;
        width: 72px;
        font-size: 15px;
        margin-bottom: 10px;
        .name {
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
