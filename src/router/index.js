import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const constantRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '数据可视化' },
    component: () => import('@/views/home/home.vue')
  },
  {
    path: '/vmap',
    name: 'Vmap',
    meta: { title: '数据可视化地图' },
    component: () => import('@/views/vmap/vmap.vue')
  },
  {
    // 页面不存在的情况下跳转首页
    path: '*',
    redirect: '/home'
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
