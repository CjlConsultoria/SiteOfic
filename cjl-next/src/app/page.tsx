"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const solutions = [
  {
    icon: "🏢",
    title: "Condomínios",
    desc: "Gestão completa para condomínios com controle financeiro e comunicação",
  },
  {
    icon: "🔧",
    title: "Oficinas",
    desc: "Sistema completo para gestão de oficinas mecânicas e automotivas",
  },
  {
    icon: "💰",
    title: "Folha de Pagamento",
    desc: "Automação de folha de pagamento e gestão de RH",
  },
  {
    icon: "🔗",
    title: "Integração",
    desc: "Integração entre sistemas e plataformas de forma segura",
  },
  {
    icon: "💻",
    title: "Software sob Medida",
    desc: "Desenvolvimento de sistemas personalizados para seu negócio",
  },
  {
    icon: "📱",
    title: "Aplicativos",
    desc: "Aplicativos mobile nativos e híbridos para iOS e Android",
  },
];

const metrics = [
  { value: "1000+", label: "Projetos Entregues" },
  { value: "2500+", label: "Clientes Satisfeitos" },
  { value: "30 MIN", label: "Tempo de Resposta" },
  { value: "4000+", label: "Suportes Realizados" },
];

const cyberCards = [
  {
    icon: "🛡️",
    title: "Firewall Gerenciado",
    desc: "Proteção avançada de perímetro com monitoramento contínuo.",
  },
  {
    icon: "☁️",
    title: "Backup em Nuvem",
    desc: "Cópias seguras e automatizadas dos seus dados críticos.",
  },
  {
    icon: "👁️",
    title: "Monitoramento 24/7",
    desc: "Vigilância ininterrupta da sua infraestrutura digital.",
  },
  {
    icon: "🦠",
    title: "Antivírus Corporativo",
    desc: "Defesa robusta contra malware e ameaças emergentes.",
  },
  {
    icon: "🔍",
    title: "Gestão de Vulnerabilidades",
    desc: "Identificação e correção proativa de falhas de segurança.",
  },
  {
    icon: "📋",
    title: "Política de Segurança",
    desc: "Diretrizes e normas para proteger sua organização.",
  },
  {
    icon: "🎓",
    title: "Treinamento de Equipe",
    desc: "Capacitação dos colaboradores em boas práticas de segurança.",
  },
  {
    icon: "🚨",
    title: "Resposta a Incidentes",
    desc: "Ação rápida e coordenada diante de ameaças e violações.",
  },
  {
    icon: "🔐",
    title: "Criptografia de Dados",
    desc: "Proteção de informações sensíveis em trânsito e em repouso.",
  },
  {
    icon: "⚖️",
    title: "Compliance e LGPD",
    desc: "Adequação às normas de proteção de dados e privacidade.",
  },
];

export default function Home() {
  const [formData, setFormData] = useState({ nome: "", email: "", mensagem: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Nome: ${formData.nome}\nEmail: ${formData.email}\nMensagem: ${formData.mensagem}`
    );
    window.open(`https://wa.me/5511940090003?text=${msg}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ── Animated background orbs (CSS only) ── */}
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 50px) scale(1.05); }
          66% { transform: translate(40px, -20px) scale(0.9); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 60px) scale(1.15); }
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* orbs */}
        <div
          className="pointer-events-none absolute top-[10%] left-[15%] h-[420px] w-[420px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #d4a017, transparent 70%)",
            animation: "orbFloat1 14s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-[10%] right-[10%] h-[350px] w-[350px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #f0c040, transparent 70%)",
            animation: "orbFloat2 18s ease-in-out infinite",
          }}
        />
        <div
          className="pointer-events-none absolute top-[50%] left-[60%] h-[280px] w-[280px] rounded-full opacity-10 blur-[90px]"
          style={{
            background: "radial-gradient(circle, #d4a017, transparent 70%)",
            animation: "orbFloat3 22s ease-in-out infinite",
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1
            className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl"
            style={{
              background: "linear-gradient(135deg, #d4a017 0%, #f0c040 50%, #d4a017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Consultoria CJL
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            Soluções estratégicas em tecnologia para transformar negócios e otimizar resultados
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/servicos"
              className="rounded-full bg-gradient-to-r from-[#d4a017] to-[#f0c040] px-8 py-3.5 font-semibold text-black transition hover:brightness-110"
            >
              Conheça nossos serviços
            </Link>
            <a
              href="https://wa.me/5511940090003"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#d4a017]/40 px-8 py-3.5 font-semibold text-[#f0c040] transition hover:bg-[#d4a017]/10"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ SOLUTIONS ═══════════════ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-center text-3xl font-bold sm:text-4xl">Nossas Soluções</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-white/[0.08] bg-[#141414] p-8 transition-all duration-300 hover:border-[#d4a017]/60 hover:shadow-[0_0_30px_rgba(212,160,23,0.08)]"
              >
                <span className="text-4xl">{s.icon}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ METRICS ═══════════════ */}
      <section className="border-y border-white/[0.06] bg-[#0d0d0d] py-20 px-6">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p
                className="text-4xl font-extrabold sm:text-5xl"
                style={{
                  background: "linear-gradient(135deg, #d4a017, #f0c040)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {m.value}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-zinc-400">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CYBERSECURITY ═══════════════ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-center text-3xl font-bold sm:text-4xl">Segurança Digital</h2>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700">
            {cyberCards.map((c) => (
              <div
                key={c.title}
                className="flex min-w-[260px] shrink-0 flex-col rounded-2xl border border-white/[0.08] bg-[#141414] p-6 transition hover:border-[#d4a017]/50"
              >
                <span className="text-3xl">{c.icon}</span>
                <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section className="border-t border-white/[0.06] bg-[#0d0d0d] py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-14 text-center text-3xl font-bold sm:text-4xl">Entre em Contato</h2>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Nome"
                required
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="rounded-xl border border-white/[0.1] bg-[#141414] px-5 py-3.5 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4a017]/60"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl border border-white/[0.1] bg-[#141414] px-5 py-3.5 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4a017]/60"
              />
              <textarea
                placeholder="Mensagem"
                required
                rows={5}
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                className="rounded-xl border border-white/[0.1] bg-[#141414] px-5 py-3.5 text-white placeholder-zinc-500 outline-none transition focus:border-[#d4a017]/60 resize-none"
              />
              <button
                type="submit"
                className="mt-2 rounded-full bg-gradient-to-r from-[#d4a017] to-[#f0c040] px-8 py-3.5 font-semibold text-black transition hover:brightness-110"
              >
                Enviar
              </button>
            </form>

            {/* info */}
            <div className="flex flex-col justify-center gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#f0c040]">WhatsApp</h3>
                <a
                  href="https://wa.me/5511940090003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-zinc-300 transition hover:text-white"
                >
                  (11) 94009-0003
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#f0c040]">Telefone</h3>
                <p className="mt-1 text-zinc-300">(11) 94009-0003</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#f0c040]">Atendimento</h3>
                <p className="mt-1 text-zinc-300">Segunda a Sexta, 8h - 18h</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
