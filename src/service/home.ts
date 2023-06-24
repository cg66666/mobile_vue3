import { get, post } from '@/ajax/index';
export interface wordList {
  type: number;
  label: string;
  resultCount: number;
}
export const getSearchWords = async (word: string) => {
  const res = await get<wordList[]>('/home/search', { word });
  if (res) return res;
};
export type firstListType = {
  img: string;
  label: string;
};
export type countdownType = {
  startTime: string;
  endTime: string;
};
export type delicacyListType = {
  startTime?: string;
  endTime?: string;
  goods: {
    id: number;
    imgUrl: string;
    name: string;
    price: number;
  };
};
export interface initData {
  firstList: firstListType[];
  countdown: countdownType;
  firstListTitle: string;
  twiceList: firstListType[];
  searchDefultWordList: string[];
  delicacyList: delicacyListType[];
}
export const getHomeInitData = async () => {
  const res = await get<initData>('/home/getInfo');
  if (res) return res;
};
