<template lang="pug">
#app
  header(:class="['navbar', { scrolled: isScrolled }]")
    .logo
      img(:src="logocjl", alt="Logo CJL")
    .menu-e-botoes
      nav.menu
        RouterLink(to="/" exact-active-class="router-link-exact-active") Início
        RouterLink(to="/sobre" exact-active-class="router-link-exact-active") Sobre
        RouterLink(to="/servicos" exact-active-class="router-link-exact-active") Serviços
        RouterLink(to="/contato" exact-active-class="router-link-exact-active") Contato
      .navbar-buttons
        button.btn.btn-outline Fale Conosco
        button.btn.btn-outline Registre-se

  main.content
    RouterView

  footer.footer
    p © 2025 CJL Consultoria - Todos os direitos reservados
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import logocjl from '@/assets/logocjl.png'

const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: rgba(24, 24, 24, 0);
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
  transition:
    background-color 0.3s ease,
    backdrop-filter 0.3s ease;
  z-index: 1000;
  font-family: 'Georgia', serif;
  font-weight: 600;
  font-size: 1rem;
}
.navbar.scrolled {
  background: rgba(24, 24, 24, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.logo img {
  height: 130px;
  margin-bottom: -15px;
}
.logo {
  margin-right: 1rem;
}
.menu-e-botoes {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.menu a {
  position: relative;
  color: #bbb;
  text-decoration: none;
  transition: color 0.3s;
  font-family: 'Georgia', serif;
  font-weight: 600;
  padding-bottom: 4px;
  display: inline-block;
  margin-left: 30px;
  font-size: 18px;
}
.menu a::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2px;
  width: 0;
  background-color: #beb167;
  opacity: 0;
  transition:
    width 0.9s ease,
    opacity 0.9s ease;
}
.menu a:hover::after {
  width: 100%;
  left: 0;
  right: auto;
  opacity: 1;
}
.menu a:hover,
.menu a:focus {
  color: #dbdbdb;
  outline: none;
  box-shadow: none;
}
.menu .router-link-exact-active {
  border-bottom: none;
  color: #fff;
}
.navbar-buttons {
  display: flex;
  gap: 0.8rem;
}
.btn {
  cursor: pointer;
  background: transparent;
  color: white;
  border: none;
  box-shadow: 0 0 0 0.5px rgba(231, 231, 231, 0.5);
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-family: 'Georgia', serif;
  font-weight: 600;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}
.btn:hover {
  background-color: rgb(221, 221, 221);
  color: black;
  border-color: white;
  text-decoration: none;
}

/* Espaço para conteúdo não ficar atrás da navbar fixa */
main.content {
  margin-top: 80px; /* altura da navbar */
  padding: 2rem;
  min-height: calc(100vh - 80px - 60px); /* altura da navbar + rodapé */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

/* Rodapé */
footer.footer {
  height: 60px;
  background-color: #181818;
  color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Georgia', serif;
  font-weight: 400;
  font-size: 0.9rem;
  user-select: none;
}
</style>
