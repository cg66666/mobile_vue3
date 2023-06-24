<template>
  <div class="container" :style="props.style">
    <div v-if="props.title" class="title">{{ props.title }}</div>
    <slot v-if="slots"></slot>
    <div v-if="props.listData?.length" class="listContainer" ref="List">
      <div class="pageConmtainer" v-for="(item, index) in scrollData" :key="index">
        <div class="listItem" v-for="(item2, index2) in item" :key="index2">
          <SvgIcon name="dengpao" size="0.9rem" color="rgb(255, 209, 0)" />
          <div class="name">{{ item2.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed, ref, type Ref, type CSSProperties, onMounted } from 'vue';
import { useScrollOrient } from '@/hooks/useScrollOrient';
export type dataType = {
  label: string;
  img: string;
};
const props = defineProps<{
  title?: string;
  listData?: dataType[];
  productData?: dataType;
  style?: CSSProperties;
}>();
const emit = defineEmits<{
  click: [id: number];
}>();
const slots = computed(() => !!useSlots().default);
const List = ref<HTMLElement>();
const scrollData = useScrollOrient(props.listData || [], List as Ref<HTMLElement>);
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
