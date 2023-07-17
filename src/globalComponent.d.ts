import SvgIcon from '@/components/global/SvgIcon.vue';
import WhiteCard from '@/components/global/WhiteCard.vue';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon;
    WhiteCard: typeof WhiteCard;
  }
}
