'use client'
import { useState } from 'react'

const painPoints = [
  { icon: '🚨', title: 'Você descobre pelo cliente', before: 'O cliente liga às 14h numa sexta: "as notas fiscais pararam de sair, tem caminhão parado." Você abandona tudo e passa 3 horas investigando.', after: 'Às 11h, antes do cliente perceber, você recebe no WhatsApp: "Sistema fiscal do Cliente X com 100% de falha desde 10:47. Causa provável: certificado inválido."' },
  { icon: '⏰', title: 'Diagnóstico consome horas do sênior', before: 'Cada erro SAP tem linguagem própria — dumps ABAP, status de IDoc, código de retorno de BAPI. Só consultor sênior sabe interpretar.', after: 'A IA lê o erro e entrega em português: "Campo CHARG não enviado pelo Protheus. Acesse MB1C, verifique material X-482." Qualquer júnior resolve.' },
  { icon: '👁', title: 'Caixa preta entre visitas', before: 'Você visita o cliente uma vez por mês. O que aconteceu nos outros 29 dias? Ninguém sabe.', after: 'Painel com todos os clientes atualizado a cada 30 segundos. Score verde, amarelo ou vermelho.' },
  { icon: '📈', title: '"O que você faz mesmo?"', before: 'O cliente paga R$8.000/mês de fee e não vê o que recebe. Na renovação, questiona o valor.', after: 'Relatório PDF mensal com sua logo: alertas resolvidos, score antes/depois, problemas evitados. ROI visível.' },
  { icon: '🚀', title: 'Migração S/4HANA vira pesadelo', before: 'Análise manual de centenas de customizações. Meses só de levantamento. Surpresas no meio do projeto.', after: 'O sistema já monitorou o ambiente por meses. Sabe quais customizações existem e quais estão mortas. Análise pré-migração em dias.' },
]

const features = [
  { badge: 'Core', title: '💧 Health Score', desc: 'Pontuação de 0 a 100 para cada cliente em tempo real. 4 dimensões: disponibilidade, performance, erros e compliance.' },
  { badge: 'Core', title: '💻 Dashboard Multi-Cliente', desc: 'Visão unificada de todos os clientes. Saiba em 5 segundos quem precisa de atenção.' },
  { badge: 'IA', title: '🤖 Motor de IA Diagnóstica', desc: 'Transforma erros técnicos em diagnósticos em português com causa raiz e passos de correção. ~R$0,12 por análise.', highlight: true },
  { badge: 'Audit', title: '🔍 Dead Code Scanner', desc: 'Identifica objetos ABAP mortos. Até 60% do código customizado do SAP está morto.' },
  { badge: 'Ops', title: '🔔 Alertas & SLA', desc: '9 tipos de alerta com severidade e cooldown configurável. Escalação automática. WhatsApp, email e dashboard.' },
  { badge: 'Business', title: '📄 Relatórios White-label', desc: 'PDF mensal com a logo da sua consultoria. 6 tipos de relatório.' },
  { badge: 'Migration', title: '🚀 Modo Migração S/4HANA', desc: 'Diagnóstico pré-migração. Lista priorizada do que ajustar, com estimativa de esforço.' },
  { badge: 'Platform', title: '🏡 Multi-Tenancy', desc: 'Cada consultoria é um tenant isolado. 4 papéis de acesso. Onboarding self-service.' },
]

const plans = [
  { name: 'Starter', price: 'R$ 1.200', clients: 'Até 5 clientes', features: ['Dashboard multi-cliente', 'Health Score', '50 análises IA/mês', 'Alertas email'], noFeatures: ['White-label', 'WhatsApp'] },
  { name: 'Pro', price: 'R$ 2.800', clients: 'Até 15 clientes', popular: true, features: ['Tudo do Starter', '200 análises IA/mês', 'WhatsApp + White-label', 'Dead Code Scanner', 'SLA por integração'], noFeatures: ['API pública'] },
  { name: 'Scale', price: 'R$ 5.500', clients: 'Até 40 clientes', features: ['Tudo do Pro', '500 análises IA/mês', 'API pública + Webhooks', 'Modo migração S/4HANA', 'Suporte prioritário'], noFeatures: ['Marca própria'] },
  { name: 'White-Label', price: 'R$ 9.000+', clients: 'Ilimitado', features: ['Tudo do Scale', 'Análises ilimitadas', 'Sua marca no portal', 'Domínio customizado', 'SLA dedicado', 'Gerente de conta'], noFeatures: [] },
]

const roadmap = [
  { status: 'done', title: 'Fase 1 — Pesquisa & Validação', desc: 'Mapeamento das 5 dores, análise de concorrência, definição do modelo B2B2B.' },
  { status: 'done', title: 'Fase 2 — MVP Visual & Spec', desc: 'Protótipo visual, documento de especificação completo, definição de stack técnica.' },
  { status: 'current', title: 'Fase 3 — Desenvolvimento Core', desc: 'Auth & multi-tenancy, agente de coleta, Health Monitor, dashboard multi-cliente.' },
  { status: 'planned', title: 'Fase 4 — IA & Alertas', desc: 'Motor de IA diagnóstica, alertas multi-canal, dead code scanner.' },
  { status: 'planned', title: 'Fase 5 — White-label & Lançamento', desc: 'Relatórios PDF, portal do cliente, billing, beta com 5 consultorias parceiras.' },
]

export default function SaplinkPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' })
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-[#0f0b1a] text-[#e2e0ea]">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(160deg, #0f0b1a 0%, #1a0e2e 30%, #0f1a2e 60%, #0f0b1a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-30 -top-[10%] -right-[10%]" style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-30 -bottom-[15%] -left-[5%]" style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
          <div className="absolute w-[300px] h-[300px] rounded-full opacity-15 top-[40%] left-[30%]" style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto text-center px-6 py-32">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-sm font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" /> Em Desenvolvimento
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] text-white mb-6 tracking-tight">
            Pare de <span className="bg-gradient-to-r from-purple-500 via-cyan-400 to-rose-500 bg-clip-text text-transparent">apagar incêndios</span> no SAP dos seus clientes
          </h1>
          <p className="text-lg text-[#9b95ad] max-w-[640px] mx-auto mb-10 leading-relaxed">
            Monitore as integrações SAP de todos os seus clientes em um único painel. Saiba do problema antes do cliente ligar. Diagnóstico com IA em português, alertas em tempo real e relatórios com a sua marca.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-16">
            <a href="#lista-espera" className="px-9 py-4 rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-rose-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:-translate-y-0.5 transition-transform">Entrar na Lista de Espera</a>
            <a href="#como-funciona" className="px-9 py-4 rounded-full bg-white/5 border border-white/10 text-[#e2e0ea] font-semibold hover:bg-white/10 transition-colors">Como Funciona</a>
          </div>
          <div className="flex justify-center gap-12 flex-wrap">
            {[['80%', 'menos tempo em diagnóstico'], ['~R$0,12', 'por análise de IA'], ['30s', 'atualização do dashboard']].map(([num, label]) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-cyan-400 to-rose-500 bg-clip-text text-transparent">{num}</span>
                <span className="text-xs text-[#9b95ad] uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O PROBLEMA */}
      <section className="py-24 px-6" id="problema">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">O Problema</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">As 5 dores que toda consultoria SAP conhece</h2>
            <p className="text-[#9b95ad] text-lg">Você reconhece alguma dessas situações no seu dia a dia?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((p) => (
              <div key={p.title} className="bg-[#1a1527] border border-white/[0.08] rounded-2xl p-8 hover:-translate-y-1 hover:border-purple-500/20 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)] transition-all">
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
                <p className="text-sm text-[#9b95ad] mb-3 pl-3 border-l-[3px] border-rose-500"><strong>Hoje:</strong> {p.before}</p>
                <p className="text-sm text-[#e2e0ea] pl-3 border-l-[3px] border-emerald-500"><strong>Com SAPLINK:</strong> {p.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-24 px-6 bg-[#130e20]" id="como-funciona">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">Como Funciona</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">3 passos. Sem invasão. Sem risco.</h2>
            <p className="text-[#9b95ad] text-lg">O SAPLINK não modifica o SAP do seu cliente. Apenas lê dados via conexões nativas (RFC).</p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-4 mb-20">
            {[
              { n: '01', title: 'Instale o Agente', desc: 'Container Docker leve no servidor do cliente. Sem alterar nada no SAP. Configuração em menos de 30 minutos.', tags: ['Docker', 'RFC', 'Read-only'] },
              { n: '02', title: 'Monitore Automaticamente', desc: 'O agente coleta dados a cada 30 segundos: erros, filas, crashes, certificados.', tags: ['8 Conectores', 'TLS/SSL', 'Real-time'] },
              { n: '03', title: 'Receba Alertas e Diagnósticos', desc: 'Dashboard multi-cliente, alertas no WhatsApp/email, diagnóstico com IA em português.', tags: ['IA Claude', 'WhatsApp', 'White-label'] },
            ].map((s, i) => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="bg-[#1a1527] border border-white/[0.08] rounded-2xl p-8 flex-1 min-w-[260px] max-w-[340px] text-center hover:-translate-y-1 transition-transform">
                  <div className="text-5xl font-black bg-gradient-to-r from-purple-500 via-cyan-400 to-rose-500 bg-clip-text text-transparent opacity-30 leading-none mb-2">{s.n}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-[#9b95ad] mb-5">{s.desc}</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {s.tags.map(t => <span key={t} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">{t}</span>)}
                  </div>
                </div>
                {i < 2 && <span className="text-2xl text-purple-500/50 mt-20 hidden md:block">→</span>}
              </div>
            ))}
          </div>
          {/* Architecture */}
          <div className="bg-[#1a1527] border border-white/[0.08] rounded-3xl p-8 md:p-12">
            <h3 className="text-xl font-bold text-white text-center mb-10">Arquitetura Simplificada</h3>
            <div className="flex flex-col items-center gap-4 max-w-[700px] mx-auto">
              <div className="text-center w-full">
                <div className="text-xs font-bold uppercase tracking-widest text-[#9b95ad] mb-3">Cliente Final</div>
                <div className="flex gap-3 justify-center flex-wrap mb-3">
                  <span className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">SAP ECC/S4</span>
                  <span className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">Protheus</span>
                  <span className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">WMS</span>
                  <span className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">Mastersaf</span>
                </div>
                <div className="text-[#9b95ad]/50 text-lg">↓</div>
                <span className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">Agente Docker (RFC read-only)</span>
              </div>
              <div className="text-purple-400 font-semibold">↓ TLS/SSL</div>
              <div className="text-center w-full">
                <div className="text-xs font-bold uppercase tracking-widest text-[#9b95ad] mb-3">Nuvem SAPLINK</div>
                <div className="flex gap-3 justify-center flex-wrap">
                  {['Health Monitor', 'Motor IA', 'Alertas', 'Relatórios'].map(b => (
                    <span key={b} className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">{b}</span>
                  ))}
                </div>
              </div>
              <div className="text-purple-400 font-semibold">↓</div>
              <div className="text-center w-full">
                <div className="text-xs font-bold uppercase tracking-widest text-[#9b95ad] mb-3">Consultoria</div>
                <div className="flex gap-3 justify-center flex-wrap">
                  {['Portal Multi-Cliente', 'WhatsApp / Email', 'PDF White-label'].map(b => (
                    <span key={b} className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">{b}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 p-5 bg-purple-500/5 border border-purple-500/20 rounded-lg text-sm text-[#9b95ad] text-center leading-relaxed">
              <strong>8 conectores nativos:</strong> SAP ECC, S/4HANA, RISE, Protheus, WMS, Mastersaf, CNAB bancário, REST genérico.<br />
              <strong>Não-invasivo:</strong> O agente usa chamadas RFC padrão do SAP para leitura. Não modifica dados.
            </div>
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section className="py-24 px-6" id="funcionalidades">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">Funcionalidades</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">8 módulos. Tudo que sua consultoria precisa.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className={`relative bg-[#1a1527] border rounded-2xl p-7 overflow-hidden hover:-translate-y-1 transition-all group ${f.highlight ? 'border-purple-500/30 bg-gradient-to-br from-purple-500/[0.08] to-[#1a1527]' : 'border-white/[0.08] hover:border-purple-500/20'}`}>
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-cyan-400 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase mb-3 ${f.badge === 'IA' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-[#9b95ad]'}`}>{f.badge}</span>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-[#9b95ad] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section className="py-24 px-6 bg-[#130e20]" id="planos">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">Planos</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Preços pensados para consultorias brasileiras</h2>
            <p className="text-[#9b95ad] text-lg mb-4">Pague pelo número de clientes que você gerencia. Sem surpresas.</p>
            <span className="inline-block px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">Preços de lançamento</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`relative bg-[#1a1527] border rounded-2xl p-8 text-center flex flex-col hover:-translate-y-1 transition-all ${p.popular ? 'border-purple-500 shadow-[0_0_40px_rgba(124,58,237,0.15)] bg-gradient-to-b from-purple-500/[0.08] to-[#1a1527]' : 'border-white/[0.08]'}`}>
                {p.popular && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-rose-500 text-white text-xs font-bold uppercase whitespace-nowrap">Mais Popular</div>}
                <div className="text-lg font-bold text-white mb-2">{p.name}</div>
                <div className="text-4xl font-black text-white mb-1">{p.price}<span className="text-sm font-medium text-[#9b95ad]">/mês</span></div>
                <div className="text-sm text-purple-400 font-semibold mb-4">{p.clients}</div>
                <ul className="text-left space-y-2 mb-6 flex-1">
                  {p.features.map(f => <li key={f} className="text-sm text-[#e2e0ea]">✓ {f}</li>)}
                  {p.noFeatures.map(f => <li key={f} className="text-sm text-[#9b95ad]/50">✗ {f}</li>)}
                </ul>
                <a href="#lista-espera" className={`block py-3 rounded-full font-semibold text-sm transition-colors ${p.popular ? 'bg-gradient-to-r from-purple-600 via-cyan-500 to-rose-500 text-white' : 'border border-purple-500/20 text-[#e2e0ea] hover:bg-purple-500/10'}`}>Quero ser avisado</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="py-24 px-6" id="roadmap">
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">Roadmap</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Onde estamos e para onde vamos</h2>
          </div>
          <div className="relative pl-10 before:absolute before:left-[15px] before:top-0 before:bottom-0 before:w-0.5 before:bg-white/[0.08]">
            {roadmap.map((r) => (
              <div key={r.title} className="relative mb-10 last:mb-0">
                <div className={`absolute -left-[25px] top-1.5 w-4 h-4 rounded-full border-[3px] z-10 ${r.status === 'done' ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : r.status === 'current' ? 'bg-purple-500 border-purple-500 shadow-[0_0_12px_rgba(124,58,237,0.5)] animate-pulse' : 'bg-[#0f0b1a] border-[#9b95ad]'}`} />
                <div className={`bg-[#1a1527] border rounded-2xl p-6 ${r.status === 'current' ? 'border-purple-500/30 bg-gradient-to-br from-purple-500/[0.08] to-[#1a1527]' : 'border-white/[0.08]'}`}>
                  <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase mb-3 ${r.status === 'done' ? 'bg-emerald-500/15 text-emerald-400' : r.status === 'current' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-[#9b95ad]'}`}>
                    {r.status === 'done' ? 'Concluído' : r.status === 'current' ? 'Em Andamento' : 'Planejado'}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-[#9b95ad] leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTA DE ESPERA */}
      <section className="py-24 px-6 bg-[#130e20]" id="lista-espera">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">Lista de Espera</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Seja um dos primeiros a usar o SAPLINK</h2>
            <p className="text-[#9b95ad] text-lg">Estamos em desenvolvimento ativo. Entre na lista para acesso antecipado e condições exclusivas.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {['🌟 Acesso antecipado ao beta', '💰 Desconto de lançamento', '🤝 Feedback direto', '🔒 Vagas limitadas'].map(b => (
              <div key={b} className="flex items-center gap-3 text-sm text-[#e2e0ea] p-3 bg-[#1a1527] border border-white/[0.08] rounded-lg">{b}</div>
            ))}
          </div>
          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="bg-[#1a1527] border border-white/[0.08] rounded-3xl p-8 md:p-10">
              {[
                { label: 'Seu nome', type: 'text', key: 'name', placeholder: 'Ex: João Silva' },
                { label: 'Seu melhor e-mail', type: 'email', key: 'email', placeholder: 'joao@consultoria.com.br' },
                { label: 'Nome da consultoria', type: 'text', key: 'company', placeholder: 'Ex: SAP Solutions Brasil' },
              ].map(f => (
                <div key={f.key} className="mb-5">
                  <label className="block text-sm font-semibold text-[#e2e0ea] mb-2">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} required value={formData[f.key as keyof typeof formData]} onChange={e => setFormData({ ...formData, [f.key]: e.target.value })} className="w-full px-4 py-3.5 rounded-lg bg-[#0f0b1a] border border-white/[0.08] text-white placeholder:text-[#9b95ad]/60 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition" />
                </div>
              ))}
              <button type="submit" className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 via-cyan-500 to-rose-500 text-white font-semibold text-lg shadow-lg shadow-purple-500/30 hover:-translate-y-0.5 transition-transform">Entrar na Lista de Espera</button>
              <p className="text-center text-xs text-[#9b95ad] mt-4">Sem spam. Apenas atualizações sobre o lançamento.</p>
            </form>
          ) : (
            <div className="text-center p-12 bg-[#1a1527] border border-emerald-500/30 rounded-3xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 text-3xl flex items-center justify-center mx-auto mb-5">✓</div>
              <h3 className="text-2xl font-bold text-white mb-3">Você está na lista!</h3>
              <p className="text-[#9b95ad]">Obrigado pelo interesse. Vamos te avisar assim que o SAPLINK estiver pronto.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
