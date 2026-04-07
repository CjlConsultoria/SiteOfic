"use client";

import { useState } from "react";

const resources = [
  {
    title: "Infraestrutura Resiliente",
    desc: "Oferecemos uma infraestrutura tecnológica robusta e altamente disponível, capaz de suportar o crescimento do seu negócio.",
  },
  {
    title: "Integração Segura",
    desc: "Conectamos seus sistemas e plataformas de forma eficiente e segura, utilizando protocolos avançados.",
  },
  {
    title: "Gerenciamento Centralizado de Riscos",
    desc: "Implementamos soluções que permitem monitorar, identificar e controlar riscos digitais em um único painel.",
  },
  {
    title: "Proteção Avançada de Dados",
    desc: "Adotamos práticas como criptografia ponta a ponta, autenticação multifator e políticas rigorosas de controle de acesso.",
  },
  {
    title: "Atendimento Multicanal Seguro",
    desc: "Suporte técnico e atendimento por múltiplos canais protegidos por mecanismos de segurança.",
  },
];

export default function SobrePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ═══════════════ HERO BANNER ═══════════════ */}
      <section className="relative flex items-center justify-center overflow-hidden py-32 px-6">
        {/* decorative gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, #d4a017, transparent)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1
            className="text-4xl font-extrabold leading-tight sm:text-6xl"
            style={{
              background: "linear-gradient(135deg, #d4a017 0%, #f0c040 50%, #d4a017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Conheça Nossa História
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            A CJL oferece soluções estratégicas em tecnologia para transformar negócios e otimizar
            resultados.
          </p>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Soluções sob medida</h2>
          <p className="text-lg leading-relaxed text-zinc-400">
            Cada negócio é único — e suas necessidades tecnológicas também. Por isso, nossa
            abordagem é totalmente personalizada. Desenvolvemos soluções sob medida, alinhadas aos
            objetivos estratégicos de cada cliente.
          </p>
        </div>
      </section>

      {/* ═══════════════ COMPANY ═══════════════ */}
      <section className="border-y border-white/[0.06] bg-[#0d0d0d] py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold leading-snug sm:text-3xl">
            A CJL é uma empresa especializada na gestão de Tecnologia da Informação para pequenas e
            médias empresas.
          </h2>
          <p className="text-lg leading-relaxed text-zinc-400">
            Somos especialistas em transformar pequenos e médios negócios por meio de soluções em
            tecnologia da informação. Ajudamos você a crescer com inovação e segurança.
          </p>
          <p className="mt-6 text-base leading-relaxed text-zinc-500">
            Nosso portfólio abrange desde a gestão completa de infraestrutura até o desenvolvimento
            de sistemas personalizados, passando por consultoria em segurança digital, integração de
            plataformas, suporte técnico e treinamento de equipes. Com a CJL, sua empresa conta com
            um parceiro comprometido em entregar resultados reais.
          </p>
        </div>
      </section>

      {/* ═══════════════ RESOURCES ACCORDION ═══════════════ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">Nossos Recursos</h2>
          <div className="flex flex-col gap-4">
            {resources.map((r, i) => {
              const isOpen = openIndex === i;
              return (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full rounded-2xl border border-white/[0.08] bg-[#141414] text-left transition-all duration-300 hover:border-[#d4a017]/50"
                >
                  <div className="flex items-center justify-between px-6 py-5">
                    <span className="text-lg font-semibold">{r.title}</span>
                    <span
                      className="ml-4 shrink-0 text-2xl text-[#d4a017] transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">{r.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="border-t border-white/[0.06] bg-[#0d0d0d] py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Pronto para transformar seu negócio?</h2>
          <p className="mb-8 text-zinc-400">
            Entre em contato e descubra como a CJL pode impulsionar seus resultados.
          </p>
          <a
            href="https://wa.me/5511940090003"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-gradient-to-r from-[#d4a017] to-[#f0c040] px-10 py-4 font-semibold text-black transition hover:brightness-110"
          >
            Contate-nos
          </a>
        </div>
      </section>
    </div>
  );
}
