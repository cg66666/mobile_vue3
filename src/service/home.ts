import { get, post } from '@/ajax/index';
import { type AxiosResponse } from 'axios';
export interface wordList {
  type: number;
  label: string;
  resultCount: number;
}
export const getSearchWords = async (
  word: string
): Promise<AxiosResponse<wordList[]> | undefined> => {
  const res = await get<wordList[]>('/home/search', { word });
  if (res) return res;
};
// export const getInfoPost = async (id: number): Promise<userInfo | undefined> => {
//   const res = await post<userInfo>('/getInfo', { id });
//   if (res) return res;
// };
export type firstListType = {
  img: string;
  label: string;
};
export type countdownType = {
  startTime: string;
  endTime: string;
};
export interface initData {
  firstList: firstListType[];
  countdown: countdownType;
  firstListTitle: string;
  twiceList: firstListType[];
  searchDefultWordList: string[];
}
export const getHomeInitData = async (): Promise<AxiosResponse<initData> | undefined> => {
  const res = await get<initData>('/home/getInfo');
  if (res) return res;
};
