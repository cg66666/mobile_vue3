import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { showNotify } from 'vant';
export const instance = axios.create({
  baseURL: '/test',
  timeout: 30 * 1000 // 统一设置超时时间
});
instance.interceptors.response.use(
  (resp: AxiosResponse) => {
    const { data: _data } = resp;
    const { code, msg } = _data;
    if (code === 0) return _data;
    showNotify(msg);
    return Promise.reject();
  },
  (error: AxiosError) => {
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
): Promise<T> =>
  new Promise((resolve) => {
    const mergeConfig = { ...config, params };
    instance.get<T>(url, mergeConfig).then((res) => {
      resolve(res.data);
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
): Promise<T> =>
  new Promise((resolve) => {
    instance.post<T>(url, data, config).then((res) => {
      resolve(res.data);
    });
  });
