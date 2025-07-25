<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
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

// Função para controlar a navegação pelas páginas
function irParaPagina(label) {
  const labelLower = label.toLowerCase()

  if (labelLower === 'sair') {
    localStorage.clear()
    window.location.href = '/login'
    return
  }

  if (labelLower === 'serviços' || labelLower === 'servicos') {
    paginaAtual.value = 'servicos'
  } else if (labelLower === 'sistemas') {
    paginaAtual.value = 'sistemas' // <--- adicionado
  } else if (labelLower === 'perfil') {
    irParaPerfil()
  } else if (labelLower === 'ajuda') {
    paginaAtual.value = 'ajuda'
  } else {
    paginaAtual.value = 'home'
  }
}




// Menus principais e secundários
const menuPrincipal = [
  { label: 'Dashboard', url: '#', icon: '📊' },
  { label: 'Sistemas', url: '#', icon: '🛠️' },
  { label: 'Serviços', url: '#', icon: '📑' },
]

const menuSecundaria = [
  { label: 'Perfil', url: '#', icon: '🙍‍♂️' },
  { label: 'Ajuda', url: '#', icon: '❓' },
  { label: 'Sair', url: '#', icon: '🔒' }

]

// Cards para a home
// Cards completos
const cards = ref([
  {
    id: 1,
    title: 'Sistema de Gestão de Condomínios',
    author: 'Desenvolvido por Consultoria CJL',
    description: 'Gerencie moradores, boletos e reservas de áreas comuns com facilidade.',
    rating: 4.5,
    reviews: 12,
    logo: LogoNexdom
  },
  {
    id: 2,
    title: 'Gestão de Estoque',
    author: 'Desenvolvido por Consultoria CJL',
    description: 'Controle seu inventário, entradas, saídas e relatórios com agilidade.',
    rating: 4.2,
    reviews: 8,
    logo: LogoNexdom
  },
  {
    id: 3,
    title: 'Sistema de Vendas Online',
    author: 'Equipe CJL',
    description: 'Gerencie produtos, carrinho, pagamentos e pedidos em tempo real.',
    rating: 4.8,
    reviews: 22,
    logo: LogoNexdom
  },
  {
    id: 4,
    title: 'Sistema Financeiro Pessoal',
    author: 'Equipe CJL',
    description: 'Organize despesas, receitas e metas financeiras com clareza.',
    rating: 4.3,
    reviews: 11,
    logo: LogoNexdom
  },
  {
    id: 5,
    title: 'Sistema de Agendamento Online',
    author: 'Equipe CJL',
    description: 'Ideal para clínicas, salões e consultórios com controle de horários.',
    rating: 4.6,
    reviews: 17,
    logo: LogoNexdom
  },
  {
    id: 6,
    title: 'Sistema de RH e Folha de Pagamento',
    author: 'Equipe CJL',
    description: 'Gestão de funcionários, salários, férias e benefícios integrada.',
    rating: 4.4,
    reviews: 13,
    logo: LogoNexdom
  },
  {
    id: 7,
    title: 'Sistema de Chamados Técnicos',
    author: 'Equipe CJL',
    description: 'Organize atendimentos, histórico de chamados e suporte técnico.',
    rating: 4.5,
    reviews: 15,
    logo: LogoNexdom
  },
  {
    id: 8,
    title: 'Sistema de Gestão Escolar',
    author: 'Equipe CJL',
    description: 'Controle de alunos, notas, turmas e boletins com interface intuitiva.',
    rating: 4.7,
    reviews: 19,
    logo: LogoNexdom
  },
  {
    id: 9,
    title: 'Sistema de Logística e Entregas',
    author: 'Equipe CJL',
    description: 'Rastreamento de pedidos, entregadores e roteirização de rotas.',
    rating: 4.6,
    reviews: 16,
    logo: LogoNexdom
  }
])


const paginaAtualCard = ref(1)
const cardsPorPagina = 4

const cardsPaginados = computed(() => {
  const inicio = (paginaAtualCard.value - 1) * cardsPorPagina
  const fim = inicio + cardsPorPagina
  return cards.value.slice(inicio, fim)
})

function mudarPaginaCard(pagina) {
  paginaAtualCard.value = pagina
}

// Dados do usuário
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

    usuario.nome = dados.nome || ''
    usuario.sobrenome = dados.sobrenome || ''
    usuario.email = dados.email || ''
    usuario.cep = dados.cep || ''
    usuario.cidade = dados.cidade || ''
    usuario.estado = dados.estado || ''
    usuario.cpf = dados.cpf || ''
    usuario.cnpj = dados.cnpj || ''
    usuario.genero = dados.genero || ''
    usuario.tipoPessoa = dados.cnpj ? 'JURIDICA' : 'FISICA'
    usuario.logradouro = dados.logradouro || ''
    usuario.numero = dados.numero || ''
    usuario.complemento = dados.complemento || ''
    usuario.bairro = dados.bairro || ''
    usuario.nomeEmpresa = dados.nomeEmpresa || ''
    usuario.codigoPublico = dados.codigoPublico || ''

  } catch (erro) {
    console.error('Erro ao buscar usuário logado:', erro)
    if (erro.response?.status === 401) {
      logoff()
    }
  }
}
const servicosAvancados = [
  {
    id: 1,
    titulo: 'Gestão de TI Integrada',
    descricao: 'Solução completa para infraestrutura e suporte técnico.',
    topicos: ['Monitoramento 24h', 'Backup automatizado', 'Acesso remoto']
  },
  {
    id: 2,
    titulo: 'Automação de Processos',
    descricao: 'Reduza tempo e erros com processos automatizados.',
    topicos: ['Scripts personalizados', 'Integração com sistemas', 'Alertas automáticos']
  },
  {
    id: 3,
    titulo: 'Consultoria Estratégica',
    descricao: 'Apoio técnico e estratégico para evolução digital.',
    topicos: ['Análise de sistema', 'Planejamento tecnológico', 'Treinamento de equipe']
  }
]

const sistemas = [
  {
    nome: 'Sistema de Gestão de Condomínios',
    descricaoIntro: 'Este sistema oferece controle completo para condomínios residenciais e comerciais, garantindo segurança e organização.',
    descricao: [
      'Controle de moradores e visitantes',
      'Gestão financeira e rateio de despesas',
      'Comunicação interna via avisos e mensagens',
      'Desenvolvido com Vue.js, Node.js e MongoDB'
    ]
  },
  {
    nome: 'Gestão de Estoque',
    descricaoIntro: 'Ferramenta robusta para gerenciamento eficiente do estoque, com alertas e relatórios detalhados.',
    descricao: [
      'Cadastro e controle de produtos',
      'Alertas de estoque mínimo e máximo',
      'Relatórios de movimentação e vendas',
      'Construído usando React, Express e PostgreSQL'
    ]
  },
/*
{
  nome: 'Sistema de Funilaria',
  descricaoIntro: 'Sistema especializado para oficinas de funilaria, facilitando o controle dos serviços e orçamentos.',
  descricao: [
    'Registro e acompanhamento de orçamentos',
    'Controle de serviços e peças usadas',
    'Agenda para atendimento e reparos',
    'Feito com Angular, Firebase e TypeScript'
  ]
},
{
  nome: 'Sistema Escolar',
  descricaoIntro: 'Solução completa para instituições de ensino com controle de alunos, notas e frequência.',
  descricao: [
    'Cadastro de alunos, professores e turmas',
    'Lançamento de notas e frequências',
    'Geração de boletins e relatórios',
    'Desenvolvido com Laravel, Vue.js e MySQL'
  ]
},
{
  nome: 'Sistema de Delivery Local',
  descricaoIntro: 'Plataforma para delivery com cadastro de restaurantes, gerenciamento de pedidos e avaliações.',
  descricao: [
    'Cadastro de restaurantes e cardápios',
    'Gerenciamento de pedidos e entregas',
    'Avaliações e feedback dos usuários',
    'Criado com Next.js, Node.js e MongoDB'
  ]
},
{
  nome: 'Sistema para Salão de Beleza',
  descricaoIntro: 'Gerencie agendamentos, clientes e estoque com uma solução pensada para salões de beleza.',
  descricao: [
    'Agendamento de serviços e profissionais',
    'Controle de clientes e histórico',
    'Gestão de estoque de produtos',
    'Construído com React Native, Firebase e GraphQL'
  ]
},
{
  nome: 'Sistema Financeiro Pessoal',
  descricaoIntro: 'Organize suas finanças pessoais com controle, planejamento e relatórios gráficos.',
  descricao: [
    'Controle de receitas e despesas',
    'Planejamento orçamentário',
    'Relatórios gráficos e alertas',
    'Feito com Flutter, Dart e SQLite'
  ]
},
{
  nome: 'Sistema de Eventos e Reservas',
  descricaoIntro: 'Gerencie eventos, reservas de espaços e comunicação com convidados de forma eficiente.',
  descricao: [
    'Cadastro e gerenciamento de eventos',
    'Reserva de espaços e controle de lotação',
    'Envio de convites e notificações',
    'Desenvolvido com Django, React e PostgreSQL'
  ]
}
*/

]
const faqs = ref([
  {
    pergunta: 'Como posso alterar meus dados pessoais?',
    resposta: 'Você pode alterar seus dados acessando a aba "Editar Perfil" no topo da página.',
    aberto: false,
  },
  {
    pergunta: 'É possível excluir minha conta?',
    resposta: 'Sim, vá até Configurações > Conta > Excluir Conta.',
    aberto: false,
  },
  {
    pergunta: 'Como redefinir minha senha?',
    resposta: 'Use a opção "Esqueci minha senha" na tela de login para redefinir.',
    aberto: false,
  }
])
const servicos = [
  {
    titulo: 'Consultoria Estratégica',
    descricao: 'Auxiliamos na transformação digital da sua empresa.',
    icone: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v10h16V12a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 5a3 3 0 116 0v3h-6V7zm-1 5h8v3H8v-3zm0 5h8v3H8v-3z"/></svg>`
  },
  {
    titulo: 'Suporte Remoto',
    descricao: 'Atendimento ágil com especialistas via acesso remoto.',
    icone: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-7.07 17.07L2 22l2.93-2.93A10 10 0 1012 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>`
  },
  {
    titulo: 'Gestão de TI',
    descricao: 'Cuidamos da infraestrutura e segurança da informação.',
    icone: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2l4 4h-3v4h-2V6H8l4-4zm0 20l-4-4h3v-4h2v4h3l-4 4zM2 12l4 4v-3h4v-2H6V8l-4 4zm20 0l-4-4v3h-4v2h4v3l4-4z"/></svg>`
  },
  {
    titulo: 'Infraestrutura em Nuvem',
    descricao: 'Soluções de servidores cloud escaláveis.',
    icone: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M6 19h13a4 4 0 00.25-7.99A6 6 0 006.5 7a6.5 6.5 0 00-.5 13z"/></svg>`
  },
  {
    titulo: 'Segurança de Dados',
    descricao: 'Backup, firewall, antivírus e políticas de acesso.',
    icone: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5.25-3.5 10-8 12-4.5-2-8-6.75-8-12V6l8-4z"/></svg>`
  },
  {
    titulo: 'Automação de Processos',
    descricao: 'Melhore sua produtividade com RPA e sistemas integrados.',
    icone: `<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M4 4h16v2H4V4zm1 4h14l-1.5 10.5a1 1 0 01-1 .5H7a1 1 0 01-1-.5L5 8zm5 2v6h2v-6H10zm4 0v6h2v-6h-2z"/></svg>`
  }
]

const toggleFAQ = (index) => {
  faqs.value[index].aberto = !faqs.value[index].aberto
}

onMounted(() => {
  if (paginaAtual.value === 'perfil') {
    buscarUsuarioLogado()
  }
})
</script>

<template lang="pug">
.app
  // Sidebar Lateral
  aside.sidebar(:class="{ open: menuAberto }")
    .logo 
    nav.menu
      ul.menu-principal
        li(v-for="item in menuPrincipal" :key="item.label")
          a(href="#" @click.prevent="irParaPagina(item.label)")
            span.icon {{ item.icon }}&nbsp;
            | {{ item.label }}
      ul.menu-secundaria
        li(
          v-for="item in menuSecundaria" 
          :key="item.label" 
          :class="{ 'btn-sair': item.label === 'Sair' }"
        )
          a(href="#" @click.prevent="irParaPagina(item.label)")
            span.icon {{ item.icon }}&nbsp;
            | {{ item.label }}

  // Botão para abrir/fechar menu lateral
  button.btn-menu(@click="toggleMenu") ☰

  // Seção HOME
  section.software-list-container(v-if="paginaAtual === 'home'")
    h1.software-main-title Sistemas para Testes
    h2.software-title Lista de Softwares Disponíveis

    .software-cards-wrapper
      .software-card(v-for="card in cardsPaginados" :key="card.id" class="relative")
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
        button.software-card-button(:disabled="card.id >= 3" :class="{ 'disabled': card.id >= 3 }") Testar esse Sistema
        label.software-card-checkbox(:class="{ 'disabled': card.id >= 3 }")
          input(type="checkbox" :disabled="card.id >= 3")
          | Comparar
        template(v-if="card.id >= 3")
          .cadeado-wrapper(title="Sistema em desenvolvimento")
            svg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="cadeado-icone")
              path(fill-rule="evenodd" d="M6 10V8a6 6 0 1112 0v2h1a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V11a1 1 0 011-1h1zm2-2a4 4 0 118 0v2H8V8z" clip-rule="evenodd")
          .overlay-desenvolvimento

    // Paginação dos cards
    .paginacao
      button(
        v-for="n in Math.ceil(cards.length / cardsPorPagina)",
        :key="n",
        @click="mudarPaginaCard(n)",
        :class="{ ativo: paginaAtualCard === n }"
      ) {{ n }}


  // Seção PERFIL
  section.perfil-usuario(v-if="paginaAtual === 'perfil'")
    h1.perfil-titulo Meus Dados
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
    .card(v-if="usuario.tipoPessoa === 'JURIDICA'")
      h2 Empresa
      .form-row
        .field
          label Nome da Empresa
          input(type="text", :value="usuario.nomeEmpresa", disabled)
        .field
          label CNPJ
          input(type="text", :value="usuario.cnpj", disabled)

  // Seção SERVIÇOS
  section.servico-cards-section(v-if="paginaAtual === 'servicos'")
    h1.servico-titulo Sistemas da CJL
    p.servico-subtitulo Na CJL, desenvolvemos sistemas de software personalizados para diferentes segmentos do mercado, com foco em eficiência, usabilidade e inovação. Nossas soluções atendem desde pequenas empresas até grandes organizações, oferecendo funcionalidades sob medida, design intuitivo e tecnologias modernas para transformar processos e impulsionar resultados.

    .servico-card-wrapper
      .servico-card(v-for="(sistema, index) in sistemas" :key="index")
        h2.servico-card-titulo {{ sistema.nome }}
        p.servico-card-intro {{ sistema.descricaoIntro }}
        ul.servico-card-topicos
          li(v-for="(item, idx) in sistema.descricao" :key="idx") {{ item }}

  // Seção AJUDA
  section.ajuda-section(v-if="paginaAtual === 'ajuda'")
    h1.titulo-ajuda Ajuda e Suporte

    .ajuda-bloco
      .ajuda-coluna-img
        img(:src="LogoNexdom", alt="Consultoria Estratégica")
      .ajuda-coluna-texto
        h2.ajuda-titulo Consultoria Estratégica em TI
        p
          | A Consultoria CJL oferece orientação especializada para alavancar seu negócio com soluções tecnológicas sob medida. 
          strong Alinhamos a TI aos objetivos da sua empresa 
          | com análise de processos, planejamento estratégico e inovação digital.

    .ajuda-bloco
      .ajuda-coluna-texto
        h2.ajuda-titulo Gestão de Infraestrutura e Segurança
        p
          | Monitoramos, protegemos e mantemos sua infraestrutura com foco em 
          strong performance, escalabilidade e segurança.
          |  Garanta disponibilidade total e proteção contra ameaças digitais.

      .ajuda-coluna-img
        img(:src="LogoNexdom", alt="Segurança de Dados")

    .ajuda-bloco
      .ajuda-coluna-img
        img(:src="LogoNexdom", alt="Transformação Digital")
      .ajuda-coluna-texto
        h2.ajuda-titulo Transformação Digital para Empresas
        p
          | Digitalizamos operações e modernizamos processos internos para aumentar produtividade e competitividade. 
          strong A Consultoria CJL utiliza tecnologias como cloud, automação e IA 
          | para transformar seu negócio.

    .ajuda-bloco
      .ajuda-coluna-texto
        h2.ajuda-titulo Suporte Técnico Proativo
        p
          | Oferecemos suporte técnico contínuo, ágil e eficiente. 
          strong Nossos especialistas atuam de forma preventiva 
          | para evitar falhas e garantir a estabilidade dos sistemas.

      .ajuda-coluna-img
        img(:src="LogoNexdom", alt="Suporte Técnico")

    .ajuda-bloco
      .ajuda-coluna-img
        img(:src="LogoNexdom", alt="DevOps e Integração Contínua")
      .ajuda-coluna-texto
        h2.ajuda-titulo DevOps e Integração Contínua
        p
          | Aplicamos práticas modernas de desenvolvimento com pipelines automatizados, testes contínuos e integração entre times. 
          strong Reduza erros, acelere entregas 
          | e melhore a qualidade dos seus softwares com a CJL.

    .ajuda-bloco
      .ajuda-coluna-texto
        h2.ajuda-titulo Business Intelligence e Dados
        p
          | Transforme dados em decisões estratégicas com dashboards personalizados e relatórios inteligentes. 
          strong A Consultoria CJL ajuda sua empresa 
          | a extrair valor real das suas informações.

      .ajuda-coluna-img
        img(:src="LogoNexdom", alt="Business Intelligence")

  section.faq-container(v-if="paginaAtual === 'ajuda'")
    h2.faq-title Perguntas Frequentes

    ul.faq-list
      li.faq-item(v-for="(faq, index) in faqs" :key="index")
        div.faq-header(@click="toggleFAQ(index)")
          span.faq-question {{ faq.pergunta }}
          span.faq-icon(:class="{ aberto: faq.aberto }")
            svg(xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round")
              polyline(points="6 9 12 15 18 9")
        transition(name="fade")
          p.faq-resposta(v-if="faq.aberto") {{ faq.resposta }}

  // Seção SISTEMAS (nova)
  section.servicos-premium
  h2.titulo-secao Veja o que está incluso:
  .container-cards
    .card-servico(v-for="(item, index) in servicos" :key="index")
      .icone(v-html="item.icone")
      h3.titulo-servico {{ item.titulo }}
      p.descricao-servico {{ item.descricao }}
      span.numero-servico {{ ('0' + (index + 1)).slice(-2) }}

</template>



<style scoped>
.icone {
  display: inline-block;
  padding: 0;
  margin: 0 0 0.5rem 0;
  vertical-align: middle;
  width: 3.2rem;
  height: 3.2rem;
}

.icone svg {
  width: 100%;
  height: 100%;
  display: block;
  fill: white;
}




.servicos-premium {
  padding-top: 30px; /* ou um valor bem pequeno, tipo 0.5rem */
  margin-top: 0;
}

.titulo-secao {
  margin-left: 21rem;
  color: #2c2c2c;
  text-align: left;
  font-size: 2rem;
  font-weight: 100;
  margin-bottom: 2rem;
  /* Para centralizar verticalmente a altura da seção, depende do layout, mas geralmente acima basta */
}


.container-cards {
  display: grid;
  grid-template-columns: repeat(3, 250px); /* mesmo tamanho dos cards */
  column-gap: 2.5rem; /* pequeno espaço horizontal entre os cards */
  row-gap: 1.6rem; /* opcional, espaço vertical */
  justify-content: center; /* centraliza o grid inteiro */
}

.card-servico {
  width: 270px; /* largura exata */
  background-color: #865700;
  color: white;
  padding: 2rem;
  position: relative;
  border-radius: 0px;
  height: 100%;
  text-align: left;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  margin-left: 120px;
}


@media (max-width: 900px) {
  .container-cards {
    grid-template-columns: repeat(2, 1fr); /* 2 colunas no tablet */
  }
}

@media (max-width: 600px) {
  .container-cards {
    grid-template-columns: 1fr; /* 1 por linha no mobile */
  }
}
.card-servico {
  transition: transform 0.3s ease;
}

.card-servico:hover {
  transform: translateY(-10px); /* sobe 10px ao passar o mouse */
  cursor: pointer; /* opcional, muda o cursor para indicar interatividade */
}

.icone {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.titulo-servico {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.descricao-servico {
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.numero-servico {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
  user-select: none;
}
.texto-vermelho {
  color: red;
  font-weight: bold;
}

.paginacao {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-left: 17rem;
}

.paginacao button {
  background-color: #e0e0e0;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}

.paginacao button.ativo {
  background-color: #d87300;
  color: rgb(255, 255, 255);
}

.faq-icon svg {
  transition: transform 0.3s ease;
  transform: rotate(0deg); /* seta padrão pra baixo */
}

.faq-icon.aberto svg {
  transform: rotate(180deg); /* seta pra cima */
}

.faq-container {
  margin-top: 4rem;
  padding: 2rem;
  border-radius: 1rem;

  width: 100%;
  max-width: 800px;

  margin-left: auto;
  margin-right: 8%;
  margin-bottom: 100px;

  /* Visual */
  background-color: #ffffff;
  text-align: center;

  /* Borda lateral */
  border-left: 4px solid #bb6400;
}


.faq-title {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  color: #000000;
}

.faq-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.faq-item + .faq-item {
  margin-top: 1.5rem;
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 800 !important;
  color: #ffffff;
  background-color: #bb6400;

  /* Aumenta largura do card */
  padding: 1.2rem 2rem;
  border-radius: 0.7rem;
  transition: background 0.2s ease;
  font-size: 1.1rem;
}



.faq-icon {
  margin-left: 1rem;
  display: flex;
  align-items: center;
}

.faq-icon.aberto {
  transform: rotate(180deg);
}

.faq-resposta {
  margin-top: 0.5rem;
  padding: 1rem 1.5rem;
  background: #fff4ea;
  border-left: 4px solid #bb6400;
  border-radius: 0.5rem;
  color: #272727;
  font-weight: bold;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.ajuda-bloco {
  display: flex;
   align-items: flex-start; /* <-- Alinha o conteúdo verticalmente no topo */
 
  justify-content: center;
  gap: 6rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.ajuda-coluna-img img {
  width: 360px;         /* Aumenta a largura */
  height: 240px;        /* Mantém a altura anterior (ajuste conforme necessário) */
  object-fit: cover;    /* Garante que a imagem preencha sem deformar muito */
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
}

.ajuda-coluna-texto {
  max-width: 400px;
  text-align: left;
}

.ajuda-titulo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #bb6400;
  margin-bottom: 1rem;
}

.ajuda-coluna-texto p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.titulo-ajuda {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}

.ajuda-section {
  text-align: center; /* centraliza elementos inline-block */
  padding: 2rem;
   padding-left: 23vw; /* Move tudo para a direita */
}

.titulo-ajuda {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #000;
  margin-top: -3rem;
  display: inline-block; /* necessário para o ::after ter base apenas no texto */
  position: relative;
  margin-left: 0px;
}

.titulo-ajuda::after {
  content: '';
  position: absolute; /* permite posicionar dentro do título */
  left: 0; /* alinha à esquerda */
  bottom: -5px; /* opcional: controla a distância do sublinhado */
  width: 40%;
  height: 3px;
  background-color: #bb6400;
}


.servico-card-titulo,
.servico-card-intro,
.servico-card-topicos li {
  text-align: left;
}

.servico-cards-section {
  text-align: left;
}

.servico-subtitulo {
  color: #1a1a1a;        /* cinza escuro */
  font-size: 1.1rem;
  text-align: justify;   /* justifica o texto */
  max-width: 800px;      /* define uma largura máxima para o parágrafo */
  margin: -2rem auto 4rem auto; /* aumentada a margem inferior */
  font-style: italic;
}


.servico-card-topicos {
  list-style-type: disc;
  list-style-position: inside; /* bolinhas ficam dentro do bloco de texto */
  padding-left: 0;
  margin: 40px auto;       /* centraliza horizontalmente a UL */
  text-align: center;      /* centraliza texto e bolinhas */
  max-width: 100%;
  display: block;
  margin-left: 0;
}

.servico-card-topicos li::marker {
  color: rgb(0, 0, 0);                    /* Bolinha branca */
}

.servico-card-topicos li {
  color: #333333;                  /* Garante que os <li> fiquem azuis */
}


.servico-card-topicos li::before {
  /* content: '*'; */
  content: ''; /* ou remova essa regra */
}
.servico-card-topicos li::before {
  content: none !important;      /* remove qualquer pseudo-elemento */
}

.servico-cards-section {
  padding: 2rem;

}

.servico-titulo {
  text-align: left;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #000000;
  font-weight: 700;
  margin-top: -1rem;
  position: relative;
  display: inline-block; /* mantém o ::after só no conteúdo */
  
}

/* Linha sublinhada alinhada à esquerda */
.servico-titulo::after {
  content: '';
  display: block;
  width: 40%;
  height: 3px;
  background-color: #bb6400;
  margin-top: 0rem;
}
.software-main-title {
  text-align: left;             /* mantém o texto alinhado à esquerda DENTRO do bloco */
  font-size: 2.3rem;
  margin-bottom: 3rem;
  color: #000000;
  font-weight: 700;
  margin-top: -1rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-70%);  /* centraliza o bloco na tela */
}
.servico-titulo::after,
.software-main-title::after {
  content: '';
  display: block;
  width: 40%;
  height: 3px;
  background-color: #bb6400;
  margin-top: 0rem;
}
.servico-card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
}

.servico-card {
  background: #ffffff; /* fundo branco do card */
  padding: 1.5rem 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  border-left: 4px solid #bb6400;
  padding-left: 1rem; /* opcional, para afastar o conteúdo da borda */
}


/* Título do card em branco */
.servico-card-titulo {
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: #000000;
}

/* Descrição introdutória cinza claro */
.servico-card-intro {
  font-style: italic;
  margin-bottom: 1rem;
  color: #1f1f1f; /* cinza claro */
}

/* Lista dos tópicos em branco */
.servico-card-topicos {
  padding-left: 0;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5;
}

/* Itens da lista com asterisco em branco */
.servico-card-topicos li {
  margin-bottom: 0.5rem;
  position: relative;

}

.servico-card-topicos li::before {
  content: '*';
  position: absolute;
  left: 0;
  color: #ffffff; /* asterisco branco */
  font-weight: bold;
}

.servico-card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
}

.servico-card {
  background: #fff;
  padding: 1.5rem 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.3s ease;
}


.servico-card-topicos {
 
  padding-left: 0;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
}

.servico-card-topicos li {
 margin-left: 0;
  padding-left: 0;
  list-style-position: inside;
}

.servico-card-topicos li::before {
  content: '*';
  position: absolute;
  left: 0;
  color: #07ca07;
  font-weight: bold;
}
.servico-cards-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  margin-left: 16rem;
  
}



.servico-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.servico-card {
  width: 80%;
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
}

.servico-card img.servico-logo {
  width: 80px;
  height: auto;
  margin-bottom: 1rem;
}

.servicos-container {
  padding: 20px;
}

.servicos-titulo {
  color: black;
  font-size: 2rem;
  margin-bottom: 12px;
}
body {
  font-family: Arial, sans-serif;
}

.servicos-texto {
  color: black;
  font-size: 1.2rem;
  line-height: 1.5;
}

button.software-card-button.disabled,
label.software-card-checkbox.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none; /* impede interação */
}


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
  background-color: #f0f0f0;
  
}

/* Cobre o card com fundo transparente */
.overlay-desenvolvimento {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.418);
  border-radius: 8px;
  pointer-events: none; /* para deixar passar eventos */
  padding: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 1;
}


/* Cadeado por baixo do fundo */
.cadeado-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 0; /* por baixo do overlay */
}

/* Estiliza o cadeado */
.cadeado-icone {
  width: 24px;
  height: 24px;
  fill: #bb6400;
  transition: transform 0.2s;
}

/* Efeito ao passar o mouse */
.cadeado-wrapper:hover .cadeado-icone {
  transform: scale(1.1);
}

/* Tooltip */
.cadeado-wrapper::after {
  position: absolute;
  top: -30px;
  right: 0;
  background: #000;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 2;
}

.cadeado-wrapper:hover::after {
  opacity: 1;
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
  vertical-align: top !important; /* força alinhamento no topo */
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
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: Center;     /* alinha o texto à esquerda */
  color: #000000;
  position: relative;   /* necessário para o ::after */
  display: inline-block; /* limita o sublinhado ao tamanho do texto */
  margin-left: 380px;
  margin-top: -2rem;
}

.perfil-titulo::after {
  content: '';
  display: block;
  width: 40%;
  height: 3px;
  background-color: #bb6400;
  margin-top: 0rem; /* aproxima a linha do texto */
}


.card {
  background: rgb(255, 255, 255);
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
  background-color: #ffffff;
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
.software-main-title {
  font-weight: bold; /* ou um valor numérico como 700 */
}

.software-main-title,
.software-title {
  text-align: center;
  margin-left: 180px;
  font-size: 2rem;
  color: #000000;
  margin-bottom: -30px;

}
.software-title {
  text-align: center;
  margin-left: 240px;
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
  margin-top: 20px;
  color: #505050;
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
  margin-bottom:25rem !important;
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
