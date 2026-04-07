"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { testimonials } from "@/data/plans";

const servicePlans = [
  { name: "Iniciante", price: "R$ 29,90", period: "/mes" },
  { name: "Essencial", price: "R$ 49,90", period: "/mes" },
  { name: "Profissional", price: "R$ 99,90", period: "/mes" },
  { name: "Corporativo", price: "R$ 149,90", period: "/mes" },
  { name: "Empresarial", price: "R$ 249,90", period: "/mes" },
  { name: "Avancado", price: "R$ 349,90", period: "/mes" },
  { name: "Premium", price: "R$ 499,90", period: "/mes" },
  { name: "Ultra", price: "R$ 699,90", period: "/mes" },
  { name: "Mega", price: "R$ 899,90", period: "/mes" },
  { name: "Enterprise", price: "R$ 1.299,90", period: "/mes" },
];

export default function ServicosPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Solucoes{" "}
            <span className="text-yellow-400">Inteligentes</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Tecnologia e Consultoria para transformar seu negocio
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                CJL <span className="text-yellow-400">Consultoria</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Consultoria estrategica em TI com foco em resultados mensuraveis.
                Ajudamos empresas a otimizar processos, reduzir custos e acelerar
                a transformacao digital com solucoes personalizadas.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
              <Image
                src="/images/consultoria.webp"
                alt="CJL Consultoria"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-gray-800/50 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            O que nossos clientes{" "}
            <span className="text-yellow-400">dizem</span>
          </h2>

          {/* Horizontal scroll on mobile, auto-rotate on desktop */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`min-w-[300px] sm:min-w-[350px] flex-shrink-0 snap-center rounded-xl border p-6 transition-all duration-500 ${
                  i === activeTestimonial
                    ? "border-yellow-500/50 bg-yellow-500/5"
                    : "border-gray-800 bg-[#0a0a0a]"
                }`}
              >
                <div className="text-yellow-400 text-2xl mb-4">&ldquo;</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {t.text}
                </p>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeTestimonial
                    ? "bg-yellow-400 w-6"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Depoimento ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testing System Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400 text-sm font-medium">
                Testes &amp; Validacao
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Sistema para{" "}
              <span className="text-yellow-400">Testes</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Oferecemos plataformas de teste para validacao completa antes do
              lancamento. Garanta que seu sistema funcione perfeitamente em todos
              os cenarios antes de ir ao ar.
            </p>
          </div>
        </div>
      </section>

      {/* Service Plans */}
      <section className="py-20 border-t border-gray-800/50 bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Planos de{" "}
            <span className="text-yellow-400">Servico</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Planos de teste para validacao de sistemas
          </p>

          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {servicePlans.map((plan, i) => (
              <div
                key={i}
                className="min-w-[220px] flex-shrink-0 snap-center rounded-xl border border-gray-800 bg-[#0a0a0a] p-6 hover:border-yellow-500/50 transition-all duration-300 group"
              >
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                  Plano {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold mb-4 group-hover:text-yellow-400 transition-colors">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-2xl font-bold text-yellow-400">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <a
                  href="https://wa.me/5511940090003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-semibold py-2 px-4 rounded-lg border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-200"
                >
                  Contratar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronto para <span className="text-yellow-400">comecar</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Entre em contato e descubra como podemos transformar seu negocio
            com tecnologia e consultoria estrategica.
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
