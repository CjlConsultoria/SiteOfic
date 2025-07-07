<template lang="pug">
  #app
    .pixel-image-container(ref="pixelImageContainer")
      .pixel-image(:style="{ backgroundImage: `url(${imgprincipal})` }")

    .container
      .overlay-transparent
        .titulo-centralizado
          hr.linha-horizontal
          h1 Consultoria CJL
          hr.linha-horizontal
          .slide-textos(:key="textoAtual")
            p {{ textos[textoAtual] }}
          .seta-baixo(role="button", aria-label="Descer", tabindex="0", @click="scrollParaBaixo", @keydown.enter="scrollParaBaixo")
            svg(xmlns="http://www.w3.org/2000/svg", fill="none", viewBox="0 0 24 24", stroke="currentColor", stroke-width="2", width="40", height="40")
              path(stroke-linecap="round", stroke-linejoin="round", d="M19 9l-7 7-7-7")

    .nova-secao-branca
      .conteudo-novo
        h2 Sobre a CJL
        p Empresa com crescimento nacional nos últimos 5 anos inovando tecnologias, conformidade e segurança ao seu negócio. Sabemos da importância da sua empresa e por isso nos adaptamos ao modelo empresarial e a qualquer regra de negócio.
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import logocjl from '@/assets/logocjl.png'
import imgprincipal from '@/assets/principal.jpg'

const textos = ['INOVAÇÃO DIGITAL', 'INOVAÇÃO DIGITAL', 'SEGURANÇA SIBERNÉTICA']

const textoAtual = ref(0)
let intervalo: number | undefined

onMounted(() => {
  intervalo = window.setInterval(() => {
    textoAtual.value = (textoAtual.value + 1) % textos.length
  }, 3000)
})

onUnmounted(() => {
  if (intervalo) clearInterval(intervalo)
})

function scrollParaBaixo() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const pixelImageContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!pixelImageContainer.value) return

  const container = pixelImageContainer.value
  const canvas = document.createElement('canvas')
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  container.appendChild(canvas)

  const ctx = canvas.getContext('2d')!

  function resizeCanvas() {
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
  }
  resizeCanvas()

  const bubbles: { element: HTMLDivElement; size: number; left: number; top: number }[] = []

  function createBubble() {
    const bubble = document.createElement('div')
    const size = Math.random() * 5 + 2
    const left = Math.random() * (container.clientWidth - size)
    const top = Math.random() * (container.clientHeight - size)

    bubble.style.position = 'absolute'
    bubble.style.width = `${size}px`
    bubble.style.height = `${size}px`
    bubble.style.backgroundColor = 'rgba(255, 255, 255, 1)'
    bubble.style.borderRadius = '50%'
    bubble.style.left = `${left}px`
    bubble.style.top = `${top}px`
    bubble.style.pointerEvents = 'auto'

    container.appendChild(bubble)
    bubbles.push({ element: bubble, size, left, top })

    function animateBubble() {
      let randomX = (Math.random() - 0.5) * 200
      let randomY = (Math.random() - 0.5) * 200
      const maxX = container.clientWidth - size
      const maxY = container.clientHeight - size

      randomX = Math.max(-left, Math.min(randomX, maxX - left))
      randomY = Math.max(-top, Math.min(randomY, maxY - top))

      bubble.animate(
        [
          { transform: 'translate(0px, 0px)' },
          { transform: `translate(${randomX}px, ${randomY}px)` },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: 'ease-in-out',
          iterations: Infinity,
          direction: 'alternate',
        },
      )
    }
    animateBubble()
  }

  for (let i = 0; i < 80; i++) createBubble()

  function drawLines(mouseX: number, mouseY: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bubbles.forEach((bubbleObj) => {
      const rect = bubbleObj.element.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const x = rect.left + rect.width / 2 - containerRect.left
      const y = rect.top + rect.height / 2 - containerRect.top
      const dx = mouseX - containerRect.left - x
      const dy = mouseY - containerRect.top - y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 80) {
        ctx.beginPath()
        ctx.moveTo(mouseX - containerRect.left, mouseY - containerRect.top)
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.lineWidth = 1
        ctx.stroke()
      }
    })
  }

  container.addEventListener('mousemove', (event) => {
    drawLines(event.clientX, event.clientY)
  })

  container.addEventListener('mouseleave', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  })

  window.addEventListener('resize', () => {
    resizeCanvas()
  })
})
</script>

<style scoped>
/* Navbar fixa com efeito vidro */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  /* transparente inicialmente */
  background: rgba(24, 24, 24, 0);
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);

  transition:
    background-color 0.3s ease,
    backdrop-filter 0.3s ease;

  z-index: 1000;
  font-family: 'Georgia', serif;
  font-weight: 600;
  font-size: 1rem;
}

/* Quando a navbar tiver a classe scrolled, mostra o fundo */
.navbar.scrolled {
  background: rgba(24, 24, 24, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Logo */
.logo img {
  height: 130px;
  margin-bottom: -15px;
}

.logo {
  margin-right: 1rem;
}

/* Menu e botões */
.menu-e-botoes {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu a {
  position: relative;
  color: #bbb;
  text-decoration: none;
  transition: color 0.3s;
  font-family: 'Georgia', serif;
  font-weight: 600;
  padding-bottom: 4px;
  display: inline-block;
  margin-left: 30px;
  font-size: 18px;
}

.menu a::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 2px;
  width: 0;
  background-color: #beb167;
  opacity: 0;
  transition:
    width 0.9s ease,
    opacity 0.9s ease;
}

.menu a:hover::after {
  width: 100%;
  left: 0;
  right: auto;
  opacity: 1;
}

.menu a:hover,
.menu a:focus {
  background: none;
  outline: none;
  box-shadow: none;
  color: #dbdbdb;
}

.menu .router-link-exact-active {
  border-bottom: none;
}

/* Botões */
.navbar-buttons {
  display: flex;
  gap: 0.8rem;
}

.btn {
  cursor: pointer;
  background: transparent;
  color: white;
  border: none;
  box-shadow: 0 0 0 0.5px rgba(231, 231, 231, 0.5);
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-family: 'Georgia', serif;
  font-weight: 600;
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s;
}

.btn:hover {
  background-color: rgb(221, 221, 221);
  color: black;
  border-color: white;
  text-decoration: none;
}

/* Espaço para o conteúdo não ficar atrás da navbar */
main,
.container-preto {
  position: relative;
  z-index: 10;
  padding-top: 100vh; /* mantém o espaçamento */
  margin: 0 auto;
  max-width: 1200px; /* limita só main e container-preto */
}

/* Container da imagem e efeito */
.pixel-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 998;
  overflow: hidden;
}

/* Imagem pixelada fixa atrás de tudo */
.pixel-image {
  width: 100%;
  height: 100%;
  background-image: url('https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  image-rendering: pixelated;
}

/* Fundo transparente sobre a imagem */
.overlay-transparent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: none;
  z-index: 999;
}
.body {
  overflow-x: hidden !important;
}
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden !important;
  width: 100%;
  box-sizing: border-box;
}

.titulo-centralizado {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: inherit;
  letter-spacing: 2px;
  color: white;
  z-index: 1001;
  width: 100%;
}

.titulo-centralizado h1 {
  margin: 0.5rem 0;
  font-size: 4.5rem;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 2px;
}

.linha-horizontal {
  border: none;
  border-top: 1px solid white;
  opacity: 0.3;
  margin: 0.5rem auto;
  width: 90vw;
  max-width: none;
}

.slide-textos {
  margin: 1rem auto;
  text-align: center;
  color: white;
  font-size: 1.2rem;
  font-family: inherit;
  letter-spacing: 2px;
  max-width: 800px;
  min-height: 50px;
  transition: opacity 0.5s ease-in-out;
}

.seta-baixo {
  width: 40px;
  margin: 1rem auto 0;
  cursor: pointer;
  color: white;
  transition: transform 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.seta-baixo:hover {
  transform: translateY(5px);
}

.seta-baixo svg {
  width: 100%;
  height: 100%;
}
main {
  position: relative;
  z-index: 10;
  padding-top: 100vh;
  margin: 0 auto;
  max-width: 1200px;
}

.container-preto {
  width: auto;
  height: 50vh; /* ou a altura desejada */
  background-color: black;
  position: relative;
  z-index: 10;
}

.nova-secao-branca {
  width: 100vw;
  background-color: black;
  position: relative;
  padding: 4rem 0; /* espaçamento vertical */
  z-index: 10;
  padding-top: 100vh; /* mantém o espaçamento */
  margin: 0 auto;
  max-width: 1200px; /* limita só main e container-preto */
  overflow-x: hidden;
}

.nova-secao-branca .conteudo-novo {
  width: 100vw;
  max-width: 1200px;
  text-align: center;
  margin: 0 auto;
  padding: 0 1rem; /* para evitar que o texto encoste nas bordas em telas pequenas */
  box-sizing: border-box;
}

.nova-secao-branca h2,
.nova-secao-branca p {
  color: #ffffff;
}
.nova-secao-branca h2 {
  font-size: 4vh;
  font-family: inherit;
  font-weight: 100; /* Fonte bem fina */
  margin-bottom: 15px;
  margin-top: 30px;
}
.nova-secao-branca p {
  font-size: 2vh;
  font-family: inherit;
  margin-bottom: 15px;
  color: rgb(158, 158, 158);
}

.conteudo-numeros {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.texto-numeros {
  flex: 1;
}

.tag-titulo {
  display: inline-block;
  background-color: #fff;
  color: #001c1e;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.grid-numeros {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'Georgia', serif;
  font-weight: bold;
  color: white;
}

.verde {
  background-color: #6bd4a5;
  color: #001c1e;
}
.azul {
  background-color: #005c64;
}
.laranja {
  background-color: #ff814e;
  color: #001c1e;
}
.preto {
  background-color: #111;
}

.card h3 {
  font-size: 2rem;
  margin: 0 0 0.5rem;
}

.card p {
  font-size: 0.9rem;
  margin: 0;
}

.mapa-brasil {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mapa-brasil img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
