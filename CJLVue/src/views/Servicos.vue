<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import contaImg from '@/assets/conta.png'
import logoImg from '@/assets/logocjl.png'
import ImagemEquipe from '@/assets/consultoria.webp'
import { useRouter } from 'vue-router'
import LogoNexdom from '@/assets/cjl.jpg'

// Definição das configurações básicas
const cardWidthPx = ref(375) // largura fixa do card em px (ajuste se necessário)
const visibleCardsDesktop = 3
const visibleCardsMobile = 1

// Estado para monitorar largura da janela (responsividade)
const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)

// Atualiza o windowWidth e a largura do card ao redimensionar a tela
function onResize() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight

  // Apenas para 820x1180
  if (windowWidth.value === 820 && windowHeight.value === 1180) {
    cardWidthPx.value = 470
  } else if (windowWidth.value < 768) {
    cardWidthPx.value = 375 // celulares
  } else {
    cardWidthPx.value = 375 // padrão para desktops ou outros
  }
}

onMounted(() => {
  onResize() // define na inicialização
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

// Retorna quantos cards ficam visíveis conforme largura da tela
const visibleCards = computed(() => {
  return windowWidth.value <= 768 ? visibleCardsMobile : visibleCardsDesktop
})

// Índices dos sliders
const currentIndexConsultoria = ref(0)
const currentIndexSoftware = ref(0)

// Máximo índice de cada slider
const maxIndexConsultoria = computed(() => consultoriaCards.length - visibleCards.value)
const maxIndexSoftware = computed(() => softwareCards.length - visibleCards.value)

// Corrigido: deslocamento proporcional ao número de cards visíveis
const translateXConsultoria = computed(() => {
  return cardWidthPx.value * currentIndexConsultoria.value
})
const translateXSoftware = computed(() => {
  return cardWidthPx.value * currentIndexSoftware.value
})

// Controles
function prevConsultoria() {
  if (currentIndexConsultoria.value > 0) currentIndexConsultoria.value--
}
function nextConsultoria() {
  if (currentIndexConsultoria.value < maxIndexConsultoria.value) currentIndexConsultoria.value++
}
function prevSoftware() {
  if (currentIndexSoftware.value > 0) currentIndexSoftware.value--
}
function nextSoftware() {
  if (currentIndexSoftware.value < maxIndexSoftware.value) currentIndexSoftware.value++
}

const router = useRouter()
const contratarPlano = (card: any) => {
  console.log(`Plano selecionado: ${card.title}`)
  router.push('/planos')
}

// Depoimento automático
const depoimentoAtual = ref(0)
let intervalo: number
onMounted(() => {
  intervalo = setInterval(() => {
    depoimentoAtual.value = (depoimentoAtual.value + 1) % depoimentos.length
  }, 5000)
})
onUnmounted(() => {
  clearInterval(intervalo)
})

// Dados dos cards de consultoria
const consultoriaCards = [
  { title: 'Plano Iniciante', desc: 'Ideal para pequenos negócios que precisam de soluções básicas de TI.', items: ['5 licenças de software', 'Suporte técnico via e-mail', 'Atualizações automáticas'], preco: 'R$ 29,90/mês | R$ 299,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Essencial', desc: 'Perfeito para equipes em crescimento que precisam de estabilidade e suporte.', items: ['10 licenças de software', 'Suporte por chat e e-mail', 'Backups semanais', 'Painel de controle'], preco: 'R$ 49,90/mês | R$ 499,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Profissional', desc: 'Para empresas que precisam de escalabilidade e segurança avançada.', items: ['20 licenças de software', 'Suporte remoto 24/7', 'Monitoramento de rede', 'Antivírus corporativo'], preco: 'R$ 99,90/mês | R$ 999,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Corporativo', desc: 'Solução completa para médias empresas com estrutura tecnológica robusta.', items: ['30 licenças de software', 'Suporte dedicado', 'Controle de acesso por usuário', 'Integrações com ERP'], preco: 'R$ 149,90/mês | R$ 1.499,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Empresarial', desc: 'Consultoria e infraestrutura de TI sob demanda para grandes empresas.', items: ['50 licenças de software', 'Gestão de TI completa', 'Treinamentos mensais', 'Automação de processos'], preco: 'R$ 249,90/mês | R$ 2.499,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Avançado', desc: 'Recursos avançados para equipes técnicas que precisam de flexibilidade.', items: ['75 licenças de software', 'APIs dedicadas', 'Ambiente de testes', 'Logs em tempo real'], preco: 'R$ 349,90/mês | R$ 3.499,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Premium', desc: 'Experiência completa de TI com suporte exclusivo e SLA garantido.', items: ['100 licenças de software', 'Suporte SLA 1h', 'Ambiente em nuvem privado', 'Acesso via VPN'], preco: 'R$ 499,90/mês | R$ 4.999,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Ultra', desc: 'Para empresas que exigem alta disponibilidade e segurança.', items: ['150 licenças de software', 'Alta redundância', 'Auditorias de segurança trimestrais', 'Disaster Recovery'], preco: 'R$ 699,90/mês | R$ 6.999,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Mega', desc: 'Infraestrutura e consultoria contínua para operações críticas.', items: ['200 licenças de software', 'Equipe dedicada de TI', 'Consultoria mensal personalizada', 'Relatórios de performance'], preco: 'R$ 899,90/mês | R$ 8.999,00/ano', buttonText: 'CONTRATAR' },
  { title: 'Plano Enterprise', desc: 'Pacote completo com gestão de tecnologia ponta a ponta.', items: ['Licenças ilimitadas', 'TI terceirizada 360º', 'Projetos customizados', 'Integração com sistemas legados'], preco: 'R$ 1.299,90/mês | R$ 12.999,00/ano', buttonText: 'CONTRATAR' }
]

// Dados dos cards de software
const softwareCards = [
  { title: 'MVP Rápido', desc: 'Ideal para startups que precisam lançar rápido com baixo custo.', items: ['Até 3 telas principais', 'Backend básico incluso', 'Entrega em até 3 semanas'], preco: 'R$ 3.500', buttonText: 'Solicitar Orçamento' },
  { title: 'Projeto Personalizado', desc: 'Para empresas que precisam de uma solução sob medida.', items: ['Levantamento de requisitos', 'Design de interface personalizado', 'Integração com APIs'], preco: 'A partir de R$ 7.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Software Completo', desc: 'Solução empresarial com painel administrativo e suporte contínuo.', items: ['Dashboard completo', 'Usuários e permissões', 'Suporte e manutenção 6 meses'], preco: 'Sob consulta', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 1', desc: 'Software extra 1', items: ['Item 1', 'Item 2'], preco: 'R$ 4.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 2', desc: 'Software extra 2', items: ['Item 1', 'Item 2'], preco: 'R$ 5.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 3', desc: 'Software extra 3', items: ['Item 1', 'Item 2'], preco: 'R$ 6.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 4', desc: 'Software extra 4', items: ['Item 1', 'Item 2'], preco: 'R$ 7.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 5', desc: 'Software extra 5', items: ['Item 1', 'Item 2'], preco: 'R$ 8.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 6', desc: 'Software extra 6', items: ['Item 1', 'Item 2'], preco: 'R$ 9.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 7', desc: 'Software extra 7', items: ['Item 1', 'Item 2'], preco: 'R$ 10.000', buttonText: 'Solicitar Orçamento' }
]

// Depoimentos
const depoimentos = [
  { texto: '“A CJL transformou completamente a forma como gerenciamos nossos processos internos...”', nome: 'Dra. Mirela Rufato', cargo: 'Superintendente – Unimed Penápolis' },
  { texto: '“O suporte da CJL foi essencial para superar desafios técnicos que enfrentávamos há anos...”', nome: 'Fulano da Silva', cargo: 'Diretor – Empresa Exemplo' },
  { texto: '“Nosso negócio ganhou agilidade e inovação com as soluções personalizadas da CJL...”', nome: 'Maria Oliveira', cargo: 'Gerente – Organização XYZ' },
  { texto: '“A equipe da CJL demonstrou total comprometimento e domínio técnico...”', nome: 'Carlos Menezes', cargo: 'CEO – Tech Solutions' },
  { texto: '“Com a consultoria da CJL, conseguimos otimizar recursos e melhorar processos internos...”', nome: 'Ana Beatriz Souza', cargo: 'Coordenadora de Projetos – Innovatech' }
]
function precoComDesconto(preco: string, percentual: number) {
  // separa mensal e anual
  const partes = preco.split('|').map(p => p.trim());

  const resultado = partes.map(p => {
    const match = p.match(/R\$ (\d+,\d+)/);
    if (!match) return p;

    // transforma para número
    const numero = parseFloat(match[1].replace(',', '.'));
    const valorDescontado = numero * (1 - percentual / 100);

    // retorna no formato R$
    return 'R$ ' + valorDescontado.toFixed(2).replace('.', ',') + p.slice(match[1].length + 3);
  });

  return resultado.join(' | ');
}

const cards = ref([
  {
    id: 1,
    title: "Plano Iniciante",
    developer: "Consultoria CJL",
    description: [
      "Ideal para pequenos negócios que precisam de soluções básicas de TI.",
      "5 licenças de software",
      "Suporte técnico via e-mail",
      "Atualizações automáticas",
      "Consultoria inicial personalizada" 
    ],
    preco: "R$ 32,89/mês | R$ 328,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.2,
    reviews: 15
  },
  {
    id: 2,
    title: "Plano Essencial",
    developer: "Consultoria CJL",
    description: [
      "Perfeito para equipes em crescimento que precisam de estabilidade e suporte.",
      "10 licenças de software",
      "Suporte por chat e e-mail",
      "Backups semanais",
      "Painel de controle"
    ],
    preco: "R$ 54,89/mês | R$ 548,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.3,
    reviews: 18
  },
  {
    id: 3,
    title: "Plano Profissional",
    developer: "Consultoria CJL",
    description: [
      "Para empresas que precisam de escalabilidade e segurança avançada.",
      "20 licenças de software",
      "Suporte remoto 24/7",
      "Monitoramento de rede",
      "Antivírus corporativo"
    ],
    preco: "R$ 109,89/mês | R$ 1.098,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.5,
    reviews: 22
  },
  {
    id: 4,
    title: "Plano Corporativo",
    developer: "Consultoria CJL",
    description: [
      "Solução completa para médias empresas com estrutura tecnológica robusta.",
      "30 licenças de software",
      "Suporte dedicado",
      "Controle de acesso por usuário",
      "Integrações com ERP"
    ],
    preco: "R$ 164,89/mês | R$ 1.648,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.6,
    reviews: 20
  },
  {
    id: 5,
    title: "Plano Empresarial",
    developer: "Consultoria CJL",
    description: [
      "Consultoria e infraestrutura de TI sob demanda para grandes empresas.",
      "50 licenças de software",
      "Gestão de TI completa",
      "Treinamentos mensais",
      "Automação de processos"
    ],
    preco: "R$ 274,89/mês | R$ 2.748,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.7,
    reviews: 25
  },
  {
    id: 6,
    title: "Plano Avançado",
    developer: "Consultoria CJL",
    description: [
      "Recursos avançados para equipes técnicas que precisam de flexibilidade.",
      "75 licenças de software",
      "APIs dedicadas",
      "Ambiente de testes",
      "Logs em tempo real"
    ],
    preco: "R$ 384,89/mês | R$ 3.848,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.6,
    reviews: 17
  },
  {
    id: 7,
    title: "Plano Premium",
    developer: "Consultoria CJL",
    description: [
      "Experiência completa de TI com suporte exclusivo e SLA garantido.",
      "100 licenças de software",
      "Suporte SLA 1h",
      "Ambiente em nuvem privado",
      "Acesso via VPN"
    ],
    preco: "R$ 549,89/mês | R$ 5.498,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.8,
    reviews: 30
  },
  {
    id: 8,
    title: "Plano Ultra",
    developer: "Consultoria CJL",
    description: [
      "Para empresas que exigem alta disponibilidade e segurança.",
      "150 licenças de software",
      "Alta redundância",
      "Auditorias de segurança trimestrais",
      "Disaster Recovery"
    ],
    preco: "R$ 769,89/mês | R$ 7.698,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.7,
    reviews: 28
  },
  {
    id: 9,
    title: "Plano Mega",
    developer: "Consultoria CJL",
    description: [
      "Infraestrutura e consultoria contínua para operações críticas.",
      "200 licenças de software",
      "Equipe dedicada de TI",
      "Consultoria mensal personalizada",
      "Relatórios de performance"
    ],
    preco: "R$ 989,89/mês | R$ 9.898,90/ano",
    buttonText: "CONTRATAR",
    rating: 4.9,
    reviews: 35
  }
])





const testar = (card: any) => {
  alert(`Você escolheu testar: ${card.title}`)
}
// estado da paginação
const paginaAtualCard = ref(1)
const cardsPorPagina = 3

// total de páginas
const totalPaginas = computed(() => 
  Math.ceil(cards.value.length / cardsPorPagina)
)

// fatia os cards para mostrar só os da página atual
const cardsPaginados = computed(() => {
  const start = (paginaAtualCard.value - 1) * cardsPorPagina
  return cards.value.slice(start, start + cardsPorPagina)
})

// trocar página
function mudarPaginaCard(n: number) {
  paginaAtualCard.value = n
}
const loading = ref(true)
const showLoader = ref(true)

onMounted(() => {
  // Spinner aparece imediatamente
  showLoader.value = true

  // Aguarda 10 segundos antes de começar a abrir a tela preta
  setTimeout(() => {
    showLoader.value = false // esconde spinner

    const topHalf = document.querySelector('.top-half')
    const bottomHalf = document.querySelector('.bottom-half')

    if (topHalf && bottomHalf) {
      topHalf.classList.add('slide-up')
      bottomHalf.classList.add('slide-down')
    }

    // Remove overlay depois da animação (mesma duração da animação)
    setTimeout(() => {
      loading.value = false
    }, 50000) // duração da animação das metades
  }, 10000) // espera 10s antes de abrir
})
const cookieAceito = ref(false)

onMounted(() => {
  cookieAceito.value = localStorage.getItem('cookieAceito') === 'true'
})

function aceitarCookie() {
  localStorage.setItem('cookieAceito', 'true')
  cookieAceito.value = true
}

// Novo método para rejeitar cookies
function rejeitarCookie() {
  localStorage.setItem('cookieAceito', 'true') // fecha o banner
  cookieAceito.value = true
  // aqui você pode limpar cookies indesejados se houver
}
</script>


<template lang="pug">
.loading-overlay(v-if="loading")
  .top-half
  .bottom-half
  .loader-container(v-if="showLoader")
   
section.banner-container
  img.banner-image(:src="contaImg" alt="Banner Conta")
  section.banner-with-text
    .shape-left
      h1.title
        | Soluções Inteligentes 
        br
        | Tecnologia e Consultoria
      p.description
        | O GPL executa todos os processos de uma singular (Unimed) para a gestão do plano de saúde, otimizando as atividades de cadastramento, cálculo de comissões, auditoria de contas, faturamento, pagamento, atendimento das obrigações da ANS e Unimed Brasil.
      a.arrow(href="#sessao") ↓

.cookie-banner-wrapper(v-if="!cookieAceito")
    p Clicando em "Aceito todos os Cookies", você concorda com o armazenamento de cookies no seu dispositivo para melhorar a experiência e navegação no site.
    .botoes-cookie
      button(@click="aceitarCookie") Aceitar Todos
      button(@click="rejeitarCookie") Rejeitar Todos
section.sessao-cjl(id="sessao")
  .card-cjl
    h2.titulo-cinza Consultoria Estratégica de TI
    p.description
      | A Consultoria Estratégica de TI é fundamental para alinhar a tecnologia aos objetivos de negócio, transformando investimentos em inovação, eficiência e competitividade. Nosso trabalho vai além da simples implementação de soluções; ajudamos sua empresa a definir prioridades.
    a.btn-contato(
      href="https://wa.me/551151997454?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
      target="_blank"
      rel="noopener noreferrer"
      ) CONTATE-NOS

  .imagem-cjl
    img(:src="ImagemEquipe" alt="Equipe de TI")

section.depoimento-bloco(id="depoimento")
  .depoimento-container
    .titulo-depoimento
      h2 O que dizem 
        br
        | nossos clientes?

    // Container do card + bolinhas fora
    .depoimento-card-area
      .card-depoimento
        .depoimento-card(v-for="(item, index) in depoimentos" :key="index" v-show="index === depoimentoAtual")
          p.depoimento-texto {{ depoimentos[depoimentoAtual].texto }}
          p.depoimento-nome {{ depoimentos[depoimentoAtual].nome }}
          p.depoimento-cargo {{ depoimentos[depoimentoAtual].cargo }}
      
      // Bolinhas fora do card
      .depoimento-bolinhas
        span.bolinha(
          v-for="(item, index) in depoimentos"
          :key="index"
          :class="{ ativa: index === depoimentoAtual }"
          @click="depoimentoAtual = index"
        )
section.rbm-fundo-total
  .rbm-centro-conteudo
    h2.rbm-titulo-central Sistema para Testes
    p.rbm-descricao-cinza Um ambiente seguro e controlado para validar softwares antes da entrega final. Permite simular cenários reais e identificar falhas com antecedência. Aumenta a qualidade, reduz retrabalho e melhora o desempenho do sistema. Ideal para testes funcionais, de segurança, integração e automação. Essencial para garantir soluções confiáveis, estáveis e alinhadas ao negócio.

section.sessao-consultoria
  .imagem-lado
    img(:src="contaImg" alt="Consultoria de TI")
  .texto-lado
    h2.titulo-consultoria Garantindo Qualidade e Confiabilidade através de Testes Rigorosos
    p.descricao-consultoria
      | Garantir a qualidade de um sistema vai muito além de desenvolver funcionalidades: é preciso validá-las de forma estratégica. Com testes rigorosos, identificamos falhas antes que elas afetem o ambiente produtivo, evitando prejuízos e retrabalhos. Simulamos diferentes cenários de uso, avaliando desempenho, segurança, integração e estabilidade. Nossa abordagem inclui testes funcionais, automatizados, de carga e segurança, todos adaptados às necessidades do projeto. Ao integrar esses testes ao ciclo de desenvolvimento, promovemos entregas mais ágeis, confiáveis e alinhadas com os objetivos do cliente. O resultado são soluções sólidas, prontas para operar com excelência desde o primeiro dia.
    a.btn-contato(
      href="https://wa.me/551151997454?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
      target="_blank"
      rel="noopener noreferrer"
      ) CONTATE-NOS

section.cards-container
  h1.cards-title O QUE A CJL FAZ POR VOCÊ
  h3.cards-subtitle Soluções em tecnologia e consultoria que geram resultados reais.

  .cards-list
    .card1(v-for="card in cardsPaginados" :key="card.id")

      .card-left
        img.card-image(:src="LogoNexdom" alt="Logo sistema")
        .card-content
          h2.card-title {{ card.title }}
          p.card-subtitle Desenvolvido por {{ card.developer }}
          ul.card-description
            li(v-for="(item, index) in card.description" :key="index") {{ item }}
          p.card-preco
            s {{ card.preco }}               
            br
            span.bold-discount {{ precoComDesconto(card.preco, 10) }}

      .card-right
        .card-rating
          i.icon-star ⭐
          span.rating {{ card.rating }}
        p.card-reviews {{ card.reviews }} avaliações
        button.software-card-button Contratar
  
  
  .paginacao
    button(
      v-for="n in totalPaginas",
      :key="n",
      @click="mudarPaginaCard(n)",
      :class="{ ativo: paginaAtualCard === n }"
    ) {{ n }}


  </template>

<style scoped>
.cookie-banner-wrapper p {
  color: #000;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  max-width: 450px; /* largura máxima do texto */
  word-wrap: break-word; /* força a quebra de linha se ultrapassar */
  
}

.cookie-banner-wrapper {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(50px); /* começa 50px abaixo */
  width: 60%;
  max-width: 1200px;
  background-color: white;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;

  opacity: 0; /* começa invisível */
  animation: mostrarCookie 10s forwards; /* animação de 3s e mantém estado final */
}

@keyframes mostrarCookie {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(50px); /* começa abaixo */
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0); /* final na posição correta */
  }
}


.botoes-cookie {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.botoes-cookie button {
  padding: 0.5rem 0.8rem !important; /* menos padding horizontal */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;   /* texto menor */
  min-width: 120px !important; /* largura mínima menor */
  white-space: nowrap;  /* impede quebra de texto */
  text-align: center;
}




.botoes-cookie button:first-child {
  background-color: #ff8c00; /* Aceitar */
  color: white;
}

.botoes-cookie button:last-child {
  background-color: #555; /* Rejeitar todos */
  color: white;
}

.botoes-cookie button:first-child {
  background-color: #ff8c00; /* Aceitar */
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.botoes-cookie button:first-child:hover {
  background-color: #ff6600; /* tom mais escuro no hover */
  transform: scale(1.05);   /* leve aumento ao passar o mouse */
}

.botoes-cookie button:last-child {
  background-color: #555; /* Rejeitar todos */
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.botoes-cookie button:last-child:hover {
  background-color: #333; /* tom mais escuro no hover */
  transform: scale(1.05); /* leve aumento ao passar o mouse */
}

@media (max-width: 480px) {
  .cookie-banner-wrapper {
    width: 90% !important;            /* ocupa mais da tela */
    padding: 0.8rem 1rem;  /* reduz padding */
    font-size: 0.85rem;    /* fonte menor */
    flex-direction: column; /* coloca texto e botões em coluna */
    align-items: center;
    text-align: center;
  }

  .cookie-banner-wrapper p {
    max-width: 100%;       /* não ultrapassa a largura do wrapper */
    margin-bottom: 0.5rem;
  }

  .botoes-cookie {
    flex-direction: column; /* botões empilhados */
    gap: 8px;
  }

  .botoes-cookie button {
    width: 100%;           /* cada botão ocupa toda a largura */
  }
}

/* Tablets */
@media (min-width: 481px) and (max-width: 768px) {
  .cookie-banner-wrapper {
    width: 80%;            /* ocupa menos que no celular pequeno */
    padding: 1rem 1.2rem;
    font-size: 0.9rem;
    flex-direction: column; 
    align-items: center;
    text-align: center;
  }

  .cookie-banner-wrapper p {
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  .botoes-cookie {
    flex-direction: row;   /* botões lado a lado */
    justify-content: center;
    gap: 10px;
  }

  .botoes-cookie button {
    width: auto;           /* largura natural do botão */
    min-width: 120px;      /* largura mínima para não ficar muito pequeno */
  }
}
@media (min-width: 481px) and (max-width: 768px) {
  .cookie-banner-wrapper {
    width: 80%;            /* ocupa menos que no celular pequeno */
    padding: 1rem 1.2rem;
    font-size: 0.9rem;
    flex-direction: column; 
    align-items: center;
    text-align: center;
  }

  .cookie-banner-wrapper p {
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  .botoes-cookie {
    flex-direction: row;   /* botões lado a lado */
    justify-content: center;
    gap: 10px;
  }

  .botoes-cookie button {
    width: auto;           /* largura natural do botão */
    min-width: 120px;      /* largura mínima para não ficar muito pequeno */
  }
}


@media (min-width: 481px) and (max-width: 768px) {
  .cookie-banner-wrapper {
    width: 80%;            /* ocupa menos que no celular pequeno */
    padding: 1rem 1.2rem;
    font-size: 0.9rem;
    flex-direction: column; 
    align-items: center;
    text-align: center;
  }

  .cookie-banner-wrapper p {
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  .botoes-cookie {
    flex-direction: row;   /* botões lado a lado */
    justify-content: center;
    gap: 10px;
  }

  .botoes-cookie button {
    width: auto;           /* largura natural do botão */
    min-width: 120px;      /* largura mínima para não ficar muito pequeno */
  }
}


.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  pointer-events: none;
}

.top-half,
.bottom-half {
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: #000;
  transform: translateY(0);
  z-index: 99998;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-duration: 5s; /* duração da abertura */
}

.top-half.slide-up {
  animation-name: slideUp;
  top: 0;
}

.bottom-half.slide-down {
  animation-name: slideDown;
  bottom: 0;
}

@keyframes slideUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}

@keyframes slideDown {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}

/* Loader */
.loader-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #fff;
  border-top: 5px solid #ff8c00;
  border-radius: 50%;

}




.loading-overlay .top-half,
.loading-overlay .bottom-half {
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: #000;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

/* animação da metade de cima subindo */
.loading-overlay .top-half {
  top: 0;
  animation-name: slideUp;
}

/* animação da metade de baixo descendo */
.loading-overlay .bottom-half {
  bottom: 0;
  animation-name: slideDown;
}

@keyframes slideUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}

@keyframes slideDown {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
/* Centraliza o botão em tablets e mobile */


@media (max-width: 992px) {
  button.software-card-button {
            /* necessário para usar transform */
                   /* posiciona o ponto inicial no meio */
    transform: translateX(-50%); /* centraliza o botão horizontalmente */
  }
}

@media (max-width: 992px) {
  section.cards-container h1.cards-title {
    font-size: 1.5rem; /* menor para dispositivos móveis */
  }
}
@media (max-width: 992px) {
  section.sessao-consultoria .texto-lado h2.titulo-consultoria {
    margin-bottom: 1.4rem; /* adiciona espaço abaixo do título */
  }

  section.sessao-consultoria .texto-lado p.descricao-consultoria {
    margin-top: 0; /* garante que não haja margem extra além do margin-bottom do título */
  }
}

@media (max-width: 992px) {
  section.sessao-consultoria .texto-lado {
    margin-left: 0rem;     /* aproxima o conteúdo da borda esquerda */
    padding-left: 0;         /* remove padding extra se houver */
  }

  section.sessao-consultoria .texto-lado h2.titulo-consultoria {
    max-width: 95%;           /* limita a largura para que não quebre rápido */
    white-space: normal;      /* permite quebrar, mas só quando necessário */
    font-size: 1.5rem;        /* ajuste da fonte para telas menores */
    line-height: 1.3;         /* deixa o título visualmente equilibrado */
  }

  section.sessao-consultoria .texto-lado p.descricao-consultoria {
    margin-left: 0;           /* aproxima o texto da borda esquerda */
    max-width: 95%;           /* limita a largura para manter boas quebras */
    line-height: 1.6;         /* mantém boa legibilidade */
  }
}

@media (max-width: 992px) {
  section.depoimento-bloco .titulo-depoimento h2 {
    white-space: nowrap;       /* força ficar em uma linha */
    font-size: 1.6rem;         /* reduz o tamanho da fonte para caber */
    overflow: visible;         /* garante que o texto não seja cortado */
  }
}


/* Ajuste para telas menores que 992px */
@media (max-width: 992px) {
  section.sessao-cjl .card-cjl .description {
    margin-left: 0 !important; /* remove a margem esquerda */
    padding-left: 0.5rem;      /* opcional: um pequeno recuo */
  }
}

/* Para telas 800px até 884px de largura (aproximando os tablets que você mencionou) */
/* Apenas para tablets aproximados */
@media (min-width: 800px) and (max-width: 884px) {
  .card1 {
    position: relative; /* torna o card um container para o botão */
  }

  button.software-card-button {
    position: absolute;       /* tira o botão do fluxo normal */
    top: 50%;                 /* ponto de referência vertical */
    left: 50%;                /* centraliza horizontalmente */
    transform: translate(-50%, 13rem); /* move 10rem para baixo */
    width: 60%;               /* mantém proporcional */
    max-width: 200px;
    min-width: 120px;
  }
}



/* Para tablets: 768px até 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  button.software-card-button {
    position: relative; /* permite mover o botão */
    top: -3rem;         /* ajusta a altura para subir o botão */
    width: 60%;         /* mantém proporcional */
    max-width: 200px;
    min-width: 120px;
  }
}

@media (max-width: 768px) {
  .card-right .card-rating,
  .card-right p.card-reviews {
    display: none; /* esconde apenas avaliação e estrelas */
  }
}

@media (max-width: 768px) {
  p.card-preco {
    font-size: 0.9rem; /* ajuste o valor conforme desejar */
  }
}

/* Apenas para telas com largura até 768px (mobile) */
@media (max-width: 768px) {
  .card-preco {
    font-size: 0.10rem; /* diminui o tamanho da fonte do preço original */
  }
  .card-preco .bold-discount {
    font-size: 0.90rem; /* diminui também o preço com desconto */
  }
}

/* Oculta avaliações, reviews e botão em celulares */


/* --- Celulares --- */
@media (max-width: 767px) {
  .cards-list {
    flex-direction: column;
    gap: 1rem;
  }


  .card-left {
    flex: 0 0 80px; /* largura fixa da imagem */
    margin-right: 1rem;
  }

  .card-left img.card-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }

  .card-content {
    flex: 1;
  }


  .software-card-button {
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
    
  }

  .card-preco span.bold-discount {
    font-weight: bold;
  }
}

/* --- Tablets --- */
@media (min-width: 768px) and (max-width: 1024px) {
  .cards-list {
    flex-wrap: wrap;
    justify-content: space-between;
  }



  .card-left img.card-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
}

.bold-discount {
  font-weight: bold;
}

.card-preco {
  font-weight: bold;
  font-size: 16px;
  color: #000000; /* pode usar a cor da marca ou do destaque */
  margin-top: 2rem; /* separa do conteúdo acima */
}

.card-description {
  list-style-type: disc;   /* mantém as bolinhas */
  padding-left: 20px;      /* espaço para as bolinhas */
  margin: 10px 0;          /* margem acima/abaixo da lista */
  color: #555;
  font-size: 14px;
}

.card-description li {
  text-indent: -20px;       /* move só o texto para a esquerda, bolinha permanece */
}

/* Aumentar levemente o botão do lado direito em tablets e celulares */



/* BOTÕES MENOR EM TABLET */
@media (max-width: 1024px) {
  .software-card-button {
    width: 60%;           /* ocupa 60% da largura do card */
    max-width: 200px;     /* nunca maior que 200px */
    min-width: 120px;     /* nunca menor que 120px */
    margin: 0 auto;       /* centraliza horizontalmente */
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    display: block;
    text-align: center;
    margin-bottom: -5rem;
  }
}

/* BOTÕES MENOR EM CELULAR */
@media (max-width: 768px) {
  .software-card-button {
    width: 80%;           /* ocupa 80% da largura do card */
    max-width: 180px;
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}

/* BOTÕES EM TELAS MUITO PEQUENAS */
@media (max-width: 480px) {
  .software-card-button {
    width: 90%;           /* quase toda a largura do card */
    max-width: 160px;
    font-size: 0.8rem;
    padding: 0.35rem 0.7rem;
  }
}

/* BOTÃO DO TAMANHO DO TEXTO */
@media (max-width: 1024px) {
  .software-card-button {
    width: auto;             /* largura automática conforme o conteúdo */
    display: inline-block;   /* mantém o botão inline e não quebra linha */
    padding: 0.4rem 0.8rem;  /* ajuste de padding */
    font-size: 0.9rem;       /* tamanho da fonte */
    white-space: nowrap;     /* impede quebra de linha dentro do botão */
  }
}

/* Ajuste para celulares menores */
@media (max-width: 480px) {
  .software-card-button {
    padding: 0.35rem 0.7rem;
    font-size: 0.85rem;
  }
}

/* ---------------- TABLET E CELULAR ---------------- */
@media (max-width: 1024px) {
  /* Empilha card-left e card-right */
  .card1 {
    flex: 1 1 100%;           /* 1 card por linha */
    display: flex;
    flex-direction: column;    /* empilha esquerda e direita */
    gap: 4rem;
    min-height: 800px; 
  }




}

/* Para telas menores (celular) */
@media (max-width: 480px) {
  .software-card-button {
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
}

/* CELULAR E TABLET */
@media (max-width: 1024px) {

  .software-card-button {
    width: 100%;            /* botão ocupa toda a largura do card */
    box-sizing: border-box;
    text-align: center;     /* centraliza o texto */
  }
}

/* Botão responsivo para tablets e celulares */
@media (max-width: 1024px) {
  .software-card-button {
    width: 100%;        /* ocupa toda a largura do card */
    box-sizing: border-box; /* inclui padding na largura */
  }
}

@media (max-width: 768px) {
  .software-card-button {
    width: 100%;
    padding: 0.5rem 1rem; /* ajusta o padding para celular */
    font-size: 0.9rem;    /* deixa o texto proporcional */
  }
}

@media (max-width: 480px) {
  .software-card-button {
    font-size: 0.85rem;
  }
}

/* ---------------- CELULAR ---------------- */
@media (max-width: 767px) {
  .card1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* garante que o conteúdo fique no topo */
    height: auto; /* permite que cresça conforme o conteúdo */
    min-height: 400px; /* altura mínima do card */
    padding: 1.5rem 1rem; /* aumenta o espaçamento interno, opcional */
    box-sizing: border-box;
  }


  .cards-list {
    gap: 1rem; /* menos espaçamento entre cards */
  }

@media (max-width: 767px) {
  .card-right {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    text-align: center !important;
    position: relative; /* garante que top funcione sem afetar outros elementos */
    top: -3rem; /* aumenta o deslocamento para cima */
  }

}

}

/* Ajustes extras para mobile */
@media (max-width: 480px) {
  .cards-title {
    font-size: 1.5rem;
  }

  .cards-subtitle {
    font-size: 1rem;
  }

  .software-card-button {
    width: 100%;
  }
}
/* Celulares pequenos */


/* Notebooks pequenos */


.paginacao {
  display: flex;
  justify-content: center; /* centraliza horizontalmente */
  gap: 4px;                /* pequeno espaço entre os botões */
  margin-top: 2rem;
  padding: 0;
}

.paginacao button {
  background-color: #aaaaaa;
  border: none;
  padding: 0.4rem 0.6rem;  /* aumenta altura e largura */
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;      /* cantos levemente arredondados */
  margin: 0;
  min-width: 35px;         /* largura mínima maior */
  text-align: center;
}

.paginacao button.ativo {
  background-color: #242424;
  color: #ffffff;
}
.paginacao button:hover {
  background-color: rgb(39, 39, 39); /* muda para vermelho ao passar o mouse */
  color: #fff;           /* mantém o texto branco */
}


.card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* alinha todo conteúdo à direita */
}


.software-card-button {
  position: absolute;
  bottom: 2rem;
  right: 1rem;
}

.software-card-button {
  margin-left: auto; /* empurra o botão para a direita */
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #0da100;
  background: white;
  color: #0da100;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
  text-align: center;
}

.software-card-button:hover {
  background: #0da100;
  color: white;
}

.software-card-checkbox {
  margin-top: 1rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #5f6368;
}

button.software-card-button.disabled,
label.software-card-checkbox.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none; /* impede interação */
}

.software-card-checkbox {
  margin-top: 1rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #5f6368;
}
.cards-container {
  width: 100%;
  max-width: 900px;
  margin: 20px auto;
  padding: 10px;
  text-align: center;
}

.cards-title {
  font-size: 29px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #000000;
  position: relative;
  display: inline-block; /* garante que o sublinhado ocupe só o texto */
}

.cards-title::after {
  content: "";
  display: block;
  width: 40%;         /* 30% da largura do texto */
  height: 3px;        /* espessura da linha */
  background: #bb6400; /* cor da linha */
  margin-top: -4px;    /* espaço entre texto e linha */
  margin-left: -0.7rem;
  margin-bottom: 1rem;
}

.cards-subtitle {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card1 {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-left: 4px solid #bb6400;
  border-radius: 12px;
  height: 390px; /* define altura fixa */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  position: relative;
  margin-top: 10px;
  min-height: 100px; /* diminui a altura mínima */
  padding: 1rem;     /* reduz o padding para compactar mais */
}

.card:hover {
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.card-left {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.card-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 0.5rem;
  border-radius: 15px;
}

.card-content {
  text-align: left;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.card-subtitle {
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
  margin-top: -30px; /* sobe o elemento */
}


.card-description {
  font-size: 14px;
  margin-bottom: 8px;
}

.card-compare {
  font-size: 13px;
  color: #555;
}



.card-rating {
  display: flex;
  flex-direction: column; /* empilha estrela e número verticalmente */
  align-items: center;    /* centraliza horizontalmente */
  font-weight: bold;
  color: #d35400;
  margin-top: -18rem;    /* mantém seu ajuste pra subir */
}

.icon-star {
  font-size: 13px;
}

.card-reviews {
  font-size: 13px;
  color: #d35400;
  margin-bottom: 10px;
}

.card-button {
  border: 1px solid #3498db;
  background: none;
  padding: 6px 12px;
  border-radius: 6px;
  color: #3498db;
  cursor: pointer;
  transition: 0.3s;
}

.card-button:hover {
  background: #3498db;
  color: #fff;
}









@media (min-width: 768px) and (max-width: 1024px) {
  /* Wrapper: define a largura visível e esconde overflow */
  .consultoria .cards-wrapper {
    overflow: hidden;   /* esconde o restante dos cards */
    width: 70%;         /* diminui o container visível */
    max-width: 700px;   /* limite máximo opcional */
    margin: 0 auto;     /* centraliza */
  }

  /* Contêiner de cards: horizontal para slider */
  .consultoria .cards {
    display: flex !important;
    flex-direction: row !important;
    gap: 1rem;          /* espaço entre cards */
  }

  /* Cada card ocupa menos que o container: um por vez */
  .consultoria .card {
    flex: 0 0 100%;      /* ocupa toda a largura do wrapper visível */
    max-width: 600px;    /* largura máxima do card */
    box-sizing: border-box;
    margin: 0 auto;      /* centraliza o card */
  }

  /* Ajuste de fontes */
  .consultoria .card h3 {
    font-size: 1.6rem;
  }

  .consultoria .card p,
  .consultoria .card ul,
  .consultoria .card span.preco,
  .consultoria .card button {
    font-size: 1rem;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* Sessão Consultoria: empilha texto acima da imagem */
  .sessao-consultoria {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 2rem !important;
  }

  .texto-lado {
    order: -1 !important; /* texto acima da imagem */
    width: 100% !important;
    flex: 0 0 100% !important;
    padding: 0 1rem !important;
    text-align: center !important;
  }

  .titulo-consultoria {
    font-size: 1.8rem !important;
  }

  .descricao-consultoria {
    font-size: 1rem !important;
    line-height: 1.5 !important;
    text-align: justify !important;
  }

  .imagem-lado {
    width: 100% !important;
    flex: 0 0 100% !important;
    margin-top: 5rem !important; /* <-- aumenta esse valor para empurrar a imagem mais para baixo */
  }

  .imagem-lado img {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
  }

  /* Botão: garantir que apareça e centralize */
  .texto-lado a.btn-contato {
    display: inline-block !important;
    margin: 1rem auto 0 auto !important;
    text-align: center !important;
  }
}

/* Opcional: ajustar fontes e espaçamento do texto */
@media (max-width: 1180px) and (min-width: 820px) {
  .texto-lado h2 {
    font-size: 1.8rem; /* ajusta título */
  }

  .texto-lado p {
    font-size: 1rem;   /* ajusta parágrafo */
    line-height: 1.5;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  .imagem-cjl img {
    position: relative;
    left: 3rem;   /* ajusta para mover mais para a direita */
    max-width: 500px;
    height: auto;
    display: block;
  }
}

@media (min-width: 767px) and (max-width: 769px) {
  .bloco-recursos-tec .estrutura-recursos-tec {
    position: relative;
    top: -15rem; /* ajusta o valor conforme necessário para subir o conteúdo */
  }
}

/* Tentativa de afetar apenas o tablet aproximado 768px de largura */
@media (min-width: 767px) and (max-width: 769px) {
  .bloco-sys .area-texto-sys {
    position: relative;
    top: -15rem; /* sobe o texto apenas nesse intervalo estreito */
  }
}

/* Aplica apenas em telas entre 768px e 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .bloco-sys .area-texto-sys {
    position: relative; /* permite deslocamento */
  
  }

  .bloco-sys .titulo-destaque-ti {
    font-size: 2rem;    /* ajusta tamanho do título */
  }

  .bloco-sys .descricao-detalhe-ti {
    font-size: 1rem;    /* ajusta tamanho do texto */
  }
}

/* Esconder imagens da seção bloco-sys em tablets */
@media (min-width: 768px) and (max-width: 1024px) {
  .bloco-sys .figura-esq-ti,
  .bloco-sys .figura-dir-ti {
    display: none !important;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* Centraliza todas as imagens da área de imagens no tablet */
  :deep(.area-imagens-sys) {
    display: flex !important;
    justify-content: center !important; /* centraliza horizontalmente */
    align-items: center !important;
    flex-direction: column !important;  /* empilha se houver mais de uma imagem */
  }

  /* Opcional: limita o tamanho das imagens */
  :deep(.area-imagens-sys img) {
    max-width: 80% !important;
    height: auto !important;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* Banner: ajuste da imagem e shape-left */
  :deep(.banner-container) {
    align-items: flex-start;
  }

  :deep(.banner-image) {
    height: 560px !important; /* altura intermediária */
    width: 100% !important;   /* ocupa todo o container */
    object-fit: cover;
    flex-shrink: 0;
  }

  :deep(.shape-left) {
    width: 70% !important;       /* largura menor */
    max-width: 500px !important;
    padding: 2rem 1.5rem !important;
  }

  /* Sessão consultoria: texto em cima, imagem embaixo */
  :deep(.sessao-consultoria) {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 1.5rem !important;
  }

  :deep(.texto-lado) {
    order: -1 !important;   /* texto acima da imagem */
    max-width: 700px !important;
    width: 100% !important;
  }

  :deep(.imagem-lado img) {
    order: 1 !important;    /* imagem abaixo */
    width: 100% !important;
    max-width: 600px !important;
    height: auto !important;
    object-fit: cover !important;
  }

  /* Bloco SYS: esconde imagens */
 
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* para evitar scroll horizontal */
}
* {
  font-family: Arial, sans-serif !important;
}

.btn-centralizado {
display: block;              
  margin: 0 auto;              
  padding: 10px 20px;          /* diminuiu um pouco o padding horizontal */
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;              
  background-color: #15b600;
  border: 0.5px solid #1e5200; /* borda mais fina */
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: left;
  text-decoration: none;       
  font-family: inherit;
  width: fit-content;          /* botão com largura mínima para o conteúdo */
  min-width: 120px;
  margin-top: 20px;
}
.btn-centralizado:hover {
  background-color: #34ff45;
}
button {
display: block;              
  margin: 0 auto;              
  padding: 10px 20px;          /* diminuiu um pouco o padding horizontal */
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;              
  background-color: #15b600;
  border: 0.5px solid #1e5200; /* borda mais fina */
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: left;
  text-decoration: none;       
  font-family: inherit;
  width: fit-content;          /* botão com largura mínima para o conteúdo */
  min-width: 120px;
  margin-top: 20px;
}
button:hover {
  background-color: #34ff45;
}
.titulo-consultoria {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: left;
  color: #ffffff;
  font-family: 'Times New Roman', Times, serif;
}

.descricao-consultoria {
  text-align: justify;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #b1b1b1;
  font-family: 'Times New Roman', Times, serif;

}
.arrow:hover {
  color: #000000; /* muda a cor no hover */
  transform: translateY(5px); /* anima a seta pra baixo */
  cursor: pointer;
  background-color: aliceblue;
 
}

@media (max-width: 768px) {
  .cards-wrapper {
    width: 360px !important;
    overflow: hidden !important;
    transform: translateX(-50px); /* ajusta o valor negativo conforme quiser */
  }

  .cards {
    display: flex;
    transition: transform 0.4s ease;
  }

  .card {
    flex: 0 0 360px !important;
  }

  .btn-prev,
  .btn-next {
    position: absolute !important;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 32px;
    background: transparent;
    border: none;
    color: rgb(68, 68, 68) !important;
    cursor: pointer;
  }

  .btn-prev {
    left: -80px !important; /* totalmente fora do card */
 
  }

  .btn-next {
    right: -80px !important; /* totalmente fora do card */
  }
}

@media (max-width: 768px) {
  .rbm-centro-conteudo {
    text-align: left !important;
    padding-left: 15px !important;
    padding-right: 15px !important;
    width: 100% !important;
    margin: 0 auto !important;
  }
}
@media (max-width: 768px) {
  .rbm-titulo-central {
    font-size: 25px !important;
    
  }

  .rbm-descricao-cinza {
    font-size: 14px !important;
    margin-top: 15px !important;
  }
}



@media (max-width: 768px) {
  .titulo-depoimento {
    width: 100%;
    display: flex;
    justify-content: left;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .titulo-depoimento h2 {
    text-align: left;
    font-size: 25px;
    max-width: 650px;      /* Espaço para o texto */
    width: 100%;
    line-height: 1.3;
    white-space: normal;
    word-break: keep-all;
    margin: 0 auto;         /* Centraliza o bloco */
    display: block;         /* Garante que o h2 seja um bloco */
  }
}


@media (max-width: 768px) {
  .sessao-consultoria {
    flex-direction: column;
  }

  .imagem-lado,
  .texto-lado {
    flex: 1 1 100%;
    margin-bottom: 40px;
  }

  .titulo-consultoria {
    text-align: center;
  }

  .texto-lado {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin: 0; /* remove margens laterais */
  }

  .texto-lado p,
  .texto-lado h2 {
    text-align: left; /* garante alinhamento natural */
  }
}

@media (max-width: 768px) {
  .depoimento-texto {
    font-size: 15px !important; /* tamanho do texto do depoimento */
  }

  .depoimento-nome {
    font-size: 13px !important; /* tamanho do nome */
  }

  .depoimento-cargo {
    font-size: 13px !important; /* tamanho do cargo */
  }
}
@media (max-width: 768px) {
  .depoimento-nome {
    margin-top: 0;       /* tira a margem superior */
    margin-bottom: 2px;  /* diminui o espaço abaixo para ficar mais “colado” */
    position: relative;
    top: -45px;           /* sobe 5px */
  }

  .depoimento-cargo {
    margin-top: 0;
    position: relative;
    top: -50px;           /* sobe 8px */
  }
}
@media (max-width: 768px) {
  .cards-wrapper {
    width: 360px !important;
    overflow: hidden !important;
    transform: translateX(-74px); /* aumentei o deslocamento */
  }
}

@media (max-width: 768px) {
  .depoimento-card {
    min-height: 500px !important; /* aumenta a altura */
    overflow: auto; /* pra garantir rolagem se necessário */
    height: 900px;
  }
}

@media (max-width: 768px) {
  .depoimento-card-area {
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
@media (max-width: 992px) {
  .depoimento-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
  }


  .depoimento-card-area {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-left: 0px;
    margin-left: 20px;
  }

  .card-depoimento {
    width: 100%;         /* 80% do container pai */
    min-width: 400px;   /* largura mínima para não ficar muito fino */
    max-width: 1000px;   /* limite máximo para telas maiores */
    display: flex;
    justify-content: center;
    
  }

  .depoimento-card {
    width: 100%;
    
  }

  .depoimento-bolinhas {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 12px;
    width: 100%;
    height: 50px;
  }
}

@media (max-width: 992px) {
  .banner-with-text {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 auto !important; /* centraliza */
    
  }

  .shape-left {
    width: 110% !important;
    padding: 1rem 2rem !important;
  }

  .shape-left h1.title {
    font-size: 2rem !important;
    line-height: 2.5rem !important;
    text-align: center;
  }

  .shape-left p.description {
    font-size: 1rem !important;
    line-height: 1.6rem !important;
    text-align: center;
    margin-top: 1rem;
  }

  .arrow {
    text-align: center;
    display: block;
    margin-top: 1.8rem;
    font-size: 1.5rem;
  }
}
@media (max-width: 992px) {
  .shape-left h1.title {
    font-size: 1.6rem !important;
    margin-top: 120px !important;
    text-align: left;
    margin-left: 0.5rem;
    max-width: 90%;           /* limita o tamanho horizontal do título */
    word-wrap: break-word;    /* permite quebra de linha se necessário */
    overflow-wrap: break-word;
  }

  .shape-left p.description {
    font-size: 0.80rem !important;
    line-height: 1.6rem !important;
    text-align: left;
    margin-left: 0.5rem;
    max-width: 90%;           /* limita o tamanho horizontal da descrição */
    word-wrap: break-word;    
    overflow-wrap: break-word;
  }


  .arrow {
    margin-top: 1.5rem;
    text-align: center;
  }
}
@media (max-width: 400px) {
  .shape-left h1.title {
    font-size: 1.4rem !important;
    line-height: 1.8rem !important;
    margin-top: 110px !important; /* empurra pra baixo */
    text-align: left;
  }

   .shape-left p.description {
    font-size: 0.80rem !important;
    line-height: 1.2rem !important;
    text-align: left;
    padding-left: -2rem !important;  /* empurra mais para a esquerda */
    padding-right: 1rem !important; /* mantém um pouco de espaço à direita */
  }
}
@media (max-width: 992px) {
  .arrow {
    display: none !important;
  }
}
@media (max-width: 600px) {
  .arrow {
    display: none !important;
  }
}

@media (max-width: 400px) {
  .arrow {
    display: none !important;
  }
}
@media (max-width: 992px) {
  .sessao-cjl {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }


@media (max-width: 992px) {
  .card-cjl {
    display: block !important;
    width: 100% !important;
    max-width: 600px !important;
    margin-left: 100px !important;
    margin-right: 0 !important;
    text-align: left !important;
    box-sizing: border-box !important;
  }
}

  .imagem-cjl {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin: 1rem auto 0 auto;
    box-sizing: border-box;
  }

  .imagem-cjl img {
    width: 100%;
    height: auto;
    max-width: 700px;
    display: block;
    margin-left: 10rem;
  }

  .btn-contato {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.7rem 1.5rem;
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .card-cjl h2 {
    font-size: 1.5rem;
    text-align: center;
  }

  .card-cjl p.description {
    font-size: 1rem;
    text-align: center;
  }

  .btn-contato {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }

  .imagem-cjl img {
    max-width: 90%;
    margin-top: 1rem;
  }
}

.titulo-depoimento h2 {
  font-weight: bold;
}
.rbm-fundo-total {
  background-color: #1e1e1e; /* cinza claro */
  width: 100%;
  padding: 60px 20px;
  margin-bottom: -40px;
  margin-top: -65px;
}

.rbm-centro-conteudo {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.rbm-titulo-central {
  font-size: 2rem;
  font-weight: bold;
  color: hsl(0, 0%, 100%);
  margin-bottom: 1rem;
  font-family: 'Times New Roman', Times, serif;
}

.rbm-descricao-cinza {
  font-size: 1.1rem;
  color: #adadad;
  margin-top: -10px;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 40px;
}
.depoimento-bloco {
  width: 100%;
  background: #ffffff;
  padding: 20px 0;
}

.depoimento-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  gap: 40px;
  min-height: 100px; /* Altura maior e fixa */
}

.titulo-depoimento {
  width: 50%;
  font-size: 2.4rem;
  color: #e0e8ff;
  font-weight: 600;
  line-height: 1.2;
  text-align: justify;
  align-self: flex-start;
  margin: 0;
  padding-left: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.depoimento-card-area {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Times New Roman', Times, serif;
}

.card-depoimento {
  width: 100%;
  height: 400px; /* altura fixa */
  background-color: #202020;
  border-radius: 12px;
  padding: 30px;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden; /* evita que o conteúdo "vaze" */
  font-family: 'Times New Roman', Times, serif;
}

.depoimento-bolinhas {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 5px;
}

.bolinha {
  width: 6px;
  height: 6px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.bolinha.ativa {
  background: #222222;
  transform: scale(1.3);
}

.depoimento-card {
  transition: opacity 0.4s ease;
}


.depoimento-texto {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 100px;

  overflow-y: auto;
  max-height: 220px; /* limite a altura do texto para caber no card */
  font-family: 'Times New Roman', Times, serif;
  margin-top: 20px;
}
.depoimento-nome {
  margin-top: auto; /* empurra para baixo */
  color: #e2db78;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.depoimento-cargo {
  font-size: 0.9rem;
  opacity: 0.9;
  font-family: 'Times New Roman', Times, serif;
}




.sessao-consultoria {
  display: flex;
  align-items: center;
  padding: 2rem 3rem; /* 2rem em cima/baixo e 3rem nas laterais */
  gap: 2rem;
  background-color: #1e1e1e;

}

.texto-lado {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1.5rem; /* margem interna à esquerda para o texto */
   font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
}

.imagem-lado img {
  width: 100%;
  height: 400px; /* ajuste o valor conforme desejar */
  border-radius: 8px;
  object-fit: cover;
  margin-top: -80px;
}

.texto-lado {
  flex: 0 0 50%; /* fixa 50% da largura */
  display: flex;
  flex-direction: column;
  justify-content: center;
   font-family: Arial, Helvetica, sans-serif;
}

.titulo-consultoria {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: left;
  color: #ffffff;
 font-family: Arial, Helvetica, sans-serif;
}

.descricao-consultoria {
  font-size: 1rem;
  color: #adadad;
  margin-top: -10px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 40px;
}

/* Responsivo */
@media (max-width: 768px) {
  .sessao-consultoria {
    flex-direction: column;
  }
  .imagem-lado,
  .texto-lado {
    flex: 1 1 100%;
  }
  .titulo-consultoria {
    text-align: center;
  }
}
.sessao-cjl {
  display: flex;
  align-items: center; /* para alinhar verticalmente */
  justify-content: center;
  flex-wrap: nowrap; /* para os dois ficarem lado a lado */
  width: 100vw;
  max-width: 100%;
  margin: 0;
  padding: 60px 20px;
  background-color: #ffffff;
  box-sizing: border-box;
}

.card-cjl {
  position: relative;
  transform: translateX(-50px); /* desloca o card 80px para a direita */
  max-width: 480px;
  background-color: #131313;
  color: white;
  padding: 70px 40px;
  border-radius: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  z-index: 2;
  font-family: inherit;
  font-weight: 100;
}


.imagem-cjl img {
  width: 500px;
  height: 450px;
  border-radius: 20px;
  object-fit: cover;
  margin-left: -100px; /* espaço entre card e imagem */
}

.card-cjl h2 {
  font-size: 22px;
  margin-bottom: 20px;
  line-height: 1.4;
  font-family: inherit;
  font-weight: 700; /* ou font-weight: bold; */
  font-family: 'Times New Roman', Times, serif;

}

.card-cjl h2 span {
  font-weight: 100;
  color: #d3d3d3;
  font-family: 'Times New Roman', Times, serif;
}

.card-cjl p {
  font-size: 16px;
  margin-bottom: 25px;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 100;
  color: #b9b9b9;
}

.botao-cjl:hover {
  transform: translateY(-3px);
}


/* Responsivo */
@media (max-width: 768px) {
  .sessao-cjl {
    flex-direction: column;
    align-items: center;
  }

  .card-cjl {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 20px;
    text-align: center;
    margin-left: 0;
  }

  .imagem-cjl img {
    width: 100%;
    margin-left: 0;
  }
}

.titulo-cinza {
  color: #d3d3d3;
  font-weight: 100;
  font-family: 'Times New Roman', Times, serif;
  text-align: center;
}
.btn-contato {
  display: block;              
  margin: 0 auto;              
  padding: 10px 20px;          /* diminuiu um pouco o padding horizontal */
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;              
  background-color: transparent;
  border: 0.5px solid #ffffff; /* borda mais fina */
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: center;
  text-decoration: none;       
  font-family: inherit;
  width: fit-content;          /* botão com largura mínima para o conteúdo */
  min-width: 120px;            /* largura mínima opcional para o botão não ficar muito pequeno */
  font-family: 'Times New Roman', Times, serif;
}


.btn-contato:hover {
  background-color: #8f8f8f;
  color: white;
}
.icones-beneficios {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  background-color: #fff;
  gap: 100px;
}

.linha-icones {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap; /* impede quebra de linha */
  align-items: center; /* alinha verticalmente no centro */
  gap: 200px; /* espaçamento horizontal */
  margin-bottom: 2rem;
}

.icone-bloco {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 160px;
}

.icone {
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
}

.texto-icone {
  font-size: 1rem;
  font-weight: 500;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Times New Roman', Times, serif;
}

.planos {
  background-color: #ffffff;
  color: #222;
  padding: 4rem 2rem;
  font-family: 'Times New Roman', Times, serif;
  margin-top: -65px;
  margin-bottom: -60px;
}

section {
  margin-bottom: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #000000;
  font-family: 'Times New Roman', Times, serif;
}

.slider {
  position: relative;
  overflow: visible;
  user-select: none;
  width: 100%;
  padding: 0 3.5rem; /* mais espaço para os botões */
  box-sizing: border-box;
}

.cards-wrapper {
  overflow: hidden;
  width: 100%;
  font-family: 'Times New Roman', Times, serif;
}

.cards {
  display: flex;
  transition: transform 0.4s ease-in-out;
  gap: 1rem; /* espaço entre cards */
}

.card {
  background: #202020;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  transition:
  transform 0.3s ease,
  box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex: 0 0 calc((100% - 2rem) / 3); /* 3 cards por vez com 2 gaps de 1rem */
  box-sizing: border-box;
  font-family: 'Times New Roman', Times, serif;
}

.card:last-child {
  margin-right: 0;
}



.card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 30px;
}

.card p {
  font-size: 1rem;
  color: #cfcfcf;
  margin-bottom: 30px;
  font-family: 'Times New Roman', Times, serif;
}

ul {
  list-style: none;
  padding: 0;
  margin-bottom: 40px;
  text-align: left;
  color: #e6e6e6;
  font-family: 'Times New Roman', Times, serif;
 line-height: 2.1; /* aumenta o espaçamento entre linhas */
}

ul li::before {
  content: '✓ ';
  color: #dbdbdb;
  margin-right: 0.5rem;
  font-family: 'Times New Roman', Times, serif;
}

.preco {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  display: inline-block;
  font-family: 'Times New Roman', Times, serif;
}



button:disabled {
  opacity: 0.3;
  cursor: default;
}

/* Botões */
.btn-prev,
.btn-next {
  background: transparent; /* sem fundo */
  border: none;
  padding: 0; /* sem padding */
  color: #353535; /* seta branca */
  font-size: 4rem; /* seta maior */
  cursor: pointer;
  user-select: none;
  height: 4.5rem; /* altura do botão para área clicável */
  width: 3.5rem;  /* largura suficiente só pra seta */
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  transition: color 0.3s;
}

.btn-prev {
  left: -1rem; /* distância da esquerda */
}

.btn-next {
  right: -1rem; /* distância da direita */
}

.btn-prev:hover,
.btn-next:hover {
  background-color: transparent; /* sem fundo */
  color: #2b2b2b; /* só muda a cor da seta */
}
.btn-prev:disabled,
.btn-next:disabled {
  opacity: 0.3;
  cursor: default;
  color: #aaa;
}







.banner-image {
  width: 100vw;          /* toda largura da viewport */
  height: 70vh;          /* 50% da altura da viewport */
  object-fit: cover;     /* mantém proporção e corta o excesso */
  display: block;        /* remove espaços em linha */
  margin-top: -80px;
}
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* para evitar scroll horizontal */
}



.shape-left {
  background-color: #1d1d1d;
  border-top-right-radius: 60% 50%;
  border-bottom-right-radius: 60% 50%;
  padding: 10rem 4rem 3rem 3rem; /* aumentamos o padding-top pra 6rem */
  width: 50%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  pointer-events: auto;
  margin-left: 0;
  margin-left: -50px;
  margin-top: -20px;
  max-height: 550px;
}



.logo {
  width: 120px;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #ffffff;
  margin-bottom: -10px;
  margin-left: 40px;
  font-family: 'Times New Roman', Times, serif;
}

.description {
  font-size: 1rem;
  color: #a7a7a7;
  line-height: 1.5;
  max-width: 400px;
  margin-bottom: 3rem;
  text-align: left;
  margin-left: 40px;
  font-family: inherit;
  font-family: 'Times New Roman', Times, serif;
}

.arrow {
  position: relative;  /* necessário para usar top */
  top: -50px;          /* sobe 10px */
  
  font-size: 1.0rem;
  color: rgb(255, 245, 158);
  cursor: pointer;
  margin-left: 40px;

  background-color: transparent;  
  border: 1px solid rgb(255, 245, 158);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  padding: 0;
  box-sizing: border-box;
}


.banner-container {
  position: relative;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: -80px;
}


.banner-with-text {
  position: absolute;
  top: 0; /* ajusta pra alinhar */
  left: 0;
  width: 100%;
  height: 100%;
  color: white; /* ou o que quiser para o texto */
  background: rgba(0, 0, 0, 0.5); /* fundo semi-t  ransparente preto para destacar o texto */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.shape-left {
  max-width: 900px; /* ajuste a largura do bloco de texto */
}

/* Ajustes para o título, logo, etc, se precisar */

</style>
