import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue';
import Registro from './components/registro.vue';
import Lotes from './components/lotes.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro,
  },
  {
    path: '/lotes',
    name: 'lotes',
    component: Lotes,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;