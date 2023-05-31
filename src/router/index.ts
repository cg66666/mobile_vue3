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
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

export default router;
