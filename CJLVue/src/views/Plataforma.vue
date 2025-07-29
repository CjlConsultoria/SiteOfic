<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import axios from 'axios'
import LogoNexdom from '@/assets/cjl.jpg'
import InicioPng from '@/assets/inicio2.png'
import MoradoresPng from '@/assets/moradores.png'
import ReclamacoesPng from '@/assets/reclamacoes.png'
import DenunciaPng from '@/assets/denuncia.png'
import RelatoriosPng from '@/assets/relatorios.png'


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
function normalizarLabel(label) {
  return label
    .normalize('NFD')               // separa acento da letra
    .replace(/[\u0300-\u036f]/g, '') // remove acento
    .toLowerCase()                 // tudo minúsculo
}

function irParaPagina(label) {
  const labelNormalizado = normalizarLabel(label)

  if (labelNormalizado === 'sair') {
    localStorage.clear()
    window.location.href = '/login'
    return
  }

  if (labelNormalizado === 'dashboard') {
    paginaAtual.value = 'dashboard'
  } else if (labelNormalizado === 'servicos') {
    paginaAtual.value = 'servicos'
  } else if (labelNormalizado === 'sistemas') {
    paginaAtual.value = 'sistemas'
  } else if (labelNormalizado === 'perfil') {
    irParaPerfil()
    paginaAtual.value = 'perfil'
  } else if (labelNormalizado === 'ajuda') {
    paginaAtual.value = 'ajuda'
  } else {
    // Se não for nenhum desses, define o valor normalizado mesmo
    paginaAtual.value = labelNormalizado
  }
}

// Controle do modal de sistema
const modalAberto = ref(false)
const sistemaSelecionadoIndex = ref(null)

function abrirModal(index) {
  sistemaSelecionadoIndex.value = index
  modalAberto.value = true
  modalCarregando.value = true

  // Simula carregamento de 10 segundos
  setTimeout(() => {
    modalCarregando.value = false
  }, 3000)
}

function fecharModal() {
  modalAberto.value = false
  sistemaSelecionadoIndex.value = null
  modalCarregando.value = false
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

// Paginação dos cards da home
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
    usuario.nomeEmpresa = dados.empresaNome || ''
    usuario.codigoPublico = dados.codigoPublico || ''

  } catch (erro) {
    console.error('Erro ao buscar usuário logado:', erro)
    if (erro.response?.status === 401) {
      logoff()
    }
  }
}

// Serviços avançados
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
    nome: 'Starter (MVP Rápido)',
    descricaoIntro: 'Ideal para startups e empreendedores que desejam validar sua ideia rapidamente com um produto mínimo viável (MVP). Inclui funcionalidades básicas e entrega ágil para testar o mercado e obter feedback dos usuários.',
    descricao: [
      'Levantamento de requisitos simplificado',
      'Protótipo funcional (1 tela principal)',
      'Backend leve (CRUD simples)',
      'Hospedagem inicial'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Essencial',
    descricaoIntro: 'Projeto ideal para pequenas empresas que buscam uma solução básica de gestão, com interface personalizada e funcionalidades essenciais para otimizar processos e controlar operações do dia a dia.',
    descricao: [
      'Até 3 módulos funcionais',
      'Integração com banco de dados',
      'Painel administrativo simples',
      'Entrega em 30 a 45 dias'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Profissional',
    descricaoIntro: 'Solução robusta com foco em controle avançado, segurança e usabilidade, projetada para empresas em crescimento que necessitam de ferramentas completas para gerenciar equipes, processos e indicadores.',
    descricao: [
      'Autenticação de usuários',
      'Controle de permissões',
      'Dashboard com indicadores',
      'APIs documentadas'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Corporativo',
    descricaoIntro: 'Plataforma avançada, pensada para empresas que demandam automação e alta escalabilidade, com arquitetura modular e integração a sistemas externos para otimizar fluxos complexos de trabalho.',
    descricao: [
      'Arquitetura em microserviços ou modular',
      'Integrações com sistemas externos (ERP, CRM)',
      'Testes automatizados'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Growth (Expansão)',
    descricaoIntro: 'Plano focado em acelerar o crescimento do seu negócio, com ferramentas avançadas de análise de dados, performance e integração com sistemas de marketing e business intelligence para decisões estratégicas.',
    descricao: [
      'Módulo de relatórios avançados',
      'Otimização de performance',
      'Integração com ferramentas de BI e marketing'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'SaaS (Software como Serviço)',
    descricaoIntro: 'Desenvolvimento completo de uma plataforma SaaS multiusuário, com gerenciamento de assinaturas, cobrança e hospedagem escalável, ideal para negócios que querem oferecer software como serviço.',
    descricao: [
      'Painel de gestão multiempresa',
      'Billing (assinaturas e pagamentos)',
      'Hospedagem escalável (AWS, GCP ou Azure)'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'App + Web',
    descricaoIntro: 'Entrega integrada de sistema web e aplicativo mobile (Android/iOS), garantindo experiência unificada, backend compartilhado e publicação nas principais lojas para ampliar seu alcance.',
    descricao: [
      'Backend unificado',
      'App híbrido com design responsivo',
      'Publicação nas lojas'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Integrações Corporativas',
    descricaoIntro: 'Plano dedicado a empresas que precisam conectar seu sistema a diversos softwares, ERPs e gateways de pagamento, com APIs, webhooks e monitoramento para integração confiável e eficiente.',
    descricao: [
      'Integração com ERPs (SAP, TOTVS, Bling, etc.)',
      'Integrações com Correios, PagSeguro, MercadoPago...',
      'APIs REST, Webhooks e filas (Kafka/RabbitMQ)',
      'Monitoramento e logs das integrações'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Full Outsourcing',
    descricaoIntro: 'Equipe dedicada e completa para desenvolvimento contínuo de projetos personalizados, com gestão profissional e processos ágeis para atender demandas complexas e constantes do seu negócio.',
    descricao: [
      'Equipe alocada (PO, Devs, QA, UX)',
      'Sprints quinzenais',
      'Gestão via Jira ou ClickUp'
    ],
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Elite / CTO Estratégico',
    descricaoIntro: 'Serviço premium com desenvolvimento contínuo aliado à liderança estratégica de tecnologia, oferecendo inovação, segurança avançada e análise de dados para decisões executivas e crescimento sustentável.',
    descricao: [
      'Acompanhamento direto de um CTO',
      'Inovação, AI, análise de dados, cibersegurança',
      'Relatórios executivos e decisões técnicas'
    ],
    buttonText: 'Solicitar Orçamento',
  }
]



// Array com os textos diferentes para o modal, mesma estrutura:
const modaisCustomizados = [
  {
    nome: 'Plano Starter (MVP Rápido)',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$1.497,00/mês (3 meses) | R$4.990,00 total',
    precoDesconto: 'R$1.347,30/mês (3 meses) | R$4.490,00 total',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano Essencial',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$2.497,00/mês | R$27.740,00/ano',
    precoDesconto: 'R$2.247,30/mês | R$24.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano Profissional',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$3.497,00/mês | R$38.850,00/ano',
    precoDesconto: 'R$3.147,30/mês | R$34.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano Corporativo',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$5.497,00/mês | R$60.970,00/ano',
    precoDesconto: 'R$4.947,30/mês | R$54.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano Growth (Expansão)',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$6.997,00/mês | R$77.740,00/ano',
    precoDesconto: 'R$6.297,30/mês | R$69.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano SaaS (Software como Serviço)',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$8.997,00/mês | R$99.970,00/ano',
    precoDesconto: 'R$8.097,30/mês | R$89.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano App + Web',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$9.997,00/mês | R$111.070,00/ano',
    precoDesconto: 'R$8.997,30/mês | R$99.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano Integrações Corporativas',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$11.997,00/mês | R$133.300,00/ano',
    precoDesconto: 'R$10.797,30/mês | R$119.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano Full Outsourcing',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$14.997,00/mês | R$166.630,00/ano',
    precoDesconto: 'R$13.497,30/mês | R$149.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  },
  {
    nome: 'Plano Elite / CTO Estratégico',
    descricaoIntro: 'Parabéns! Você acaba de desbloquear um desconto especial de 10% exclusivo para este plano...',
    descricao: [],
    precoAntigo: 'R$19.997,00/mês | R$222.180,00/ano',
    precoDesconto: 'R$17.997,30/mês | R$199.970,00/ano',
    buttonText: 'Solicitar Orçamento',
  }
]


// Array de sistemas (renomeado para 'sistemas' para consistência)
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



// Controle da paginação dos sistemas
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

// FAQs
const faqs = ref([
  {
    pergunta: 'Quais serviços de consultoria de TI vocês oferecem?',
    resposta: 'Oferecemos análise de infraestrutura, otimização de processos, implantação de sistemas e suporte técnico personalizado.',
    aberto: false,
  },
  {
    pergunta: 'Como funciona o processo de diagnóstico da minha empresa?',
    resposta: 'Realizamos uma avaliação detalhada do ambiente atual para identificar pontos fortes, fraquezas e oportunidades de melhoria.',
    aberto: false,
  },
  {
    pergunta: 'Vocês oferecem suporte remoto ou presencial?',
    resposta: 'Nosso atendimento é exclusivamente remoto, garantindo agilidade e segurança em todas as interações.',
    aberto: false,
  },
  {
    pergunta: 'Qual o prazo médio para implementação de um projeto?',
    resposta: 'O prazo varia conforme a complexidade, mas geralmente entregamos projetos em 30 a 90 dias após o diagnóstico.',
    aberto: false,
  },
  {
    pergunta: 'Vocês ajudam na migração para a nuvem?',
    resposta: 'Sim, auxiliamos em toda a migração, desde o planejamento até a execução e suporte pós-migração.',
    aberto: false,
  },
  {
    pergunta: 'Como posso solicitar um orçamento personalizado?',
    resposta: 'Basta entrar em contato conosco pelo formulário no site ou pelo telefone para agendar uma consulta gratuita.',
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
const modalCarregando = ref(false)

// onMounted para buscar dados se estiver na página perfil
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
        li(
          v-for="item in menuPrincipal"
          :key="item.label"
          :class="{ ativo: paginaAtual === normalizarLabel(item.label) }"
        )

          a(href="#" @click.prevent="irParaPagina(item.label)")
            span.icon {{ item.icon }}&nbsp;
            | {{ item.label }}

      ul.menu-secundaria
        li(
          v-for="item in menuSecundaria"
          :key="item.label"
          :class="{ 'btn-sair': item.label === 'Sair', ativo: paginaAtual === normalizarLabel(item.label) }"
        )

          a(href="#" @click.prevent="irParaPagina(item.label)")
            span.icon {{ item.icon }}&nbsp;
              | {{ item.label }}
  

  // Botão para abrir/fechar menu lateral
  button.btn-menu(@click="toggleMenu") ☰

  // Seção HOME
  section.software-list-container(v-if="paginaAtual === 'home' || paginaAtual === 'dashboard'")
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
        button.btn-contratar(@click="abrirModal(index + (paginaAtualSistema - 1) * sistemasPorPagina)") {{ sistema.buttonText }}



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

      // Área do card e loading
      .modal-card-conteudo
        // Se estiver carregando mostra card + loader
        .loading-area(v-if="modalCarregando")
          h3.modal-titulo {{ modaisCustomizados[sistemaSelecionadoIndex]?.nome }}
          .loader

        // Se não estiver carregando, mostra conteúdo completo
        .conteudo-completo(v-else)
          h3.modal-titulo {{ modaisCustomizados[sistemaSelecionadoIndex]?.nome }}
          p {{ modaisCustomizados[sistemaSelecionadoIndex]?.descricaoIntro }}
          ul
            li(v-for="(item, idx) in modaisCustomizados[sistemaSelecionadoIndex]?.descricao" :key="idx") {{ item }}

          // Frase chamativa — AGORA está dentro do conteúdo
          p.pulsando(style="color: #e63946; font-weight: bold; margin-top: 1rem; font-size:1.5rem;")
            | VOCÊ GANHOU 10% OFF!

          // Preço com e sem desconto (se existirem)
          .modal-preco-wrapper
            p.modal-preco-antigo(v-if="modaisCustomizados[sistemaSelecionadoIndex]?.precoAntigo")
              span.preco-riscado {{ modaisCustomizados[sistemaSelecionadoIndex]?.precoAntigo }}

            p.modal-preco-desconto(v-if="modaisCustomizados[sistemaSelecionadoIndex]?.precoDesconto")
              span.preco-verde {{ modaisCustomizados[sistemaSelecionadoIndex]?.precoDesconto }}

          // Só aparece se não estiver carregando
          button.btn-vote(@click="fecharModal") {{ modaisCustomizados[sistemaSelecionadoIndex]?.buttonText }}




  // Seção AJUDA
  section.ajuda-section(v-if="paginaAtual === 'ajuda'")
    h1.titulo-ajuda Conheça o Sistema de Condomínio CJL

    .ajuda-bloco
      .ajuda-coluna-img
        img(:src="InicioPng", alt="Tela inicial do sistema")
      .ajuda-coluna-texto
        h2.ajuda-titulo Tela Inicial e Visão Geral
        p
          | A tela inicial do sistema oferece acesso rápido às principais funcionalidades. 
          strong Com uma interface intuitiva e moderna, 
          | os moradores e administradores podem navegar de forma eficiente.

    .ajuda-bloco
      .ajuda-coluna-texto
        h2.ajuda-titulo Cadastro de Moradores
        p
          | A plataforma permite o registro completo de moradores com dados de contato, unidade, dependentes e veículos. 
          strong Facilita a organização e o controle do condomínio 
          | de maneira centralizada.
      .ajuda-coluna-img
        img(:src="MoradoresPng", alt="Cadastro de Moradores")

    .ajuda-bloco
      .ajuda-coluna-img
        img(:src="ReclamacoesPng", alt="Envio de Reclamações")
      .ajuda-coluna-texto
        h2.ajuda-titulo Reclamações e Ocorrências
        p
          | Os moradores podem registrar reclamações diretamente na plataforma, garantindo agilidade na comunicação com a administração. 
          strong Acompanhe o andamento das solicitações 
          | em tempo real.

    .ajuda-bloco
      .ajuda-coluna-texto
        h2.ajuda-titulo Canal de Denúncias
        p
          | O sistema permite que moradores registrem denúncias diretamente pela plataforma. 
          strong As denúncias não são anônimas, 
          | garantindo responsabilidade e facilitando o acompanhamento pela administração.
      .ajuda-coluna-img
        img(:src="DenunciaPng", alt="Canal de Denúncias")


    .ajuda-bloco
      .ajuda-coluna-img
        img(:src="RelatoriosPng", alt="Geração de Relatórios")
      .ajuda-coluna-texto
        h2.ajuda-titulo Relatórios e Estatísticas
        p
          | A administração pode gerar relatórios detalhados sobre moradores, ocorrências e uso do sistema. 
          strong Acompanhe indicadores importantes 
          | para tomar decisões com base em dados.





  // Seção FAQ
  section.faq-container(v-if="paginaAtual === 'ajuda'")
    h2.faq-title Perguntas Frequentes
    ul.faq-list
      li.faq-item(v-for="(faq, index) in faqs" :key="index")
        div.faq-header(@click="toggleFAQ(index)")
          span.faq-question {{ faq.pergunta }}
          span.faq-icon
            svg(
              :class="{ aberto: faq.aberto }"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            )
              polyline(points="6 9 12 15 18 9")
        transition(name="fade")
          p.faq-resposta(v-if="faq.aberto") {{ faq.resposta }}


</template>




<style scoped>
.ativo {
  background-color: rgba(92, 92, 92, 0.63); /* cinza muito claro com transparência */
  box-shadow: 0 0 8px rgba(184, 184, 184, 0.08); /* sombra leve */
  border-radius: 8px;
  transition: all 0.3s ease;
}


.servico-botao {
display: block;              
  margin: 0 auto;              
  padding: 10px 25px;          /* diminuiu um pouco o padding horizontal */
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;              
  background-color: #1fb900;
  border: 0.5px solid #ffffff; /* borda mais fina */
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: left;
  text-decoration: none;       
  font-family: inherit;
  width: fit-content;          /* botão com largura mínima para o conteúdo */
  min-width: 120px;
  margin-top: -30px;
}
.menu a,
.menu-secundaria a,
.menu-secundaria button,
.menu-secundaria span {
  color: #ffffff;
}


.servico-botao:hover {
background-color: #2e7400;
}
.faq-icon svg {
  transition: transform 0.3s ease;
}

.faq-icon svg.aberto {
  transform: rotate(180deg);
}

/* Transição suave da resposta */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.faq-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.faq-icon.aberto {
  transform: rotate(180deg);
}

.servico-subtitulo {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 2rem;
  margin-top: -40px;
  color: #474747;
  text-align: center;
  margin-left: 20px;
}

.intro-sistemas-texto {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 0px;
  color: #474747;
  text-align: center;
  margin-left: 240px;
}



.sistemas-cards-section .sistemas-card-wrapper {
  margin-top: -3rem; /* ajuste o valor conforme necessário */
}

.pulsando {
  animation: pulsar 1.2s infinite;
}

@keyframes pulsar {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-preco {
  color: #28a745;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 2rem; /* distância do texto acima */
  text-align: center;
}
.conteudo-completo {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* espaçamento entre os elementos */
}

.modal-preco {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #28a745; /* verde visível */
  text-align: center;
  display: block; /* garante que aparece */
  opacity: 1;     /* visível */
}

.modal-preco-wrapper {
  margin-top: 1rem;
}

.modal-preco-antigo {
  color: #888;
  font-size: 1rem;
}

.preco-riscado {
  text-decoration: line-through;
  margin-left: 0.3rem;
}

.modal-preco-desconto {
  color: #ffffff;
  font-weight: bold;
  font-size: 1.2rem;

}

.preco-verde {
  margin-left: 0.3rem;
}

.btn-vote {
  margin-top: 1rem; /* separa o botão do preço */
  align-self: center;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  background-color: #1fc5a1;
  color: white;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-vote {
  margin-top: 2rem; /* empurra o botão mais pra baixo */
  background-color: #a1c51f;
  color: white;
  font-weight: bold;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.loader {
  border: 4px solid #f3f3f3; /* cor do fundo */
  border-top: 4px solid #3498db; /* cor da borda animada */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.modal-loading {
  text-align: center;
  padding: 2rem;
}

.spinner {
  margin: 1rem auto;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

::v-deep .modal-preco {
  color: #ffffff;
  font-size: 1.1rem;
  margin-top: 3rem; /* empurra o preço para baixo */
  display: block;
  margin-bottom: 2rem;
}

/* Título principal da seção */
.sistemas-cards-section .softwaree-main-title {
  position: relative;
  top: -2rem; /* sobe 5rem para cima */
  font-size: 2rem;
  
  color: #000;
  margin-bottom: 0.5rem;
}


/* Parágrafo introdutório */
.sistemas-cards-section .intro-sistemas-texto {
  position: relative;
  top: -1.8rem; /* sobe 1.5rem, ajuste conforme quiser */
  margin-bottom: 1rem; /* pra não ficar grudado no próximo */
  font-weight: 600; /* semi-bold, menos pesado que 700 (bold) */
  font-family: Arial, Helvetica, sans-serif;

}


/* Cartão de sistema */
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




/* Paginação */
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



.softwaree-main-title {
  text-align: left;             /* mantém o texto alinhado à esquerda DENTRO do bloco */
  font-size: 2.1rem;
  margin-bottom: 0.5rem;
  color: #000000;
  font-weight: 700;
  margin-top: -1rem;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-90%);  /* centraliza o bloco na tela */
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
  background: #222; /* fundo escuro */
  border-radius: 12px;
  padding: 2rem 3rem;
  max-width: 450px;
  width: 90%;
  color: white;
  text-align: center;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  margin-left: 17rem; /* ou 10%, ajuste como quiser */
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
  color: #ffffff; /* verde próximo ao da imagem */
}

.modal-conteudo p {
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.4;
  color: #d3d3d3;
}

.btn-vote {
  background-color: #008600; /* verde do botão */
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0rem;
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
  padding: 10px 25px;          /* diminuiu um pouco o padding horizontal */
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;              
  background-color: #1fb900;
  border: 0.5px solid #ffffff; /* borda mais fina */
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: left;
  text-decoration: none;       
  font-family: inherit;
  width: fit-content;          /* botão com largura mínima para o conteúdo */
  min-width: 120px;
  margin-top: -10px;
}


.btn-contratar:hover {
background-color: #2e7400;
}
/* ===== Seção Sistemas ===== */

.sistemas-cards-section {
  padding: 4rem 2rem;
  background-color: #f0f0f0;
  
}
.sistemas-cards-wrapper {
  margin-top: -2rem; /* ou ajuste como quiser */
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


.sistemas-card-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  margin-left: 350px; /* desloca tudo 150px para a direita */
}


.sistema-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  
  border-left: 4px solid #bb6400; /* Exemplo: borda azul de 4px na esquerda */
}

.sistemas-card-titulo,
.sistemas-card-intro,
.sistemas-card-topicos {
  transform: translateX(30rem);
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
  background-color: #242424;
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
  border-left: 4px solid #2e2e2e;
}
* {
  font-family: Arial, sans-serif !important;
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
  background-color: #2e2e2e;

  /* Aumenta largura do card */
  padding: 1.2rem 2rem;
  border-radius: 0.7rem;
  transition: background 0.2s ease;
  font-size: 1.1rem;
}




.faq-resposta {
  margin-top: 0.5rem;
  padding: 1rem 1.5rem;
  background: #fff4ea;
  border-right: 4px solid #2e2e2e;
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
  width: 100%;
  max-width: 440px;
  height: auto; /* melhor que height fixa */
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
}

.ajuda-coluna-texto {
  max-width: 400px;
  text-align: left;
}

.ajuda-titulo {
  font-size: 1.5rem;
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
  font-family: Arial, Helvetica, sans-serif;

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
  color: #474747;
  text-align: center;
  margin-left: 240px;
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
  border-left: 4px solid #bb6400;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background: #fff;
  position: relative;
  margin-top: 10px;
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
  position: relative;
  padding-top: 1rem; /* mantém espaçamento interno */
}

.menu-secundaria::before {
  content: '';
  position: absolute;
  top: -1.5rem; /* sobe a linha */
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(170, 170, 170, 0.75);
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
