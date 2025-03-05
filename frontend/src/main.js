import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store';

createApp(App).use(router).use(store).mount('#app');

router.addRoute({
  path: '/lotes',
  name: 'lotes',
  component: () => import('./components/lotes.vue'),
  meta: { requiresAuth: true },
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