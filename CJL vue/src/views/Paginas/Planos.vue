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
  { title: 'Essencial', desc: 'Ideal para pequenas empresas que estão começando sua jornada digital.', items: ['Diagnóstico inicial', 'Suporte remoto mensal', 'Relatório estratégico'], preco: 'R$ 499/mês', buttonText: 'Contratar' },
  { title: 'Profissional', desc: 'Consultoria com acompanhamento mais próximo e reuniões estratégicas.', items: ['Tudo do Essencial', '2 reuniões mensais', 'Acesso a especialista dedicado'], preco: 'R$ 899/mês', buttonText: 'Contratar' },
  { title: 'Corporativo', desc: 'Consultoria personalizada para times e empresas em escala.', items: ['Tudo do Profissional', 'Treinamentos exclusivos', 'Plano de ação trimestral'], preco: 'R$ 1499/mês', buttonText: 'Contratar' },
  { title: 'Extra 1', desc: 'Plano extra 1', items: ['Item 1', 'Item 2'], preco: 'R$ 600/mês', buttonText: 'Contratar' },
  { title: 'Extra 2', desc: 'Plano extra 2', items: ['Item 1', 'Item 2'], preco: 'R$ 700/mês', buttonText: 'Contratar' },
  { title: 'Extra 3', desc: 'Plano extra 3', items: ['Item 1', 'Item 2'], preco: 'R$ 800/mês', buttonText: 'Contratar' },
  { title: 'Extra 4', desc: 'Plano extra 4', items: ['Item 1', 'Item 2'], preco: 'R$ 900/mês', buttonText: 'Contratar' },
  { title: 'Extra 5', desc: 'Plano extra 5', items: ['Item 1', 'Item 2'], preco: 'R$ 1000/mês', buttonText: 'Contratar' },
  { title: 'Extra 6', desc: 'Plano extra 6', items: ['Item 1', 'Item 2'], preco: 'R$ 1100/mês', buttonText: 'Contratar' },
  { title: 'Extra 7', desc: 'Plano extra 7', items: ['Item 1', 'Item 2'], preco: 'R$ 1200/mês', buttonText: 'Contratar' },
]

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
  { title: 'Extra 7', desc: 'Software extra 7', items: ['Item 1', 'Item 2'], preco: 'R$ 10.000', buttonText: 'Solicitar Orçamento' },
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
        button.btn-prev(@click="prevConsultoria" :disabled="currentIndexConsultoria === 0") ‹
        .cards-wrapper
          .cards(:style="`transform: translateX(-${translateXConsultoria}px)`")
            template(v-for="(card, i) in consultoriaCards" :key="i")
              .card
                h3 {{ card.title }}
                p {{ card.desc }}
                ul
                  template(v-for="(item, j) in card.items" :key="j")
                    li {{ item }}
                span.preco {{ card.preco }}
                button {{ card.buttonText }}
        button.btn-next(@click="nextConsultoria" :disabled="currentIndexConsultoria >= maxIndexConsultoria") ›

  section.software
    .container
      h2 Planos de Desenvolvimento de Software
      .slider
        button.btn-prev(@click="prevSoftware" :disabled="currentIndexSoftware === 0") ‹
        .cards-wrapper
          .cards(:style="`transform: translateX(-${translateXSoftware}px)`")
            template(v-for="(card, i) in softwareCards" :key="i")
              .card
                h3 {{ card.title }}
                p {{ card.desc }}
                ul
                  template(v-for="(item, j) in card.items" :key="j")
                    li {{ item }}
                span.preco {{ card.preco }}
                button {{ card.buttonText }}
        button.btn-next(@click="nextSoftware" :disabled="currentIndexSoftware >= maxIndexSoftware") ›
</template>

<style scoped>
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

@media (max-width: 768px) {
  .cards-wrapper {
    width: 360px !important;
    overflow: hidden !important;
    transform: translateX(-50px); /* ajusta o valor negativo conforme quiser */
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
    transform: translateY(-50%);
    z-index: 10;
    font-size: 32px;
    background: transparent;
    border: none;
    color: rgb(44, 44, 44) !important;
    cursor: pointer;
  }

  .btn-prev {
    left: -35px !important; /* totalmente fora do card */
  }

  .btn-next {
    right: -45px !important; /* totalmente fora do card */
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
