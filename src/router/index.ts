import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useLogin } from '@/stores';
import { verifyToken } from '@/service/login';

// 使用TS扩展
// 如果不使用扩展 将会是unknow 类型
declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    // transition?: {
    //   enter?: string;
    //   leave?: string;
    // };
  }
}
let routes: RouteRecordRaw[] = [];
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  routes = [
    ...routes,
    {
      path: '/:chapters(\\w+)*',
      redirect: '/home',
      // name: 'home',
      // component: Home
    },
    {
      // path: '/tabs',
      // name: 'tabs',
      // component: () => import('@/pages/bottomTabs/BottomTabs.vue'),
      // children: [
      name: 'home',
      path: '/home',
      component: () => import('@/pages/home/HomePage.vue'),
      meta: {
        title: '首页',
        // transition: {
        //   enter: 'animate__slideInLeft',
        //   leave: 'animate__slideOutLeft'
        // }
      },
      // ]
    },
    {
      name: 'productDetails',
      path: '/productDetails',
      component: () => import('@/pages/productDetails/ProduceDetailsPage.vue'),
      meta: {
        title: '商品详情',
        // transition: {
        //   enter: 'animate__slideInLeft',
        //   leave: 'animate__slideOutLeft'
        // }
      },
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('@/pages/order/OrderPage.vue'),
      meta: {
        title: '订单',
      },
    },
    {
      name: 'personal',
      path: '/personal',
      component: () => import('@/pages/personal/PersonalPage.vue'),
      meta: {
        title: '个人主页',
      },
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/login/LoginPage.vue'),
      meta: {
        title: '登录',
      },
    },
    {
      name: 'service',
      path: '/service',
      component: () => import('@/pages/service/ServicePage.vue'),
      meta: {
        title: '客服',
      },
    },
  ];
} else {
  routes = [
    ...routes,
    {
      name: 'every',
      path: '/:chapters(\\w+)*',
      redirect: '/pcQrcode',
    },
    {
      name: 'pcQrcode',
      path: '/pcQrcode',
      meta: {
        title: '提示',
      },
      component: () => import('@/pages/pcQrcode/pcQrcode.vue'),
    },
  ];
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 需要登录校验的路由name
const verifyRouteName = ['productDetails', 'service'];
// 登录状态无法进入的登录页
const loginRouteName = ['login'];

// 全局守卫
router.beforeEach((to, from, next) => {
  const loginStore = useLogin();
  loginStore.getUserInfo().finally(() => {
    document.title = to.meta.title;
    if (verifyRouteName.includes(to.name as string)) {
      if (loginStore.token) {
        next();
      } else {
        // 保证退回原页面
        next(`/login?return_url=${to.fullPath}`);
      }
    } else if (loginRouteName.includes(to.name as string)) {
      if (loginStore.token) {
        next('/home');
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
