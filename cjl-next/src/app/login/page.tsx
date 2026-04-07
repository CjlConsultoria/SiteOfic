'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await login(email, senha)
      localStorage.setItem('token', data.token)
      router.push('/plataforma')
    } catch {
      setError('E-mail ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-[#eff6ff] to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/">
            <img src="/images/logocjl.png" alt="CJL" className="w-16 h-16 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-[#0f172a]">Entrar</h1>
          <p className="text-gray-500 mt-2">Acesse sua conta na plataforma CJL</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
          )}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-2 focus:ring-orange-200 outline-none transition" />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
            <input type={showPassword ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" required className="w-full px-4 py-3 rounded-lg bg-[#f8fafc] border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:border-[#ff6b35] focus:ring-2 focus:ring-orange-200 outline-none transition" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-500 mb-6 cursor-pointer">
            <input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} className="rounded border-gray-600" />
            Mostrar senha
          </label>
          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-full bg-[#ff6b35] text-white font-semibold hover:bg-[#e55a2b] transition-colors disabled:opacity-50">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta? <Link href="/registre" className="text-[#ff6b35] hover:text-[#e55a2b] font-semibold">Registre-se</Link>
        </p>
      </div>
    </div>
  )
}
