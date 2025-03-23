import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/login.vue';
import Registro from './components/registro.vue';
import Lotes from './components/lotes.vue';
import Clasificaion from './components/clasificacion.vue'
import Despulpado from './components/despulpado.vue'
import Exportacion from './components/exportacion.vue'
import Fermentancion from './components/fermentacion.vue'
import Lavado from './components/lavado.vue'
import Secado from './components/secado.vue'

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
  {
    path: '/clasificacion',
    name: 'clasificaion',
    component: Clasificaion,
    meta: { requiresAuth: true },
  },
  {
    path: '/despulpado',
    name: 'despulpado',
    component: Despulpado,
    meta: { requiresAuth: true },
  },
  {
    path: '/exportacion',
    name: 'exportacion',
    component: Exportacion,
    meta: { requiresAuth: true },
  },
  {
    path: '/fermentacion',
    name: 'fermentacion',
    component: Fermentancion,
    meta: { requiresAuth: true },
  },
  {
    path: '/lavado',
    name: 'lavado',
    component: Lavado,
    meta: { requiresAuth: true },
  },
  {
    path: '/secado',
    name: 'secado',
    component: Secado,
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