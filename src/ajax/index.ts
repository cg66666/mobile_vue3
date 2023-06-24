import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { useLogin } from '@/stores';
import { showNotify } from 'vant';
export interface IData<T> {
  code: number;
  msg: string;
  data: T;
}
export const instance = axios.create({
  baseURL: '/mobile_Vue3',
  timeout: 30 * 1000 // 统一设置超时时间
});

instance.interceptors.request.use(
  (req) => {
    const loginStore = useLogin();
    req.headers['X-Token'] = loginStore.token;
    return req;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (resp: AxiosResponse) => {
    const { data: _data } = resp;
    const { code, msg } = _data;
    if (code === 0) return _data;
    showNotify(msg);
    return Promise.reject();
  },
  (error: AxiosError) => {
    console.log(error);

    showNotify('请求失败，请检查网络');
    return Promise.reject(error);
  }
);

/**
 *  Post请求
 * @param url 请求地址
 * @param data 请求参数
 * @param config  请求配置
 * @returns
 */
export const get = <T>(
  url: string,
  params: Record<string, any> = {},
  config?: AxiosRequestConfig
): Promise<IData<T>> =>
  new Promise((resolve, reject) => {
    const mergeConfig = { ...config, params };
    instance
      .get<IData<T>>(url, mergeConfig)
      .then((res) => {
        // @ts-ignore
        resolve(res);
      })
      .catch(() => {
        reject();
      });
  });

/**
 *  Post请求
 * @param url 请求地址
 * @param data 请求参数
 * @param config  请求配置
 * @returns
 */
export const post = <T>(
  url: string,
  data: { [key: string]: any } = {},
  config?: AxiosRequestConfig
): Promise<IData<T>> =>
  new Promise((resolve, reject) => {
    instance
      .post<IData<T>>(url, data, config)
      .then((res) => {
        // @ts-ignore
        resolve(res);
      })
      .catch(() => {
        reject();
      });
  });
