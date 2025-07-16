<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import contaImg from '@/assets/conta.png'  // ajuste a extensão conforme sua imagem
import logoImg from '@/assets/logocjl.png'  // ajuste o caminho e nome da logo

const cardWidthPx = 375 // largura fixa de cada card em px (ajuste se quiser)
const visibleCardsDesktop = 3
const visibleCardsMobile = 1

// Estado que acompanha a largura da janela para responsividade
const windowWidth = ref(window.innerWidth)

function onResize() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

// Quantidade de cards visíveis conforme largura da tela
const visibleCards = computed(() => {
  return windowWidth.value <= 768 ? visibleCardsMobile : visibleCardsDesktop
})

const consultoriaCards = [
  {
    title: 'Essencial',
    desc: 'Suporte básico e orientação pontual via e-mail ou WhatsApp. Ideal para autônomos e pequenos negócios iniciando na tecnologia.',
    items: [
      'Até 1 reunião mensal (30 min)',
      'Suporte via e-mail/WhatsApp',
      'Avaliação inicial da infraestrutura'
    ],
    preco: 'R$ 297/mês | R$ 2.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Diagnóstico',
    desc: 'Análise técnica completa da empresa, com relatório de melhorias e riscos.',
    items: [
      'Reunião inicial + entrega de diagnóstico técnico',
      'Avaliação de sistemas, segurança, e processos'
    ],
    preco: 'R$ 497/mês | R$ 4.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Orientação Técnica',
    desc: 'Suporte técnico contínuo com foco em boas práticas, ferramentas e processos.',
    items: [
      '2 reuniões mensais (até 1h)',
      'Orientação sobre ferramentas e processos',
      'Acesso a materiais técnicos'
    ],
    preco: 'R$ 697/mês | R$ 6.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Operacional',
    desc: 'Acompanhamento próximo de rotinas técnicas e suporte à equipe interna.',
    items: [
      'Até 4 reuniões mensais',
      'Apoio a decisões operacionais',
      'Treinamentos leves sob demanda'
    ],
    preco: 'R$ 997/mês | R$ 9.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Otimização de Processos',
    desc: 'Consultoria focada em automatizar tarefas, melhorar performance e reduzir desperdícios.',
    items: [
      'Mapeamento de processos',
      'Implementação de ferramentas low-code/no-code',
      'KPI básico'
    ],
    preco: 'R$ 1.297/mês | R$ 12.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Transformação Digital',
    desc: 'Planejamento e execução de iniciativas para transformar digitalmente os processos da empresa.',
    items: [
      'Roadmap de transformação',
      'Treinamento de equipe',
      'Recomendação de soluções e fornecedores'
    ],
    preco: 'R$ 1.697/mês | R$ 16.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Estratégico de TI',
    desc: 'Criação de um plano de TI alinhado aos objetivos do negócio. Ideal para empresas que querem crescer com base em dados e tecnologia.',
    items: [
      'Planejamento estratégico de TI',
      'Indicadores (KPIs)',
      'Relatórios executivos mensais'
    ],
    preco: 'R$ 2.497/mês | R$ 24.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'CTO as a Service (CTOaaS)',
    desc: 'Você atua como um CTO externo, liderando tecnicamente a empresa de forma contínua.',
    items: [
      'Participação em decisões de alto nível',
      'Gestão de equipe técnica (ou terceirizados)',
      'Apresentações estratégicas para diretoria'
    ],
    preco: 'R$ 3.997/mês | R$ 39.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Full Stack Empresarial',
    desc: 'Consultoria técnica + de produto + de negócios. Apoia desenvolvimento, marketing e estruturação completa.',
    items: [
      'Equipe de especialistas sob demanda',
      'Projetos de software + infraestrutura',
      'Suporte a lançamento de produtos'
    ],
    preco: 'R$ 6.997/mês | R$ 69.970/ano',
    buttonText: 'Contratar'
  },
  {
    title: 'Elite / C-Level Advisory',
    desc: 'Consultoria confidencial e estratégica para sócios, CEOs, diretores. Suporte em tecnologia, inovação, segurança e posicionamento.',
    items: [
      'Acesso direto ao consultor (nível executivo)',
      'Reuniões ilimitadas com agendamento',
      'Diagnóstico profundo com parceiros de confiança'
    ],
    preco: 'R$ 9.997/mês | R$ 99.970/ano',
    buttonText: 'Contratar'
  }
]


const softwareCards = [
  {
    title: 'Starter (MVP Rápido)',
    desc: 'Ideal para validar uma ideia com um produto mínimo viável (MVP).',
    items: [
      'Levantamento de requisitos simplificado',
      'Protótipo funcional (1 tela principal)',
      'Backend leve (CRUD simples)',
      'Hospedagem inicial'
    ],
    preco: 'R$ 1.497/mês (3 meses) | R$ 4.490 total',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Essencial',
    desc: 'Projeto pequeno com funcionalidades básicas de gestão e interface personalizada.',
    items: [
      'Até 3 módulos funcionais',
      'Integração com banco de dados',
      'Painel administrativo simples',
      'Entrega em 30 a 45 dias'
    ],
    preco: 'R$ 2.497/mês | R$ 24.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Profissional',
    desc: 'Solução com foco em controle, segurança e usabilidade. Ideal para empresas em crescimento.',
    items: [
      'Autenticação de usuários',
      'Controle de permissões',
      'Dashboard com indicadores',
      'APIs documentadas'
    ],
    preco: 'R$ 3.497/mês | R$ 34.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Corporativo',
    desc: 'Plataforma robusta com foco em automação e escalabilidade.',
    items: [
      'Arquitetura em microserviços ou modular',
      'Integrações com sistemas externos (ERP, CRM)',
      'Testes automatizados'
    ],
    preco: 'R$ 5.497/mês | R$ 54.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Growth (Expansão)',
    desc: 'Focado em crescimento, analytics e performance.',
    items: [
      'Módulo de relatórios avançados',
      'Otimização de performance',
      'Integração com ferramentas de BI e marketing'
    ],
    preco: 'R$ 6.997/mês | R$ 69.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'SaaS (Software como Serviço)',
    desc: 'Desenvolvimento completo de um sistema no modelo SaaS (multiusuário com cobrança).',
    items: [
      'Painel de gestão multiempresa',
      'Billing (assinaturas e pagamentos)',
      'Hospedagem escalável (AWS, GCP ou Azure)'
    ],
    preco: 'R$ 8.997/mês | R$ 89.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'App + Web',
    desc: 'Entrega de plataforma completa com sistema web + aplicativo Android/iOS.',
    items: [
      'Backend unificado',
      'App híbrido com design responsivo',
      'Publicação nas lojas'
    ],
    preco: 'R$ 9.997/mês | R$ 99.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Integrações Corporativas',
    desc: 'Ideal para empresas que precisam conectar seu sistema a outros softwares, ERPs, gateways ou APIs.',
    items: [
      'Integração com ERPs (SAP, TOTVS, Bling, etc.)',
      'Integrações com Correios, PagSeguro, MercadoPago...',
      'APIs REST, Webhooks e filas (Kafka/RabbitMQ)',
      'Monitoramento e logs das integrações'
    ],
    preco: 'R$ 11.997/mês | R$ 119.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Full Outsourcing',
    desc: 'Time de desenvolvimento dedicado para demandas contínuas e personalizadas.',
    items: [
      'Equipe alocada (PO, Devs, QA, UX)',
      'Sprints quinzenais',
      'Gestão via Jira ou ClickUp'
    ],
    preco: 'R$ 14.997/mês | R$ 149.970/ano',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Elite / CTO Estratégico',
    desc: 'Desenvolvimento contínuo + liderança estratégica de tecnologia.',
    items: [
      'Acompanhamento direto de um CTO',
      'Inovação, AI, análise de dados, cibersegurança',
      'Relatórios executivos e decisões técnicas'
    ],
    preco: 'R$ 19.997/mês | R$ 199.970/ano',
    buttonText: 'Solicitar Orçamento'
  }
]

const currentIndexConsultoria = ref(0)
const currentIndexSoftware = ref(0)

const maxIndexConsultoria = computed(() => consultoriaCards.length - visibleCards.value)
const maxIndexSoftware = computed(() => softwareCards.length - visibleCards.value)

const translateXConsultoria = computed(() => currentIndexConsultoria.value * cardWidthPx)
const translateXSoftware = computed(() => currentIndexSoftware.value * cardWidthPx)

function prevConsultoria() {
  if (currentIndexConsultoria.value > 0) {
    currentIndexConsultoria.value--
  }
}

function nextConsultoria() {
  if (currentIndexConsultoria.value < maxIndexConsultoria.value) {
    currentIndexConsultoria.value++
  }
}

function prevSoftware() {
  if (currentIndexSoftware.value > 0) {
    currentIndexSoftware.value--
  }
}

function nextSoftware() {
  if (currentIndexSoftware.value < maxIndexSoftware.value) {
    currentIndexSoftware.value++
  }
}
</script>
<template lang="pug">
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


main.planos
  section.consultoria(id="sessao")
    .container
      h2 Planos de Consultoria
      .slider
        button.btn-prev(
          @click="prevConsultoria"
          :disabled="currentIndexConsultoria === 0"
        ) ‹
        .cards-wrapper
          .cards(:style="`transform: translateX(-${translateXConsultoria}px)`")
            template(v-for="(card, i) in consultoriaCards" :key="i")
              .card
                h3 {{ card.title }}
                p {{ card.desc }}
                ul
                  li.bullet-item(v-for="(item, j) in card.items" :key="j")
                    span {{ item }}
                span.preco {{ card.preco }}
                a.btn-contato(
                  href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
                  target="_blank"
                  rel="noopener noreferrer"
                ) CONTATE-NOS
        button.btn-next(
          @click="nextConsultoria"
          :disabled="currentIndexConsultoria >= maxIndexConsultoria"
        ) ›

  section.software
    .container
      h2 Planos de Desenvolvimento de Software
      .slider
        button.btn-prev(
          @click="prevSoftware"
          :disabled="currentIndexSoftware === 0"
        ) ‹
        .cards-wrapper
          .cards(:style="`transform: translateX(-${translateXSoftware}px)`")
            template(v-for="(card, i) in softwareCards" :key="i")
              .card
                h3 {{ card.title }}
                p {{ card.desc }}
                ul
                  li.bullet-item(v-for="(item, j) in card.items" :key="j")
                    span {{ item }}
                span.preco {{ card.preco }}
                a.btn-contato(
                  href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
                  target="_blank"
                  rel="noopener noreferrer"
                ) CONTATE-NOS
        button.btn-next(
          @click="nextSoftware"
          :disabled="currentIndexSoftware >= maxIndexSoftware"
        ) ›


</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* para evitar scroll horizontal */
}
body, * {
  font-family: 'SuaFonteEscolhida', sans-serif !important;
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

@media (max-width: 992px) {
  .banner-with-text {
    max-width: 100% !important;
    width: 100% !important;
    margin: 0 auto !important; /* centraliza */
    
  }

  .shape-left {
    width: 100% !important;
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

.planos {
  background-color: #f8f8f8;
  color: #c9c9c9;
  padding: 4rem 2rem;
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
}

.card:last-child {
  margin-right: 0;
}

.card:hover {
 
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-family: 'Times New Roman', Times, serif;
  
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
  margin-bottom: 1rem;
  text-align: left;
}

ul li::before {
  content: '✓ ';
  color: #ffffff;
  margin-right: 0.5rem;
}

.preco {
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  display: inline-block;
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
