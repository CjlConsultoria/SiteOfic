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
    title: "Essencial",
    developer: "Consultoria CJL",
    description: [
      "Suporte básico e orientação pontual via e-mail ou WhatsApp. ",
      "Até 1 reunião mensal (30 min)",
      "Suporte via e-mail/WhatsApp",
      "Avaliação inicial da infraestrutura",
      "Relatório inicial de recomendações"
    ],
    preco: "R$ 297,00/mês | R$ 2.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.2,
    reviews: 15
  },
  {
    id: 2,
    title: "Diagnóstico",
    developer: "Consultoria CJL",
    description: [
      "Análise técnica completa da empresa, com relatório de melhorias e riscos.",
      "Reunião inicial + entrega de diagnóstico técnico",
      "Avaliação de sistemas, segurança, e processos",
      "Recomendações de melhorias",
      "Priorização de riscos críticos"
    ],
    preco: "R$ 497,00/mês | R$ 4.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.3,
    reviews: 18
  },
  {
    id: 3,
    title: "Orientação Técnica",
    developer: "Consultoria CJL",
    description: [
      "Suporte técnico contínuo com foco em boas práticas, ferramentas e processos.",
      "2 reuniões mensais (até 1h)",
      "Orientação sobre ferramentas e processos",
      "Acesso a materiais técnicos",
      "Checklist de boas práticas"
    ],
    preco: "R$ 697,00/mês | R$ 6.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.5,
    reviews: 22
  },
  {
    id: 4,
    title: "Operacional",
    developer: "Consultoria CJL",
    description: [
      "Acompanhamento próximo de rotinas técnicas e suporte à equipe interna.",
      "Até 4 reuniões mensais",
      "Apoio a decisões operacionais",
      "Treinamentos leves sob demanda",
      "Relatórios operacionais mensais"
    ],
    preco: "R$ 997,00/mês | R$ 9.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.6,
    reviews: 20
  },
  {
    id: 5,
    title: "Otimização de Processos",
    developer: "Consultoria CJL",
    description: [
      "Consultoria focada em automatizar tarefas, melhorar performance e reduzir desperdícios.",
      "Mapeamento de processos",
      "Implementação de ferramentas low-code/no-code",
      "KPI básico",
      "Revisão de fluxos críticos"
    ],
    preco: "R$ 1.297,00/mês | R$ 12.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.7,
    reviews: 25
  },
  {
    id: 6,
    title: "Transformação Digital",
    developer: "Consultoria CJL",
    description: [
      "Planejamento e execução de iniciativas para transformar digitalmente os processos da empresa.",
      "Roadmap de transformação",
      "Treinamento de equipe",
      "Recomendação de soluções e fornecedores",
      "Monitoramento de implementação"
    ],
    preco: "R$ 1.697,00/mês | R$ 16.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.6,
    reviews: 17
  },
  {
    id: 7,
    title: "Estratégico de TI",
    developer: "Consultoria CJL",
    description: [
      "Criação de um plano de TI alinhado aos objetivos do negócio.",
      "Planejamento estratégico de TI",
      "Indicadores (KPIs)",
      "Relatórios executivos mensais",
      "Revisão e ajustes trimestrais"
    ],
    preco: "R$ 2.497,00/mês | R$ 24.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.8,
    reviews: 30
  },
  {
    id: 8,
    title: "CTO as a Service (CTOaaS)",
    developer: "Consultoria CJL",
    description: [
      "Você atua como um CTO externo, liderando tecnicamente a empresa de forma contínua.",
      "Participação em decisões de alto nível",
      "Gestão de equipe técnica (ou terceirizados)",
      "Apresentações estratégicas para diretoria",
      "Planejamento de roadmap tecnológico"
    ],
    preco: "R$ 3.997,00/mês | R$ 39.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.7,
    reviews: 28
  },
  {
    id: 9,
    title: "Full Stack Empresarial",
    developer: "Consultoria CJL",
    description: [
      "Consultoria completa em tecnologia, produto e negócios.",
      "Equipe de especialistas sob demanda",
      "Projetos de software + infraestrutura",
      "Suporte a lançamento de produtos",
      "Acompanhamento contínuo e otimizações"
    ],
    preco: "R$ 6.997,00/mês | R$ 69.970,00/ano",
    buttonText: "CONTRATAR",
    rating: 4.9,
    reviews: 35
  }
]);






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
        | Tecnologia e 
        br
        | Consultoria
      p.description
        | A CJL oferece soluções completas em tecnologia e consultoria para empresas que buscam modernizar processos, automatizar tarefas e alcançar melhores resultados. Atuamos com análise estratégica, desenvolvimento de sistemas personalizados.
      a.arrow(href="#sessao") ↓
.cookie-banner-wrapper(v-if="!cookieAceito")
    p Clicando em "Aceito todos os Cookies", você concorda com o armazenamento de cookies no seu dispositivo para melhorar a experiência e navegação no site.
    .botoes-cookie
      button(@click="aceitarCookie") Aceitar Todos
      button(@click="rejeitarCookie") Rejeitar Todos


section.cards-container
  h1.cards-title O QUE A CJL FAZ POR VOCÊ
  h3.cards-subtitle Soluções em tecnologia e consultoria que geram resultados reais.

  .cards-list
    .card1(v-for="card in cardsPaginados" :key="card.id")

      .card-left
        img.card-image(:src="logoImg" alt="Logo sistema")
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
/* Celulares até 767px */
@media (max-width: 767px) {
  .shape-left {
    padding-left: 40px; /* aumenta recuo da esquerda para aproximar o texto da borda */
    text-align: left;    /* garante alinhamento à esquerda */
  }
}

/* Tablets 768px até 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .shape-left {
    padding-left: 40px; /* ajusta para tablet */
    text-align: left;
  }
}

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
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
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
  color: #d4d4d4; /* pode usar a cor da marca ou do destaque */
  margin-top: 2rem; /* separa do conteúdo acima */
}

.card-description {
  list-style-type: disc;   /* mantém as bolinhas */
  padding-left: 20px;      /* espaço para as bolinhas */
  margin: 10px 0;          /* margem acima/abaixo da lista */
  color: #ffffff;
  font-size: 14px;
  margin-top: 3rem;
}

.card-description li {
  text-indent: 0px;       /* move só o texto para a esquerda, bolinha permanece */
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
  margin-bottom: 5rem;
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
  background: #0da100;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s;
  text-align: center;
}

.software-card-button:hover {
  background: #8eff83;
  color: rgb(0, 0, 0);
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
  border-left: 4px solid #ffa600;
  border-radius: 12px;
  height: 390px; /* define altura fixa */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  background: #202020;
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
  width: 160px;
  height: 160px;
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
  color: white;
  margin-top: 2rem;
}

.card-subtitle {
  font-size: 14px;
  color: #c5c5c5;
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
  color: #fdad00;
  margin-top: -19rem;    /* mantém seu ajuste pra subir */

}

.icon-star {
  font-size: 20px;
  color: #fffb00;
}

.card-reviews {
  font-size: 13px;
  color: #fdad00;
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













html, body {

  overflow-x: hidden; /* para evitar scroll horizontal */
}
* {
  font-family: Arial, sans-serif !important;
}
.btn-contato {
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
  margin-top: -10px;
}


.btn-contato:hover {
background-color: #34ff45;
}
.bullet-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
}
.check {
  color: #567e5f;
  font-weight: bold;
  margin-right: 8px;
}



.check {
  color: #000000; /* exemplo: laranja */
  font-weight: bold;
  margin-top: 0px;
  flex-shrink: 0;
}




.arrow:hover {
  color: #000000; /* muda a cor no hover */
  transform: translateY(5px); /* anima a seta pra baixo */
  cursor: pointer;
  background-color: aliceblue;
 
}

.container {
  max-width: 1500px;
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

@media (max-width: 768px) {
  .cards-wrapper {
    width: 360px !important;
    overflow: hidden !important;
    transform: translateX(-74px); /* ajusta o valor negativo conforme quiser */
    margin-bottom: 100px;
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
    transform: translateX(-72px); /* agora sim! */
    z-index: 10;
    font-size: 32px;
    background: transparent;
    border: none;
    color: rgb(44, 44, 44) !important;
    cursor: pointer;
  }

  .btn-prev {
    left: -50px !important; /* totalmente fora do card */
  }

  .btn-next {
    right: -50px !important; /* totalmente fora do card */
  }
}
@media (max-width: 430px) and (min-width: 426px) {
  .cards-wrapper {
    transform: translateX(-55px) !important; /* menos puxado à esquerda */
  }

  .btn-prev,
  .btn-next {
    transform: translateY(-50%) translateX(0px) !important; /* corrige a seta */
  }
}
/* Celulares até 767px */


@media (max-width: 992px) {
  .banner-with-text {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 auto !important; /* centraliza */
    
  }

  .shape-left {
    width: 90% !important;
    padding: 1rem 0rem !important;
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
    font-size: 1.6rem !important;      /* diminui o tamanho da fonte */
    margin-top: 120px !important;    /* empurra o título mais pra baixo */
    text-align: left;
  }

  .shape-left p.description {
    font-size: 0.90rem !important;      /* mantém o texto legível */
    line-height: 1.6rem !important;
    text-align: left;
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
  font-family: inherit;
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
  background: rgba(0, 0, 0, 0.5); /* fundo semi-transparente preto para destacar o texto */
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
