<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Imagens importadas da pasta assets
import contaImg from '@/assets/conta.png'
import logoImg from '@/assets/logocjl.png'
import imagemEsquerda from '@/assets/img.jpg'
import imagemDireita from '@/assets/tecnologiaa.webp'
import imgPc from '@/assets/pc.webp'
import imgPc2 from '@/assets/pc2.jpg'
import imgCodigo1 from '@/assets/codigo1.jpg'

// Quantidade visível de cards nos sliders
const visibleCards = 3

// Largura fixa dos cards em pixels
const cardWidthPx = 320

// Lista de cards de planos de consultoria
const consultoriaCards = [
  {
    title: 'Essencial',
    desc: 'Ideal para pequenas empresas que estão começando sua jornada digital.',
    items: ['Diagnóstico inicial', 'Suporte remoto mensal', 'Relatório estratégico'],
    preco: 'R$ 499/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Profissional',
    desc: 'Consultoria com acompanhamento mais próximo e reuniões estratégicas.',
    items: ['Tudo do Essencial', '2 reuniões mensais', 'Acesso a especialista dedicado'],
    preco: 'R$ 899/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Corporativo',
    desc: 'Consultoria personalizada para times e empresas em escala.',
    items: ['Tudo do Profissional', 'Treinamentos exclusivos', 'Plano de ação trimestral'],
    preco: 'R$ 1499/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Extra 1',
    desc: 'Plano extra 1',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 600/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Extra 2',
    desc: 'Plano extra 2',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 700/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Extra 3',
    desc: 'Plano extra 3',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 800/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Extra 4',
    desc: 'Plano extra 4',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 900/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Extra 5',
    desc: 'Plano extra 5',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 1000/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Extra 6',
    desc: 'Plano extra 6',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 1100/mês',
    buttonText: 'Contratar'
  },
  {
    title: 'Extra 7',
    desc: 'Plano extra 7',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 1200/mês',
    buttonText: 'Contratar'
  }
]

// Lista de cards de serviços de software
const softwareCards = [
  {
    title: 'MVP Rápido',
    desc: 'Ideal para startups que precisam lançar rápido com baixo custo.',
    items: ['Até 3 telas principais', 'Backend básico incluso', 'Entrega em até 3 semanas'],
    preco: 'R$ 3.500',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Projeto Personalizado',
    desc: 'Para empresas que precisam de uma solução sob medida.',
    items: ['Levantamento de requisitos', 'Design de interface personalizado', 'Integração com APIs'],
    preco: 'A partir de R$ 7.000',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Software Completo',
    desc: 'Solução empresarial com painel administrativo e suporte contínuo.',
    items: ['Dashboard completo', 'Usuários e permissões', 'Suporte e manutenção 6 meses'],
    preco: 'Sob consulta',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Extra 1',
    desc: 'Software extra 1',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 4.000',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Extra 2',
    desc: 'Software extra 2',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 5.000',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Extra 3',
    desc: 'Software extra 3',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 6.000',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Extra 4',
    desc: 'Software extra 4',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 7.000',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Extra 5',
    desc: 'Software extra 5',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 8.000',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Extra 6',
    desc: 'Software extra 6',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 9.000',
    buttonText: 'Solicitar Orçamento'
  },
  {
    title: 'Extra 7',
    desc: 'Software extra 7',
    items: ['Item 1', 'Item 2'],
    preco: 'R$ 10.000',
    buttonText: 'Solicitar Orçamento'
  }
]

// Índices atuais dos sliders
const currentIndexConsultoria = ref(0)
const currentIndexSoftware = ref(0)

// Índices máximos baseados no número de cards
const maxIndexConsultoria = consultoriaCards.length - visibleCards
const maxIndexSoftware = softwareCards.length - visibleCards

// Cálculo do deslocamento horizontal para os sliders (em pixels)
const translateXConsultoria = computed(() => currentIndexConsultoria.value * cardWidthPx)
const translateXSoftware = computed(() => currentIndexSoftware.value * cardWidthPx)

// Funções para navegação dos sliders
function prevConsultoria() {
  if (currentIndexConsultoria.value > 0) {
    currentIndexConsultoria.value--
  }
}

function nextConsultoria() {
  if (currentIndexConsultoria.value < maxIndexConsultoria) {
    currentIndexConsultoria.value++
  }
}

function prevSoftware() {
  if (currentIndexSoftware.value > 0) {
    currentIndexSoftware.value--
  }
}

function nextSoftware() {
  if (currentIndexSoftware.value < maxIndexSoftware) {
    currentIndexSoftware.value++
  }
}

// Animação das imagens ao entrar na tela
const ativado = ref(false)
const secaoRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        ativado.value = true
        if (observer) observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )
  if (secaoRef.value) observer.observe(secaoRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

// Lista de recursos com cards expansíveis
const recursos = ref([
  {
    titulo: 'Infraestrutura Resiliente',
    conteudo: 'Oferecemos uma infraestrutura tecnológica robusta e altamente disponível, capaz de suportar o crescimento do seu negócio e resistir a falhas ou ataques. Nosso foco é garantir a continuidade operacional, com recursos que promovem escalabilidade, redundância e rápida recuperação em caso de incidentes.',
    aberto: false
  },
  {
    titulo: 'Integração Segura',
    conteudo: 'Conectamos seus sistemas e plataformas de forma eficiente e segura, utilizando protocolos avançados que garantem a proteção dos dados em trânsito e em repouso. Essa integração otimiza processos internos, reduz falhas de comunicação e assegura que as informações trafeguem de forma confiável entre diferentes ambientes tecnológicos.',
    aberto: false
  },
  {
    titulo: 'Gerenciamento Centralizado de Riscos',
    conteudo: 'Implementamos soluções que permitem monitorar, identificar e controlar riscos digitais em um único painel de gestão. Isso facilita a rápida tomada de decisões e a mitigação proativa de vulnerabilidades, protegendo sua empresa contra ameaças cibernéticas e garantindo conformidade com normas regulatórias.',
    aberto: false
  },
  {
    titulo: 'Proteção Avançada de Dados',
    conteudo: 'Adotamos práticas de segurança como criptografia de ponta a ponta, autenticação multifator e rigorosas políticas de controle de acesso para assegurar a confidencialidade e integridade das informações sensíveis da sua empresa. Dessa forma, minimizamos riscos de vazamentos e acessos não autorizados.',
    aberto: false
  },
  {
    titulo: 'Atendimento Multicanal Seguro',
    conteudo: 'Disponibilizamos suporte técnico e atendimento ao cliente por múltiplos canais, todos protegidos por mecanismos de segurança que garantem a privacidade e a integridade das informações compartilhadas. Isso proporciona uma experiência confiável e eficiente, independentemente do meio utilizado para comunicação.',
    aberto: false
  }
])

function alternar(index: number) {
  recursos.value[index].aberto = !recursos.value[index].aberto
}


function contrateNos() {
  alert('Obrigado pelo interesse! Entraremos em contato em breve.')
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
        | Conheça
        br
        | Nossa história
      p.description
        | A nossa empresa oferece soluções estratégicas em tecnologia para transformar negócios e otimizar resultados. Atuamos com consultoria especializada em sistemas, infraestrutura e inovação digital. Nosso compromisso é entender as necessidades dos clientes.
      a.arrow(href="#sobre") ↓

.cookie-banner-wrapper(v-if="!cookieAceito")
    p Clicando em "Aceito todos os Cookies", você concorda com o armazenamento de cookies no seu dispositivo para melhorar a experiência e navegação no site.
    .botoes-cookie
      button(@click="aceitarCookie") Aceitar Todos
      button(@click="rejeitarCookie") Rejeitar Todos

section.rbm-fundo-total(id="sobre")
  .rbm-centro-conteudo
    h2.rbm-titulo-central Soluções sob medida
    p.rbm-descricao-cinza Cada negócio é único — e suas necessidades tecnológicas também. Por isso, nossa abordagem é totalmente personalizada. Desenvolvemos soluções sob medida, alinhadas aos objetivos estratégicos de cada cliente, considerando seu setor, porte, desafios operacionais e metas de crescimento.

section.sessao-consultoria
  .imagem-lado
    img(:src="imgPc" alt="Consultoria de TI")
  .texto-lado
    h2.titulo-consultoria Personalização e eficiência em cada etapa
    p.descricao-consultoria
      |Na nossa consultoria, entendemos que cada projeto de tecnologia exige atenção única e detalhada. Por isso, acompanhamos nossos clientes em todas as fases do processo — desde a análise inicial até a implementação e o suporte contínuo — garantindo que cada solução seja personalizada para atender às necessidades específicas e entregue com máxima eficiência. Ao combinar conhecimento técnico aprofundado com metodologias ágeis, conseguimos adaptar rapidamente nossas abordagens conforme os desafios evoluem, otimizando recursos e tempo. Essa dedicação faz toda a diferença para que as soluções não sejam apenas funcionais, mas também escaláveis e alinhadas aos objetivos estratégicos do negócio.
    a.btn-contato(
        href="https://wa.me/551151997454?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
        target="_blank"
        rel="noopener noreferrer"
      ) CONTATE-NOS
section.bloco-sys(ref="secaoRef")
  .estrutura-sys
    .area-imagens-sys
      img.figura-esq-ti(:src="imgPc2" alt="Imagem esquerda" :class="{ 'ativo-esq': ativado }")
      img.figura-dir-ti(:src="imgCodigo1" alt="Imagem direita" :class="{ 'ativo-dir': ativado }")
    .area-texto-sys
      h2.titulo-destaque-ti A CJL é uma empresa especializada na gestão de Tecnologia da Informação para pequenas e médias empresas.

      p.descricao-detalhe-ti
        | Somos especialistas em transformar pequenos e médios negócios por meio de soluções em tecnologia da informação. Ajudamos você a crescer com inovação e segurança.
      
      p.descricao-detalhe-ti
        | Na área de tecnologia, oferecemos soluções avançadas que envolvem desde a implementação de sistemas robustos até o suporte técnico personalizado, garantindo que sua infraestrutura esteja sempre atualizada, eficiente e protegida contra ameaças digitais.

section.bloco-recursos-tec
  .estrutura-recursos-tec
    h2.titulo-recursos-tec Principais recursos

    .lista-acordeao-tec
      template(v-for="(item, index) in recursos" :key="index")
        .card-tec(:class="{ ativo: item.aberto }")
          .cabecalho-card-tec(@click="alternar(index)")
            span.titulo-card-tec {{ item.titulo }}
            span.icone-bolinha
              svg.arrow-icon(:class="{ rotacionado: item.aberto }" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round")
                line(x1="12" y1="5" x2="12" y2="12")
                polyline(points="5 9 12 16 19 9")
          transition(name="deslizar")
            .conteudo-card-tec(v-show="item.aberto")
              p {{ item.conteudo }}
              a.btn-contato(
                href="https://wa.me/551151997454?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
                target="_blank"
                rel="noopener noreferrer"
              ) SAIBA MAIS

</template>

<style scoped>

/* Mobile e tablets */
@media (max-width: 1024px) {
  section.bloco-sys .area-texto-sys h2.titulo-destaque-ti,
  section.bloco-sys .area-texto-sys p.descricao-detalhe-ti {
    text-align: left !important;    /* alinha o texto à esquerda */
    max-width: 110% !important;      /* limita largura do texto */
    margin-left: -1.4rem !important;      /* inicia na borda esquerda do container */
    
   
  }
}

/* Mobile e tablets */
@media (max-width: 1024px) {
  section.sessao-consultoria .texto-lado h2.titulo-consultoria,
  section.sessao-consultoria .texto-lado p.descricao-consultoria {
    text-align: left !important;    /* alinha o texto à esquerda */
    max-width: 120% !important;      /* limita largura do texto */
    margin-left: 0 !important;      /* garante que comece na borda esquerda */
    margin-right: auto !important;  /* mantém alinhamento correto */
  }
}

/* Mobile e tablets */
@media (max-width: 1024px) {
  section#sobre .rbm-centro-conteudo h2.rbm-titulo-central,
  section#sobre .rbm-centro-conteudo p.rbm-descricao-cinza {
    text-align: left !important;    /* alinha o texto à esquerda */
    max-width: 120% !important;      /* opcional: limita largura do texto */
    margin-left: 0.2rem !important;      /* garante que comece na borda esquerda */
    
  }
}

/* Celulares e tablets */
@media (max-width: 1024px) {
  /* Centraliza o container de texto e define largura */
  .area-texto-sys h2.titulo-destaque-ti,
  .area-texto-sys p.descricao-detalhe-ti {
    max-width: 150% !important;      /* ocupa até 90% da tela */
    width: 120%;;
    margin-left: -2rem !important;    /* centraliza horizontalmente */
    margin-right: auto !important;   /* centraliza horizontalmente */
    text-align: center !important;   /* centraliza o texto */
  }
  .area-texto-sys h2.titulo-destaque-ti{
    font-size: 1.5rem !important;
    margin-top: 4rem;
  }
  .titulo-consultoria {
  font-size: 1.5rem !important;
  margin-bottom: 2rem !important;
  
  
}
.rbm-titulo-central{
  font-size: 1.5rem !important;
  margin-bottom: 2rem !important;
}
}

/* Celulares e tablets */
@media (max-width: 1024px) {
  /* Espaço abaixo da imagem */
  section.banner-container img.banner-image {
    margin-bottom: 5rem !important; /* ajusta a distância abaixo da imagem */
  }

  /* Centraliza e limita a largura do texto e título */
  section.banner-with-text .shape-left h1.title,
  section.banner-with-text .shape-left p.description {
    max-width: 90% !important;  
 
  }
}

/* iPhone XR / 414px de largura aproximada */
@media (min-width: 414px) and (max-width: 414px) {
  section.banner-with-text .shape-left h1.title,
  section.banner-with-text .shape-left p.description {
    max-width: 80% !important;  /* largura máxima do texto */

  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .lista-acordeao-tec .card-tec:last-child {
    margin-bottom: 7rem; /* ajuste o valor */
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
/* Para todos os tablets (largura entre 768px e 1024px) */
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

 


  .imagem-lado {
    width: 100% !important;
    flex: 0 0 100% !important;
    margin-top: 0 !important;
  }

  .imagem-lado img {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    object-fit: cover !important;
  }

  /* Bloco SYS: empilha imagens e textos */



}




@media (max-width: 767px) {
  /* Centraliza e define largura do texto descritivo */
  .sessao-consultoria .descricao-consultoria {
    position: relative !important;       
    left: 50% !important;                
    transform: translateX(-50%) !important; 
    width: 130% !important;               /* largura máxima para mobile */
    max-width: 140% !important;           
    text-align: center !important;       
  }

  /* Centraliza e define largura do título */
  .sessao-consultoria .titulo-consultoria {
    position: relative !important;       
    left: 50% !important;                
    transform: translateX(-50%) !important; 
    width: 130% !important;               /* largura máxima igual ao texto */
    max-width: 140% !important;           
    text-align: center !important;       /* centraliza o título */
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


  /* Bloco SYS: esconde imagens */
 
}


.btn-contato {
  display: block;              
  margin: 0 auto;              
  padding: 10px 20px;          /* diminuiu um pouco o padding horizontal */
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;              
  background-color: rgba(0, 0, 0, 0.8);

  border: 0.5px solid #ffffff; /* borda mais fina */
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  text-align: center;
  text-decoration: none;       
  font-family: inherit;
  width: fit-content;          /* botão com largura mínima para o conteúdo */
  min-width: 120px;            /* largura mínima opcional para o botão não ficar muito pequeno */
  margin-top: 50px;
  margin-bottom: 20px;
}


.btn-contato:hover {
  background-color: #8f8f8f;
  color: white;
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
.btn-contrate {
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

.btn-contrate:hover {
  background-color: #34ff45;
}
.arrow:hover {
  color: #000000; /* muda a cor no hover */
  transform: translateY(5px); /* anima a seta pra baixo */
  cursor: pointer;
  background-color: aliceblue;
 
}

@media (max-width: 768px) {
  .figura-esq-ti {
    display: block !important;
    max-width: 90% !important;
    height: auto !important;
    margin-top: 10rem !important;   /* margem superior */
    margin-bottom: 3rem !important; /* margem inferior para espaçamento */
    transform: translateX(60px) !important;
    max-height: 300px !important;
    width: auto !important;
  }
}

@media (max-width: 768px) {
 
  .etiqueta-sys,
  .titulo-destaque-ti,
  .descricao-detalhe-ti {
    margin-left: 0;
    margin-right: 0;
    text-align: left;
  }
}


  /* Se quiser espaçar individualmente: */
  .etiqueta-sys {
    margin-top: 2rem;
  }

  .titulo-destaque-ti {
    margin-top: 1rem;
  }

  .descricao-detalhe-ti {
    margin-top: 1rem;
  }
  .titulo-recursos-tec{
    font-size: 1.5rem !important;
    text-align: left;
    font-weight: bold !important;
  }
@media (max-width: 768px) {
  .area-texto-sys {
    margin-top: 13rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    width: 100% !important;
    max-width: 100% !important;
    text-align: justify !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  /* Força texto justificado e alinhado à esquerda */
  .area-texto-sys h3,
  .area-texto-sys h2,
  .area-texto-sys p {
    text-align: left !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

/* Para telas maiores (desktop) */
@media (min-width: 769px) {
  .area-imagens-sys {
    display: flex;
    justify-content: center; /* centraliza horizontalmente */
    align-items: center; /* centraliza verticalmente se quiser */
  }

  .figura-esq-ti, .figura-dir-ti {
    max-width: 300px;
    height: auto;
  }
}



@media (max-width: 768px) {
 

  .figura-esq-ti {
    display: block; /* mantém visível */
    width: 80%;
    max-width: 300px;
    height: auto;
    margin-top: 220px;
  }

  .figura-dir-ti {
    display: none; /* esconde a segunda imagem */
  }


  .titulo-destaque-ti {
    font-size: 1.4rem;
  }

  .descricao-detalhe-ti {
    font-size: 1rem;
    line-height: 1.6rem;
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
    text-align: left;
  }

  .shape-left p.description {
    font-size: 1rem !important;
    line-height: 1.6rem !important;
    text-align: left;
    margin-top: 1rem;
  }
}
  .arrow {
    text-align: center;
    display: block;
    margin-top: 1.8rem;
    font-size: 1.5rem;
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

html {
  scroll-behavior: smooth;
}
.icone-bolinha {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.arrow-icon.rotacionado {
  transform: rotate(180deg);
}
.bloco-recursos-tec {
  width: 100%;
  padding: 4rem 2rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  margin-top: -70px;
  margin-bottom: -60px;
}

.estrutura-recursos-tec {
  max-width: 1000px;
  width: 100%;
}

.titulo-recursos-tec {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #000000;
  font-weight: 500;
}

.lista-acordeao-tec {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-tec {
  background-color: #272727;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}
/* Cabeçalho do card (menos altura) */
.cabecalho-card-tec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem; /* antes era 1rem 1.5rem */
  font-size: 0.95rem;
  color: #ffffff;
  font-weight: 500;
  border: 2px solid transparent;
}

/* Conteúdo expandido (menos altura) */
.conteudo-card-tec {
  padding: 0.6rem 1rem; /* antes era 1rem 1.5rem */
  background-color: #dfdfdf;
  color: #002a2f;
  font-size: 0.9rem;
}

.card-tec.ativo .cabecalho-card-tec {
  border-color: #002a2f;
}

.titulo-card-tec {
  flex-grow: 1;
}




/* Transição suave para expansão */
.deslizar-enter-active,
.deslizar-leave-active {
  transition: max-height 0.4s ease, opacity 0.3s ease;
}
.deslizar-enter-from,
.deslizar-leave-to {
  max-height: 0;
  opacity: 0;
}
.deslizar-enter-to,
.deslizar-leave-from {
  max-height: 200px;
  opacity: 1;
}


.bloco-sys {
  width: 100%;
  background: #ffffff;
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  margin-top: -60px
  
}

.estrutura-sys {
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  
}

.area-imagens-sys {
  position: relative;
  width: 500px;
  min-width: 300px;
  max-height: 350px;

  .figura-esq-ti,
  .figura-dir-ti {
    width: 300px;
    height: 320px;
    border-radius: 5px;
    position: absolute;
    opacity: 0;
    transition: all 2s ease;
  }

  .figura-esq-ti {
    top: -200px;
    left: 0;
    z-index: 1;
    transform: translateX(-120px);
  }

   .figura-dir-ti {
    width: 340px;  
    height: 250px; 
    top: -70px;       
    left: 170px;  
    z-index: 2;     
    transform: translateX(120px);
    
  }
  .ativo-esq {
    opacity: 1;
    transform: translateX(0);
  }

  .ativo-dir {
    opacity: 1;
    transform: translateX(0);
  }
}

.area-texto-sys {
  max-width: 500px;
  margin-left: 100px;


  .etiqueta-sys {
    font-size: 0.9rem;
    font-weight: 700;
    color: #2a3a5e;
    margin-bottom: 0.5rem;
    letter-spacing: 0.05em;
  }

  .titulo-destaque-ti {
    font-size: 35px;
    font-weight: 800;
    color: #111;
    line-height: 1.3;
    margin-bottom: 1rem;
  }

  .descricao-detalhe-ti {
    font-size: 18px;
    color: #444;
    line-height: 1.7;
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
  font-family: 'Times New Roman', Times, serif;
  color: #ffffff;
}

.imagem-lado img {
  width: 100%;
  height: 400px; /* ajuste o valor conforme desejar */
  border-radius: 8px;
  object-fit: cover;
  margin-top: -40px;
}

.texto-lado {
  flex: 0 0 50%; /* fixa 50% da largura */
  display: flex;
  flex-direction: column;
  justify-content: center;
  
}

.titulo-consultoria {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: left;
  color: #ffffff;
  
}

.descricao-consultoria {
  
  font-size: 1.1rem;
  line-height: 1.6;
  color: #b1b1b1;
  

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
    text-align: center !important;
  }

  .texto-lado {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin: 0; /* remove margens laterais */
  }

 
}



.planos {
  background-color: #f8f8f8;
  color: #222;
  padding: 4rem 2rem;
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
  color: #111;
}

.slider {
  position: relative;
  overflow: hidden;
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
  background: #fff;
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
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #000000;
}

.card p {
  font-size: 1rem;
  color: #6e6e6e;
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  text-align: left;
}

ul li::before {
  content: '✓ ';
  color: #fffd91;
  margin-right: 0.5rem;
}

.preco {
  font-size: 1.2rem;
  font-weight: bold;
  color: #111;
  margin-bottom: 1rem;
  display: inline-block;
}

button {
  background-color: rgb(255, 245, 158);
  color: #000000;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #f7f463; /* verde claro */
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
