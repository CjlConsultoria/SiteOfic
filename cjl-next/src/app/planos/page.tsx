"use client";

import { useState } from "react";
import { consultoriaPlans, softwarePlans } from "@/data/plans";

type Tab = "consultoria" | "software";

export default function PlanosPage() {
  const [activeTab, setActiveTab] = useState<Tab>("consultoria");

  const plans = activeTab === "consultoria" ? consultoriaPlans : softwarePlans;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Nossos{" "}
            <span className="text-yellow-400">Planos</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Escolha o plano ideal para o momento do seu negocio
          </p>
        </div>
      </section>

      {/* Tab Switcher */}
      <section className="py-12 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl border border-gray-800 bg-[#111] p-1">
              <button
                onClick={() => setActiveTab("consultoria")}
                className={`px-6 sm:px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === "consultoria"
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Consultoria
              </button>
              <button
                onClick={() => setActiveTab("software")}
                className={`px-6 sm:px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === "software"
                    ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Software
              </button>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Planos de{" "}
            <span className="text-yellow-400">
              {activeTab === "consultoria" ? "Consultoria" : "Software"}
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            {activeTab === "consultoria"
              ? "Consultoria estrategica em TI para cada fase do seu negocio"
              : "Desenvolvimento de software sob medida com suporte continuo"}
          </p>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="rounded-xl border border-gray-800 bg-[#111] p-6 hover:border-yellow-500/50 transition-all duration-300 flex flex-col group"
              >
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                  Plano {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-yellow-400">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0"
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
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/5511940090003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-semibold py-3 px-4 rounded-lg border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-200"
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
            Nao encontrou o plano{" "}
            <span className="text-yellow-400">ideal</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Montamos um plano personalizado para o seu negocio.
            Fale com nossa equipe.
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
