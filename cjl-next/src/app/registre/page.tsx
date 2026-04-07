'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register, verificarCpf } from '@/lib/api'
import Link from 'next/link'
import axios from 'axios'

const steps = ['Dados Pessoais', 'CPF', 'Pessoa Jurídica', 'Nascimento', 'Endereço', 'Credenciais']

export default function RegistrePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: '', sobrenome: '', apelido: '',
    cpf: '', ehPJ: false, cnpj: '', nomeEmpresa: '',
    diaNasc: '', mesNasc: '', anoNasc: '', genero: '',
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    email: '', senha: '', confirmarSenha: '',
  })

  function update(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  async function buscarCep() {
    if (form.cep.length !== 8) return
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`)
      if (!data.erro) {
        setForm(prev => ({ ...prev, logradouro: data.logradouro || '', bairro: data.bairro || '', cidade: data.localidade || '', estado: data.uf || '' }))
      }
    } catch { /* ignore */ }
  }

  function validateStep(): boolean {
    switch (step) {
      case 0: if (!form.nome || !form.sobrenome) { setError('Preencha nome e sobrenome.'); return false } break
      case 1: if (form.cpf.length !== 11) { setError('CPF deve ter 11 dígitos.'); return false } break
      case 3: if (!form.diaNasc || !form.mesNasc || !form.anoNasc || !form.genero) { setError('Preencha todos os campos.'); return false } break
      case 4: if (!form.cep || !form.logradouro || !form.numero || !form.cidade || !form.estado) { setError('Preencha o endereço completo.'); return false } break
      case 5:
        if (!form.email || !form.senha || !form.confirmarSenha) { setError('Preencha todos os campos.'); return false }
        if (form.senha !== form.confirmarSenha) { setError('Senhas não conferem.'); return false }
        if (!/[A-Z]/.test(form.senha) || !/[0-9]/.test(form.senha)) { setError('Senha precisa de 1 maiúscula e 1 número.'); return false }
        break
    }
    return true
  }

  async function nextStep() {
    if (!validateStep()) return
    if (step === 1) {
      try { await verificarCpf(form.cpf) } catch { setError('CPF já cadastrado ou inválido.'); return }
    }
    if (step < 5) setStep(step + 1)
    else await handleSubmit()
  }

  async function handleSubmit() {
    setLoading(true)
    try {
      const dataNascimento = `${form.anoNasc}-${form.mesNasc.padStart(2, '0')}-${form.diaNasc.padStart(2, '0')}`
      await register({
        nome: form.nome, sobrenome: form.sobrenome, apelido: form.apelido || form.nome,
        cpf: form.cpf, cnpj: form.ehPJ ? form.cnpj : null, nomeEmpresa: form.ehPJ ? form.nomeEmpresa : null,
        dataNascimento, genero: form.genero,
        cep: form.cep, logradouro: form.logradouro, numero: form.numero, complemento: form.complemento, bairro: form.bairro, cidade: form.cidade, estado: form.estado,
        email: form.email, senha: form.senha,
      })
      router.push('/login')
    } catch {
      setError('Erro no cadastro. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-white placeholder:text-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#0a0a0a]">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/"><img src="/images/logocjl.png" alt="CJL" className="w-16 h-16 mx-auto mb-4" /></Link>
          <h1 className="text-3xl font-bold text-white">Criar Conta</h1>
          <p className="text-gray-500 mt-2">Passo {step + 1} de 6 — {steps[step]}</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-amber-500' : 'bg-white/[0.08]'}`} />
          ))}
        </div>

        <div className="bg-[#141414] border border-white/[0.08] rounded-2xl p-8">
          {error && <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>}

          {/* Step 0: Personal */}
          {step === 0 && (
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">Nome *</label><input type="text" value={form.nome} onChange={e => update('nome', e.target.value)} placeholder="Seu nome" className={inputClass} /></div>
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">Sobrenome *</label><input type="text" value={form.sobrenome} onChange={e => update('sobrenome', e.target.value)} placeholder="Seu sobrenome" className={inputClass} /></div>
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">Apelido (opcional)</label><input type="text" value={form.apelido} onChange={e => update('apelido', e.target.value)} placeholder="Como quer ser chamado" className={inputClass} /></div>
            </div>
          )}

          {/* Step 1: CPF */}
          {step === 1 && (
            <div><label className="block text-sm font-semibold text-gray-300 mb-2">CPF *</label><input type="text" maxLength={11} value={form.cpf} onChange={e => update('cpf', e.target.value.replace(/\D/g, ''))} placeholder="Somente números" className={inputClass} /></div>
          )}

          {/* Step 2: PJ */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Você é Pessoa Jurídica?</p>
              <div className="flex gap-4">
                <button type="button" onClick={() => update('ehPJ', false)} className={`flex-1 py-3 rounded-lg font-semibold text-sm border transition ${!form.ehPJ ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-gray-400 border-white/[0.08] hover:border-amber-500/50'}`}>Não</button>
                <button type="button" onClick={() => update('ehPJ', true)} className={`flex-1 py-3 rounded-lg font-semibold text-sm border transition ${form.ehPJ ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-gray-400 border-white/[0.08] hover:border-amber-500/50'}`}>Sim</button>
              </div>
              {form.ehPJ && (
                <>
                  <div><label className="block text-sm font-semibold text-gray-300 mb-2">CNPJ</label><input type="text" maxLength={14} value={form.cnpj} onChange={e => update('cnpj', e.target.value.replace(/\D/g, ''))} placeholder="Somente números" className={inputClass} /></div>
                  <div><label className="block text-sm font-semibold text-gray-300 mb-2">Nome da Empresa</label><input type="text" value={form.nomeEmpresa} onChange={e => update('nomeEmpresa', e.target.value)} placeholder="Razão social" className={inputClass} /></div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Birth + Gender */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-300">Data de Nascimento *</p>
              <div className="grid grid-cols-3 gap-3">
                <input type="text" maxLength={2} value={form.diaNasc} onChange={e => update('diaNasc', e.target.value.replace(/\D/g, ''))} placeholder="Dia" className={inputClass} />
                <input type="text" maxLength={2} value={form.mesNasc} onChange={e => update('mesNasc', e.target.value.replace(/\D/g, ''))} placeholder="Mês" className={inputClass} />
                <input type="text" maxLength={4} value={form.anoNasc} onChange={e => update('anoNasc', e.target.value.replace(/\D/g, ''))} placeholder="Ano" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Gênero *</label>
                <select value={form.genero} onChange={e => update('genero', e.target.value)} className={inputClass}>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                  <option value="prefiro_nao_dizer">Prefiro não dizer</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Address */}
          {step === 4 && (
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">CEP *</label><input type="text" maxLength={8} value={form.cep} onChange={e => { update('cep', e.target.value.replace(/\D/g, '')); }} onBlur={buscarCep} placeholder="Somente números" className={inputClass} /></div>
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">Logradouro *</label><input type="text" value={form.logradouro} onChange={e => update('logradouro', e.target.value)} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-semibold text-gray-300 mb-2">Número *</label><input type="text" value={form.numero} onChange={e => update('numero', e.target.value)} className={inputClass} /></div>
                <div><label className="block text-sm font-semibold text-gray-300 mb-2">Complemento</label><input type="text" value={form.complemento} onChange={e => update('complemento', e.target.value)} className={inputClass} /></div>
              </div>
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">Bairro</label><input type="text" value={form.bairro} onChange={e => update('bairro', e.target.value)} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-semibold text-gray-300 mb-2">Cidade *</label><input type="text" value={form.cidade} onChange={e => update('cidade', e.target.value)} className={inputClass} /></div>
                <div><label className="block text-sm font-semibold text-gray-300 mb-2">Estado *</label><input type="text" maxLength={2} value={form.estado} onChange={e => update('estado', e.target.value.toUpperCase())} className={inputClass} /></div>
              </div>
            </div>
          )}

          {/* Step 5: Credentials */}
          {step === 5 && (
            <div className="space-y-4">
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">E-mail *</label><input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="seu@email.com" className={inputClass} /></div>
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">Senha *</label><input type="password" value={form.senha} onChange={e => update('senha', e.target.value)} placeholder="Mínimo: 1 maiúscula + 1 número" className={inputClass} /></div>
              <div><label className="block text-sm font-semibold text-gray-300 mb-2">Confirmar Senha *</label><input type="password" value={form.confirmarSenha} onChange={e => update('confirmarSenha', e.target.value)} placeholder="Repita a senha" className={inputClass} /></div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="flex-1 py-3 rounded-full border border-white/[0.08] text-gray-400 font-semibold hover:bg-white/5 transition">Voltar</button>}
            <button type="button" onClick={nextStep} disabled={loading} className="flex-1 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition disabled:opacity-50">
              {loading ? 'Cadastrando...' : step === 5 ? 'Criar Conta' : 'Próximo'}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta? <Link href="/login" className="text-amber-400 hover:text-amber-300 font-semibold">Entrar</Link>
        </p>
      </div>
    </div>
  )
}
