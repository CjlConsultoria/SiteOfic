<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import contaImg from '@/assets/conta.png'  // ajuste a extensão conforme sua imagem
import logoImg from '@/assets/logocjl.png'  // ajuste o caminho e nome da logo
import ImagemEquipe from '@/assets/consultoria.webp'

const visibleCards = 3
const cardWidthPx = 320 // largura fixa de cada card em px (ajuste se quiser)

const consultoriaCards = [
  { title: 'Essencial', desc: 'Ideal para pequenas empresas que estão começando sua jornada digital.', items: ['Diagnóstico inicial', 'Suporte remoto mensal', 'Relatório estratégico'], preco: 'R$ 499/mês', buttonText: 'Contratar' },
  { title: 'Profissional', desc: 'Consultoria com acompanhamento mais próximo e reuniões estratégicas.', items: ['Tudo do Essencial', '2 reuniões mensais', 'Acesso a especialista dedicado'], preco: 'R$ 899/mês', buttonText: 'Contratar' },
  { title: 'Corporativo', desc: 'Consultoria personalizada para times e empresas em escala.', items: ['Tudo do Profissional', 'Treinamentos exclusivos', 'Plano de ação trimestral'], preco: 'R$ 1499/mês', buttonText: 'Contratar' },
  // repetidos para totalizar 10 cards
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
  // repetir para ter 10 cards
  { title: 'Extra 1', desc: 'Software extra 1', items: ['Item 1', 'Item 2'], preco: 'R$ 4.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 2', desc: 'Software extra 2', items: ['Item 1', 'Item 2'], preco: 'R$ 5.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 3', desc: 'Software extra 3', items: ['Item 1', 'Item 2'], preco: 'R$ 6.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 4', desc: 'Software extra 4', items: ['Item 1', 'Item 2'], preco: 'R$ 7.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 5', desc: 'Software extra 5', items: ['Item 1', 'Item 2'], preco: 'R$ 8.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 6', desc: 'Software extra 6', items: ['Item 1', 'Item 2'], preco: 'R$ 9.000', buttonText: 'Solicitar Orçamento' },
  { title: 'Extra 7', desc: 'Software extra 7', items: ['Item 1', 'Item 2'], preco: 'R$ 10.000', buttonText: 'Solicitar Orçamento' },
]

// Estados dos sliders
const currentIndexConsultoria = ref(0)
const currentIndexSoftware = ref(0)

const maxIndexConsultoria = consultoriaCards.length - visibleCards
const maxIndexSoftware = softwareCards.length - visibleCards

// Calcula o deslocamento em px para cada slider
const translateXConsultoria = computed(() => currentIndexConsultoria.value * cardWidthPx)
const translateXSoftware = computed(() => currentIndexSoftware.value * cardWidthPx)

function prevConsultoria() {
  if (currentIndexConsultoria.value > 0) currentIndexConsultoria.value--
}
function nextConsultoria() {
  if (currentIndexConsultoria.value < maxIndexConsultoria) currentIndexConsultoria.value++
}

function prevSoftware() {
  if (currentIndexSoftware.value > 0) currentIndexSoftware.value--
}
function nextSoftware() {
  if (currentIndexSoftware.value < maxIndexSoftware) currentIndexSoftware.value++
}
const depoimentos = [
 {
    texto: `“A CJL transformou completamente a forma como gerenciamos nossos processos internos. 
    Desde a implementação das soluções, nossa equipe está muito mais produtiva e os resultados saltaram significativamente. 
    O atendimento personalizado faz toda a diferença e a parceria tem sido fundamental para o nosso sucesso. 
    Recomendo a CJL de olhos fechados para qualquer empresa que queira crescer de forma sustentável.”`,
    nome: 'Dra. Mirela Rufato',
    cargo: 'Superintendente – Unimed Penápolis'
  },
  {
    texto: `“O suporte da CJL foi essencial para superar desafios técnicos que enfrentávamos há anos. 
    Profissionais competentes e atendimento ágil fizeram toda a diferença para o sucesso do nosso projeto. 
    A equipe está sempre disponível para esclarecer dúvidas e propor melhorias que realmente agregam valor. 
    Estamos muito satisfeitos com os resultados e com a evolução constante que temos alcançado graças à CJL.”`,
    nome: 'Fulano da Silva',
    cargo: 'Diretor – Empresa Exemplo'
  },
  {
    texto: `“Nosso negócio ganhou agilidade e inovação com as soluções personalizadas da CJL. 
    A parceria tem sido fundamental para alcançarmos nossos objetivos e expandir nossa atuação no mercado. 
    A CJL entende as necessidades específicas da nossa empresa e oferece suporte de alta qualidade. 
    Sem dúvida, é um diferencial competitivo contar com uma consultoria tão dedicada e experiente.”`,
    nome: 'Maria Oliveira',
    cargo: 'Gerente – Organização XYZ'
  },
  {
    texto: `“A equipe da CJL demonstrou total comprometimento e domínio técnico. 
    Os resultados superaram as expectativas, com entregas dentro do prazo e suporte contínuo que nos tranquiliza. 
    Além disso, a comunicação é transparente e sempre buscamos alinhar as estratégias conforme nossas demandas. 
    Trabalhar com a CJL é garantia de excelência e crescimento sustentável.”`,
    nome: 'Carlos Menezes',
    cargo: 'CEO – Tech Solutions'
  },
  {
    texto: `“Com a consultoria da CJL, conseguimos otimizar recursos e melhorar processos internos. 
    A atenção aos detalhes e o planejamento estratégico fizeram toda a diferença para o nosso crescimento. 
    Recebemos um atendimento personalizado e soluções que realmente funcionam para a nossa realidade. 
    A confiança na CJL nos permite focar no que fazemos de melhor enquanto eles cuidam da tecnologia.”`,
    nome: 'Ana Beatriz Souza',
    cargo: 'Coordenadora de Projetos – Innovatech'
  }

]

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
</script>

<template lang="pug">
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

section.sessao-cjl(id="sessao")
  .card-cjl
    h2.titulo-cinza Muito além de um mero cara da TI ou um simples apagador de incêndios.
    p.description
      | Oferecemos um grupo de profissionais especializados, prontos para atendê-lo de forma excepcional e eliminar definitivamente os seus problemas tecnológicos.
    a.btn-contato(
      href="https://wa.me/5527992828470?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
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
    h2.rbm-titulo-central Título Centralizado
    p.rbm-descricao-cinza Esta é uma descrição em cinza claro explicando os detalhes da sessão.

section.sessao-consultoria
  .imagem-lado
    img(:src="contaImg" alt="Consultoria de TI")
  .texto-lado
    h2.titulo-consultoria Consultoria de TI Especializada
    p.descricao-consultoria
      | Nossa empresa de tecnologia oferece soluções inovadoras e personalizadas para transformar o seu negócio. Com uma equipe especializada em consultoria, desenvolvimento de software e suporte técnico, garantimos eficiência e segurança em cada projeto. Utilizamos as mais modernas ferramentas e metodologias para atender às necessidades específicas dos nossos clientes. Nosso compromisso é entregar resultados que impulsionem a produtividade e a competitividade no mercado. Valorizamos a transparência, o atendimento ágil e a parceria duradoura. Estamos prontos para ajudar sua empresa a crescer com tecnologia de ponta. Junte-se a nós e transforme o futuro da sua organização.




main.planos
  section.consultoria
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

  </template>

<style scoped>
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
}

.rbm-descricao-cinza {
  font-size: 1.1rem;
  color: #adadad;
  margin-top: -20px;
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
  width: 50%;
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
  font-family: 'Times New Roman', Times, serif;
  color: #ffffff;
}

.imagem-lado img {
  width: 100%;
  height: 400px; /* ajuste o valor conforme desejar */
  border-radius: 8px;
  object-fit: cover;
}

.texto-lado {
  flex: 0 0 50%; /* fixa 50% da largura */
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Times New Roman', Times, serif;
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
  overflow: hidden;
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
  background: #1f1f1f;
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
}

.card p {
  font-size: 1rem;
  color: #acacac;
  margin-bottom: 1rem;
  font-family: 'Times New Roman', Times, serif;
}

ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  text-align: left;
  color: #ffff;
  font-family: 'Times New Roman', Times, serif;
}

ul li::before {
  content: '✓ ';
  color: #dbdbdb;
  margin-right: 0.5rem;
  font-family: 'Times New Roman', Times, serif;
}

.preco {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 1rem;
  display: inline-block;
  font-family: 'Times New Roman', Times, serif;
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
  font-family: 'Times New Roman', Times, serif;
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
