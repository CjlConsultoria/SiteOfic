<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import LogoNexdom from '@/assets/logocjl.png'
import FogosImg from '@/assets/fogos.png'
import ImagemEquipe from '@/assets/consultoria.webp'
import TecnologiaImg from '@/assets/tecnologia.png'
import TecnologiaEmpresa from '@/assets/empresaa.avif'
import Tecnologiamao from '@/assets/mao.png'


// Formulário
const nome = ref('')
const email = ref('')
const mensagem = ref('')

const enviarFormulario = () => {
  console.log('Nome:', nome.value)
  console.log('Email:', email.value)
  console.log('Mensagem:', mensagem.value)
  alert('Mensagem enviada com sucesso!')
  nome.value = ''
  email.value = ''
  mensagem.value = ''
}

// Cards do slider (exemplo com 2 por página)
const cards = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/10471/10471457.png', // escudo com gráfico
    titulo: 'Gestão de Riscos Digitais',
    descricao: 'Identificamos e avaliamos riscos cibernéticos com precisão, criando estratégias robustas para proteger seus ativos digitais e garantir a continuidade do negócio diante de ameaças tecnológicas.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/5432/5432655.png', // robô com engrenagem
    titulo: 'Automação de Segurança',
    descricao: 'Automatize respostas a incidentes e atividades de monitoramento com soluções inteligentes. Isso garante reação rápida a ameaças e reduz o tempo de exposição a riscos.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/10471/10471299.png', // servidor com escudo
    titulo: 'Infraestrutura Segura',
    descricao: 'Desenvolvemos e gerenciamos uma infraestrutura digital com foco em segurança, resiliência e conformidade. Ideal para empresas que não podem correr riscos com seus dados e operações.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // equipe de resposta
    titulo: 'Resposta a Incidentes',
    descricao: 'Oferecemos suporte rápido e especializado para lidar com incidentes de segurança. Nossa equipe atua com planos de contenção, investigação e recuperação para minimizar impactos.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/10253/10253303.png', // IA cibernética
    titulo: 'Inteligência em Ameaças',
    descricao: 'Utilizamos inteligência artificial para detectar ameaças em tempo real, antecipar ataques e fortalecer sua defesa cibernética com base em dados e comportamentos anômalos.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/4149/4149726.png', // nuvem protegida
    titulo: 'Segurança em Nuvem',
    descricao: 'Proteja seus ambientes em nuvem com configurações seguras, criptografia e monitoramento constante. Garantimos que sua operação remota esteja sempre protegida e disponível.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/8274/8274645.png', // lupa com código
    titulo: 'Análise Forense e de Logs',
    descricao: 'Realizamos análise forense digital para investigar ataques, rastrear ações maliciosas e produzir evidências confiáveis. Monitoramento de logs auxilia na prevenção e auditoria contínua.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2972/2972810.png', // integração de sistema
    titulo: 'Integração de Soluções de Segurança',
    descricao: 'Unificamos ferramentas e sistemas de segurança em uma plataforma integrada, promovendo maior visibilidade, controle centralizado e eficiência operacional.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/4213/4213975.png', // privacidade e proteção de dados
    titulo: 'Proteção de Dados e LGPD',
    descricao: 'Garantimos a proteção de dados pessoais com medidas técnicas e administrativas adequadas, assegurando conformidade com a LGPD e outras regulamentações de privacidade.'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/3969/3969213.png', // inovação digital
    titulo: 'Inovação em Cibersegurança',
    descricao: 'Estamos sempre na vanguarda da cibersegurança, aplicando novas tecnologias e tendências para oferecer soluções modernas, eficazes e alinhadas às exigências do mercado digital.'
  }
]


const cardsPerPage = 2
const totalGroups = Math.ceil(cards.length / cardsPerPage)

const currentGroupIndex = ref(0)
const visibleCards = ref(cards.slice(0, cardsPerPage))

function updateVisibleCards() {
  const start = currentGroupIndex.value * cardsPerPage
  visibleCards.value = cards.slice(start, start + cardsPerPage)
}

function goToGroup(i: number) {
  currentGroupIndex.value = i
  updateVisibleCards()
}

function nextGroup() {
  currentGroupIndex.value = (currentGroupIndex.value + 1) % totalGroups
  updateVisibleCards()
}

let slideInterval: number | undefined

onMounted(() => {
  updateVisibleCards()
  slideInterval = setInterval(() => {
    nextGroup()
  }, 4000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

// Contadores animados na seção clientes
const counter1 = ref(0)
const counter2 = ref(0)
const counter3 = ref(0)
const counter4 = ref(0)

const finalCounter1 = 1000
const finalCounter2 = 2500
const finalCounter3 = 30
const finalCounter4 = 4000

let observer: IntersectionObserver | null = null
let intervals: number[] = []

function animateCounter(counter: typeof counter1, finalValue: number, duration = 4000) {
  let start = 0
  const stepTime = 30
  const increment = finalValue / (duration / stepTime)

  const intervalId = setInterval(() => {
    start += increment
    if (start >= finalValue) {
      counter.value = finalValue
      clearInterval(intervalId)
      intervals = intervals.filter(i => i !== intervalId)
    } else {
      counter.value = Math.floor(start)
    }
  }, stepTime)

  intervals.push(intervalId)
}

function startAnimation() {
  intervals.forEach(i => clearInterval(i))
  intervals = []
  animateCounter(counter1, finalCounter1)
  animateCounter(counter2, finalCounter2)
  animateCounter(counter3, finalCounter3)
  animateCounter(counter4, finalCounter4)
}

function resetCounters() {
  intervals.forEach(i => clearInterval(i))
  intervals = []
  counter1.value = 0
  counter2.value = 0
  counter3.value = 0
  counter4.value = 0
}

const clientesRef = ref<HTMLElement | null>(null)

function criarObserver() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimation()
      } else {
        resetCounters()
      }
    })
  }, { threshold: 0.3 })

  if (clientesRef.value) {
    observer.observe(clientesRef.value)
  }
}

onMounted(() => {
  setTimeout(() => {
    if (clientesRef.value) {
      criarObserver()
    }
  }, 100)
})

onUnmounted(() => {
  if (observer && clientesRef.value) {
    observer.unobserve(clientesRef.value)
    observer.disconnect()
    observer = null
  }
  intervals.forEach(i => clearInterval(i))
  intervals = []
})

// Scroll suave para seção Sobre
const sobre = ref<HTMLElement | null>(null)
function scrollToSobre() {
  sobre.value?.scrollIntoView({ behavior: 'smooth' })
}

// Função para scroll para qualquer seção pelo id
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// Detectar se houve scroll na página
const isScrolled = ref(false)
function onScroll() {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

// Frases rotativas no hero
const frases = [
  'Controle completo para oficinas',
  'Gerencie estoque, clientes e veículos',
  'Organize tudo com agilidade e segurança',
  'Sistema fácil, rápido e eficiente',
]

const indiceFrase = ref(0)
let intervalo: number

onMounted(() => {
  intervalo = setInterval(() => {
    indiceFrase.value = (indiceFrase.value + 1) % frases.length
  }, 3000)
})

onUnmounted(() => {
  clearInterval(intervalo)
})

const cartoes = ref([
  {
    titulo: 'Sistema de Gestão para Condomínios',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static/icons/home.svg',
    textoTraseiro: 'Automatize a administração condominial com controle de boletos, reservas de áreas comuns, gestão de inadimplência, assembleias online e comunicação entre moradores e síndicos.',
    flip: false
  },
  {
  titulo: 'Sistema para Oficinas Mecânicas',
  icon: 'https://cdn.jsdelivr.net/npm/lucide-static/icons/wrench.svg',
  textoTraseiro: 'Tenha total controle sobre ordens de serviço, estoque de peças, histórico de clientes, controle financeiro e gestão de agendamentos.',
  flip: false
},
  {
    titulo: 'Gestão de Folha de Pagamento',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static/icons/file-text.svg',
    textoTraseiro: 'Solução completa para cálculo de salários, encargos, benefícios, geração de holerites, integração com eSocial e relatórios contábeis.',
    flip: false
  },
  {
    titulo: 'Integração de Serviços',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static/icons/link.svg',
    textoTraseiro: 'Conectamos sistemas, APIs e bancos de dados para garantir a fluidez das suas operações e automatizar tarefas entre diferentes plataformas.',
    flip: false
  },
  {
    titulo: 'Desenvolvimento de Softwares Sob Medida',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static/icons/code.svg',
    textoTraseiro: 'Criamos soluções personalizadas para atender às necessidades específicas do seu negócio, com foco em escalabilidade, segurança e performance.',
    flip: false
  },
  {
    titulo: 'Desenvolvimento de Aplicativos',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static/icons/smartphone.svg',
    textoTraseiro: 'Projetamos e desenvolvemos apps Android e iOS com interfaces modernas, usabilidade intuitiva e foco na experiência do usuário.',
    flip: false
  }
])


function toggleFlip(index: number) {
  // Faz um deep clone do array para forçar reatividade completa
  cartoes.value = cartoes.value.map((card, i) => {
    if (i === index) {
      return { ...card, flip: !card.flip }
    } else {
      return { ...card, flip: false }
    }
  })
}




</script>


<template lang="pug">
main.home
  //- HERO
  section.hero
    .conteudo
      hr.hr-linha
      h1 Consultoria CJL
      hr.hr-linha
      p.subtitulo
        span.frase-atual {{ frases[indiceFrase] }}
      .seta(@click="scrollToSobre")
        svg(xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" viewBox="0 0 24 24")
          path(d="M12 16.5l-8-8L5.5 7l6.5 6.5L18.5 7 20 8.5z")

  //- SOBRE
  section.sobre(ref="sobre")
    .container
      h2 Sobre a CJL
      p A CJL Consultoria é uma empresa especializada em tecnologia da informação, focada em oferecer soluções inteligentes e personalizadas para pequenas e médias empresas, com ênfase no setor automotivo. Atuamos com consultoria estratégica, desenvolvimento de sistemas e suporte técnico, sempre com o compromisso de transformar desafios tecnológicos em oportunidades de crescimento.
      p Entre nossos principais produtos, destaca-se o Sistema CJL, uma plataforma completa, prática e intuitiva, desenvolvida especialmente para atender às necessidades de oficinas mecânicas. Com ele, é possível gerenciar:

  //- SOLUÇÕES
  section.bloco-solucao-nx
    .conteudo-solucao-nx
      .texto-solucao-nx
        p.subtitulo-nx
        | Conheça nossas
        br
        | soluções
        
        img.logo-solucao-nx(:src="TecnologiaEmpresa" alt="Logo Nexdom")

      .grade-cartoes-nx
        .cartao-nx(
          v-for="(card, index) in cartoes"
          :key="index"
           :class="[card.flip ? 'vermelho' : 'preto']"
        )
          //- Frente do card
          .frente(v-if="!card.flip")
            img.icone-nx(:src="card.icon" alt="Ícone")
            .titulo-cartao-frente
              p {{ card.titulo }}
            button.botao-nx(@click="toggleFlip(index)") +

          //- Verso do card
          .tras(v-else)
            p {{ card.textoTraseiro }}
            button.botao-nx(@click="toggleFlip(index)") -

  //- CLIENTES
  section.clientes-satisfeitos(ref="clientesRef")
    .conteudo-clientes
      .titulo-clientes
        .balao Nossos números
        h2.titulo-grande Já nascemos grandes

      .grid-clientes
        .grid-esquerda
          .card-metrica.dourado
            p.grande {{ counter1 }}+
            p.pequeno
              span Singulares &
              br
              span federações

          .card-metrica.branco
            p.grande {{ counter2 }}+
            p.pequeno
              span Singulares &
              br
              span federações

          .card-metrica.cinza-escuro
            p.grande {{ counter3 }}MIN
            p.pequeno
              span Singulares &
              br
              span federações

          .card-metrica.preto
            p.grande {{ counter4 }}+
            p.pequeno
              span Singulares &
              br
              span federações

        .grid-direita
           img.img-animada(:src="Tecnologiamao" alt="Mapa do Brasil")

  //- SESSÃO CJL
  section.sessao-cjl
    .card-cjl
      h2
        strong.titulo-cinza Muito além de um 
        |  mero 
        span "cara da TI" ou um
        |   simples 
        span "apagador de incêndios".
      p.description
        | Oferecemos um grupo de profissionais especializados, prontos para atendê-lo de forma excepcional e eliminar definitivamente os seus problemas tecnológicos.
      a.btn-contato(
        href="https://wa.me/551151997454?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
        target="_blank"
        rel="noopener noreferrer"
      ) CONTATE-NOS

    .imagem-cjl
      img(:src="ImagemEquipe" alt="Equipe de TI")

section.slider-nx
  .fundo-laranja-nx
    .container-titulo-nx
      span.balao-nx Diferenciais
      h2.titulo-nx Cibersegurança Corporativa e Gestão Estratégica de Riscos Digitais.
    .slider-container-nx
      .cards-wrapper-nx
        .slide-track-nx
          .card-nx(v-for="(card, index) in visibleCards" :key="index")
            .conteudo-texto
              h3.titulo-card-nx {{ card.titulo }}
              p.descricao-card-nx {{ card.descricao }}
            img.icone-card-nx(:src="card.icon" alt="Ícone")

.paginacao-nx
  span.ponto-nx(
    v-for="(_, i) in totalGroups"
    :key="i"
    :class="{ ativo: currentGroupIndex === i }"
    @click="goToGroup(i)"
  )

section.formulario-contato
  .container-form
    h2.titulo-contato FALE CONOSCO
    form(@submit.prevent="enviarFormulario")
      label(for="nome") Nome
      input#nome(type="text" v-model="nome" required)

      label(for="email") E-mail
      input#email(type="email" v-model="email" required)

      label(for="mensagem") Mensagem
      textarea#mensagem(v-model="mensagem" required)

      button.btn-enviar(type="submit") Enviar
</template>

<style scoped>
body, * {
  font-family: 'SuaFonteEscolhida', sans-serif !important;
}
@media (max-width: 768px) {
  section.bloco-solucao-nx .grade-cartoes-nx .cartao-nx .tras {
    font-size: 13px !important;
  }
}
@media (max-width: 768px) {
  section.sobre {
    padding: 600px 20px;  /* aumenta o padding superior e inferior para deixar o fundo maior */
    /* Ou você pode usar min-height, se preferir */
    /* min-height: 400px; */
    padding-top: 60px;
  }
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* para evitar scroll horizontal */
}
.subtitulo-nx {
  font-size: 10rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 50px;
  line-height: 1.1;
}

.icone-nx {
  width: 40px;
  height: 40px;
  margin-top: 0px;
  margin-left: 0px;
  filter: invert(1); /* deixa branco */
  opacity: 0.9;
  margin-bottom: 3rem;
}


.cartao-nx {
  background-color: #ccc;
  padding: 20px;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  width: 90%;
  transition: height 0.4s ease;
  overflow: hidden;
  position: relative;
  transition: none;

  /* Altura padrão quando o card está fechado */
  height: 150px;
}

.cartao-nx.vermelho {
  /* Altura expandida quando o card está aberto */
  height: 150px;
  background-color: #fdff9b;
}

/* Parte da frente sempre visível quando fechado */
.cartao-nx .frente {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Parte de trás oculta por padrão */
.cartao-nx .tras {
  display: none;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9rem;
}

/* Mostrar verso quando aberto */
.cartao-nx.vermelho .frente {
  display: none;
}

.cartao-nx.vermelho .tras {
  display: flex;
   padding-top: 60px;
}

@media (max-width: 992px) {
  .container-form {
    padding-bottom: 60px !important; /* aumenta espaço interno embaixo */
    margin-bottom: 40px !important;  /* aumenta espaço externo embaixo */
  }
}
@media (max-width: 992px) {
  section.slider-nx {
    min-height: 1500px !important;
    padding-bottom: 150px !important;
    box-sizing: border-box !important;
  }
}
@media (max-width: 992px) {
  .container-form {
    margin-top: 90px !important; /* aumenta distância do topo, card vai pra baixo */
  }
}
@media (max-width: 992px) {

    .cards-wrapper-nx {
    margin-top: 250px !important; /* empurra os cards para baixo */
    align-items: center !important; /* mantém centralizado */
    padding-left: 90px !important; /* empurra o conteúdo pra direita */
    }
  .slide-track-nx {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    width: 100% !important;
    overflow: visible !important;
    min-height: 600px; /* aumenta o container dos cards */
  }

  .card-nx {
    width: 90% !important;
    max-width: 320px !important;
    margin: 1rem auto !important;
    box-sizing: border-box !important;
    display: block !important;
  }
 .paginacao-nx {
    position: relative !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    display: flex !important;
    justify-content: center !important;
    width: auto !important;
    margin: 0 auto !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    max-width: 100% !important;
    overflow: visible !important;
    z-index: 1000 !important;
  }

  .ponto-nx {
    width: 10px !important;
    height: 10px !important;
    background: #ccc !important;
    border-radius: 50% !important;
    cursor: pointer !important;
  }

  .ponto-nx.ativo {
    background: #333 !important;
  }
}

/* Para telas médias e menores */
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
    max-width: 400px;
    display: block;
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

/* Tablets e telas médias */
@media (max-width: 992px) {
  .conteudo-clientes {
    padding: 1rem;
  }

  .grid-clientes {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .grid-esquerda, .grid-direita {
    width: 100%;
    max-width: 600px;
  }

  .grid-esquerda {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .card-metrica {
    flex: 1 1 45%;
    max-width: 45%;
  }

  .img-animada {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
}

/* Celulares */
@media (max-width: 600px) {
  .grid-esquerda {
    display: flex !important;
    flex-direction: column !important; /* força empilhar vertical */
    align-items: center !important;    /* centraliza horizontal */
    gap: 1rem !important;
    width: 100% !important;
  }

  .card-metrica {
    max-width: 300px !important;
    width: 90% !important;
    margin: 0 auto !important;
  }
}

@media (max-width: 600px) {
  .img-animada {
    display: block !important;
    margin-left: auto !important;
    margin-right: auto !important;
    margin-top: 7rem !important;
    max-width: 80% !important;
    height: auto !important;
  }
}


  .titulo-clientes h2.titulo-grande {
    font-size: 1.5rem; /* diminui título no celular */
  }

  .p.grande {
    font-size: 1.2rem; /* diminui números grandes */
  }

  .p.pequeno {
    font-size: 0.9rem;
  }

  .img-animada {
    max-width: 90%;
    height: auto;
    margin: 1rem auto 0 auto;
  }


/* Tablets e telas médias */
@media (max-width: 992px) {
  .conteudo-solucao-nx {
    flex-direction: column;
    align-items: center;
  }

  .texto-solucao-nx {
    align-items: center;
    text-align: center;
  }

  .logo-solucao-nx {
    max-width: 140px;
    display: block; /* aparece */
  }

  .grade-cartoes-nx {
    justify-content: center;
    gap: 1rem;
     position: relative; /* importante para conter os filhos com absolute */
  }

  .cartao-nx {
    width: 180px;
  }
}
@media (max-width: 768px) {
    .bloco-solucao-nx {
    height: auto;
    padding-top: 8rem;  /* muito espaço em cima */
    padding-bottom: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: flex-start; /* conteúdo começa mais pra cima, mas com padding empurra pra baixo */
    align-items: flex-start;
    box-sizing: border-box;
    min-height: 150px; /* altura maior para não sobrepor conteúdo */
    gap: 0.8rem; /* diminui o espaçamento entre título e cards */
  }

  .conteudo-solucao-nx {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    gap: 1.5rem;
  }

  .texto-solucao-nx {
    text-align: center;
    width: 100%;
    margin-bottom: 0 !important; /* tira margem abaixo do título */
    padding-bottom: 0 !important;
    
  }

  .grade-cartoes-nx {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;
  }

  .cartao-nx {
    width: 160px;
    margin: 0 auto;
  }
}

/* Celulares */
@media (max-width: 600px) {
  .subtitulo-nx {
    font-size: 1.6rem;
  }

  .logo-solucao-nx {
    display: none; /* some no celular */
  }

  .cartao-nx {
    width: 270px;
    font-size: 0.9rem;
    padding: 0.8rem;
  }

  .botao-nx {
    font-size: 1rem;
    padding: 0.15rem 0.5rem;
  }
}

/* Celulares muito pequenos */
@media (max-width: 360px) {
  .subtitulo-nx {
    font-size: 1.3rem;
  }

  .logo-solucao-nx {
    display: none; /* garante que no menor também fique escondido */
  }

  .cartao-nx {
    width: 140px;
    padding: 0.6rem;
  }

  .botao-nx {
    font-size: 0.9rem;
    padding: 0.1rem 0.4rem;
  }
}

section.formulario-contato {
  margin-top: -300px;
  padding-top: 300px; /* se necessário, para afastar do conteúdo anterior */
  margin-bottom: 20px;

}
/* Tamanho base para telas grandes */
.hero h1 {
  font-size: 3.5rem; /* seu tamanho original */
  margin: 0.5rem 0;
}

.hero .subtitulo {
  font-size: 1.5rem; /* seu tamanho original */
  margin-bottom: 2rem;
}

/* Para tablets e telas médias */
@media (max-width: 992px) {
  .hero h1 {
    font-size: 3rem; /* um pouco maior que antes */
  }
  .hero .subtitulo {
    font-size: 1.4rem;
  }
}

/* Para celulares grandes e pequenos */
@media (max-width: 600px) {
  .hero h1 {
    font-size: 2.4rem; /* maior que o anterior */
  }
  .hero .subtitulo {
    font-size: 1.2rem;
  }
}

/* Para celulares muito pequenos (ex: 320px) */
@media (max-width: 360px) {
  .hero h1 {
    font-size: 2rem; /* maior que antes */
  }
  .hero .subtitulo {
    font-size: 1rem;
  }
}

.tras {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  color: rgb(0, 0, 0); /* texto branco no verso */
  font-size: 1rem;
  text-align:left;
}

.tras p {
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.botao-nx {
  margin-top: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: rgb(80, 80, 80);
  cursor: pointer;
}

.titulo-cartao-frente {
  margin-top: 25px; /* ou padding-top: 20px, ajuste conforme quiser */
}

.cartao-nx.preto {
  background-color: rgb(20, 20, 20) !important; /* ou a cor preta que estiver usando */
  color: rgb(172, 172, 172); /* para o texto ficar visível */
}

.tras .botao-nx:hover {
  background-color: #222; /* escurece levemente ao passar o mouse */
}
.tras .botao-nx {
  background-color: #2c2c2c; /* escurece levemente ao passar o mouse */
}
.espaco-rolagem {
 
  width: 100%;
}
.texto-extra-nx {
  margin-top: 10px;
  font-size: 14px;
  color: #fff; /* ou ajuste conforme o fundo do seu card */
  transition: opacity 0.3s ease;
}
section.sobre h2 {
  position: relative;
  display: inline-block; /* pra que o pseudo fique alinhado ao texto */
  padding-left: 10px; /* espaço para a linha */
}
.tras .botao-nx {
  background-color: rgb(26, 26, 26);
  color: white;
  border: none;
}
section.sobre h2::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 70px;           /* comprimento do sublinhado no começo */
  border-bottom: 3px solid #d4af37; /* cor dourada */
}

.home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('@/assets/Conta.png') no-repeat center center / cover;
  box-sizing: border-box;
  color: white;
  scroll-behavior: smooth;
  margin-top: -80px;
}
.hr-linha {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw; /* ou 95vw, como preferir */
  border: none;
  border-top: 1px solid white;
  margin: 20px 0;
}


.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(30, 30, 30, 0.7);
  backdrop-filter: blur(6px);
  z-index: 0;
}
.hero {
  position: relative;
  
}

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.conteudo {
  max-width: 700px;
  z-index: 1;
  position: relative;
  margin-top: 50px;
}

.logo {
  width: 100px;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 3.8rem;
  margin-bottom: 1rem;
}

.subtitulo {
  font-size: 1.3rem;
  color: #ccc;
}

.seta {
  margin-top: 2rem;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* Seção "Sobre" */
.sobre {
  background-color: #ffffff;
  color: #000000;
  padding: 4rem 2rem;
  text-align: center;
  z-index: 1;
  position: relative;
  height: 450px;
}
.frase-atual {
  transition: opacity 0.5s ease;
}

.sobre .container {
  max-width: 800px;
  margin: 0 auto;
}

.sobre h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-top: 30px;
}
/* Responsivo: diminui a margem superior para subir o texto */
@media (max-width: 768px) {
  .sobre h2 {
    margin-top: 10px; /* menos espaço em cima */
  }
}

@media (max-width: 400px) {
  .sobre h2 {
    margin-top: 5px; /* ainda menos em telas muito pequenas */
  }
}
.sobre p {
  font-size: 1.1rem;
  color: #1f1f1f;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.metricas {
  background-color: #111;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.metricas .container {
  max-width: 1000px;
  margin: 0 auto;
}

.metricas h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
}

.card {
  background-color: #1e1e1e;
  border-radius: 12px;
  padding: 2rem;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.card:hover {
  transform: scale(1.05);
  background-color: #2a2a2a;
}

.card h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #00c58e;
}

.card p {
  font-size: 1rem;
  color: #ccc;
}

.contato {
  background-color: #0e0e0e;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.contato .container {
  max-width: 800px;
  margin: 0 auto;
}

.contato h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.contato p {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 2rem;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}

.campo {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #eee;
}

input,
textarea {
  padding: 0.75rem 1rem;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #00c58e;
}

.btn-enviar {
  background-color: #00c58e;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.btn-enviar:hover {
  background-color: #00a36f;
}

.bloco-solucao-nx {
  background-color: #000000;
  padding: 60px 30px;
  font-family: Arial, sans-serif;
  max-height: 1500px;
}

.conteudo-solucao-nx {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.texto-solucao-nx {
  flex: 1;
  min-width: 250px;
  position: relative; /* necessário para posicionar a logo dentro dele */
  margin-top: -50px;
  align-items: c;
  font-size: 2.0rem;
}


.logo-solucao-nx {
  width: 400px;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  transform: translate(-10px, 20px);
  margin-top: 160px;
}

.grade-cartoes-nx {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-left: 40px;
  min-width: 300px;
  position: relative;
  
  
}

.botao-nx {
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 2px solid #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.botao-nx:hover {
  background-color: #eeeeee;
  border-color: #dddddd;
}

/* Cores específicas */
.laranja-nx,
.amarelo-nx,
.roxo-nx,
.verdeclaro-nx,
.verdeazul-nx,
.azulescuro-nx {
  background-color: #181818;
  color: #ffffff;
}

/* Responsivo */
@media (max-width: 768px) {
  .conteudo-solucao-nx {
    flex-direction: column;
    align-items: center;
  }

  .grade-cartoes-nx {
    grid-template-columns: 1fr;
    padding-left: 0;
  }

  .texto-solucao-nx {
    text-align: center;
    margin-bottom: 40px;
  }
  
}

.grade-cartoes-nx .cartao-nx p {
  margin-top: -60px;
  padding-top: 0;
}

.clientes-satisfeitos {
  background-color: #1e1e1e;
  padding: 5rem 2rem;
  color: #ffffff;
}

.conteudo-clientes {
  max-width: 1400px;
  margin: 0 auto;
}
.grid-clientes {
  display: flex;
  gap: 3rem;
  align-items: center;
  flex-wrap: nowrap; /* impede que caia para baixo */
  width: 100%;
  box-sizing: border-box;
}

.grid-esquerda {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  min-width: 600px; /* espaço mínimo para os cards lado a lado */
  flex-shrink: 0; /* impede encolher além do mínimo */
}

.grid-direita {
  flex-shrink: 0; /* impede encolher */
  width: 400px; /* largura fixa da imagem */
  display: flex;
  justify-content: flex-start; /* imagem colada à esquerda */
  align-items: center;
}

.grid-direita img {
  max-width: 120%;
  height: auto;
  object-fit: contain;
  margin-left: 40px; /* empurra a imagem para a direita */
  display: block;
  transform: none; /* remove transform para evitar conflito */
}
.card-metrica {
  padding: 1rem;
  border-radius: 20px;
  font-weight: bold;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.pequeno {
  font-size: 1rem;
  font-weight: 400;
  align-self: flex-start;
  line-height: 1.1;
  margin: 0;
  font-family: inherit;
}
.card-metrica .grande {
  font-size: 3.5rem;
  margin-bottom: 0.2rem;
  align-self: flex-start;
}
.card-metrica.dourado {
  background-color: #282288;
  color: #ffffff;
}
.card-metrica.branco {
  background-color: #ff841f;
  color: #ffffff;
}
.card-metrica.cinza-escuro {
  background-color: #fcee2b;
  color: #ffffff;
}
.card-metrica.preto {
 background-color: #2c5f1f;
  color: #ffffff;
}
.titulo-clientes {
  margin-bottom: 2rem;
  text-align: left;
}
/* Texto grande dourado */
.card-metrica p.grande {
  color: #000000; /* cor para o número grande */
}

.card-metrica p.pequeno {
  color: #000000; /* cor para o texto pequeno */
}

.balao {
  display: inline-block;
  background-color: #fae68b;
  color: #020202;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  margin-bottom: 1rem;
  font-family: sans-serif;
}
.balao::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #fae68b;
}
.titulo-grande {
  font-size: 2.4rem;
  font-weight: 600;
  color: #ffffff;
  font-family: sans-serif;
  margin-bottom: 60px;
}
.img-animada {
  animation: flutuar 3s ease-in-out infinite;
  display: block;
  max-width: 30%;
  height: auto;
}
@keyframes flutuar {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
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
  background-color: #1e1e1e;
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
  font-weight: 100;
}

.card-cjl h2 span {
  font-weight: 100;
  color: #d3d3d3;
  font-family: inherit;
}

.card-cjl p {
  font-size: 16px;
  margin-bottom: 25px;
  font-family: inherit;
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
  font-family: inherit;
  font-weight: 100;
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
}


.btn-contato:hover {
  background-color: #8f8f8f;
  color: white;
}
/* Container principal da seção */
.slider-nx {
  width: 100vw;
  background: #1e1e1e;
  height: 450px; /* mantém altura fixa */
  padding: 40px 20px 0 20px; /* aqui adiciona padding-top para abrir espaço para o conteúdo subindo */
  color: white;
  box-sizing: border-box;
  position: relative;
  overflow: visible; /* importante para não cortar */
}
/* Fundo laranja interno */
.fundo-laranja-nx {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  overflow: visible;
}

/* Container do título e balão */
.container-titulo-nx {
  margin-bottom: 0px;
  max-width: 1200px;
  margin-left: auto;
  color: white;
  box-sizing: border-box;

}

/* Balão */
.balao-nx {
 display: inline-block;
  background-color: #fae68b;
  color: #020202;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  margin-bottom: 1rem;
  font-family: sans-serif;
  margin-bottom: 50px;
}
.balao-nx::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid #fae68b;
}
/* Título */
.titulo-nx {
  font-size: 2rem;
  max-width: 500px;
  font-weight: 600;
  color: white;
  box-sizing: border-box;
}

/* Container do slider */
.slider-container-nx {
  display: flex;
  flex-direction: column; /* filhos empilhados verticalmente */
  align-items: flex-end; /* mantém cards alinhados à direita */
  overflow-x: auto;
  overflow-y: visible;
  width: 100vw;
  /* demais estilos que você já usa */
}

.slide-track-nx {
  display: flex;
  flex-direction: row; 
  
}

/* Cada card */
.card-nx {
  display: flex;
  flex-direction: column-reverse; /* inverte: texto embaixo, imagem em cima */
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 450px;
  background: #f2fbff;
  color: #003638;
  border-radius: 12px;
  padding: 24px;
  margin-left: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
  transform: translate(-50px, 0px);
  text-align: center;
  top: -40px;
}

/* Conteúdo texto do card */
.conteudo-texto {
  flex: 1;
  box-sizing: border-box;
  text-align: justify;
}

/* Ícone do card */
.icone-card-nx {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  object-fit: contain;
  box-sizing: border-box;
  margin-bottom: 100px;
  margin-right: 150px;
}

/* Título do card */
.titulo-card-nx {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 6px;
  box-sizing: border-box;
  text-align: center;
  color: #000;
}

/* Descrição do card */
.descricao-card-nx {
  font-size: 0.95rem;
  line-height: 1.4;
  box-sizing: border-box;
  text-align: justify;
}
.paginacao-nx {
  display: flex;
  justify-content: flex-end; /* alinha à direita */
  gap: 15px;                 /* espaço entre bolinhas */
  width: 100%;
  padding-right: 315px;       /* empurra as bolinhas um pouco para a esquerda */
  margin-top: 300px;
}

.cards-wrapper-nx {
  position: absolute;
  top: 150px; /* ajusta a altura desejada */
  right: 0;
}
.ponto-nx {
  width: 6px;
  height: 6px;
  background: #a1a1a1; /* cinza claro */
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: -150px;
}

.ponto-nx.ativo {
  background: #000000; /* preto */
  transform: scale(1.2);
}
.formulario-contato {
  background: #ffffff; /* cinza escuro */
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  margin-bottom: -60px;
}

.container-form {
  background: #222;
  border: 1px solid #fff; /* borda fina branca */
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
  margin-top: -60px;
}

.titulo-contato {
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: 600;
  color: #ffffff;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  transition: border-color 0.3s, background-color 0.3s;
}

input:focus,
textarea:focus {
  border-color: #fdff8a;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.btn-enviar {
  background-color: #fdff8a;
  color: rgb(7, 7, 7);
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

}

.btn-enviar:hover {
  background-color: #feffd1;
}
@media (max-width: 768px) {
  .conteudo {
    padding: 20px;
    text-align: center;
  }

  .grid-clientes {
    flex-direction: column;
    align-items: center;
  }

  .card-cjl {
    padding: 20px;
  }

  .imagem-cjl img {
    max-width: 100%;
    height: auto;
  }

 .slider-container-nx {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important; /* centraliza horizontalmente */
    justify-content: center !important; /* centraliza verticalmente */
    min-height: 100vh !important; /* ocupa toda altura da tela */
    margin: 0 auto !important;
  
  }

  .card-nx {
    min-width: 250px;
    scroll-snap-align: start;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form input,
  form textarea,
  form button {
    width: 100%;
    margin-bottom: 1rem;
  }
}

</style>
