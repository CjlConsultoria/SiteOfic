"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { testimonials } from "@/data/plans";

/* ────────────────────────────────────────────── DATA ── */

const services = [
  {
    icon: "\u{1F3E2}",
    title: "Gestao de Condominios",
    desc: "Controle financeiro, comunicacao e administracao completa para condominios.",
  },
  {
    icon: "\u{1F527}",
    title: "Oficinas",
    desc: "Sistema completo para gestao de oficinas mecanicas e automotivas.",
  },
  {
    icon: "\u{1F4B0}",
    title: "Folha de Pagamento",
    desc: "Automacao de folha de pagamento e gestao de RH integrada.",
  },
  {
    icon: "\u{1F517}",
    title: "Integracao de Sistemas",
    desc: "Conexao segura entre plataformas e sistemas corporativos.",
  },
  {
    icon: "\u{1F4BB}",
    title: "Software sob Medida",
    desc: "Sistemas personalizados desenvolvidos para as necessidades do seu negocio.",
  },
  {
    icon: "\u{1F4F1}",
    title: "Aplicativos",
    desc: "Apps nativos e hibridos para iOS e Android com alta performance.",
  },
];

const stats = [
  { value: "1000+", label: "Projetos Entregues", color: "#ff6b35" },
  { value: "2500+", label: "Clientes Satisfeitos", color: "#0ea5e9" },
  { value: "30 min", label: "Tempo de Resposta", color: "#ff6b35" },
  { value: "4000+", label: "Suportes Realizados", color: "#0ea5e9" },
];

const whyUs = [
  "Equipe especializada com anos de experiencia",
  "Solucoes personalizadas para cada cliente",
  "Suporte rapido e humanizado",
  "Precos acessiveis para PMEs",
];

const systems = [
  {
    name: "Convivium",
    desc: "Gestão de condomínios e prédios residenciais",
    accent: "#22c55e",
    icon: "\u{1F3E2}",
    badge: null,
    link: "https://convivium-front.onrender.com",
  },
  {
    name: "TradeLinkInvest",
    desc: "Analise e investimentos inteligentes",
    accent: "#0ea5e9",
    icon: "\u{1F4C8}",
    badge: null,
    link: "https://tradelinkinvest.com",
  },
  {
    name: "SAPLINK",
    desc: "Monitoramento SAP com IA",
    accent: "#8b5cf6",
    icon: "\u{1F916}",
    badge: "Em Desenvolvimento",
    link: "/saplink",
  },
];

const cyberFeatures = [
  {
    icon: "\u{1F6E1}\uFE0F",
    title: "Firewall Gerenciado",
    desc: "Protecao avancada de perimetro com monitoramento continuo.",
  },
  {
    icon: "\u2601\uFE0F",
    title: "Backup em Nuvem",
    desc: "Copias seguras e automatizadas dos seus dados criticos.",
  },
  {
    icon: "\u{1F441}\uFE0F",
    title: "Monitoramento 24/7",
    desc: "Vigilancia ininterrupta da sua infraestrutura digital.",
  },
  {
    icon: "\u{1F510}",
    title: "Protecao de Dados (LGPD)",
    desc: "Adequacao completa as normas de protecao de dados.",
  },
  {
    icon: "\u{1F4CB}",
    title: "Gestao de Vulnerabilidades",
    desc: "Identificacao e correcao proativa de falhas de seguranca.",
  },
];

const faqs = [
  {
    q: "O que a CJL Consultoria faz?",
    a: "Somos uma empresa especializada em gestao de TI para PMEs. Oferecemos consultoria, desenvolvimento de software, infraestrutura e seguranca digital.",
  },
  {
    q: "Qual o prazo para desenvolver um sistema?",
    a: "Depende da complexidade. Um MVP pode ficar pronto em 3 meses. Projetos maiores levam de 6 a 12 meses.",
  },
  {
    q: "Voces atendem empresas de qualquer tamanho?",
    a: "Nosso foco sao pequenas e medias empresas, mas tambem atendemos grandes empresas em projetos especificos.",
  },
  {
    q: "Como funciona o suporte?",
    a: "Oferecemos suporte por WhatsApp, email e telefone. Tempo medio de resposta: 30 minutos em horario comercial.",
  },
  {
    q: "Os dados ficam seguros?",
    a: "Utilizamos criptografia, backups automaticos e seguimos as melhores praticas de seguranca e LGPD.",
  },
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim, todos os planos podem ser cancelados sem multa ou fidelidade.",
  },
];

/* ────────────────────────────────────────────── PAGE ── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Nome: ${formData.nome}\nEmail: ${formData.email}\nTelefone: ${formData.telefone}\nMensagem: ${formData.mensagem}`
    );
    window.open(`https://wa.me/551152865790?text=${msg}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-white text-[#1e293b]">
      {/* ═══════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)",
        }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28 lg:py-32">
          {/* Text */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#1e3a5f] sm:text-5xl lg:text-6xl">
              Transformamos tecnologia em resultados
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#475569]">
              Consultoria especializada em TI para pequenas e medias empresas.
              Infraestrutura, seguranca, desenvolvimento e inovacao digital.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/servicos"
                className="inline-flex items-center justify-center rounded-xl bg-[#ff6b35] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#ff6b35]/25 transition hover:bg-[#e5612f] hover:shadow-xl"
              >
                Nossos Servicos
              </Link>
              <a
                href="https://wa.me/551152865790"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#1e3a5f] px-7 py-3.5 font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white"
              >
                Fale Conosco
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#ff6b35]/20 to-[#0ea5e9]/20 blur-2xl" />
            <Image
              src="/images/consultoria.webp"
              alt="Consultoria em tecnologia"
              width={600}
              height={400}
              className="relative rounded-2xl object-cover shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-[#e2e8f0] bg-white/80 backdrop-blur">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-3xl font-extrabold sm:text-4xl"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-medium text-[#64748b]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. SERVICES OVERVIEW
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
              O que fazemos
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#64748b]">
              Solucoes completas de tecnologia para o seu negocio
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderLeftWidth: 4, borderLeftColor: "#ff6b35" }}
              >
                <span className="text-4xl">{s.icon}</span>
                <h3 className="mt-4 text-xl font-semibold text-[#0f172a]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/servicos"
              className="inline-flex items-center gap-2 font-semibold text-[#ff6b35] transition hover:underline"
            >
              Ver todos os servicos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. ABOUT CJL (BRIEF)
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#eff6ff] py-20 px-6 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          {/* Image */}
          <div className="relative mx-auto w-full max-w-md">
            <Image
              src="/images/empresaa.avif"
              alt="Equipe CJL Consultoria"
              width={500}
              height={400}
              className="rounded-2xl object-cover shadow-xl"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
              Por que escolher a CJL?
            </h2>
            <ul className="mt-8 space-y-5">
              {whyUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff6b35] text-sm text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-[#1e293b] font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/sobre"
                className="inline-flex items-center justify-center rounded-xl bg-[#1e3a5f] px-7 py-3.5 font-semibold text-white transition hover:bg-[#162d4a]"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. SYSTEMS SHOWCASE
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
              Nossos Sistemas
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#64748b]">
              Produtos proprios que ja estao no mercado
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {systems.map((s) => (
              <div
                key={s.name}
                className="flex flex-col rounded-2xl bg-white shadow-lg border border-[#e2e8f0] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Colored top border */}
                <div
                  className="h-1.5"
                  style={{ backgroundColor: s.accent }}
                />
                <div className="flex flex-1 flex-col p-8">
                  <span className="text-4xl">{s.icon}</span>
                  <h3 className="mt-4 text-xl font-bold text-[#0f172a]">
                    {s.name}
                  </h3>
                  {s.badge && (
                    <span
                      className="mt-2 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: `${s.accent}18`,
                        color: s.accent,
                      }}
                    >
                      {s.badge}
                    </span>
                  )}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#64748b]">
                    {s.desc}
                  </p>
                  <div className="mt-6">
                    {s.link.startsWith("http") ? (
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold transition hover:underline"
                        style={{ color: s.accent }}
                      >
                        Conhecer
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={s.link}
                        className="inline-flex items-center gap-1 text-sm font-semibold transition hover:underline"
                        style={{ color: s.accent }}
                      >
                        Conhecer
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. TESTIMONIALS
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#f8fafc] py-20 px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
              O que nossos clientes dizem
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl bg-white p-8 shadow-lg"
              >
                {/* Quote icon */}
                <svg
                  className="absolute top-6 right-6 h-10 w-10 text-[#ff6b35]/15"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4V21H0z" />
                </svg>

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-[#fbbf24]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-[#475569] leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 border-t border-[#f1f5f9] pt-4">
                  <p className="font-semibold text-[#0f172a]">{t.name}</p>
                  <p className="text-sm text-[#64748b]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. CYBERSECURITY
      ═══════════════════════════════════════════════════ */}
      <section className="bg-white py-20 px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
              Seguranca Digital
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#64748b]">
              Proteja sua empresa com nossas solucoes de seguranca
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {cyberFeatures.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-[#e2e8f0] bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="text-3xl">{c.icon}</span>
                <h3 className="mt-3 text-base font-semibold text-[#0f172a]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. FAQ
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#eff6ff] py-20 px-6 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-[#0f172a] sm:text-4xl">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl bg-white shadow-md transition-shadow"
                  style={
                    isOpen
                      ? { borderLeft: "4px solid #ff6b35" }
                      : { borderLeft: "4px solid transparent" }
                  }
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-4 font-semibold text-[#0f172a]">
                      {faq.q}
                    </span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-colors"
                      style={
                        isOpen
                          ? { backgroundColor: "#ff6b35", color: "#fff" }
                          : { backgroundColor: "#f1f5f9", color: "#64748b" }
                      }
                    >
                      {isOpen ? "\u2212" : "+"}
                    </span>
                  </button>
                  <div
                    className="transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? 200 : 0,
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                    }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#64748b]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          8. CONTACT / CTA
      ═══════════════════════════════════════════════════ */}
      <section className="bg-[#1e3a5f] py-20 px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-14 md:grid-cols-2">
            {/* Left - CTA text */}
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Pronto para transformar seu negocio?
              </h2>
              <p className="mt-4 text-lg text-[#94a3b8]">
                Entre em contato e descubra como podemos ajudar
              </p>
              <div className="mt-6 space-y-3">
                <p className="flex items-center gap-3 text-white">
                  <span className="text-xl">{"\u{1F4DE}"}</span>
                  (11) 5286-5790
                </p>
                <p className="flex items-center gap-3 text-white">
                  <span className="text-xl">{"\u{1F4AC}"}</span>
                  WhatsApp disponivel
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://wa.me/551152865790"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#ff6b35] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#ff6b35]/25 transition hover:bg-[#e5612f]"
                >
                  Fale pelo WhatsApp
                </a>
                <Link
                  href="/planos"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Nossos Planos
                </Link>
              </div>
            </div>

            {/* Right - Contact form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 rounded-2xl bg-white/10 p-8 backdrop-blur"
            >
              <input
                type="text"
                placeholder="Nome"
                required
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/50 outline-none transition focus:border-[#ff6b35]"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/50 outline-none transition focus:border-[#ff6b35]"
              />
              <input
                type="tel"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={(e) =>
                  setFormData({ ...formData, telefone: e.target.value })
                }
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/50 outline-none transition focus:border-[#ff6b35]"
              />
              <textarea
                placeholder="Mensagem"
                required
                rows={4}
                value={formData.mensagem}
                onChange={(e) =>
                  setFormData({ ...formData, mensagem: e.target.value })
                }
                className="resize-none rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/50 outline-none transition focus:border-[#ff6b35]"
              />
              <button
                type="submit"
                className="mt-2 rounded-xl bg-[#ff6b35] px-8 py-3.5 font-semibold text-white transition hover:bg-[#e5612f]"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
