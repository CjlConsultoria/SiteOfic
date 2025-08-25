import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Guard único para scroll e autenticação
router.beforeEach((to, from, next) => {
  // Força scroll para o topo sempre que muda de rota
  window.scrollTo(0, 0)

  // Verifica autenticação
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

app.mount('#app')
