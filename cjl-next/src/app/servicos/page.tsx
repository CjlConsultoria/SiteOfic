"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { testimonials } from "@/data/plans";

const servicePlans = [
  { name: "Iniciante", price: "R$ 29,90", period: "/mês", desc: "Para quem está começando a estruturar sua presença digital." },
  { name: "Essencial", price: "R$ 49,90", period: "/mês", desc: "Recursos essenciais para manter sua operação funcionando." },
  { name: "Profissional", price: "R$ 99,90", period: "/mês", desc: "Ferramentas profissionais para equipes em crescimento." },
  { name: "Corporativo", price: "R$ 149,90", period: "/mês", desc: "Gestão completa para empresas consolidadas." },
  { name: "Empresarial", price: "R$ 249,90", period: "/mês", desc: "Soluções avançadas com suporte prioritário." },
  { name: "Avançado", price: "R$ 349,90", period: "/mês", desc: "Recursos avançados de automação e relatórios." },
  { name: "Premium", price: "R$ 499,90", period: "/mês", desc: "Acesso premium com funcionalidades exclusivas." },
  { name: "Ultra", price: "R$ 699,90", period: "/mês", desc: "Performance ultra para operações de alta demanda." },
  { name: "Mega", price: "R$ 899,90", period: "/mês", desc: "Capacidade máxima para grandes operações." },
  { name: "Enterprise", price: "R$ 1.299,90", period: "/mês", desc: "Solução enterprise com personalização total." },
];

export default function ServicosPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="bg-[#eff6ff] py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f] leading-tight">
            Soluções Inteligentes
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Tecnologia e consultoria para transformar seu negócio
          </p>
        </div>
      </section>

      {/* ══════════ CJL OVERVIEW ══════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-1 bg-[#ff6b35] rounded-full mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6">
              CJL <span className="text-[#0ea5e9]">Consultoria</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#475569]">
              Consultoria estratégica em TI com foco em resultados mensuráveis.
              Ajudamos empresas a otimizar processos, reduzir custos e acelerar
              a transformação digital com soluções personalizadas para cada fase
              do seu negócio.
            </p>
          </div>
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/consultoria.webp"
              alt="CJL Consultoria"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="py-20 px-6 bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0f172a] mb-12">
            O que nossos clientes dizem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} className="w-5 h-5 text-[#ff6b35]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#475569] text-sm leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-[#0f172a]">{t.name}</p>
                  <p className="text-[#94a3b8] text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.slice(0, 3).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeTestimonial % 3
                    ? "bg-[#ff6b35] w-7"
                    : "bg-[#cbd5e1] hover:bg-[#94a3b8]"
                }`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTING SYSTEM ══════════ */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-[#eff6ff] border border-[#bfdbfe] rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse" />
            <span className="text-[#0ea5e9] text-sm font-medium">
              Testes &amp; Validação
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-6">
            Sistema para Testes
          </h2>
          <p className="text-lg leading-relaxed text-[#475569]">
            Oferecemos plataformas de teste para validação completa antes do
            lançamento. Garanta que seu sistema funcione perfeitamente em todos
            os cenários antes de ir ao ar.
          </p>
        </div>
      </section>

      {/* ══════════ SERVICE PLANS ══════════ */}
      <section className="py-20 px-6 bg-[#eff6ff]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0f172a] mb-4">
            Planos de Serviço
          </h2>
          <p className="text-[#475569] text-center mb-12 max-w-xl mx-auto">
            Planos flexíveis para validação e operação de sistemas
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {servicePlans.map((plan, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wider mb-2">
                  Plano {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold text-[#0f172a] mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#64748b] mb-4 flex-1">{plan.desc}</p>
                <div className="mb-5">
                  <span className="text-2xl font-extrabold text-[#ff6b35]">
                    {plan.price}
                  </span>
                  <span className="text-[#94a3b8] text-sm">{plan.period}</span>
                </div>
                <a
                  href="https://wa.me/551152865790"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-bold py-2.5 px-4 rounded-xl bg-[#1e3a5f] text-white hover:bg-[#162d4a] transition-colors duration-200"
                >
                  Contratar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="bg-[#1e3a5f] py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-[#93c5fd] text-lg mb-8 max-w-xl mx-auto">
            Entre em contato e descubra como podemos transformar seu negócio
            com tecnologia e consultoria estratégica.
          </p>
          <a
            href="https://wa.me/551152865790"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-[#ff6b35] px-8 py-4 font-bold text-white text-lg transition hover:bg-[#e85d2c] shadow-lg shadow-[#ff6b35]/25"
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
