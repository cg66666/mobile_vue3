import { get, post } from '@/ajax/index';
interface userInfo {
  name: string;
  sex: number;
}
export const getInfo = async (id: number) => {
  const res = await get<userInfo>('/test/getInfo', { id });
  if (res) return res;
};
export const getInfoPost = async (id: number) => {
  const res = await post<userInfo>('/test/getInfo', { id });
  if (res) return res;
};
