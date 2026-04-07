<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const formData = ref({ name: '', email: '', company: '' })
const formSubmitted = ref(false)

function checkReveal() {
  const reveals = document.querySelectorAll('.sl-reveal:not(.sl-visible)')
  const windowHeight = window.innerHeight
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < windowHeight - 50) {
      el.classList.add('sl-visible')
    }
  })
}

function submitForm() {
  formSubmitted.value = true
}

onMounted(() => {
  window.addEventListener('scroll', checkReveal, { passive: true })
  checkReveal()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkReveal)
})
</script>

<template>
  <div class="saplink-page">

    <!-- HERO -->
    <section class="sl-hero">
      <div class="sl-hero-bg">
        <div class="sl-orb sl-orb-1"></div>
        <div class="sl-orb sl-orb-2"></div>
        <div class="sl-orb sl-orb-3"></div>
      </div>
      <div class="sl-container sl-hero-content">
        <div class="sl-badge-dev">
          <span class="sl-badge-dot"></span> Em Desenvolvimento
        </div>
        <h1 class="sl-hero-title">
          Pare de <span class="sl-gradient-text">apagar incêndios</span> no SAP dos seus clientes
        </h1>
        <p class="sl-hero-sub">
          Monitore as integrações SAP de todos os seus clientes em um único painel.
          Saiba do problema antes do cliente ligar. Diagnóstico com IA em português,
          alertas em tempo real e relatórios com a sua marca.
        </p>
        <div class="sl-hero-actions">
          <a href="#sl-lista-espera" class="sl-btn sl-btn-primary sl-btn-lg">Entrar na Lista de Espera</a>
          <a href="#sl-como-funciona" class="sl-btn sl-btn-ghost sl-btn-lg">Como Funciona</a>
        </div>
        <div class="sl-hero-stats">
          <div class="sl-hero-stat">
            <span class="sl-stat-number">80%</span>
            <span class="sl-stat-label">menos tempo em diagnóstico</span>
          </div>
          <div class="sl-hero-stat">
            <span class="sl-stat-number">~R$0,12</span>
            <span class="sl-stat-label">por análise de IA</span>
          </div>
          <div class="sl-hero-stat">
            <span class="sl-stat-number">30s</span>
            <span class="sl-stat-label">atualização do dashboard</span>
          </div>
        </div>
      </div>
    </section>

    <!-- O PROBLEMA -->
    <section class="sl-section" id="sl-problema">
      <div class="sl-container">
        <div class="sl-section-header">
          <span class="sl-tag">O Problema</span>
          <h2>As 5 dores que toda consultoria SAP conhece</h2>
          <p>Você reconhece alguma dessas situações no seu dia a dia?</p>
        </div>
        <div class="sl-pain-grid">
          <div class="sl-pain-card sl-reveal">
            <div class="sl-pain-icon">&#128680;</div>
            <h3>Você descobre pelo cliente</h3>
            <p class="sl-before"><strong>Hoje:</strong> O cliente liga às 14h numa sexta: "as notas fiscais pararam de sair, tem caminhão parado." Você abandona tudo e passa 3 horas investigando.</p>
            <p class="sl-after"><strong>Com SAPLINK:</strong> Às 11h, antes do cliente perceber, você recebe no WhatsApp: "Sistema fiscal do Cliente X com 100% de falha desde 10:47. Causa provável: certificado inválido."</p>
          </div>
          <div class="sl-pain-card sl-reveal">
            <div class="sl-pain-icon">&#9200;</div>
            <h3>Diagnóstico consome horas do sênior</h3>
            <p class="sl-before"><strong>Hoje:</strong> Cada erro SAP tem linguagem própria — dumps ABAP, status de IDoc, código de retorno de BAPI. Só consultor sênior sabe interpretar.</p>
            <p class="sl-after"><strong>Com SAPLINK:</strong> A IA lê o erro e entrega em português: "Campo CHARG não enviado pelo Protheus. Acesse MB1C, verifique material X-482." Qualquer júnior resolve.</p>
          </div>
          <div class="sl-pain-card sl-reveal">
            <div class="sl-pain-icon">&#128065;</div>
            <h3>Caixa preta entre visitas</h3>
            <p class="sl-before"><strong>Hoje:</strong> Você visita o cliente uma vez por mês. O que aconteceu nos outros 29 dias? Ninguém sabe.</p>
            <p class="sl-after"><strong>Com SAPLINK:</strong> Painel com todos os clientes atualizado a cada 30 segundos. Score verde, amarelo ou vermelho.</p>
          </div>
          <div class="sl-pain-card sl-reveal">
            <div class="sl-pain-icon">&#128200;</div>
            <h3>"O que você faz mesmo?"</h3>
            <p class="sl-before"><strong>Hoje:</strong> O cliente paga R$8.000/mês de fee e não vê o que recebe. Na renovação, questiona o valor.</p>
            <p class="sl-after"><strong>Com SAPLINK:</strong> Relatório PDF mensal com sua logo: alertas resolvidos, score antes/depois, problemas evitados. ROI visível.</p>
          </div>
          <div class="sl-pain-card sl-reveal">
            <div class="sl-pain-icon">&#128640;</div>
            <h3>Migração S/4HANA vira pesadelo</h3>
            <p class="sl-before"><strong>Hoje:</strong> Análise manual de centenas de customizações. Meses só de levantamento. Surpresas no meio do projeto.</p>
            <p class="sl-after"><strong>Com SAPLINK:</strong> O sistema já monitorou o ambiente por meses. Sabe quais customizações existem e quais estão mortas. Análise pré-migração em dias.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="sl-section sl-section-dark" id="sl-como-funciona">
      <div class="sl-container">
        <div class="sl-section-header">
          <span class="sl-tag">Como Funciona</span>
          <h2>3 passos. Sem invasão. Sem risco.</h2>
          <p>O SAPLINK não modifica o SAP do seu cliente. Apenas lê dados via conexões nativas (RFC).</p>
        </div>
        <div class="sl-steps-grid">
          <div class="sl-step-card sl-reveal">
            <div class="sl-step-number">01</div>
            <h3>Instale o Agente</h3>
            <p>Container Docker leve no servidor do cliente. Sem alterar nada no SAP. Configuração em menos de 30 minutos.</p>
            <div class="sl-tags">
              <span>Docker</span><span>RFC</span><span>Read-only</span>
            </div>
          </div>
          <div class="sl-step-arrow">&#10132;</div>
          <div class="sl-step-card sl-reveal">
            <div class="sl-step-number">02</div>
            <h3>Monitore Automaticamente</h3>
            <p>O agente coleta dados a cada 30 segundos: erros, filas, crashes, certificados. Envia para a nuvem SAPLINK.</p>
            <div class="sl-tags">
              <span>8 Conectores</span><span>TLS/SSL</span><span>Real-time</span>
            </div>
          </div>
          <div class="sl-step-arrow">&#10132;</div>
          <div class="sl-step-card sl-reveal">
            <div class="sl-step-number">03</div>
            <h3>Receba Alertas e Diagnósticos</h3>
            <p>Dashboard multi-cliente, alertas no WhatsApp/email, diagnóstico com IA em português. Tudo com a sua marca.</p>
            <div class="sl-tags">
              <span>IA Claude</span><span>WhatsApp</span><span>White-label</span>
            </div>
          </div>
        </div>

        <!-- Arquitetura -->
        <div class="sl-arch sl-reveal">
          <h3>Arquitetura Simplificada</h3>
          <div class="sl-arch-diagram">
            <div class="sl-arch-layer">
              <div class="sl-arch-label">Cliente Final</div>
              <div class="sl-arch-boxes">
                <span class="sl-arch-box sl-box-sap">SAP ECC/S4</span>
                <span class="sl-arch-box sl-box-legacy">Protheus</span>
                <span class="sl-arch-box sl-box-legacy">WMS</span>
                <span class="sl-arch-box sl-box-legacy">Mastersaf</span>
              </div>
              <div class="sl-arch-arrow-down">&#8595;</div>
              <span class="sl-arch-box sl-box-agent">Agente Docker (RFC read-only)</span>
            </div>
            <div class="sl-arch-arrow-big">&#8595; TLS/SSL</div>
            <div class="sl-arch-layer">
              <div class="sl-arch-label">Nuvem SAPLINK</div>
              <div class="sl-arch-boxes">
                <span class="sl-arch-box sl-box-cloud">Health Monitor</span>
                <span class="sl-arch-box sl-box-cloud">Motor IA</span>
                <span class="sl-arch-box sl-box-cloud">Alertas</span>
                <span class="sl-arch-box sl-box-cloud">Relatórios</span>
              </div>
            </div>
            <div class="sl-arch-arrow-big">&#8595;</div>
            <div class="sl-arch-layer">
              <div class="sl-arch-label">Consultoria</div>
              <div class="sl-arch-boxes">
                <span class="sl-arch-box sl-box-portal">Portal Multi-Cliente</span>
                <span class="sl-arch-box sl-box-portal">WhatsApp / Email</span>
                <span class="sl-arch-box sl-box-portal">PDF White-label</span>
              </div>
            </div>
          </div>
          <div class="sl-arch-note">
            <strong>8 conectores nativos:</strong> SAP ECC, S/4HANA, RISE, Protheus, WMS, Mastersaf, CNAB bancário, REST genérico.<br>
            <strong>Não-invasivo:</strong> O agente usa chamadas RFC padrão do SAP para leitura. Não modifica dados.
          </div>
        </div>
      </div>
    </section>

    <!-- FUNCIONALIDADES -->
    <section class="sl-section" id="sl-funcionalidades">
      <div class="sl-container">
        <div class="sl-section-header">
          <span class="sl-tag">Funcionalidades</span>
          <h2>8 módulos. Tudo que sua consultoria precisa.</h2>
        </div>
        <div class="sl-features-grid">
          <div class="sl-feature-card sl-reveal">
            <div class="sl-feature-badge">Core</div>
            <h3>&#128167; Health Score</h3>
            <p>Pontuação de 0 a 100 para cada cliente, calculada em tempo real. 4 dimensões: disponibilidade, performance, erros e compliance.</p>
          </div>
          <div class="sl-feature-card sl-reveal">
            <div class="sl-feature-badge">Core</div>
            <h3>&#128187; Dashboard Multi-Cliente</h3>
            <p>Visão unificada de todos os clientes em uma tela. Saiba em 5 segundos quem precisa de atenção.</p>
          </div>
          <div class="sl-feature-card sl-feature-highlight sl-reveal">
            <div class="sl-feature-badge sl-badge-ai">IA</div>
            <h3>&#129302; Motor de IA Diagnóstica</h3>
            <p>Alimentado por IA Claude. Transforma erros técnicos em diagnósticos em português com causa raiz e passos de correção. ~R$0,12 por análise.</p>
          </div>
          <div class="sl-feature-card sl-reveal">
            <div class="sl-feature-badge">Audit</div>
            <h3>&#128270; Dead Code Scanner</h3>
            <p>Identifica objetos ABAP que ninguém usa. Até 60% do código customizado do SAP está morto. Classifica como aposentar, revisar ou manter.</p>
          </div>
          <div class="sl-feature-card sl-reveal">
            <div class="sl-feature-badge">Ops</div>
            <h3>&#128276; Alertas & SLA</h3>
            <p>9 tipos de alerta com severidade e cooldown configurável. Escalação automática em 5 etapas. WhatsApp, email e dashboard.</p>
          </div>
          <div class="sl-feature-card sl-reveal">
            <div class="sl-feature-badge">Business</div>
            <h3>&#128196; Relatórios White-label</h3>
            <p>PDF mensal com a logo da sua consultoria. 6 tipos de relatório. A consultoria aparece como autora do diagnóstico.</p>
          </div>
          <div class="sl-feature-card sl-reveal">
            <div class="sl-feature-badge">Migration</div>
            <h3>&#128640; Modo Migração S/4HANA</h3>
            <p>Modo pontual para diagnóstico antes de uma migração. Lista priorizada do que precisa ser ajustado, com estimativa de esforço.</p>
          </div>
          <div class="sl-feature-card sl-reveal">
            <div class="sl-feature-badge">Platform</div>
            <h3>&#127969; Multi-Tenancy</h3>
            <p>Cada consultoria é um tenant isolado. 4 papéis de acesso: Admin, Consultor, Viewer. Onboarding self-service.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PLANOS -->
    <section class="sl-section sl-section-dark" id="sl-planos">
      <div class="sl-container">
        <div class="sl-section-header">
          <span class="sl-tag">Planos</span>
          <h2>Preços pensados para consultorias brasileiras</h2>
          <p>Pague pelo número de clientes que você gerencia. Sem surpresas.</p>
          <div class="sl-badge-launch">Preços de lançamento — valores podem mudar após o período inicial</div>
        </div>
        <div class="sl-pricing-grid">
          <div class="sl-pricing-card sl-reveal">
            <div class="sl-pricing-name">Starter</div>
            <div class="sl-pricing-price">R$ 1.200<span>/mês</span></div>
            <div class="sl-pricing-clients">Até 5 clientes</div>
            <ul>
              <li>&#10003; Dashboard multi-cliente</li>
              <li>&#10003; Health Score por cliente</li>
              <li>&#10003; 50 análises IA/mês</li>
              <li>&#10003; Alertas email</li>
              <li class="sl-no">&#10007; White-label</li>
              <li class="sl-no">&#10007; WhatsApp</li>
            </ul>
          </div>
          <div class="sl-pricing-card sl-pricing-popular sl-reveal">
            <div class="sl-popular-badge">Mais Popular</div>
            <div class="sl-pricing-name">Pro</div>
            <div class="sl-pricing-price">R$ 2.800<span>/mês</span></div>
            <div class="sl-pricing-clients">Até 15 clientes</div>
            <ul>
              <li>&#10003; Tudo do Starter</li>
              <li>&#10003; 200 análises IA/mês</li>
              <li>&#10003; WhatsApp + White-label</li>
              <li>&#10003; Dead Code Scanner</li>
              <li>&#10003; SLA por integração</li>
              <li class="sl-no">&#10007; API pública</li>
            </ul>
          </div>
          <div class="sl-pricing-card sl-reveal">
            <div class="sl-pricing-name">Scale</div>
            <div class="sl-pricing-price">R$ 5.500<span>/mês</span></div>
            <div class="sl-pricing-clients">Até 40 clientes</div>
            <ul>
              <li>&#10003; Tudo do Pro</li>
              <li>&#10003; 500 análises IA/mês</li>
              <li>&#10003; API pública + Webhooks</li>
              <li>&#10003; Modo migração S/4HANA</li>
              <li>&#10003; Suporte prioritário</li>
              <li class="sl-no">&#10007; Marca própria</li>
            </ul>
          </div>
          <div class="sl-pricing-card sl-reveal">
            <div class="sl-pricing-name">White-Label</div>
            <div class="sl-pricing-price">R$ 9.000+<span>/mês</span></div>
            <div class="sl-pricing-clients">Ilimitado</div>
            <ul>
              <li>&#10003; Tudo do Scale</li>
              <li>&#10003; Análises ilimitadas</li>
              <li>&#10003; Sua marca no portal</li>
              <li>&#10003; Domínio customizado</li>
              <li>&#10003; SLA dedicado</li>
              <li>&#10003; Gerente de conta</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ROADMAP -->
    <section class="sl-section" id="sl-roadmap">
      <div class="sl-container">
        <div class="sl-section-header">
          <span class="sl-tag">Roadmap</span>
          <h2>Onde estamos e para onde vamos</h2>
        </div>
        <div class="sl-roadmap">
          <div class="sl-roadmap-item sl-done sl-reveal">
            <div class="sl-marker"></div>
            <div class="sl-roadmap-content">
              <span class="sl-status">Concluído</span>
              <h3>Fase 1 — Pesquisa & Validação</h3>
              <p>Mapeamento das 5 dores, análise de concorrência, definição do modelo B2B2B, especificação técnica com 8 módulos.</p>
            </div>
          </div>
          <div class="sl-roadmap-item sl-done sl-reveal">
            <div class="sl-marker"></div>
            <div class="sl-roadmap-content">
              <span class="sl-status">Concluído</span>
              <h3>Fase 2 — MVP Visual & Spec</h3>
              <p>Protótipo visual do dashboard, documento de especificação completo, definição de stack técnica.</p>
            </div>
          </div>
          <div class="sl-roadmap-item sl-current sl-reveal">
            <div class="sl-marker"></div>
            <div class="sl-roadmap-content">
              <span class="sl-status">Em Andamento</span>
              <h3>Fase 3 — Desenvolvimento Core</h3>
              <p>Auth & multi-tenancy, agente de coleta Docker, Health Monitor, dashboard multi-cliente funcional.</p>
            </div>
          </div>
          <div class="sl-roadmap-item sl-planned sl-reveal">
            <div class="sl-marker"></div>
            <div class="sl-roadmap-content">
              <span class="sl-status">Planejado</span>
              <h3>Fase 4 — IA & Alertas</h3>
              <p>Motor de IA diagnóstica, alertas multi-canal, dead code scanner, SLA por integração.</p>
            </div>
          </div>
          <div class="sl-roadmap-item sl-planned sl-reveal">
            <div class="sl-marker"></div>
            <div class="sl-roadmap-content">
              <span class="sl-status">Planejado</span>
              <h3>Fase 5 — White-label & Lançamento</h3>
              <p>Relatórios PDF, portal do cliente final, billing integrado, beta com 5 consultorias parceiras.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- LISTA DE ESPERA -->
    <section class="sl-section sl-section-dark" id="sl-lista-espera">
      <div class="sl-container">
        <div class="sl-section-header">
          <span class="sl-tag">Lista de Espera</span>
          <h2>Seja um dos primeiros a usar o SAPLINK</h2>
          <p>Estamos em desenvolvimento ativo. Entre na lista para ter acesso antecipado e condições exclusivas.</p>
        </div>
        <div class="sl-waitlist sl-reveal">
          <div class="sl-waitlist-benefits">
            <div class="sl-benefit">&#127775; Acesso antecipado ao beta</div>
            <div class="sl-benefit">&#128176; Desconto exclusivo de lançamento</div>
            <div class="sl-benefit">&#129309; Influencie o produto com feedback</div>
            <div class="sl-benefit">&#128274; Vagas limitadas</div>
          </div>
          <form v-if="!formSubmitted" class="sl-form" @submit.prevent="submitForm">
            <div class="sl-form-group">
              <label>Seu nome</label>
              <input v-model="formData.name" type="text" placeholder="Ex: João Silva" required>
            </div>
            <div class="sl-form-group">
              <label>Seu melhor e-mail</label>
              <input v-model="formData.email" type="email" placeholder="joao@consultoria.com.br" required>
            </div>
            <div class="sl-form-group">
              <label>Nome da consultoria</label>
              <input v-model="formData.company" type="text" placeholder="Ex: SAP Solutions Brasil" required>
            </div>
            <button type="submit" class="sl-btn sl-btn-primary sl-btn-lg sl-btn-full">Entrar na Lista de Espera</button>
            <p class="sl-form-note">Sem spam. Apenas atualizações sobre o lançamento do SAPLINK.</p>
          </form>
          <div v-else class="sl-success">
            <div class="sl-success-icon">&#10003;</div>
            <h3>Você está na lista!</h3>
            <p>Obrigado pelo interesse. Vamos te avisar assim que o SAPLINK estiver pronto.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ===== VARIABLES ===== */
.saplink-page {
  --sl-primary: #7c3aed;
  --sl-primary-light: #a78bfa;
  --sl-secondary: #06b6d4;
  --sl-accent: #f43f5e;
  --sl-accent-warm: #f59e0b;
  --sl-bg: #0f0b1a;
  --sl-bg-card: #1a1527;
  --sl-bg-section: #130e20;
  --sl-text: #e2e0ea;
  --sl-text-muted: #9b95ad;
  --sl-text-heading: #ffffff;
  --sl-border: rgba(124, 58, 237, 0.2);
  --sl-border-light: rgba(255, 255, 255, 0.08);
  --sl-gradient: linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #f43f5e 100%);
  --sl-radius: 16px;
  --sl-radius-sm: 8px;
  --sl-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--sl-text);
  background: var(--sl-bg);
  line-height: 1.7;
}

.sl-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ===== BUTTONS ===== */
.sl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--sl-transition);
  border: none;
  cursor: pointer;
  text-decoration: none;
}
.sl-btn-primary {
  background: var(--sl-gradient);
  color: white;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
}
.sl-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5); }
.sl-btn-ghost {
  background: rgba(255,255,255,0.06);
  color: var(--sl-text);
  border: 1px solid var(--sl-border-light);
}
.sl-btn-ghost:hover { background: rgba(255,255,255,0.12); }
.sl-btn-lg { padding: 16px 36px; font-size: 1.05rem; }
.sl-btn-full { width: 100%; }

/* ===== HERO ===== */
.sl-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 120px 0 80px;
  background: linear-gradient(160deg, #0f0b1a 0%, #1a0e2e 30%, #0f1a2e 60%, #0f0b1a 100%);
  overflow: hidden;
}
.sl-hero-bg { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.sl-orb { position: absolute; border-radius: 50%; opacity: 0.3; }
.sl-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, var(--sl-primary) 0%, transparent 70%); top: -10%; right: -10%; }
.sl-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, var(--sl-secondary) 0%, transparent 70%); bottom: -15%; left: -5%; }
.sl-orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, var(--sl-accent) 0%, transparent 70%); top: 40%; left: 30%; opacity: 0.15; }
.sl-hero-content { position: relative; z-index: 1; text-align: center; max-width: 800px; margin: 0 auto; }
.sl-badge-dev {
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px;
  border-radius: 100px; background: rgba(244,63,94,0.15); border: 1px solid rgba(244,63,94,0.3);
  color: var(--sl-accent); font-size: 0.85rem; font-weight: 600; margin-bottom: 32px;
}
.sl-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--sl-accent); animation: sl-pulse 2s ease-in-out infinite; }
@keyframes sl-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.sl-hero-title { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.1; color: var(--sl-text-heading); margin-bottom: 24px; letter-spacing: -0.03em; }
.sl-gradient-text { background: var(--sl-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.sl-hero-sub { font-size: 1.15rem; color: var(--sl-text-muted); max-width: 640px; margin: 0 auto 40px; line-height: 1.8; }
.sl-hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 64px; }
.sl-hero-stats { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
.sl-hero-stat { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.sl-stat-number { font-size: 1.8rem; font-weight: 800; background: var(--sl-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.sl-stat-label { font-size: 0.8rem; color: var(--sl-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

/* ===== SECTIONS ===== */
.sl-section { padding: 100px 0; }
.sl-section-dark { background: var(--sl-bg-section); }
.sl-section-header { text-align: center; margin-bottom: 64px; }
.sl-section-header h2 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 800; color: var(--sl-text-heading); margin-bottom: 16px; }
.sl-section-header p { font-size: 1.05rem; color: var(--sl-text-muted); max-width: 600px; margin: 0 auto; }
.sl-tag {
  display: inline-block; padding: 6px 16px; border-radius: 100px; background: rgba(124,58,237,0.15);
  color: var(--sl-primary-light); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;
}

/* ===== PAIN CARDS ===== */
.sl-pain-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }
.sl-pain-card {
  background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: var(--sl-radius); padding: 32px;
  transition: var(--sl-transition);
}
.sl-pain-card:hover { transform: translateY(-4px); border-color: var(--sl-border); box-shadow: 0 0 40px rgba(124,58,237,0.15); }
.sl-pain-icon { font-size: 2rem; margin-bottom: 16px; }
.sl-pain-card h3 { font-size: 1.2rem; font-weight: 700; color: var(--sl-text-heading); margin-bottom: 16px; }
.sl-before { color: var(--sl-text-muted); font-size: 0.9rem; margin-bottom: 12px; padding-left: 12px; border-left: 3px solid var(--sl-accent); }
.sl-after { color: var(--sl-text); font-size: 0.9rem; padding-left: 12px; border-left: 3px solid #10b981; }

/* ===== STEPS ===== */
.sl-steps-grid { display: flex; align-items: flex-start; justify-content: center; gap: 16px; margin-bottom: 80px; flex-wrap: wrap; }
.sl-step-card {
  background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: var(--sl-radius);
  padding: 36px 28px; flex: 1; min-width: 260px; max-width: 340px; text-align: center; transition: var(--sl-transition);
}
.sl-step-card:hover { border-color: var(--sl-border); transform: translateY(-4px); }
.sl-step-number { font-size: 3rem; font-weight: 900; background: var(--sl-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; opacity: 0.3; line-height: 1; margin-bottom: 8px; }
.sl-step-card h3 { font-size: 1.15rem; font-weight: 700; color: var(--sl-text-heading); margin-bottom: 12px; }
.sl-step-card p { font-size: 0.9rem; color: var(--sl-text-muted); margin-bottom: 20px; }
.sl-step-arrow { font-size: 2rem; color: var(--sl-primary); margin-top: 80px; opacity: 0.5; }
.sl-tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.sl-tags span { padding: 4px 12px; border-radius: 100px; background: rgba(124,58,237,0.12); color: var(--sl-primary-light); font-size: 0.75rem; font-weight: 600; }

/* ===== ARCHITECTURE ===== */
.sl-arch { background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: 24px; padding: 48px; }
.sl-arch h3 { font-size: 1.3rem; font-weight: 700; color: var(--sl-text-heading); text-align: center; margin-bottom: 40px; }
.sl-arch-diagram { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.sl-arch-layer { width: 100%; max-width: 700px; text-align: center; }
.sl-arch-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--sl-text-muted); margin-bottom: 12px; }
.sl-arch-boxes { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 12px; }
.sl-arch-box { padding: 12px 20px; border-radius: var(--sl-radius-sm); font-size: 0.85rem; font-weight: 600; border: 1px solid var(--sl-border-light); }
.sl-box-sap { background: rgba(124,58,237,0.15); color: var(--sl-primary-light); border-color: rgba(124,58,237,0.3); }
.sl-box-legacy { background: rgba(245,158,11,0.12); color: var(--sl-accent-warm); border-color: rgba(245,158,11,0.3); }
.sl-box-agent { background: rgba(6,182,212,0.12); color: var(--sl-secondary); border-color: rgba(6,182,212,0.3); }
.sl-box-cloud { background: rgba(124,58,237,0.1); color: var(--sl-primary-light); border-color: var(--sl-border); }
.sl-box-portal { background: rgba(16,185,129,0.12); color: #34d399; border-color: rgba(16,185,129,0.3); }
.sl-arch-arrow-down { font-size: 1.4rem; color: var(--sl-text-muted); opacity: 0.5; }
.sl-arch-arrow-big { font-size: 1.2rem; color: var(--sl-primary-light); font-weight: 600; padding: 8px 0; }
.sl-arch-note { margin-top: 32px; padding: 20px 24px; background: rgba(124,58,237,0.06); border: 1px solid var(--sl-border); border-radius: var(--sl-radius-sm); font-size: 0.85rem; color: var(--sl-text-muted); line-height: 1.8; text-align: center; }

/* ===== FEATURES ===== */
.sl-features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
.sl-feature-card {
  background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: var(--sl-radius);
  padding: 32px; transition: var(--sl-transition); position: relative; overflow: hidden;
}
.sl-feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--sl-gradient); opacity: 0; transition: var(--sl-transition); }
.sl-feature-card:hover { border-color: var(--sl-border); transform: translateY(-4px); box-shadow: 0 0 40px rgba(124,58,237,0.15); }
.sl-feature-card:hover::before { opacity: 1; }
.sl-feature-highlight { border-color: rgba(124,58,237,0.3); background: linear-gradient(135deg, rgba(124,58,237,0.08) 0%, var(--sl-bg-card) 100%); }
.sl-feature-highlight::before { opacity: 1; }
.sl-feature-badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; background: rgba(255,255,255,0.06); color: var(--sl-text-muted); margin-bottom: 12px; }
.sl-badge-ai { background: rgba(124,58,237,0.2); color: var(--sl-primary-light); }
.sl-feature-card h3 { font-size: 1.15rem; font-weight: 700; color: var(--sl-text-heading); margin-bottom: 12px; }
.sl-feature-card p { font-size: 0.88rem; color: var(--sl-text-muted); line-height: 1.7; }

/* ===== PRICING ===== */
.sl-badge-launch { display: inline-block; margin-top: 16px; padding: 8px 20px; border-radius: 100px; background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); color: var(--sl-accent-warm); font-size: 0.8rem; font-weight: 600; }
.sl-pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
.sl-pricing-card {
  background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: var(--sl-radius);
  padding: 36px 28px; text-align: center; transition: var(--sl-transition); position: relative; display: flex; flex-direction: column;
}
.sl-pricing-card:hover { border-color: var(--sl-border); transform: translateY(-4px); }
.sl-pricing-popular { border-color: var(--sl-primary); background: linear-gradient(180deg, rgba(124,58,237,0.08) 0%, var(--sl-bg-card) 40%); box-shadow: 0 0 40px rgba(124,58,237,0.15); }
.sl-popular-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); padding: 6px 20px; border-radius: 100px; background: var(--sl-gradient); color: white; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; white-space: nowrap; }
.sl-pricing-name { font-size: 1.1rem; font-weight: 700; color: var(--sl-text-heading); margin-bottom: 8px; }
.sl-pricing-price { font-size: 2.4rem; font-weight: 900; color: var(--sl-text-heading); margin-bottom: 4px; }
.sl-pricing-price span { font-size: 0.9rem; font-weight: 500; color: var(--sl-text-muted); }
.sl-pricing-clients { font-size: 0.85rem; color: var(--sl-primary-light); font-weight: 600; margin-bottom: 16px; }
.sl-pricing-card ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; text-align: left; margin-bottom: 20px; flex: 1; }
.sl-pricing-card li { font-size: 0.85rem; color: var(--sl-text); }
.sl-no { color: var(--sl-text-muted) !important; opacity: 0.5; }

/* ===== ROADMAP ===== */
.sl-roadmap { position: relative; max-width: 700px; margin: 0 auto; padding-left: 40px; }
.sl-roadmap::before { content: ''; position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: var(--sl-border-light); }
.sl-roadmap-item { position: relative; margin-bottom: 40px; }
.sl-roadmap-item:last-child { margin-bottom: 0; }
.sl-marker { position: absolute; left: -33px; top: 6px; width: 16px; height: 16px; border-radius: 50%; background: var(--sl-bg-card); border: 3px solid var(--sl-border-light); z-index: 1; }
.sl-done .sl-marker { background: #10b981; border-color: #10b981; box-shadow: 0 0 12px rgba(16,185,129,0.4); }
.sl-current .sl-marker { background: var(--sl-primary); border-color: var(--sl-primary); box-shadow: 0 0 12px rgba(124,58,237,0.5); animation: sl-pulse 2s ease-in-out infinite; }
.sl-planned .sl-marker { background: var(--sl-bg); border-color: var(--sl-text-muted); }
.sl-roadmap-content { background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: var(--sl-radius); padding: 24px 28px; }
.sl-current .sl-roadmap-content { border-color: rgba(124,58,237,0.3); background: linear-gradient(135deg, rgba(124,58,237,0.08) 0%, var(--sl-bg-card) 100%); }
.sl-status { display: inline-block; padding: 3px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; margin-bottom: 12px; }
.sl-done .sl-status { background: rgba(16,185,129,0.15); color: #34d399; }
.sl-current .sl-status { background: rgba(124,58,237,0.2); color: var(--sl-primary-light); }
.sl-planned .sl-status { background: rgba(255,255,255,0.06); color: var(--sl-text-muted); }
.sl-roadmap-content h3 { font-size: 1.05rem; font-weight: 700; color: var(--sl-text-heading); margin-bottom: 8px; }
.sl-roadmap-content p { font-size: 0.88rem; color: var(--sl-text-muted); line-height: 1.7; }

/* ===== WAITLIST ===== */
.sl-waitlist { max-width: 600px; margin: 0 auto; }
.sl-waitlist-benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px; }
.sl-benefit { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: var(--sl-text); padding: 12px 16px; background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: var(--sl-radius-sm); }
.sl-form { background: var(--sl-bg-card); border: 1px solid var(--sl-border-light); border-radius: 24px; padding: 40px; }
.sl-form-group { margin-bottom: 20px; }
.sl-form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--sl-text); margin-bottom: 8px; }
.sl-form-group input {
  width: 100%; padding: 14px 18px; border-radius: var(--sl-radius-sm); border: 1px solid var(--sl-border-light);
  background: var(--sl-bg); color: var(--sl-text-heading); font-size: 0.95rem; font-family: inherit; transition: var(--sl-transition); outline: none; box-sizing: border-box;
}
.sl-form-group input::placeholder { color: var(--sl-text-muted); opacity: 0.6; }
.sl-form-group input:focus { border-color: var(--sl-primary); box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
.sl-form-note { text-align: center; font-size: 0.78rem; color: var(--sl-text-muted); margin-top: 16px; }
.sl-success { text-align: center; padding: 48px 32px; background: var(--sl-bg-card); border: 1px solid rgba(16,185,129,0.3); border-radius: 24px; }
.sl-success-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(16,185,129,0.15); color: #10b981; font-size: 1.8rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
.sl-success h3 { font-size: 1.4rem; font-weight: 700; color: var(--sl-text-heading); margin-bottom: 12px; }
.sl-success p { color: var(--sl-text-muted); }

/* ===== REVEAL ===== */
.sl-reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.sl-visible { opacity: 1; transform: translateY(0); }

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .sl-hero { padding: 100px 0 60px; min-height: auto; }
  .sl-pain-grid { grid-template-columns: 1fr; }
  .sl-steps-grid { flex-direction: column; align-items: center; }
  .sl-step-arrow { transform: rotate(90deg); margin: 0; }
  .sl-step-card { max-width: 100%; }
  .sl-features-grid { grid-template-columns: 1fr; }
  .sl-pricing-grid { grid-template-columns: 1fr; max-width: 400px; margin: 0 auto; }
  .sl-waitlist-benefits { grid-template-columns: 1fr; }
  .sl-arch { padding: 28px 20px; }
  .sl-arch-boxes { flex-direction: column; align-items: center; }
  .sl-section { padding: 64px 0; }
  .sl-hero-actions { flex-direction: column; align-items: center; }
}
</style>
