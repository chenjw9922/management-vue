import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/user';
import LoginPage from '../pages/login/LoginPage.vue';
import HomePage from '../pages/home/HomePage.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/login', component: LoginPage },
  { 
    path: '/home', 
    component: HomePage,
    children: [
      { path: 'user-management', component: ()=>import('../pages/home/UserManagement.vue')  },
      { path: '', component: () => import('../pages/home/NewPage.vue') },
      { path: 'page1', component: () => import('../pages/otherpage/Page1.vue') },
      { path: 'page2', component: () => import('../pages/otherpage/Page2.vue') },
      { path: 'page3', component: () => import('../pages/otherpage/Page3.vue') },
      { path: 'settings', component: () => import('../pages/home/SystemSettings.vue') },
      { path: 'reports', component: () => import('../pages/home/ReportStatistics.vue') }
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
    next();
  }
});

export default router;