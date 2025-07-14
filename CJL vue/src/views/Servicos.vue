<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import contaImg from '@/assets/conta.png'  // ajuste a extensão conforme sua imagem
import logoImg from '@/assets/logocjl.png'  // ajuste o caminho e nome da logo
import ImagemEquipe from '@/assets/consultoria.webp'
import { useRouter } from 'vue-router'

// Definição das configurações básicas
const cardWidthPx = 375 // largura fixa do card em px (ajuste se necessário)
const visibleCardsDesktop = 3
const visibleCardsMobile = 1

// Estado para monitorar largura da janela (responsividade)
const windowWidth = ref(window.innerWidth)

// Atualiza o windowWidth ao redimensionar a tela
function onResize() {
  windowWidth.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

// Retorna quantos cards ficam visíveis conforme largura da tela
const visibleCards = computed(() => {
  return windowWidth.value <= 768 ? visibleCardsMobile : visibleCardsDesktop
})

// Dados dos cards de consultoria
const consultoriaCards = [
  {
    title: 'Plano Iniciante',
    desc: 'Ideal para pequenos negócios que precisam de soluções básicas de TI.',
    items: ['5 licenças de software', 'Suporte técnico via e-mail', 'Atualizações automáticas'],
    preco: 'R$ 29,90/mês | R$ 299,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Essencial',
    desc: 'Perfeito para equipes em crescimento que precisam de estabilidade e suporte.',
    items: ['10 licenças de software', 'Suporte por chat e e-mail', 'Backups semanais', 'Painel de controle'],
    preco: 'R$ 49,90/mês | R$ 499,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Profissional',
    desc: 'Para empresas que precisam de escalabilidade e segurança avançada.',
    items: ['20 licenças de software', 'Suporte remoto 24/7', 'Monitoramento de rede', 'Antivírus corporativo'],
    preco: 'R$ 99,90/mês | R$ 999,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Corporativo',
    desc: 'Solução completa para médias empresas com estrutura tecnológica robusta.',
    items: ['30 licenças de software', 'Suporte dedicado', 'Controle de acesso por usuário', 'Integrações com ERP'],
    preco: 'R$ 149,90/mês | R$ 1.499,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Empresarial',
    desc: 'Consultoria e infraestrutura de TI sob demanda para grandes empresas.',
    items: ['50 licenças de software', 'Gestão de TI completa', 'Treinamentos mensais', 'Automação de processos'],
    preco: 'R$ 249,90/mês | R$ 2.499,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Avançado',
    desc: 'Recursos avançados para equipes técnicas que precisam de flexibilidade.',
    items: ['75 licenças de software', 'APIs dedicadas', 'Ambiente de testes', 'Logs em tempo real'],
    preco: 'R$ 349,90/mês | R$ 3.499,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Premium',
    desc: 'Experiência completa de TI com suporte exclusivo e SLA garantido.',
    items: ['100 licenças de software', 'Suporte SLA 1h', 'Ambiente em nuvem privado', 'Acesso via VPN'],
    preco: 'R$ 499,90/mês | R$ 4.999,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Ultra',
    desc: 'Para empresas que exigem alta disponibilidade e segurança.',
    items: ['150 licenças de software', 'Alta redundância', 'Auditorias de segurança trimestrais', 'Disaster Recovery'],
    preco: 'R$ 699,90/mês | R$ 6.999,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Mega',
    desc: 'Infraestrutura e consultoria contínua para operações críticas.',
    items: ['200 licenças de software', 'Equipe dedicada de TI', 'Consultoria mensal personalizada', 'Relatórios de performance'],
    preco: 'R$ 899,90/mês | R$ 8.999,00/ano',
    buttonText: 'CONTRATAR'
  },
  {
    title: 'Plano Enterprise',
    desc: 'Pacote completo com gestão de tecnologia ponta a ponta.',
    items: ['Licenças ilimitadas', 'TI terceirizada 360º', 'Projetos customizados', 'Integração com sistemas legados'],
    preco: 'R$ 1.299,90/mês | R$ 12.999,00/ano',
    buttonText: 'CONTRATAR'
  }
]


// Dados dos cards de software
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

// Índices dos sliders
const currentIndexConsultoria = ref(0)
const currentIndexSoftware = ref(0)

// Calcula o máximo índice para cada slider considerando quantos cards estão visíveis
const maxIndexConsultoria = computed(() => consultoriaCards.length - visibleCards.value)
const maxIndexSoftware = computed(() => softwareCards.length - visibleCards.value)

// Calcula o deslocamento em px para aplicar o transform no slide
const translateXConsultoria = computed(() => currentIndexConsultoria.value * cardWidthPx)
const translateXSoftware = computed(() => currentIndexSoftware.value * cardWidthPx)

// Funções para controlar os sliders
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

// Depoimentos para o slider de depoimentos
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
const router = useRouter()

// Função de clique no botão
const contratarPlano = (card: any) => {
  console.log(`Plano selecionado: ${card.title}`)
  router.push('/planos') // Rota para a página desejada
}



// Estado atual do depoimento que está sendo mostrado
const depoimentoAtual = ref(0)

// Intervalo para trocar depoimentos automaticamente
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
    h2.titulo-cinza Consultoria Estratégica de TI
    p.description
      | A Consultoria Estratégica de TI é fundamental para alinhar a tecnologia aos objetivos de negócio, transformando investimentos em inovação, eficiência e competitividade. Nosso trabalho vai além da simples implementação de soluções; ajudamos sua empresa a definir prioridades.
    a.btn-contato(
      href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
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
      href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20solicitar%20um%20orçamento."
      target="_blank"
      rel="noopener noreferrer"
      ) CONTATE-NOS




main.planos
  section.consultoria
    .container
      h2 Sistema para testes
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
                button(@click="contratarPlano") {{ card.buttonText }}


        button.btn-next(@click="nextConsultoria" :disabled="currentIndexConsultoria >= maxIndexConsultoria") ›

  </template>

<style scoped>
body, * {
  font-family: 'SuaFonteEscolhida', sans-serif !important;
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
