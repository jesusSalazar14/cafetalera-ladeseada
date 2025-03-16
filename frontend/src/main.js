import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from 'axios';

createApp(App).use(router).use(store).mount('#app');

// Agrega el token a las cabeceras de axios si existe en el local storage
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'login' });
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      next();
    }
  } else {
    next();
  }
});