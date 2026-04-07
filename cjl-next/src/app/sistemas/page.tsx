'use client'
import Link from 'next/link'

const systems = [
  {
    name: 'Convivium',
    icon: '🍽️',
    tagline: 'Sistema de gestão para alimentação e hospitalidade',
    badge: 'Operacional',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    accentColor: 'border-emerald-500',
    status: 'Ativo',
    statusColor: 'text-emerald-600',
    platform: 'Web',
    description: 'Plataforma completa de gestão para restaurantes, bares, buffets e empresas do setor de alimentação. Controle operacional do pedido à entrega.',
    features: [
      'Gestão de pedidos centralizada, do balcão ao delivery',
      'Controle de estoque com alertas de ruptura',
      'Painel operacional em tempo real',
      'Relatórios de vendas, produtos mais pedidos e margem',
      'Gestão multi-unidade em um único painel',
    ],
    audience: 'Restaurantes, bares, lanchonetes, buffets, dark kitchens e catering.',
    link: 'https://convivium-front.onrender.com',
    linkText: 'Acessar Convivium',
    external: true,
  },
  {
    name: 'TradeLinkInvest',
    icon: '📈',
    tagline: 'Plataforma de análise e acompanhamento de investimentos',
    badge: 'Investimentos',
    badgeColor: 'bg-blue-100 text-blue-700',
    accentColor: 'border-blue-500',
    status: 'Ativo',
    statusColor: 'text-blue-600',
    platform: 'Web',
    description: 'Ferramentas de análise, acompanhamento de carteira e tomada de decisão para investidores que querem dados claros e acionáveis.',
    features: [
      'Dashboard consolidado de toda a carteira',
      'Indicadores fundamentalistas e técnicos',
      'Acompanhamento de rentabilidade real vs benchmark',
      'Alertas personalizados sobre variações',
      'Conteúdo educativo para investidores',
    ],
    audience: 'Investidores individuais, assessores e entusiastas do mercado financeiro.',
    link: 'https://tradelinkinvest.com',
    linkText: 'Acessar TradeLinkInvest',
    external: true,
  },
  {
    name: 'SAPLINK',
    icon: '◆',
    tagline: 'Integration Health Monitor para consultorias SAP',
    badge: 'Em Desenvolvimento',
    badgeColor: 'bg-purple-100 text-purple-700',
    accentColor: 'border-purple-500',
    status: 'Em Desenvolvimento',
    statusColor: 'text-purple-600',
    platform: 'Web + Docker Agent',
    description: 'Monitoramento de integrações SAP para consultorias que gerenciam múltiplos clientes. Dashboard multi-cliente, IA diagnóstica em português, alertas em tempo real.',
    features: [
      'Agente Docker não-invasivo (leitura via RFC)',
      'Health Score de 0 a 100 por cliente',
      'Diagnóstico com IA em português — causa raiz + correção',
      'Alertas via WhatsApp e email antes do cliente perceber',
      'Relatórios white-label com a marca da consultoria',
      'Dead Code Scanner para projetos de migração S/4HANA',
    ],
    audience: 'Consultorias SAP com 5 a 50 consultores que atendem PMEs brasileiras.',
    link: '/saplink',
    linkText: 'Ver página completa',
    external: false,
  },
]

export default function SistemasPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#eff6ff] to-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6">Nossos Sistemas</span>
          <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6">Sistemas desenvolvidos pela <span className="text-[#ff6b35]">CJL Consultoria</span></h1>
          <p className="text-lg text-gray-600 leading-relaxed">Soluções próprias que já estão no mercado resolvendo problemas reais. Cada sistema foi construído para atender necessidades específicas com tecnologia moderna.</p>
        </div>
      </section>

      {/* Systems */}
      {systems.map((sys, i) => (
        <section key={sys.name} className={`py-16 px-6 ${i % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white'}`}>
          <div className="max-w-5xl mx-auto">
            <div className={`bg-white rounded-2xl shadow-xl border-t-4 ${sys.accentColor} overflow-hidden`}>
              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${sys.badgeColor}`}>{sys.badge}</span>
                  <span className={`text-sm font-semibold ${sys.statusColor}`}>● {sys.status}</span>
                  <span className="text-sm text-gray-400">|</span>
                  <span className="text-sm text-gray-500">{sys.platform}</span>
                </div>
                <h2 className="text-3xl font-black text-[#0f172a] mb-2">{sys.icon} {sys.name}</h2>
                <p className="text-lg text-gray-500 mb-6">{sys.tagline}</p>

                <div className="grid md:grid-cols-[1fr,320px] gap-8">
                  <div>
                    <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider mb-3">O que é</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{sys.description}</p>

                    <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider mb-3">Como funciona</h3>
                    <ul className="space-y-2 mb-6">
                      {sys.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-gray-600">
                          <span className="text-[#ff6b35] font-bold mt-0.5">›</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wider mb-3">Para quem</h3>
                    <p className="text-gray-600">{sys.audience}</p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-1">Status</div>
                      <div className={`font-semibold ${sys.statusColor}`}>● {sys.status}</div>
                    </div>
                    <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-100">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-1">Plataforma</div>
                      <div className="font-semibold text-gray-700">{sys.platform}</div>
                    </div>
                    {sys.external ? (
                      <a href={sys.link} target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3.5 rounded-full bg-[#ff6b35] text-white font-semibold hover:bg-[#e55a2b] transition shadow-lg shadow-orange-200">{sys.linkText}</a>
                    ) : (
                      <Link href={sys.link} className="block text-center px-6 py-3.5 rounded-full bg-[#ff6b35] text-white font-semibold hover:bg-[#e55a2b] transition shadow-lg shadow-orange-200">{sys.linkText}</Link>
                    )}
                    <a href="https://wa.me/551152865790" target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3.5 rounded-full border-2 border-[#1e3a5f] text-[#1e3a5f] font-semibold hover:bg-[#1e3a5f] hover:text-white transition">Falar com comercial</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#1e3a5f] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Precisa de um sistema sob medida?</h2>
        <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">A CJL desenvolve soluções personalizadas para o seu negócio. Do levantamento à entrega, com suporte contínuo.</p>
        <a href="https://wa.me/551152865790?text=Olá,%20gostaria%20de%20um%20orçamento%20para%20desenvolvimento%20de%20sistema." target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full bg-[#ff6b35] text-white font-semibold text-lg hover:bg-[#e55a2b] transition shadow-lg">Solicitar orçamento</a>
      </section>
    </div>
  )
}
