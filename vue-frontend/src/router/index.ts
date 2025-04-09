import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user';
import LoginPage from '../pages/login/LoginPage.vue';
import HomePage from '../pages/home/HomePage.vue';

const adminRoutes = [
  { path: 'page1', component: () => import('../pages/otherpage/Page1.vue') },
  { path: 'page2', component: () => import('../pages/otherpage/Page2.vue') },
  { path: 'page3', component: () => import('../pages/otherpage/Page3.vue') }
];

const routes = [
  { path: '/', component: LoginPage },
  { path: '/login', component: LoginPage },
  { 
    path: '/home', 
    name: 'home',
    component: HomePage,
    children: [
      { path: 'user-management', name: 'user-management', component: ()=>import('../pages/home/UserManagement.vue')  },
      { path: 'dashboard', name: 'dashboard', component: () => import('../pages/home/NewPage.vue') },
      { path: 'archive-center', name: 'archive-center', component: () => import('../pages/home/ArchiveCenter.vue') },
      { path: 'reports', name: 'reports', component: () => import('../pages/home/ReportStatistics.vue') }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path === '/login' && userStore.token) {
    next('/home');
  } else if (!userStore.token && to.path !== '/login' && !sessionStorage.getItem('redirect')) {
    sessionStorage.setItem('redirect', to.fullPath);
    next('/login');
  } else {
    // 动态添加路由
    if (userStore.userInfo?.role === 'admin' && !router.hasRoute('page1')) {
      adminRoutes.forEach(route => {
        router.addRoute('home', route);
      });
    }
    // 检查权限
    if (to.path.includes('/page') && userStore.userInfo?.role !== 'admin') {
      next('/home');
    } else {
      next();
    }
  }
});

export default router;