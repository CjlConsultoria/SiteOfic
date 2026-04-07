"use client";

import { useState } from "react";
import { consultoriaPlans, softwarePlans } from "@/data/plans";

type Tab = "consultoria" | "software";

export default function PlanosPage() {
  const [activeTab, setActiveTab] = useState<Tab>("consultoria");

  const plans = activeTab === "consultoria" ? consultoriaPlans : softwarePlans;

  return (
    <div className="min-h-screen bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="bg-[#eff6ff] py-24 sm:py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e3a5f] leading-tight">
            Nossos Planos
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Escolha o plano ideal para o momento do seu negócio
          </p>
        </div>
      </section>

      {/* ══════════ TAB SWITCHER + PLANS ══════════ */}
      <section className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl border border-gray-200 bg-[#f8fafc] p-1.5 shadow-sm">
              <button
                onClick={() => setActiveTab("consultoria")}
                className={`px-6 sm:px-10 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === "consultoria"
                    ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25"
                    : "text-[#64748b] hover:text-[#0f172a] bg-transparent"
                }`}
              >
                Consultoria
              </button>
              <button
                onClick={() => setActiveTab("software")}
                className={`px-6 sm:px-10 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === "software"
                    ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25"
                    : "text-[#64748b] hover:text-[#0f172a] bg-transparent"
                }`}
              >
                Software
              </button>
            </div>
          </div>

          {/* Section Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#0f172a] mb-2">
            Planos de{" "}
            <span className="text-[#0ea5e9]">
              {activeTab === "consultoria" ? "Consultoria" : "Software"}
            </span>
          </h2>
          <p className="text-[#64748b] text-center mb-12 max-w-xl mx-auto">
            {activeTab === "consultoria"
              ? "Consultoria estratégica em TI para cada fase do seu negócio"
              : "Desenvolvimento de software sob medida com suporte contínuo"}
          </p>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wider mb-3">
                  Plano {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 group-hover:text-[#0ea5e9] transition-colors">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-[#ff6b35]">
                    {plan.price}
                  </span>
                  <span className="text-[#94a3b8] text-sm ml-1">{plan.period}</span>
                </div>
                <p className="text-[#64748b] text-sm mb-6 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, fi) => (
                    <li
                      key={fi}
                      className="flex items-start gap-2.5 text-sm text-[#475569]"
                    >
                      <svg
                        className="w-5 h-5 text-[#22c55e] mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
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
                  href="https://wa.me/551152865790"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm font-bold py-3 px-4 rounded-xl bg-[#ff6b35] text-white hover:bg-[#e85d2c] transition-colors duration-200 shadow-sm"
                >
                  Contratar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CUSTOM PLAN CTA ══════════ */}
      <section className="bg-[#1e3a5f] py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Precisa de algo personalizado?
          </h2>
          <p className="text-[#93c5fd] text-lg mb-8 max-w-xl mx-auto">
            Montamos um plano sob medida para o seu negócio. Fale com nossa equipe.
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
