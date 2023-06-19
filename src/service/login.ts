import { get, post } from '@/ajax/index';
// import { type AxiosResponse } from 'axios';

type loginType = {
  phone: string;
  password: string;
};
export type loginRes = {
  name: string;
  token: string;
};
export const toLogin = async (loginInfo: loginType) => {
  const res = await post<loginRes>('/login', { loginInfo });
  if (res) return res;
};
type userInfo = {
  name: string;
};
export const getUserInfo = async () => {
  const res = await get<userInfo>('/login/getInfo');
  if (res) return res;
};
