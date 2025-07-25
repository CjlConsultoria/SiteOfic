import { createRouter, createWebHistory } from 'vue-router'
import Inicial from '@/views/Inicial.vue'
import Planos from '@/views/Paginas/Planos.vue'
import Sobre from '@/views/Sobre.vue'
import Servicos from '@/views/Servicos.vue'
import Login from '@/views/Login.vue'
import Registre from '@/views/Registre.vue'
import Plataforma from '@/views/Plataforma.vue'

const routes = [
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
  {
    path: '/plataforma',
    name: 'Plataforma',
    component: Plataforma,
    meta: { requiresAuth: true } // Rota protegida
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard global para verificar autenticação nas rotas protegidas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    // Se a rota requer auth e não tem token, redireciona para login
    next('/login')
  } else {
    // Senão, permite o acesso
    next()
  }
})

export default router
