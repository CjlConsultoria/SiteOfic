<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()

function irParaLogin() {
  router.push('/login')
}

function irParaRegistre() {
  router.push('/registre')
}


const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template lang="pug">
div.layout-wrapper
  header.fixed-header(:class="{ scrolled: isScrolled }")
    .wrapper
      img.logo(src="@/assets/logocjl.png" alt="Logo CJL" width="60" height="60")
      nav.menu
        RouterLink(to="/") Início
        RouterLink(to="/sobre") Sobre
        RouterLink(to="/servicos") Serviços
        RouterLink(to="/planos") Planos
      .auth-buttons
        //- button.login-btn(@click="irParaLogin") Login
        //- button.register-btn(@click="irParaRegistre") Registre-se


  main.main-content
    RouterView

  footer.fixed-footer
    p © 2025 - Todos os direitos reservados
</template>
esse é meu codigo todo, eu nao quero que mexa em absolutamente nada da estilizacao, quero apenas que mexa no media

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;

  /* Fundo imagem para todo o layout */
  
  background-size: cover;
  /* se quiser escurecer um pouco o fundo */
  position: relative;
}


/* Garantir que conteúdo fique acima da camada escura */
.layout-wrapper > * {
  position: relative;
  z-index: 1;
}

/* Cabeçalho fixo */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  /* Defina altura fixa desejada para a barra, por exemplo 80px */
  height: 80px;

  background-color: rgba(30, 30, 30, 0.7);
  color: white;
  padding: 0 2rem; /* remova o padding vertical para não aumentar a altura */
  
  display: flex;
  align-items: center; /* centraliza verticalmente */
  justify-content: flex-start;
  z-index: 1000;
  box-sizing: border-box;
}
.fixed-header.scrolled {
  background-color: rgba(66, 66, 66, 0.95); /* aparece ao rolar */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* Ajuste a logo para caber nessa altura fixa */
.logo {
  width: 130px;
  height: 130px;
  cursor: pointer;
  transform: scale(1);
  transform-origin: center;
  flex-shrink: 0;
  z-index: 10;
  margin-top: 10px;
}


.fixed-header.scrolled {
  background-color: rgba(66, 66, 66, 0.95); /* aparece ao rolar */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}


/* Container interno do header para controlar logo, menu e botões */
.wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

/* Menu centralizado */
nav.menu {
  position: absolute; /* tira do fluxo para centralizar */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  z-index: 5;
}

/* Links do menu */
/* Links do menu */
nav.menu a {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  outline: none;
  transition: color 0.3s;
  cursor: pointer;
}

/* Remove sombra verde ou qualquer sombra no hover e focus */
nav.menu a:hover,
nav.menu a:focus {
  color: #a5a5a5;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  text-shadow: none !important;
}

/* Link ativo */
nav a.router-link-exact-active {
  font-weight: bold;
  border-bottom: 2px solid rgb(187, 187, 187);
}

/* Container dos botões no canto direito */
.auth-buttons {
  margin-left: auto; /* empurra para o canto direito */
  display: flex;
  gap: 1rem;
  z-index: 10;
}

/* Estilo geral dos botões */
.auth-buttons button {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

/* Efeito hover para os botões */
.auth-buttons button:hover {
  background-color: white;
  color: #1e1e1e; /* texto escuro no hover */
}

/* Conteúdo principal - espaço para não ficar atrás do header e footer */
.main-content {
  flex: 1;
  padding-top: 80px; /* espaço para header fixo */
  padding-bottom: 60px; /* espaço para footer fixo */
  width: 100%;
  margin: 0;
  box-sizing: border-box;
}

/* Rodapé fixo */
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(30, 30, 30, 0.7);
  color: white;
  text-align: center;
  padding: 1rem;
  z-index: 1000;
}

/* Reset global para html e body */
:global(html, body) {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* remove rolagem */
  box-sizing: border-box;
}
</style>
