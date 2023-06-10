<template>
  <svg :class="`icon ${props.className}`" aria-hidden="true">
    <use :xlink:href="`#icon-${props.name}`" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
/**
 * 这里的size长度单位填写rem，如果使用px会丢失响应式
 */
const props = defineProps<{ name: string; className?: string; color?: string; size?: string }>();
</script>

<style scoped>
.icon {
  width: v-bind("props.size || '20px'");
  height: v-bind("props.size || '20px'");
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
