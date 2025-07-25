<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const ehPlataforma = ref(false)
const userDropdownOpen = ref(false)

const usuario = reactive({
  nomeCompleto: '',
  email: '',
  fotoUrl: 'https://thumbs.dreamstime.com/b/vetor-de-%C3%ADcone-perfil-do-avatar-padr%C3%A3o-foto-usu%C3%A1rio-m%C3%ADdia-social-183042379.jpg',
  cep: '-',
  cidade: '-',
  estado: '-',
  genero: '-',
  cpf: '',
  cnpj: ''
})

function irParaLogin() {
  router.push('/login')
}

function irParaRegistre() {
  router.push('/registre')
}

function irParaURLExterna() {
  window.open('https://convivium-front.onrender.com/inicio', '_blank')
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function onScroll() {
  isScrolled.value = window.scrollY > 0
}

function toggleUserDropdown() {
  userDropdownOpen.value = !userDropdownOpen.value
}

function logoff() {
  userDropdownOpen.value = false
  localStorage.removeItem('token')
  usuario.nomeCompleto = ''
  usuario.email = ''
  usuario.fotoUrl = 'https://thumbs.dreamstime.com/b/vetor-de-%C3%ADcone-perfil-do-avatar-padr%C3%A3o-foto-usu%C3%A1rio-m%C3%ADdia-social-183042379.jpg'
  usuario.cep = '-'
  usuario.cidade = '-'
  usuario.estado = '-'
  usuario.genero = '-'// Remove o token ao fazer logout
  router.push('/login')
}

watch(
  () => route.path,
  (newPath) => {
    ehPlataforma.value = newPath === '/plataforma'
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  buscarUsuarioLogado()

  window.addEventListener('atualizarUsuario', buscarUsuarioLogado)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('atualizarUsuario', buscarUsuarioLogado)
})

async function buscarUsuarioLogado() {
  const token = localStorage.getItem('token')
  const emRotaProtegida = route.meta.requiresAuth || route.path === '/plataforma'

  if (!token) {
    if (emRotaProtegida) logoff()
    return
  }

  try {
    const resposta = await axios.get('http://localhost:8080/api/auth/dados', {
      headers: { Authorization: `Bearer ${token}` }
    })

    const dados = resposta.data

    usuario.nomeCompleto = (dados.nome && dados.sobrenome)
      ? `${dados.nome} ${dados.sobrenome}`
      : dados.nome || dados.apelido || 'Usuário'

    usuario.email = dados.email || 'email@exemplo.com'
    usuario.cep = dados.cep || '-'
    usuario.cidade = dados.cidade || '-'
    usuario.estado = dados.estado || '-'
    usuario.genero = dados.genero || '-'
    usuario.fotoUrl = dados.fotoUrl || 'https://thumbs.dreamstime.com/b/vetor-de-%C3%ADcone-perfil-do-avatar-padr%C3%A3o-foto-usu%C3%A1rio-m%C3%ADdia-social-183042379.jpg'
    usuario.cpf = dados.cpf || ''
    usuario.cnpj = dados.cnpj || ''
  } catch (erro: any) {
    console.error('Erro ao buscar usuário logado:', erro)

    if (erro.response?.status === 401 && emRotaProtegida) {
      logoff()
    }
  }
}
</script>


<template lang="pug">
div.layout-wrapper(:class="{ 'layout-plataforma': ehPlataforma }")

  //- Se estiver na rota da Plataforma
  template(v-if="ehPlataforma")
    header.fixed-header(:class="{ scrolled: isScrolled }")
      .wrapper
        img.logo(src="@/assets/logocjl.png" alt="Logo CJL" width="60" height="60")

        .user-menu
          img.user-photo(
            :src="usuario.fotoUrl"
            alt="Foto do usuário"
            @click="toggleUserDropdown"
            tabindex="0"
            @keydown.enter.prevent="toggleUserDropdown"
            role="button"
            aria-haspopup="true"
            :aria-expanded="userDropdownOpen"
          )

          div.user-dropdown-google(v-if="userDropdownOpen")
            button.fechar-dropdown(@click="userDropdownOpen = false" aria-label="Fechar") ×

            img.foto-perfil-google(:src="usuario.fotoUrl", alt="Foto do perfil")
            h3.ola-msg Olá, {{ usuario.nomeCompleto.split(' ')[0] }}!
            p.nome-completo {{ usuario.nomeCompleto }}
            p.email {{ usuario.email }}
            p.cpf(v-if="usuario.cpf && usuario.cpf !== ''") CPF: {{ usuario.cpf }}
            p.cnpj(v-else-if="usuario.cnpj && usuario.cnpj !== ''") CNPJ: {{ usuario.cnpj }}

            hr
            button.sair(@click="logoff") Sair

            .links-google
              a(href="#", target="_blank") Política de Privacidade
              span ·
              a(href="#", target="_blank") Termos de Serviço

  //- Se NÃO estiver na rota da Plataforma
  template(v-else)
    header.fixed-header(:class="{ scrolled: isScrolled }")
      .wrapper
        img.logo(src="@/assets/logocjl.png" alt="Logo CJL" width="60" height="60")

        //- Botão hamburguer só aparece no mobile (controlado por CSS)
        button.hamburguer(@click="toggleMenu") ☰

        //- Menu mobile - só aparece se isMenuOpen = true
        nav.menu-mobile(v-if="isMenuOpen")
          RouterLink(to="/") Início
          RouterLink(to="/sobre") Sobre
          RouterLink(to="/servicos") Serviços
          RouterLink(to="/planos") Planos
          //-RouterLink(to="/plataforma") Plataforma
          .mobile-auth-buttons
            //-a.external-btn.link-btn(href="/login") Login
            //-RouterLink.external-btn.link-btn(to="/registre") Registre-se
            button.external-btn(@click="irParaURLExterna") Convivium

        //- Menu desktop - visível apenas em telas maiores via CSS
        nav.menu-desktop
          RouterLink(to="/") Início
          RouterLink(to="/sobre") Sobre
          RouterLink(to="/servicos") Serviços
          RouterLink(to="/planos") Planos
          //-RouterLink(to="/plataforma") Plataforma

        //- Botões de login/registro
        .auth-buttons
          //-a.external-btn.link-btn(href="/login") Login
          //-RouterLink.external-btn.link-btn(to="/registre") Registre-se
          button.external-btn(@click="irParaURLExterna") Convivium

  //- Conteúdo principal
  main.main-content
    RouterView

  //- Rodapé fixo
  footer.fixed-footer
    p © 2025 - Todos os direitos reservados
</template>


<style scoped>
@media (max-width: 768px) {
  .menu-mobile .mobile-auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
@media (max-width: 768px) {
  .menu-mobile .mobile-auth-buttons a:hover,
  .menu-mobile .mobile-auth-buttons button:hover {
    color: #a0a0a0; /* ou qualquer cor desejada */
    cursor: pointer;
  }
}
@media (max-width: 768px) {
  .menu-mobile .mobile-auth-buttons a:hover,
  .menu-mobile .mobile-auth-buttons button:hover,
  .menu-mobile .mobile-auth-buttons .router-link-active:hover {
    color: #a3a3a3 !important; /* Cor da fonte no hover */
    transition: color 0.3s ease;
  }
}

.menu-mobile .mobile-auth-buttons a:hover,
.menu-mobile .mobile-auth-buttons button:hover {
  color: #fff;
  background-color: #bb6400;
}

  .menu-mobile .mobile-auth-buttons a,
  .menu-mobile .mobile-auth-buttons button,
  .menu-mobile .mobile-auth-buttons .external-btn {
    font-size: 1rem !important;
    padding: 0.6rem 1.4rem !important;
    width: 100%;
    text-align: center;
    border-radius: 8px;
  }
}

@media (min-width: 768px) {
  .menu-mobile,
  .hamburguer {
    display: none !important;
  }

  .menu-desktop {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .auth-buttons {
    display: flex !important;
    gap: 1rem;
  }
  
}
/* MOBILE: esconder menu-desktop */
@media (max-width: 767px) {
  .menu-desktop {
    display: none !important;
  }
}

/* DESKTOP: mostrar menu-desktop, esconder menu-mobile */
@media (min-width: 768px) {
  .menu-mobile,
  .hamburguer {
    display: none !important;
  }

  .menu-desktop {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .auth-buttons {
    display: flex !important;
    gap: 1rem;
  }
}


@media (min-width: 768px) {
  .menu-mobile,
  .hamburguer {
    display: none !important;
  }

  .menu-desktop {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
}
/* Menu desktop escondido no mobile */


/* Botão hamburguer só visível no mobile */
.hamburguer {
   display: block !important;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}

/* Menu mobile: só aparece quando isMenuOpen = true */
.menu-mobile {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Tela ≥768px: oculta menu mobile e hamburguer, mostra menu desktop */
@media (min-width: 768px) {
  .menu-mobile,
  .hamburguer {
    display: none !important;
  }

  .menu-desktop {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
}



.nome-completo {
  font-size: 1.1rem;
  color: #222222;
  margin-bottom: 6px;
}

.email {
  font-style: italic;
  color: #4b4b4b;
  margin-bottom: 6px;
}

.cpf, .cnpj {
  font-size: 0.95rem;
  color: #3f3f3f;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 12px;
}

.nome-completo {
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 2px;
}

.fixed-footer {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.692);
  color: white;
  text-align: center;
  padding: 1rem;
  z-index: 1000;
  margin-top: -50px;
}
.layout-plataforma .fechar-dropdown {
  position: absolute;
  top: 8px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #555;
  cursor: pointer;
  transition: box-shadow 0.2s ease;
  border-radius: 50%;
  padding: 2px 8px;
  line-height: 1;
}

.layout-plataforma .fechar-dropdown:hover {
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.2); /* sombra clara arredondada */
}

:global(html, body) {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
/* Estilo para os links (Login e Registrar) */
a.external-btn.link-btn {
  border: 1px solid white;
  color: white;
  background: transparent;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

a.external-btn.link-btn:hover {
  background-color: #ccc;  /* fundo cinza */
  color: #000;
  border-color: white;     /* borda branca no hover */
}

/* Estilo padrão para o botão Convivium */
button.external-btn {
  /* Aqui fica o estilo original do seu botão convivium */
  background-color: #2b8003; /* Exemplo: azul */
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
a.external-btn.link-btn,
button.external-btn {
  padding: 0.25rem 1rem; /* menos altura, mesma largura */
  font-size: 0.9rem; /* opcional: deixa o texto um pouco menor */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

button.external-btn:hover {
  background-color: #0056b3; /* azul mais escuro no hover */
}

.layout-plataforma .user-dropdown-google {
  position: absolute;
  top: 60px;
  right: 0;
  width: 370px;
  background: rgb(236, 236, 236);
  color: #202124;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  padding: 1.5rem 1rem;
  z-index: 9999;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.layout-plataforma .foto-perfil-google {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin: auto;
  margin-top: 20px;
}

.layout-plataforma .ola-msg {
  margin: 0.8rem 0 0.6rem;
  font-size: 1rem;
  font-weight: bold;
}

.layout-plataforma .gerenciar-conta {
  background-color: transparent;
  border: 1px solid #1a73e8;
  color: #000000;
  padding: 0.5rem;
  width: 70%;
  font-size: 0.9rem;
  border-radius: 25px;
  margin-bottom: 1rem;
  margin-top: 1rem;
  cursor: pointer;
}
.layout-plataforma .gerenciar-conta:hover {
  background-color: #f1ffff; /* amarelo claro */
  color: #000; /* texto preto */
}

.layout-plataforma .adicionar-conta,
.layout-plataforma .sair {
  background: none;
  border: none;
  color: #1a73e8;
  padding: 0.4rem 0;
  width: 100%;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.links-google a:hover {
  background-color: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  text-decoration: underline;
}

.layout-plataforma .adicionar-conta:hover,
.layout-plataforma .sair:hover {
  background-color: rgba(60, 64, 67, 0.08);
  border-radius: 5px;
}

.layout-plataforma .links-google {
  margin-top: 1.2rem;
  font-size: 0.75rem;
  color: #5f6368;
  display: flex;
  justify-content: center;
  gap: 4px;
}

.layout-plataforma .links-google a {
  color: #5f6368;
  text-decoration: none;
}

.layout-plataforma .links-google a:hover {
  text-decoration: underline;
}

.layout-plataforma .user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgb(0, 0, 0);
  transition: box-shadow 0.3s ease;
}

.layout-plataforma .user-photo:hover,
.layout-plataforma .user-photo:focus {
  box-shadow: 0 0 8px 2px #ffe920;
  outline: none;
}

.layout-plataforma .user-menu {
  position: relative;
  margin-left: auto;
  cursor: pointer;
}

/* Botão de sair (header da plataforma) */
.btn-logoff {
  margin: auto;
  background-color: #ff1900;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 400; /* menos grossa */
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-items: center;
}


.btn-logoff:hover {
  background-color: #c0392b;
}

/* Foto do usuário redonda e dropdown */
.user-menu {
  position: relative;
  margin-left: auto;
  cursor: pointer;
}

.user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgb(0, 0, 0);
  transition: box-shadow 0.3s ease;

}

.user-photo:hover,
.user-photo:focus {
  box-shadow: 0 0 8px 2px #18ce00;
  outline: none;
}

.user-dropdown {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: rgba(0,0,0,0.85);
  padding: 1rem;
  border-radius: 8px;
  color: white;
  width: 220px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

}

.user-dropdown p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.2;
  word-break: break-word; /* força quebra de palavra para não vazar */
  white-space: normal; /* permite quebra de linha */
  overflow-wrap: break-word; /* garante quebra em palavras longas */
  max-width: 100%; /* limita largura máxima ao container */
}

.user-dropdown p.nome {
  font-weight: 600;
}

/* Mantém os outros estilos originais sem alterações */

@media (max-width: 768px) {
  .hamburguer {
    display: block;
  }

  .menu-desktop {
    display: none;
  }

  .auth-buttons {
    display: none !important;
  }

  .menu-mobile {
    flex-direction: column;
    align-items: center;
  }

  .menu-mobile::after {
    content: '';
    display: block;
    margin: 10px 0;
  }

  .menu-mobile .mobile-auth-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .menu-mobile .mobile-auth-buttons button {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 0.4rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    font-weight: 600;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }

  .menu-mobile .mobile-auth-buttons button:hover {
    background-color: white;
    color: #1e1e1e;
  }

  .menu-mobile .mobile-auth-buttons button:last-child {
    border: 1px solid #FFD700;
    color: white;
  }

  .menu-mobile .mobile-auth-buttons button:last-child:hover {
    background-color: #FFD700;
    color: #1e1e1e;
  }
}

.auth-buttons .external-btn {
  background-color: transparent;
  border: 1px solid #FFD700;
  color: #ffffff;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  font-weight: 600;
}

.auth-buttons .external-btn:hover,
.auth-buttons .external-btn:focus {
  background-color: #FFD700;
  color: #1e1e1e;
  border-color: #FFD700;
}

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
  transform: translateY(-50%);
  z-index: 1100;
}

.menu-desktop a {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
}

.menu-desktop a:hover,
.menu-desktop a:focus {
  color: #a5a5a5;
  background: transparent;
  outline: none;
  box-shadow: none;
  text-shadow: none;
}

.menu-desktop {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  z-index: 5;
}

.menu-mobile a:hover,
.menu-mobile a:focus {
  background: transparent !important;
  outline: none !important;
  box-shadow: none !important;
}

.menu-mobile {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  width: 100vw;
  height: auto;
  background-color: rgba(0, 0, 0, 0.692);
  padding: 20px 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: none;
  margin: 0;
  box-sizing: border-box;
}

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

.menu-mobile a:hover {
  color: #a5a5a5;
  border-bottom: 2px solid rgb(187, 187, 187);
}

.menu-mobile a.router-link-exact-active {
  border-bottom: none !important;
}

.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background-size: cover;
  position: relative;
}

.layout-wrapper > * {
  position: relative;
  z-index: 1;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.692);
  color: white;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 1000;
  box-sizing: border-box;
}

.fixed-header.scrolled {
  background-color: rgba(66, 66, 66, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

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

.wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

nav.menu a {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  outline: none;
  transition: color 0.3s;
  cursor: pointer;
}

nav.menu a:hover,
nav.menu a:focus {
  color: #a5a5a5;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  text-shadow: none !important;
}

nav a.router-link-exact-active {
  font-weight: bold;
  border-bottom: 2px solid rgb(187, 187, 187);
}

.auth-buttons {
  margin-left: auto;
  display: flex;
  gap: 1rem;
  z-index: 10;
}

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

.auth-buttons button:hover {
  background-color: white;
  color: #1e1e1e;
}

.main-content {
  flex: 1;
  padding-top: 80px;
  padding-bottom: 60px;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
}

.fixed-footer {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.692);
  color: white;
  text-align: center;
  padding: 1rem;
  z-index: 1000;
}

:global(html, body) {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
