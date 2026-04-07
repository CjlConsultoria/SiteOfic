"use client";

import { useState } from "react";
import Image from "next/image";

const resources = [
  {
    title: "Infraestrutura Resiliente",
    desc: "Infraestrutura tecnológica robusta e altamente disponível, capaz de suportar o crescimento do seu negócio e resistir a falhas.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Integração Segura",
    desc: "Conectamos seus sistemas e plataformas de forma eficiente e segura, utilizando protocolos avançados que garantem proteção dos dados.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.54a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.97" />
      </svg>
    ),
  },
  {
    title: "Gerenciamento de Riscos",
    desc: "Soluções que permitem monitorar, identificar e controlar riscos digitais em um único painel de gestão.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Proteção de Dados",
    desc: "Criptografia ponta a ponta, autenticação multifator e políticas rigorosas de controle de acesso.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Atendimento Multicanal",
    desc: "Suporte técnico por múltiplos canais protegidos por mecanismos de segurança.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export default function SobrePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="bg-[#eff6ff] py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f] leading-tight">
            Conheça Nossa História
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            A CJL oferece soluções estratégicas em tecnologia para transformar negócios e otimizar resultados.
          </p>
        </div>
      </section>

      {/* ══════════ MISSION — TWO COLUMNS ══════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/consultoria.webp"
              alt="CJL Consultoria"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="w-12 h-1 bg-[#d4a017] rounded-full mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6">
              Soluções sob medida
            </h2>
            <p className="text-lg leading-relaxed text-[#475569]">
              Cada negócio é único — e suas necessidades tecnológicas também. Por isso, nossa
              abordagem é totalmente personalizada. Desenvolvemos soluções sob medida, alinhadas aos
              objetivos estratégicos de cada cliente, garantindo máximo retorno sobre o investimento
              em tecnologia.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════ ABOUT COMPANY ══════════ */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6">
              Especialistas em TI para PMEs
            </h2>
            <p className="text-lg leading-relaxed text-[#475569] max-w-3xl mx-auto">
              A CJL é uma empresa especializada na gestão de Tecnologia da Informação para pequenas e
              médias empresas. Somos especialistas em transformar negócios por meio de soluções em
              tecnologia. Ajudamos você a crescer com inovação e segurança.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { value: "10+", label: "Anos de experiência" },
              { value: "200+", label: "Projetos entregues" },
              { value: "150+", label: "Clientes satisfeitos" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-[#d4a017] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#475569] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ RESOURCES ACCORDION ══════════ */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl sm:text-4xl font-bold text-[#0f172a]">
            Principais Recursos
          </h2>
          <div className="flex flex-col gap-4">
            {resources.map((r, i) => {
              const isOpen = openIndex === i;
              return (
                <button
                  key={r.title}
                  type="button"
                  onClick={() => toggle(i)}
                  className={`w-full rounded-2xl bg-white text-left transition-all duration-300 shadow-md hover:shadow-lg border-2 ${
                    isOpen ? "border-[#d4a017]" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? "bg-[#d4a017] text-white"
                          : "bg-[#eff6ff] text-[#1e3a5f]"
                      }`}
                    >
                      {r.icon}
                    </div>
                    <span className="text-lg font-semibold text-[#0f172a] flex-1">{r.title}</span>
                    <span
                      className={`ml-4 shrink-0 text-2xl font-light transition-transform duration-300 ${
                        isOpen ? "text-[#d4a017]" : "text-[#94a3b8]"
                      }`}
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
                    <p className="px-6 pb-5 pl-20 text-sm leading-relaxed text-[#64748b]">
                      {r.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-[#1e3a5f] py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
            Vamos conversar?
          </h2>
          <p className="mb-8 text-[#93c5fd] text-lg">
            Entre em contato e descubra como a CJL pode impulsionar seus resultados.
          </p>
          <a
            href="https://wa.me/551152865790"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-[#d4a017] px-8 py-4 font-bold text-white text-lg transition hover:bg-[#e85d2c] shadow-lg shadow-[#d4a017]/25"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
