import type { Component } from 'vue';
import SvgIcon from './SvgIcon.vue';
import WhiteCard from './WhiteCard.vue';

// ✨如果使用的是 JS 可以删除类型校验
const components: {
  [propName: string]: Component;
} = {
  SvgIcon,
  WhiteCard
};
export default components;
