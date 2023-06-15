import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
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
      component: () => import('@/pages/home/HomePage.vue')
      // ]
    },
    {
      name: 'productDetails',
      path: '/productDetails',
      component: () => import('@/pages/productDetails/ProductDetailsPage.vue')
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('@/pages/order/OrderPage.vue')
    },
    {
      name: 'personal',
      path: '/personal',
      component: () => import('@/pages/personal/PersonalPage.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/pages/login/LoginPage.vue')
    }
  ]
});

export default router;
