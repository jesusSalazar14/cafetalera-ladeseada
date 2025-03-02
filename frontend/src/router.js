import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/login.vue'
import Registro from './components/registro.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router