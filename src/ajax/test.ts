import { get, post } from './index';
interface userInfo {
  name: string;
  sex: number;
}
export const getInfo = async (id: number): Promise<userInfo | undefined> => {
  const res = await get<userInfo>('/getInfo', { id });
  if (res) return res;
};
export const getInfoPost = async (id: number): Promise<userInfo | undefined> => {
  const res = await post<userInfo>('/getInfo', { id });
  if (res) return res;
};
