<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function irParaLogin() {
  router.push('/login')
}

function irParaRegistre() {
  router.push('/registre')
}

const isScrolled = ref(false)
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

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

      // Botão hamburguer
      button.hamburguer(@click="toggleMenu") ☰

      // Menu de navegação
      nav.menu-mobile(v-if="isMenuOpen")
        RouterLink(to="/") Início
        RouterLink(to="/sobre") Sobre
        RouterLink(to="/servicos") Serviços
        RouterLink(to="/planos") Planos

      // Menu desktop
      nav.menu-desktop
        RouterLink(to="/") Início
        RouterLink(to="/sobre") Sobre
        RouterLink(to="/servicos") Serviços
        RouterLink(to="/planos") Planos

      .auth-buttons
        button.login-btn(@click="irParaLogin") Login
        button.register-btn(@click="irParaRegistre") Registre-se

  main.main-content
    RouterView

  footer.fixed-footer
    p © 2025 - Todos os direitos reservados
</template>

<style scoped>

/* Botão hamburguer (visível só em telas pequenas) */
/* Botão hamburguer */
.hamburguer {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%); /* <- centraliza verticalmente */
  z-index: 1100;
}
.menu-desktop a {
  color: white;              /* cor padrão: branco */
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
}


.menu-desktop a:hover,
.menu-desktop a:focus {
  color: #a5a5a5;                /* cor cinza no hover */
  background: transparent;      /* remove qualquer fundo */
  outline: none;                /* remove a borda de foco */
  box-shadow: none;             /* remove sombra de foco */
  text-shadow: none;            /* remove brilho de texto se tiver */
}

/* Menu desktop (mostra sempre em telas grandes) */
/* Menu desktop centralizado */
.menu-desktop {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  z-index: 5;
}

nav.menu {
  position: absolute; /* tira do fluxo para centralizar */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  z-index: 5;
}
.menu-mobile a:hover,
.menu-mobile a:focus {
  background: transparent !important;  /* remove fundo */
  outline: none !important;             /* remove contorno */
  box-shadow: none !important;          /* remove sombra */
}
/* Menu mobile (escondido por padrão, v-if mostra no clique) */
.menu-mobile {
  position: fixed; /* fixa na viewport, não mais relativo a pai */
  top: 80px;       /* abaixo do header */
  left: 0;
  right: 0;
  width: 100vw;    /* largura total da viewport */
  height: auto;
  background-color: rgba(0, 0, 0, 0.692);
  padding: 20px 0;
  z-index: 10000;  /* acima de tudo */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: none;
  margin: 0;
  box-sizing: border-box;
}



/* Links dentro do menu mobile */
.menu-mobile a {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 0;
  text-align: center;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-color 0.3s;
  display: inline-block;
}

/* Hover para todos os links */
.menu-mobile a:hover {
  color: #a5a5a5;
  border-bottom: 2px solid rgb(187, 187, 187);
}
.menu-mobile a.router-link-exact-active {
  border-bottom: none !important; /* ou remova essa regra */
}


@media (max-width: 768px) {
  .hamburguer {
    display: block;
  }

  .menu-desktop {
    display: none;
  }
}




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

  background-color: rgba(0, 0, 0, 0.692);
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
  background-color: rgba(0, 0, 0, 0.692);
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
  background-color: rgba(0, 0, 0, 0.692);
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
