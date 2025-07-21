<script setup>
import { ref } from 'vue'
import LogoNexdom from '@/assets/cjl.jpg' // <-- Caminho da imagem correto!


const menuAberto = ref(false)

const toggleMenu = () => {
  menuAberto.value = !menuAberto.value
}

const menuPrincipal = [
  { label: 'Dashboard', url: '#', icon: '📊' },           // estatísticas
  { label: 'Condomínios', url: '#', icon: '🏢' },         // prédios
  { label: 'Financeiro', url: '#', icon: '💰' },          // dinheiro
  { label: 'Usuários', url: '#', icon: '👥' },            // pessoas
  { label: 'Serviços', url: '#', icon: '🛠️' },           // ferramenta
  { label: 'Relatórios', url: '#', icon: '📑' },          // relatório

]

const menuSecundaria = [
  { label: 'Perfil', url: '#', icon: '🙍‍♂️' },           // usuário
  { label: 'Ajuda', url: '#', icon: '❓' },               // ajuda
  { label: 'Sobre', url: '#', icon: 'ℹ️' },              // info
    { label: 'Configurações', url: '#', icon: '⚙️' }       // engrenagem
]

const cards = [
  {
    id: 1,
    logo: LogoNexdom,
    title: 'Sistema de Gestão de Condomínios',
    author: 'Consultoria CJL',
    description: 'Sistema completo para gestão de condomínios, integrando controle financeiro, comunicação eficiente entre moradores e administração de reservas, simplificando a rotina do síndico.',
    rating: '5.0/5.0',
    reviews: 2
  },
  {
    id: 2,
    logo: LogoNexdom,
    title: 'Gestao de Estoque',
    author: 'Consultoria CJL',
    description: 'Sistema eficiente para controle de estoque, facilitando o monitoramento de produtos, entradas, saídas e reposições em tempo real, otimizando a gestão e reduzindo perdas.',
    rating: '4.8/5.0',
    reviews: 5
  }
]
</script>

<template lang="pug">
.app
  aside.sidebar(:class="{ open: menuAberto }")
    .logo
    nav.menu
      ul.menu-principal
        li(v-for="item in menuPrincipal" :key="item.label")
          a(:href="item.url")
            span.icon {{ item.icon }}&nbsp;
            | {{ item.label }}

      ul.menu-secundaria
        li(v-for="item in menuSecundaria" :key="item.label" :class="{ 'btn-sair': item.label === 'Sair' }")
          a(:href="item.url")
            span.icon {{ item.icon }}&nbsp;
            | {{ item.label }}

  button.btn-menu(@click="toggleMenu") ☰

  section.software-list-container
    h1.software-main-title Sistemas para Testes
    h2.software-title

    .software-cards-wrapper
      .software-card(v-for="card in cards" :key="card.id")
        .software-card-logo
          img(:src="card.logo", alt="Logo CJL")
        .software-card-content
          h3 {{ card.title }}

          p.software-card-author Desenvolvido por 
          p.software-card-author Desenvolvido por

            strong {{ card.author }}
          p.software-card-description {{ card.description }}
        .software-card-rating
          span.star ⭐
          span.rating-text {{ card.rating }}
          span.review-count {{ card.reviews }} avaliações
        button.software-card-button Testar esse Sistema
        label.software-card-checkbox
          input(type="checkbox")
          | Comparar
</template>

<style scoped>
.software-main-title,
.software-title {
  text-align: center;
  margin-left: 180px;
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: -10px;

}

/* Mantém todo o seu CSS como estava, sem alterações */
.software-list-container {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.software-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.software-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.software-cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.software-card {
  margin-left: 20rem;
  margin-right: 5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background: #fff;
  position: relative;
  margin-top: 20px;
  min-height: 220px;

}

.software-card-logo img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  border-radius: 15px;
}

.software-card-content h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #202124;
}

.software-card-author {
  color: #5f6368;
  margin-top: 0.2rem;
  margin-bottom: 0.8rem;
}

.software-card-description {
  font-size: 0.9rem;
  color: #5f6368;
  margin-top: 2rem;
}

.software-card-rating {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 0.9rem;
  color: #f57c00;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}

.software-card-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #3367d6;
  background: white;
  color: #3367d6;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
}

.software-card-button:hover {
  background: #e8f0fe;
}

.software-card-checkbox {
  margin-top: 1rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #5f6368;
}

@media (min-width: 768px) {
  .software-card {
    flex-direction: row;
    align-items: flex-start;
    gap: 1rem;
  }

  .software-card-logo {
    flex: 0 0 60px;
  }

  .software-card-content {
    flex: 1;
  }

  .software-card-rating {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    text-align: right;
  }

  .software-card-button {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .software-card-checkbox {
    position: absolute;
    bottom: 1.5rem;
    left: 1.5rem;
  }
}
.icon {
  display: inline-block;
  width: 1.2em;
  text-align: center;
  color: rgb(61, 61, 61);
  margin-right: 10px;
  filter: grayscale(100%);
}

nav.menu ul {
  padding: 0;
  margin: 0;
  list-style: none;
  margin-top: 50px;
}

.menu-principal {
  margin-bottom:12rem !important;
}

.menu-secundaria {
  margin-top: 3rem !important;
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 1rem;
}

.app {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #ffffff;
  color: #fff;
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.sidebar.open {
  width: 250px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.menu li {
  margin-bottom: 1rem;
}

.menu a {
  color: #000000;
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.menu a:hover {
  background-color: #1f1f1f;
  color: white;
}

.main-content {
  margin-left: 250px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #f5f5f7;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-menu {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  display: none;
}

@media (max-width: 768px) {
  .sidebar {
    width: 0;
    overflow-x: hidden;
    z-index: 1000;
  }

  .sidebar.open {
    width: 250px;
    box-shadow: 2px 0 12px rgba(0,0,0,0.3);
  }

  .main-content {
    margin-left: 0;
  }

  .btn-menu {
    display: inline-block;
  }
}

@media (max-width: 400px) {
  .sidebar {
    width: 200px !important;
  }

  .sidebar.open {
    width: 200px !important;
  }
}
</style>
