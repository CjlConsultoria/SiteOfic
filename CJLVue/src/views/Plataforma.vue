<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import axios from 'axios'
import LogoNexdom from '@/assets/cjl.jpg'


const menuAberto = ref(false)
const paginaAtual = ref('home')


const toggleMenu = () => {
  menuAberto.value = !menuAberto.value
  console.log('toggleMenu chamado, menuAberto:', menuAberto.value)
}


async function irParaPerfil() {
  console.log('irParaPerfil chamado')
  paginaAtual.value = 'perfil'
  await buscarUsuarioLogado()
}


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
    paginaAtual.value = 'sistemas'
  } else if (labelLower === 'perfil') {
    irParaPerfil()
  } else if (labelLower === 'ajuda') {
    paginaAtual.value = 'ajuda'
  } else {
    paginaAtual.value = 'home'
  }
}


const modalAberto = ref(false)
const sistemaSelecionado = ref(null)

function abrirModal(sistema) {
  sistemaSelecionado.value = sistema
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  sistemaSelecionado.value = null
}


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
    usuario.nomeEmpresa = dados.empresaNome || ''

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
const sistemass = [
  {
    nome: 'Sistema de Gestão de Condomínio',
    descricaoIntro: 'Administre seu condomínio com facilidade e eficiência através de uma plataforma completa que integra moradores, síndicos e administradoras. Ideal para manter a organização, facilitar a comunicação e garantir a transparência na gestão.',
    descricao: [
      'Cadastro e controle de moradores e unidades',
      'Gestão de boletos, inadimplência e pagamentos',
      'Reservas de áreas comuns com calendário integrado',
      'Comunicados e avisos internos via plataforma'
    ],
    preco: 'A partir de R$ 149,00/mês',
    buttonText: 'Solicitar Demonstração'
  },
  {
    nome: 'Sistema de Oficina',
    descricaoIntro: 'Organize os serviços, materiais e ordens da sua oficina com um sistema prático e completo. Ideal para oficinas de marcenaria, pintura, eletrônica e outros segmentos que buscam agilidade no atendimento e controle dos processos internos.',
    descricao: [
      'Emissão e controle de ordens de serviço com status em tempo real',
      'Cadastro de clientes e histórico de atendimentos',
      'Gestão de materiais e insumos utilizados nos projetos',
      'Relatórios de produção, entregas e controle de prazos'
    ],
    preco: 'A partir de R$ 129,00/mês',
    buttonText: 'Solicitar Demonstração'
  },
  {
    nome: 'Sistema para Escritórios de Contabilidade',
    descricaoIntro: 'Facilite a rotina contábil com um sistema integrado, desenvolvido especialmente para atender às necessidades de escritórios de contabilidade que lidam com múltiplos clientes, documentos fiscais e obrigações legais diariamente.',
    descricao: [
      'Cadastro de clientes, empresas e documentos fiscais',
      'Geração automática de relatórios e declarações',
      'Painel de obrigações fiscais e calendário tributário',
      'Upload e armazenamento seguro de documentos'
    ],
    preco: 'A partir de R$ 179,00/mês',
    buttonText: 'Solicitar Demonstração'
  }
]



const sistemas = [
  {
    nome: 'Essencial',
    descricaoIntro: 'Suporte básico e orientação pontual via e-mail ou WhatsApp. Ideal para autônomos e pequenos negócios iniciando na tecnologia.',
    descricao: [
      'Até 1 reunião mensal (30 min)',
      'Suporte via e-mail/WhatsApp',
      'Avaliação inicial da infraestrutura'
    ],
    preco: 'R$ 267,30/mês | R$ 2.673,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Diagnóstico',
    descricaoIntro: 'Análise técnica completa da empresa, com relatório de melhorias e riscos.',
    descricao: [
      'Entrevistas com equipe técnica',
      'Mapeamento de sistemas e processos',
      'Relatório com sugestões e riscos',
      'Entrega em até 5 dias úteis'
    ],
    preco: 'R$ 447,30/mês | R$ 4.473,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Orientação Técnica',
    descricaoIntro: 'Suporte técnico contínuo com foco em boas práticas, ferramentas e processos.',
    descricao: [
      'Consultas técnicas ilimitadas',
      'Indicação de ferramentas e tecnologias',
      'Orientação para equipes de desenvolvimento',
      'Acompanhamento de boas práticas'
    ],
    preco: 'R$ 627,30/mês | R$ 6.273,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Plano DevOps',
    descricaoIntro: 'Acompanhamento completo na construção ou otimização de pipelines e infraestrutura em nuvem.',
    descricao: [
      'Planejamento e revisão de pipelines CI/CD',
      'Automatização de deploys',
      'Monitoramento e alertas',
      'Infraestrutura como código'
    ],
    preco: 'R$ 807,30/mês | R$ 8.073,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Consultoria Estratégica',
    descricaoIntro: 'Alinhamento entre tecnologia e objetivos de negócio com foco em resultados.',
    descricao: [
      'Sessões com especialistas em gestão e TI',
      'Planejamento estratégico de sistemas',
      'Análise de ROI tecnológico',
      'Mentorias trimestrais'
    ],
    preco: 'R$ 987,30/mês | R$ 9.873,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Mentoria para Times',
    descricaoIntro: 'Capacitação e acompanhamento de equipes técnicas em projetos reais.',
    descricao: [
      'Acompanhamento semanal por especialista',
      'Revisões de código e arquitetura',
      'Mentorias práticas por squad',
      'Feedback contínuo de performance'
    ],
    preco: 'R$ 1.127,30/mês | R$ 11.273,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Plano Startup',
    descricaoIntro: 'Mentoria e suporte completo para startups em fase inicial ou em crescimento.',
    descricao: [
      'Validação de produto (MVP)',
      'Modelagem de negócio e tecnologia',
      'Acompanhamento de pitch e captação',
      'Integração com stack recomendada'
    ],
    preco: 'R$ 1.287,30/mês | R$ 12.873,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Transformação Digital',
    descricaoIntro: 'Modernização completa dos processos empresariais com soluções digitais.',
    descricao: [
      'Digitalização de processos internos',
      'Automação de tarefas manuais',
      'Implantação de ferramentas modernas',
      'Acompanhamento durante a migração'
    ],
    preco: 'R$ 1.487,30/mês | R$ 14.873,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Segurança e Compliance',
    descricaoIntro: 'Auditoria técnica e consultoria em segurança e conformidade digital.',
    descricao: [
      'Análise de riscos e vulnerabilidades',
      'Revisão de políticas de segurança',
      'Ajustes para LGPD e ISO 27001',
      'Simulações de invasão (pentest leve)'
    ],
    preco: 'R$ 1.697,30/mês | R$ 16.973,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  },
  {
    nome: 'Plano Corporativo',
    descricaoIntro: 'Consultoria sob demanda com soluções personalizadas para grandes empresas.',
    descricao: [
      'Consultor dedicado',
      'Plano de ação exclusivo por área',
      'Treinamentos internos para equipes',
      'Dashboard de progresso e indicadores'
    ],
    preco: 'R$ 2.497,30/mês | R$ 24.973,00/ano',
    buttonText: 'Desconto de 10% disponivel'
  }
]




const paginaAtualSistema = ref(1)
const sistemasPorPagina = 4

const sistemasPaginados = computed(() => {
  const inicio = (paginaAtualSistema.value - 1) * sistemasPorPagina
  const fim = inicio + sistemasPorPagina
  return sistemas.slice(inicio, fim)
})

const totalPaginasSistema = computed(() => Math.ceil(sistemas.length / sistemasPorPagina))

function mudarPaginaSistema(pagina) {
  paginaAtualSistema.value = pagina
}

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

const toggleFAQ = (index) => {
  faqs.value[index].aberto = !faqs.value[index].aberto
}
const mostrarTodos = ref(false)

const sistemasVisiveis = computed(() => {
  return mostrarTodos.value ? sistemass : sistemass.slice(0, 4)
})

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
    p.servico-subtitulo Na CJL, desenvolvemos sistemas de software personalizados para diferentes segmentos...

    .servico-card-wrapper
      .servico-card(v-for="(sistema, index) in sistemasVisiveis" :key="index")
        h2.servico-card-titulo {{ sistema.nome }}
        p.servico-card-intro {{ sistema.descricaoIntro }}

        // Mostra os tópicos apenas nos 4 primeiros
        ul.servico-card-topicos(v-if="index < 4")
          li(v-for="(item, idx) in sistema.descricao" :key="idx") {{ item }}

        p.servico-preco {{ sistema.preco }}
        button.servico-botao {{ sistema.buttonText }}


  // Seção SISTEMAS (fora da seção serviços)
  section.sistemas-cards-section(v-if="paginaAtual === 'sistemas'")
    .introducao-sistemas
      h1.softwaree-main-title Planos de Consultoria
      p.intro-sistemas-texto Abaixo você encontra os softwares e funcionalidades disponíveis para sua empresa.

    .sistemas-card-wrapper
      .sistema-card(v-for="(sistema, index) in sistemasPaginados" :key="index")
        h2.sistema-card-titulo {{ sistema.nome }}
        p.sistema-card-intro {{ sistema.descricaoIntro }}
        ul.sistema-card-topicos
          li(v-for="(item, idx) in sistema.descricao" :key="idx") {{ item }}
        p.preco {{ sistema.preco }}
        button.btn-contratar(@click="abrirModal(sistema)") {{ sistema.buttonText }}

    // Paginação com botões numerados
    .paginacao
      button.pag-btn(
        v-for="pagina in totalPaginasSistema"
        :key="pagina"
        :class="{ ativo: paginaAtualSistema === pagina }"
        @click="mudarPaginaSistema(pagina)"
      ) {{ pagina }}

  // Modal (fora das seções para não sumir em troca de página)
  .modal-fundo(v-if="modalAberto")
    .modal-card
      button.modal-fechar(@click="fecharModal") ✕
      h3.modal-titulo {{ sistemaSelecionado?.nome }}
      .modal-conteudo
        p {{ sistemaSelecionado?.descricaoIntro }}
        //-ul
          li(v-for="(item, idx) in sistemaSelecionado?.descricao" :key="idx") {{ item }}
        p.modal-preco {{ sistemaSelecionado?.preco }}
      button.btn-vote(@click="fecharModal") Contratar


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

</template>




<style scoped>
.sistemas-cards-section .softwaree-main-title {
  position: relative;
  top: -2rem; 
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.5rem;
}



.sistemas-cards-section .intro-sistemas-texto {
  position: relative;
  top: -1.8rem; 
  margin-bottom: 1rem; 
  font-weight: 600; 
font-family: Arial, Helvetica, sans-serif

}



.sistemas-cards-section .sistema-card-titulo {
  font-weight: bold;
  font-size: 1.6rem;
  color: #1a1a1a;
  margin-bottom: 0.4rem;
  
}

.sistemas-cards-section .sistema-card-intro {
  font-size: 1rem;
  color: #444;
  margin-bottom: 3rem;
}

.sistemas-cards-section .sistema-card-topicos {
  list-style-type:disc;
  padding-left: 1.6rem;
  color: #000000;
  margin-bottom: 1rem;
}

.sistemas-cards-section .sistema-card-topicos li {
  margin-bottom: 0.5rem;
}



.sistemas-cards-section .paginacao {
  margin-top: 1.5rem;
  text-align: center;
}

.sistemas-cards-section .pag-btn {
  background-color: #ddd;
  border: none;
  padding: 0.4rem 0.8rem;
  margin: 0 0.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}


.servico-botao {
  background-color: #67c51f;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: -1rem auto 0;
  width: 250px;
  display: block; 
}

.servico-botao:hover {
  background-color: #4ea115;
}
.softwaree-main-title {
  text-align: left;      
  font-size: 2.1rem;
  margin-bottom: 0.5rem;
  color: #000000;
  font-weight: 700;
  margin-top: -1rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-90%);  
}
.servico-titulo::after,
.softwaree-main-title::after {
  content: '';
  display: block;
  width: 40%;
  height: 3px;
  background-color: #bb6400;
  margin-top: 0rem;
}
.btn-ver-mais {
  margin-top: 2rem;
  display: block;
  padding: 1rem 2rem;
  font-size: 1rem;
  background-color: #005eff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
}

.modal-fundo {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-card {
  background: #222; 
  border-radius: 12px;
  padding: 2rem 3rem;
  max-width: 450px;
  width: 90%;
  color: white;
  text-align: center;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
}

.modal-fechar {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 2rem;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 700;
  line-height: 1;
  user-select: none;
}

.modal-titulo {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff; 
}

.modal-conteudo p {
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.4;
  color: #d3d3d3;
}

.btn-vote {
  background-color: #67c51f; 
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: -1rem;
}

.btn-vote:hover {
  background-color: #4ea115;
}

.btn-contratar {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-contratar:hover {
  background-color: #0056b3;
}
.btn-contratar {
display: block;              
  margin: 0 auto;              
  padding: 10px 25px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;              
  background-color: #129b00;
  border: 0.5px solid #ffffff; 
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: left;
  text-decoration: none;       
  font-family: inherit;
  width: fit-content;        
  min-width: 120px;
  margin-top: -10px;
}


.btn-contratar:hover {
background-color: #34ff45;
}


.sistemas-cards-section {
  padding: 4rem 2rem;
  background-color: #f0f0f0;
}

.sistemas-titulo {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 2rem;
  margin-left: 15rem;
color: #000;
}

.sistemas-subtitulo {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #666;
  margin-left: 15rem;
}

.introducao-sistemas {
  max-width: 900px;
  margin: 0 auto 3rem;
  text-align: center;
}

.intro-sistemas-titulo {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  margin-left: 15rem;
  margin-top: -3rem;
}

.intro-sistemas-texto {
  font-size: 1rem;
  color: #555;
  margin-left: 15rem;
}

.sistemas-card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-left: 350px; 
}


.sistema-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  border-left: 4px solid #eb7d00; 
}

.sistemas-card-titulo,
.sistemas-card-intro,
.sistemas-card-topicos {
  transform: translateX(30rem);
}

.sistema-card:hover {
  transform: translateY(-4px);
}

.sistema-card-titulo {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.sistema-card-intro {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
}

.sistema-card-topicos {
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #333;
}

.sistema-card-topicos li {
  margin-bottom: 0.5rem;
}

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
  padding-top: 30px; 
  margin-top: 0;
}

.titulo-secao {
  margin-left: 21rem;
  color: #2c2c2c;
  text-align: left;
  font-size: 2rem;
  font-weight: 100;
  margin-bottom: 2rem;

}


.container-cards {
  display: grid;
  grid-template-columns: repeat(3, 250px); 
  column-gap: 2.5rem; 
  row-gap: 1.6rem; 
  justify-content: center; 
}

.card-servico {
  width: 270px; 
  background-color: #ff7300;
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
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 600px) {
  .container-cards {
    grid-template-columns: 1fr; 
  }
}
.card-servico {
  transition: transform 0.3s ease;
}

.card-servico:hover {
  transform: translateY(-10px); 
  cursor: pointer; 
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
  transform: rotate(0deg);
}

.faq-icon.aberto svg {
  transform: rotate(180deg); 
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

  
  background-color: #ffffff;
  text-align: center;

 
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
   align-items: flex-start; 
 
  justify-content: center;
  gap: 6rem;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.ajuda-coluna-img img {
  width: 360px;        
  height: 240px;        
  object-fit: cover;    
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
  text-align: center; 
  padding: 2rem;
   padding-left: 23vw; 
}

.titulo-ajuda {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #000;
  margin-top: -3rem;
  display: inline-block;
  position: relative;
  margin-left: 0px;
}

.titulo-ajuda::after {
  content: '';
  position: absolute; 
  left: 0; 
  bottom: -5px; 
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
  color: #1a1a1a;       
  font-size: 1.1rem;
  text-align: justify;  
  max-width: 800px;      
  margin: -2rem auto 4rem auto; 
  font-style: italic;
}


.servico-card-topicos {
  list-style-type: disc;
  list-style-position: inside; 
  padding-left: 0;
  margin: 40px auto;       
  text-align: center;      
  max-width: 100%;
  display: block;
  margin-left: 0;
}

.servico-card-topicos li::marker {
  color: rgb(0, 0, 0);                   
}

.servico-card-topicos li {
  color: #333333;                  
}


.servico-card-topicos li::before {
 
  content: ''; 
}
.servico-card-topicos li::before {
  content: none !important;      
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
  display: inline-block; 
  
}


.servico-titulo::after {
  content: '';
  display: block;
  width: 40%;
  height: 3px;
  background-color: #bb6400;
  margin-top: 0rem;
}
.software-main-title {
  text-align: left;            
  font-size: 2.3rem;
  margin-bottom: 3rem;
  color: #000000;
  font-weight: 700;
  margin-top: -1rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-70%);  
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
  background: #ffffff; 
  padding: 1.5rem 1.8rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  border-left: 4px solid #bb6400;
  padding-left: 1rem; 
}



.servico-card-titulo {
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
  color: #000000;
}


.servico-card-intro {
  font-style: italic;
  margin-bottom: 1rem;
  color: #1f1f1f; 
}


.servico-card-topicos {
  padding-left: 0;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.5;
}


.servico-card-topicos li {
  margin-bottom: 0.5rem;
  position: relative;

}

.servico-card-topicos li::before {
  content: '*';
  position: absolute;
  left: 0;
  color: #ffffff; 
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
  pointer-events: none; 
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


.overlay-desenvolvimento {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.418);
  border-radius: 8px;
  pointer-events: none; 
  padding: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 1;
}



.cadeado-wrapper {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 0; 
}


.cadeado-icone {
  width: 24px;
  height: 24px;
  fill: #bb6400;
  transition: transform 0.2s;
}


.cadeado-wrapper:hover .cadeado-icone {
  transform: scale(1.1);
}


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
  color: #222 !important; 
}
.card input[disabled] {
  color: #222;
}

.field label,
.campo label,
.form-group label {
  margin-bottom: 5rem; 
}
.field input,
.field select,
.field textarea {
  margin-bottom: 0.6rem; 
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

}

.field {
  flex: 1;                
  display: flex;
  flex-direction: column;   
}

.field label {
  margin-bottom: 3px;
  font-weight: 600;
  color: #854000;
  line-height: 1; 
}

.field input {
  margin-top: 0 !important;     
  padding: 6px 10px !important;  
  height: 32px !important;      
  font-size: 14px !important;
  border: 1px solid #6d2800 !important;
  border-radius: 6px !important;
  box-sizing: border-box !important;
  line-height: 1 !important;   
  display: block !important;    
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  width: 140%;      
  max-width: none;  
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
  height: 90px;         
  min-width: 250px;     
  padding: 8px 12px;    
  font-size: 16px;      
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


.perfil-usuario {
  padding: 2rem;
  margin-left: 250px;
  font-family: 'Segoe UI', sans-serif;
}

.perfil-titulo {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: Center;     
  color: #000000;
  position: relative;   
  display: inline-block; 
  margin-left: 380px;
  margin-top: -2rem;
}

.perfil-titulo::after {
  content: '';
  display: block;
  width: 40%;
  height: 3px;
  background-color: #bb6400;
  margin-top: 0rem; 
}


.card {
  background: rgb(255, 255, 255);
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  border-left: 4px solid #bb6400; 
  margin-left: 90px;
   max-width: 770px; 
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
  row-gap: 1rem;      
  column-gap: 4rem;   
  margin-bottom: 1rem;
}

.form-row input {
  flex: 1 1 auto;
  background-color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem;
  min-width: 250px;
  height: 120px; 
  font-size: 16px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.form-row input {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  line-height: 1.5 !important;
  font-size: 16px !important;
  height: auto !important;
  min-height: 40px !important; 
  box-sizing: border-box !important;
  background-color: #fffef1 !important;
  border-radius: 6px !important;
  border: 1px solid #795200 !important;
  flex: 1 1 auto !important;
}
.software-main-title {
  font-weight: bold; 
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
