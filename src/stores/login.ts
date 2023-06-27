import { defineStore } from 'pinia';
import { getUserInfo } from '@/service/login';

export const useLogin = defineStore('login', {
  state: () => ({
    token: null,
    name: ''
  }),
  actions: {
    async getUserInfo() {
      const userInfo = JSON.parse(window.localStorage.getItem('userInfo') ?? '{}');
      this.token = userInfo?.token;
      this.name = userInfo?.name;
      const res = await getUserInfo();
      if (res?.data?.name) {
        this.name = res.data.name;
        // return Promise.resolve();
      } else {
        // console.log(222);

        this.clearLocalUserInfo();
        // return Promise.reject();
      }
    },
    clearLocalUserInfo() {
      window.localStorage.removeItem('userInfo');
      this.name = '';
      this.token = null;
    },
    setLocalUserInfo(token: string, name: string) {
      window.localStorage.setItem('userInfo', JSON.stringify({ token, name }));
      this.token = token;
      this.name = name;
    }
  }
});
