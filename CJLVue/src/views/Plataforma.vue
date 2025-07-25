<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import LogoNexdom from '@/assets/cjl.jpg'

// Controle do menu lateral e página atual
const menuAberto = ref(false)
const paginaAtual = ref('home')

// Alternar menu lateral
const toggleMenu = () => {
  menuAberto.value = !menuAberto.value
  console.log('toggleMenu chamado, menuAberto:', menuAberto.value)
}

// Ir para página de perfil e carregar dados do usuário
async function irParaPerfil() {
  console.log('irParaPerfil chamado')
  paginaAtual.value = 'perfil'
  await buscarUsuarioLogado()
}

// Menus principais e secundários
const menuPrincipal = [
  { label: 'Dashboard', url: '#', icon: '📊' },
  { label: 'Serviços', url: '#', icon: '🛠️' },
  { label: 'Relatórios', url: '#', icon: '📑' },
]

const menuSecundaria = [
  { label: 'Perfil', url: '#', icon: '🙍‍♂️' },
  { label: 'Ajuda', url: '#', icon: '❓' },
  { label: 'Sobre', url: '#', icon: 'ℹ️' },

]

// Cards para a home
const cards = [
  {
    id: 1,
    logo: LogoNexdom,
    title: 'Sistema de Gestão de Condomínios',
    author: 'Consultoria CJL',
    description:
      'Sistema completo para gestão de condomínios, integrando controle financeiro, comunicação eficiente entre moradores e administração de reservas, simplificando a rotina do síndico.',
    rating: '5.0/5.0',
    reviews: 2,
  },
  {
    id: 2,
    logo: LogoNexdom,
    title: 'Gestão de Estoque',
    author: 'Consultoria CJL',
    description:
      'Sistema eficiente para controle de estoque, facilitando o monitoramento de produtos, entradas, saídas e reposições em tempo real, otimizando a gestão e reduzindo perdas.',
    rating: '4.8/5.0',
    reviews: 5,
  },
]

// Dados do usuário (formulário)
const usuario = reactive({
  tipoPessoa: '',
  nome: '',
  sobrenome: '',
  cpf: '',
  email: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  nomeEmpresa: '',
  cnpj: '',
  codigoPublico: '',
})

async function buscarUsuarioLogado() {
  const token = localStorage.getItem('token')
  if (!token) {
    logoff()
    return
  }

  try {
    const resposta = await axios.get('http://localhost:8080/api/auth/dados', {
      headers: { Authorization: `Bearer ${token}` }
    })

    const dados = resposta.data

    // Campos do usuário
    usuario.nome = dados.nome || ''
    usuario.sobrenome = dados.sobrenome || ''
    usuario.email = dados.email || ''
    usuario.cep = dados.cep || ''
    usuario.cidade = dados.cidade || ''
    usuario.estado = dados.estado || ''
    usuario.cpf = dados.cpf || ''
    usuario.cnpj = dados.cnpj || ''
    usuario.genero = dados.genero || ''
    usuario.codigoPublico = dados.codigoPublico || ''
    usuario.logradouro = dados.logradouro || ''
    usuario.numero = dados.numero || ''
    usuario.complemento = dados.complemento || ''
    usuario.bairro = dados.bairro || ''

    // Mapeando empresaNome do backend para nomeEmpresa no frontend
    usuario.nomeEmpresa = dados.empresaNome || ''

    // Definindo tipoPessoa com base em cnpj
    usuario.tipoPessoa = dados.cnpj ? 'JURIDICA' : 'FISICA'

  } catch (erro) {
    console.error('Erro ao buscar usuário logado:', erro)
    if (erro.response?.status === 401) {
      logoff()
    }
  }
}


// Carregar dados automaticamente se já estiver na página de perfil
onMounted(() => {
  if (paginaAtual.value === 'perfil') {
    buscarUsuarioLogado()
  }
})
</script>



<template lang="pug">
.app
  // Sidebar lateral
  aside.sidebar(:class="{ open: menuAberto }")
    .logo 
    nav.menu
      ul.menu-principal
        li(v-for="item in menuPrincipal" :key="item.label")
          a(:href="item.url")
            span.icon {{ item.icon }}&nbsp;
            | {{ item.label }}
      ul.menu-secundaria
        li(
          v-for="item in menuSecundaria"
          :key="item.label"
          :class="{ 'btn-sair': item.label === 'Sair' }"
        )
          a(
            href="#"
            @click.prevent="item.label === 'Perfil' ? irParaPerfil() : null"
          )
            span.icon {{ item.icon }}&nbsp;
            | {{ item.label }}

  // Botão para abrir/fechar menu
  button.btn-menu(@click="toggleMenu") ☰

  // Seção HOME
  section.software-list-container(v-if="paginaAtual === 'home'")
    h1.software-main-title Sistemas para Testes
    h2.software-title Lista de Softwares Disponíveis
    .software-cards-wrapper
      .software-card(v-for="card in cards" :key="card.id")
        .software-card-logo
          img(:src="card.logo", alt="Logo CJL")
        .software-card-content
          h3 {{ card.title }}
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

  // Seção PERFIL
  section.perfil-usuario(v-if="paginaAtual === 'perfil'")
    h1.perfil-titulo Meus Dados

    // Informações Pessoais
    .card
      h2 Informações Pessoais
      .form-row
        .field
          label Nome
          input(type="text", :value="usuario.nome", disabled)
        .field
          label Sobrenome
          input(type="text", :value="usuario.sobrenome", disabled)
      .form-row
        .field
          label CPF
          input(type="text", :value="usuario.cpf", disabled)
        .field
          label E-mail
          input(type="email", :value="usuario.email", disabled)

    // Endereço
    .card
      h2 Endereço
      .form-row
        .field
          label CEP
          input(type="text", :value="usuario.cep", disabled)
        .field
          label Logradouro
          input(type="text", :value="usuario.logradouro", disabled)
      .form-row
        .field
          label Número
          input(type="text", :value="usuario.numero", disabled)
        .field
          label Complemento
          input(type="text", :value="usuario.complemento", disabled)
      .form-row
        .field
          label Bairro
          input(type="text", :value="usuario.bairro", disabled)
        .field
          label Cidade
          input(type="text", :value="usuario.cidade", disabled)
      .form-row
        .field
          label Estado
          input(type="text", :value="usuario.estado", disabled)

    // Empresa (somente se for pessoa jurídica)
    .card(v-if="usuario.tipoPessoa === 'JURIDICA'")
      h2 Empresa
      .form-row
        .field
          label Nome da Empresa
          input(type="text", :value="usuario.nomeEmpresa", disabled)
        .field
          label CNPJ
          input(type="text", :value="usuario.cnpj", disabled)
      .form-row
        .field
          label Código Público
          input(type="text", :value="usuario.codigoPublico", disabled)
</template>


<style scoped>
:global(html), :global(body), :global(#app) {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #f3f3f3;
  overflow-x: hidden; 
}
 
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f3f3;
}
input[disabled] {
  color: #222 !important; /* ou qualquer tom escuro que desejar */
}
.card input[disabled] {
  color: #222;
}

.field label,
.campo label,
.form-group label {
  margin-bottom: 5rem; /* ajuste conforme desejado */
}
.field input,
.field select,
.field textarea {
  margin-bottom: 0.6rem; /* ou ajuste conforme o espaçamento desejado */
}

input[type="text"],
input[type="email"] {
  height: 32px !important;
  max-height: 32px !important;
  padding: 6px 10px !important;
  box-sizing: border-box !important;
  font-size: 14px !important;
}


.form-row > * {
  flex: 0 0 400px;
  /* NÃO coloque margem aqui! Senão acumula com gap e vira confusão */
}



.field {
  flex: 1;                  /* ocupa metade do espaço (2 colunas) */
  display: flex;
  flex-direction: column;   /* label em cima, input embaixo */
}

.field label {
  margin-bottom: 3px;
  font-weight: 600;
  color: #854000;
  line-height: 1; /* evita espaçamento extra da linha */
}

.field input {
  margin-top: 0 !important;      /* elimina margem superior */
  padding: 6px 10px !important;  /* mantém padding confortável */
  height: 32px !important;       /* altura fixa */
  font-size: 14px !important;
  border: 1px solid #6d2800 !important;
  border-radius: 6px !important;
  box-sizing: border-box !important;
  line-height: 1 !important;     /* evita espaçamento extra */
  display: block !important;     /* remove inline gap */
}



.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 140%;       /* força a largura a 90% do container pai */
  max-width: none;  /* remove o limite máximo */
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}


.coluna {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.campo {
  display: flex;
  flex-direction: column;
}

.campo label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #333;
}

.campo input {
  height: 90px;         /* aumenta a altura */
  min-width: 250px;     /* largura mínima maior */
  padding: 8px 12px;    /* deixa o padding proporcional */
  font-size: 16px;      /* fonte maior para combinar */
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #555;
}

.form-group input {
  background-color: #e6e6e6;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
}

/* Estilo da seção de perfil */
.perfil-usuario {
  padding: 2rem;
  margin-left: 250px;
  font-family: 'Segoe UI', sans-serif;
}

.perfil-titulo {
  font-size: 2rem;
  font-weight: 500; /* ou bold */
  margin-bottom: 2rem;
  text-align: center;
  margin-left: 230px;
  color: #ffffff;
}


.card {
  background: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  border-left: 4px solid #bb6400; /* borda esquerda mais grossa */
  margin-left: 90px;
   max-width: 770px; /* ou o tamanho que desejar */
}


.card h2 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #222222;
  font-weight: bold;

}

.form-row {
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;      /* espaçamento vertical */
  column-gap: 4rem;   /* espaçamento lateral maior */
  margin-bottom: 1rem;
}

.form-row input {
  flex: 1 1 auto;
  background-color: #fff4b5;
  border-radius: 6px;
  padding: 0.5rem;
  min-width: 250px;
  height: 120px; /* altura maior */
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.form-row input {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  line-height: 1.5 !important;
  font-size: 16px !important;
  height: auto !important; /* deixa o height automático */
  min-height: 40px !important; /* define um mínimo maior */
  box-sizing: border-box !important;
  background-color: #fffef1 !important;
  border-radius: 6px !important;
  border: 1px solid #795200 !important;
  flex: 1 1 auto !important;
}

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
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 5px;
  color: #999999;
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
  color: #b65b00;
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
  margin-bottom:22rem !important;
  margin-top: 2rem;
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
  background-color: #2b2b2b;
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
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.menu a:hover {
  background-color: #525252;
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
