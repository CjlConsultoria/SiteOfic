"use client";

import Link from "next/link";

const systems = [
  {
    icon: "\ud83c\udf7d\ufe0f",
    name: "Convivium",
    badge: "Operacional",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    accentColor: "green",
    tagline: "Sistema de gestao para alimentacao e hospitalidade",
    whatItIs:
      "Plataforma completa para restaurantes, bares, buffets e operacoes de alimentacao em geral.",
    howItWorks: [
      "Gestao de pedidos em tempo real",
      "Controle de estoque integrado",
      "Painel operacional completo",
      "Relatorios detalhados",
      "Suporte a multiplas unidades",
    ],
    forWhom:
      "Restaurantes, bares, lanchonetes, buffets e dark kitchens",
    status: "Ativo",
    platform: "Web",
    link: "https://convivium-front.onrender.com",
    isExternal: true,
  },
  {
    icon: "\ud83d\udcc8",
    name: "TradeLinkInvest",
    badge: "Investimentos",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    accentColor: "blue",
    tagline:
      "Plataforma de analise e acompanhamento de investimentos",
    whatItIs:
      "Sistema de analise de investimentos e acompanhamento de portfolio para investidores e assessores.",
    howItWorks: [
      "Dashboard de portfolio completo",
      "Analise de ativos em tempo real",
      "Acompanhamento de rentabilidade",
      "Alertas personalizados",
      "Conteudo educacional",
    ],
    forWhom:
      "Investidores individuais, assessores financeiros e entusiastas do mercado",
    status: "Ativo",
    platform: "Web",
    link: "https://tradelinkinvest.com",
    isExternal: true,
  },
  {
    icon: "\u25c6",
    name: "SAPLINK",
    badge: "Em Desenvolvimento",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    accentColor: "purple",
    tagline: "Integration Health Monitor para consultorias SAP",
    whatItIs:
      "Monitoramento de integracoes SAP projetado para consultorias que precisam de visibilidade sobre a saude dos ambientes de seus clientes.",
    howItWorks: [
      "Agente Docker para coleta de dados",
      "Dashboard multi-cliente centralizado",
      "Diagnosticos com inteligencia artificial",
      "Sistema de alertas inteligente",
      "Relatorios white-label",
      "Scanner de dead code",
    ],
    forWhom: "Consultorias SAP com 5 a 50 consultores",
    status: "Em Desenvolvimento",
    platform: "Web + Docker Agent",
    link: "/saplink",
    isExternal: false,
  },
];

const accentMap: Record<string, { border: string; hoverBorder: string; bg: string; text: string; btnBg: string; btnHover: string }> = {
  green: {
    border: "border-green-500/20",
    hoverBorder: "hover:border-green-500/40",
    bg: "bg-green-500/5",
    text: "text-green-400",
    btnBg: "bg-green-500",
    btnHover: "hover:bg-green-400",
  },
  blue: {
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    bg: "bg-blue-500/5",
    text: "text-blue-400",
    btnBg: "bg-blue-500",
    btnHover: "hover:bg-blue-400",
  },
  purple: {
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
    bg: "bg-purple-500/5",
    text: "text-purple-400",
    btnBg: "bg-purple-500",
    btnHover: "hover:bg-purple-400",
  },
};

export default function SistemasPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Sistemas desenvolvidos pela{" "}
            <span className="text-yellow-400">CJL Consultoria</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Solucoes proprias que ja estao no mercado resolvendo problemas reais.
          </p>
        </div>
      </section>

      {/* System Cards */}
      <section className="py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {systems.map((sys) => {
            const accent = accentMap[sys.accentColor];
            return (
              <div
                key={sys.name}
                className={`rounded-2xl border ${accent.border} ${accent.hoverBorder} bg-[#111] transition-all duration-300 overflow-hidden`}
              >
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Left: Content */}
                  <div className="lg:col-span-2 p-8 sm:p-10">
                    {/* Badge + Icon */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl">{sys.icon}</span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${sys.badgeColor}`}
                      >
                        {sys.badge}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                      {sys.name}
                    </h2>
                    <p className={`${accent.text} text-lg mb-6`}>
                      {sys.tagline}
                    </p>

                    {/* What it is */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        O que e
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {sys.whatItIs}
                      </p>
                    </div>

                    {/* How it works */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                        Como funciona
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {sys.howItWorks.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <svg
                              className={`w-4 h-4 ${accent.text} mt-0.5 flex-shrink-0`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* For whom */}
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">
                        Para quem
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {sys.forWhom}
                      </p>
                    </div>
                  </div>

                  {/* Right: Info boxes + CTA */}
                  <div className={`${accent.bg} p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l ${accent.border}`}>
                    <div className="space-y-6">
                      {/* Status */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          Status
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              sys.status === "Ativo"
                                ? "bg-green-400"
                                : "bg-purple-400 animate-pulse"
                            }`}
                          />
                          <span className="text-white font-medium">
                            {sys.status}
                          </span>
                        </div>
                      </div>

                      {/* Platform */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          Plataforma
                        </div>
                        <span className="text-white font-medium">
                          {sys.platform}
                        </span>
                      </div>

                      {/* Access */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          Acesso
                        </div>
                        <span className={`${accent.text} text-sm font-medium break-all`}>
                          {sys.isExternal ? sys.link : "Pagina interna"}
                        </span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-8 space-y-3">
                      {sys.isExternal ? (
                        <a
                          href={sys.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`block text-center font-semibold py-3 px-6 rounded-xl ${accent.btnBg} ${accent.btnHover} text-black transition-all duration-200`}
                        >
                          Acessar {sys.name}
                        </a>
                      ) : (
                        <Link
                          href={sys.link}
                          className={`block text-center font-semibold py-3 px-6 rounded-xl ${accent.btnBg} ${accent.btnHover} text-black transition-all duration-200`}
                        >
                          Conhecer {sys.name}
                        </Link>
                      )}
                      <a
                        href="https://wa.me/5511940090003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-sm font-semibold py-3 px-6 rounded-xl border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-200"
                      >
                        Falar com a equipe
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Precisa de um sistema{" "}
            <span className="text-yellow-400">sob medida</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Desenvolvemos solucoes personalizadas para o seu negocio.
            Da ideia ao lancamento, acompanhamos cada etapa.
          </p>
          <a
            href="https://wa.me/5511940090003"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-400 transition-all duration-200 text-lg"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.694-1.347A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.3 0-4.438-.764-6.152-2.052a.5.5 0 00-.404-.084l-3.384.971.855-3.156a.5.5 0 00-.065-.422A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
