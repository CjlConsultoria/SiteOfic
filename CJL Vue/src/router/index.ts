import { createRouter, createWebHistory } from 'vue-router'
import Inicial from '@/views/Inicial.vue'
import Planos from '@/views/Paginas/Planos.vue'
import Sobre from '@/views/Sobre.vue'
import Servicos from '@/views/Servicos.vue'
import Login from '@/views/Login.vue'
import Registre from '@/views/Registre.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Inicial,
    },
    {
      path: '/planos',
      name: 'Planos',
      component: Planos,
    },
    {
      path: '/sobre',
      name: 'Sobre',
      component: Sobre,
    },
    {
      path: '/servicos',
      name: 'Servicos',
      component: Servicos,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/registre',
      name: 'Registre',
      component: Registre,
    },
  ],
})

export default router
