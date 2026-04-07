<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue'

function checkReveal() {
  const reveals = document.querySelectorAll('.sys-reveal:not(.sys-visible)')
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('sys-visible')
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkReveal, { passive: true })
  window.addEventListener('resize', checkReveal)
  nextTick(() => {
    checkReveal()
    setTimeout(checkReveal, 150)
    setTimeout(checkReveal, 500)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkReveal)
  window.removeEventListener('resize', checkReveal)
})
</script>

<template>
  <div class="sistemas-page">

    <!-- HERO -->
    <section class="sys-hero">
      <div class="sys-hero-bg"></div>
      <div class="sys-container sys-hero-content">
        <span class="sys-tag-light">Nossos Sistemas</span>
        <h1>Sistemas desenvolvidos pela <span class="sys-highlight">CJL Consultoria</span></h1>
        <p>Soluções próprias que já estão no mercado resolvendo problemas reais. Cada sistema foi construído para atender necessidades específicas com tecnologia moderna e foco em resultado.</p>
      </div>
    </section>

    <!-- CONVIVIUM -->
    <section class="sys-section" id="convivium">
      <div class="sys-container">
        <div class="sys-system-card sys-reveal">
          <div class="sys-system-header">
            <div class="sys-system-badge sys-badge-convivium">Operacional</div>
            <h2>&#127869; Convivium</h2>
            <p class="sys-system-tagline">Sistema de gestão para alimentação e hospitalidade</p>
          </div>

          <div class="sys-system-body">
            <div class="sys-system-desc">
              <h3>O que é</h3>
              <p>O Convivium é uma plataforma completa de gestão para restaurantes, bares, buffets e empresas do setor de alimentação. Controle operacional do pedido à entrega, com foco em eficiência e experiência do cliente.</p>

              <h3>Problema que resolve</h3>
              <p>Restaurantes e negócios de alimentação frequentemente operam com processos manuais, controle de estoque desorganizado e dificuldade em acompanhar pedidos em tempo real. Isso gera desperdício, atrasos e perda de receita.</p>

              <h3>Como funciona</h3>
              <ul>
                <li><strong>Gestão de pedidos:</strong> Receba, acompanhe e gerencie pedidos de forma centralizada, do balcão ao delivery</li>
                <li><strong>Controle de estoque:</strong> Monitore entradas e saídas de insumos, evitando desperdício e ruptura</li>
                <li><strong>Painel operacional:</strong> Visão em tempo real de tudo que está acontecendo no estabelecimento</li>
                <li><strong>Relatórios:</strong> Dados de vendas, produtos mais pedidos, horários de pico e margem de lucro</li>
                <li><strong>Multi-unidade:</strong> Gerencie mais de um ponto de venda em um único painel</li>
              </ul>

              <h3>Para quem</h3>
              <p>Restaurantes, bares, lanchonetes, buffets, dark kitchens e empresas de catering que querem profissionalizar a operação com tecnologia.</p>
            </div>

            <div class="sys-system-info">
              <div class="sys-info-box">
                <span class="sys-info-label">Status</span>
                <span class="sys-info-value sys-status-active">&#9679; Ativo</span>
              </div>
              <div class="sys-info-box">
                <span class="sys-info-label">Plataforma</span>
                <span class="sys-info-value">Web</span>
              </div>
              <div class="sys-info-box">
                <span class="sys-info-label">Acesso</span>
                <span class="sys-info-value">Login na plataforma CJL</span>
              </div>
              <a href="https://convivium-front.onrender.com" target="_blank" rel="noopener" class="sys-btn sys-btn-primary">Acessar Convivium</a>
              <a href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Convivium." target="_blank" rel="noopener" class="sys-btn sys-btn-outline">Falar com comercial</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRADELINKINVEST -->
    <section class="sys-section sys-section-alt" id="tradelinkinvest">
      <div class="sys-container">
        <div class="sys-system-card sys-reveal">
          <div class="sys-system-header">
            <div class="sys-system-badge sys-badge-trade">Investimentos</div>
            <h2>&#128200; TradeLinkInvest</h2>
            <p class="sys-system-tagline">Plataforma de análise e acompanhamento de investimentos</p>
          </div>

          <div class="sys-system-body">
            <div class="sys-system-desc">
              <h3>O que é</h3>
              <p>O TradeLinkInvest é uma plataforma voltada para investidores que querem dados claros e acionáveis. Ferramentas de análise, acompanhamento de carteira e tomada de decisão baseada em dados reais do mercado.</p>

              <h3>Problema que resolve</h3>
              <p>Investidores — especialmente os que estão começando ou gerenciam carteiras diversificadas — sofrem com excesso de informação dispersa, dificuldade em acompanhar rentabilidade real e falta de ferramentas acessíveis em português.</p>

              <h3>Como funciona</h3>
              <ul>
                <li><strong>Dashboard de carteira:</strong> Visão consolidada de todos os seus investimentos em um só lugar</li>
                <li><strong>Análise de ativos:</strong> Indicadores fundamentalistas e técnicos para apoiar decisões</li>
                <li><strong>Acompanhamento de rentabilidade:</strong> Rentabilidade real vs benchmark, com gráficos intuitivos</li>
                <li><strong>Alertas personalizados:</strong> Notificações sobre variações relevantes nos seus ativos</li>
                <li><strong>Conteúdo educativo:</strong> Material para ajudar investidores a evoluírem suas estratégias</li>
              </ul>

              <h3>Para quem</h3>
              <p>Investidores individuais, assessores de investimento e entusiastas do mercado financeiro que querem organizar, analisar e otimizar suas carteiras.</p>
            </div>

            <div class="sys-system-info">
              <div class="sys-info-box">
                <span class="sys-info-label">Status</span>
                <span class="sys-info-value sys-status-active">&#9679; Ativo</span>
              </div>
              <div class="sys-info-box">
                <span class="sys-info-label">Plataforma</span>
                <span class="sys-info-value">Web</span>
              </div>
              <div class="sys-info-box">
                <span class="sys-info-label">Site</span>
                <span class="sys-info-value">tradelinkinvest.com</span>
              </div>
              <a href="https://tradelinkinvest.com" target="_blank" rel="noopener" class="sys-btn sys-btn-primary">Acessar TradeLinkInvest</a>
              <a href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20TradeLinkInvest." target="_blank" rel="noopener" class="sys-btn sys-btn-outline">Falar com comercial</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SAPLINK -->
    <section class="sys-section" id="saplink">
      <div class="sys-container">
        <div class="sys-system-card sys-card-highlight sys-reveal">
          <div class="sys-system-header">
            <div class="sys-system-badge sys-badge-saplink">Em Desenvolvimento</div>
            <h2>&#9670; SAPLINK</h2>
            <p class="sys-system-tagline">Integration Health Monitor para consultorias SAP</p>
          </div>

          <div class="sys-system-body">
            <div class="sys-system-desc">
              <h3>O que é</h3>
              <p>O SAPLINK é um sistema de monitoramento de integrações SAP feito para consultorias que gerenciam múltiplos clientes. Dashboard multi-cliente, diagnóstico com IA em português, alertas em tempo real e relatórios white-label.</p>

              <h3>Problema que resolve</h3>
              <p>Consultorias SAP descobrem problemas apenas quando o cliente liga reclamando. O diagnóstico consome horas do consultor sênior. Entre visitas mensais, ninguém sabe o que está acontecendo no ambiente do cliente.</p>

              <h3>Como funciona</h3>
              <ul>
                <li><strong>Agente Docker:</strong> Instalado no servidor do cliente, lê dados via RFC nativa do SAP (read-only, não-invasivo)</li>
                <li><strong>Dashboard multi-cliente:</strong> Health Score de 0 a 100 para cada cliente, atualizado a cada 30 segundos</li>
                <li><strong>IA diagnóstica:</strong> Transforma erros técnicos em causa raiz + passos de correção em português</li>
                <li><strong>Alertas:</strong> WhatsApp, email e dashboard — antes do cliente perceber o problema</li>
                <li><strong>Relatórios white-label:</strong> PDF mensal com a marca da consultoria</li>
                <li><strong>Dead Code Scanner:</strong> Identifica código ABAP morto para projetos de migração S/4HANA</li>
              </ul>

              <h3>Para quem</h3>
              <p>Consultorias SAP com 5 a 50 consultores que atendem PMEs brasileiras e querem transformar seu modelo de reativo para proativo.</p>
            </div>

            <div class="sys-system-info">
              <div class="sys-info-box">
                <span class="sys-info-label">Status</span>
                <span class="sys-info-value sys-status-dev">&#9679; Em Desenvolvimento</span>
              </div>
              <div class="sys-info-box">
                <span class="sys-info-label">Plataforma</span>
                <span class="sys-info-value">Web + Docker Agent</span>
              </div>
              <div class="sys-info-box">
                <span class="sys-info-label">Modelo</span>
                <span class="sys-info-value">SaaS B2B2B</span>
              </div>
              <RouterLink to="/saplink" class="sys-btn sys-btn-primary">Ver página completa</RouterLink>
              <a href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20SAPLINK." target="_blank" rel="noopener" class="sys-btn sys-btn-outline">Entrar na lista de espera</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="sys-section sys-section-alt">
      <div class="sys-container sys-cta">
        <h2>Precisa de um sistema sob medida?</h2>
        <p>A CJL Consultoria desenvolve soluções personalizadas para o seu negócio. Do levantamento à entrega, com suporte contínuo.</p>
        <a href="https://wa.me/5511940090003?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20desenvolvimento%20de%20sistema." target="_blank" rel="noopener" class="sys-btn sys-btn-primary sys-btn-lg">Solicitar orçamento</a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.sistemas-page {
  --sys-primary: #d4a017;
  --sys-primary-light: #f0c040;
  --sys-bg: #0a0a0a;
  --sys-bg-card: #141414;
  --sys-bg-alt: #111111;
  --sys-text: #d4d4d4;
  --sys-text-muted: #888;
  --sys-text-heading: #ffffff;
  --sys-border: rgba(212, 160, 23, 0.2);
  --sys-border-light: rgba(255, 255, 255, 0.08);
  --sys-radius: 16px;
  --sys-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--sys-text);
  background: var(--sys-bg);
  line-height: 1.7;
}

.sys-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* ===== HERO ===== */
.sys-hero {
  padding: 140px 0 80px;
  position: relative;
  background: linear-gradient(160deg, #0a0a0a 0%, #1a1200 40%, #0a0a0a 100%);
  text-align: center;
}
.sys-hero-content { position: relative; z-index: 1; max-width: 700px; margin: 0 auto; }
.sys-tag-light { display: inline-block; padding: 6px 16px; border-radius: 100px; background: rgba(212,160,23,0.15); color: var(--sys-primary-light); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 20px; }
.sys-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; color: var(--sys-text-heading); margin-bottom: 20px; line-height: 1.2; }
.sys-highlight { color: var(--sys-primary-light); }
.sys-hero p { font-size: 1.1rem; color: var(--sys-text-muted); line-height: 1.8; }

/* ===== SECTIONS ===== */
.sys-section { padding: 80px 0; }
.sys-section-alt { background: var(--sys-bg-alt); }

/* ===== SYSTEM CARDS ===== */
.sys-system-card {
  background: var(--sys-bg-card);
  border: 1px solid var(--sys-border-light);
  border-radius: var(--sys-radius);
  overflow: hidden;
  transition: var(--sys-transition);
}
.sys-system-card:hover { border-color: var(--sys-border); }
.sys-card-highlight { border-color: rgba(124, 58, 237, 0.3); }
.sys-system-header { padding: 40px 40px 24px; border-bottom: 1px solid var(--sys-border-light); }
.sys-system-badge { display: inline-block; padding: 4px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
.sys-badge-convivium { background: rgba(16,185,129,0.15); color: #34d399; }
.sys-badge-trade { background: rgba(59,130,246,0.15); color: #60a5fa; }
.sys-badge-saplink { background: rgba(124,58,237,0.15); color: #a78bfa; }
.sys-system-header h2 { font-size: 1.8rem; font-weight: 800; color: var(--sys-text-heading); margin-bottom: 8px; }
.sys-system-tagline { font-size: 1rem; color: var(--sys-text-muted); }

.sys-system-body { display: grid; grid-template-columns: 1fr 280px; gap: 40px; padding: 40px; }
.sys-system-desc h3 { font-size: 1rem; font-weight: 700; color: var(--sys-text-heading); margin: 24px 0 8px; }
.sys-system-desc h3:first-child { margin-top: 0; }
.sys-system-desc p { font-size: 0.9rem; color: var(--sys-text-muted); line-height: 1.8; }
.sys-system-desc ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.sys-system-desc li { font-size: 0.88rem; color: var(--sys-text); padding-left: 16px; position: relative; }
.sys-system-desc li::before { content: '>'; position: absolute; left: 0; color: var(--sys-primary-light); font-weight: 700; }

.sys-system-info { display: flex; flex-direction: column; gap: 16px; }
.sys-info-box { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--sys-border-light); border-radius: 8px; }
.sys-info-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sys-text-muted); }
.sys-info-value { font-size: 0.9rem; color: var(--sys-text); font-weight: 500; }
.sys-status-active { color: #34d399; }
.sys-status-dev { color: #a78bfa; }

/* ===== BUTTONS ===== */
.sys-btn {
  display: flex; align-items: center; justify-content: center; padding: 12px 24px; border-radius: 100px;
  font-weight: 600; font-size: 0.9rem; transition: var(--sys-transition); border: none; cursor: pointer;
  text-decoration: none; text-align: center;
}
.sys-btn-primary { background: var(--sys-primary); color: #0a0a0a; }
.sys-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(212,160,23,0.3); }
.sys-btn-outline { background: transparent; color: var(--sys-text); border: 1px solid var(--sys-border-light); }
.sys-btn-outline:hover { border-color: var(--sys-primary); color: var(--sys-primary-light); }
.sys-btn-lg { padding: 16px 36px; font-size: 1.05rem; }

/* ===== CTA ===== */
.sys-cta { text-align: center; max-width: 600px; padding: 40px 0; }
.sys-cta h2 { font-size: 2rem; font-weight: 800; color: var(--sys-text-heading); margin-bottom: 16px; }
.sys-cta p { font-size: 1.05rem; color: var(--sys-text-muted); margin-bottom: 32px; }

/* ===== REVEAL ===== */
.sys-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.sys-visible { opacity: 1; transform: translateY(0); }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .sys-hero { padding: 100px 0 60px; }
  .sys-system-body { grid-template-columns: 1fr; }
  .sys-system-header { padding: 24px; }
  .sys-system-body { padding: 24px; }
  .sys-section { padding: 48px 0; }
}
</style>
