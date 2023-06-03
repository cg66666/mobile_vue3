import SvgIcon from '@/components/global/SvgIcon.vue';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon;
  }
}
