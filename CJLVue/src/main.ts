import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Guard para autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

// Força scroll para o topo em cada navegação
router.afterEach(() => {
  // espera o DOM atualizar
  nextTick(() => {
    // 1️⃣ Scroll da janela principal
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // 2️⃣ Scroll de container interno, se houver
    const mainContainer = document.querySelector('.wrapper') // substitua pela sua classe do container
    if (mainContainer) mainContainer.scrollTop = 0
  })
})

app.mount('#app')
