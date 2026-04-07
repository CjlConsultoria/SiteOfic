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
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0a0a0a]">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/">
            <img src="/images/logocjl.png" alt="CJL" className="w-16 h-16 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Entrar</h1>
          <p className="text-gray-500 mt-2">Acesse sua conta na plataforma CJL</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/[0.08] rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>
          )}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-white placeholder:text-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Senha</label>
            <input type={showPassword ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" required className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-white/[0.08] text-white placeholder:text-gray-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition" />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-400 mb-6 cursor-pointer">
            <input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} className="rounded border-gray-600" />
            Mostrar senha
          </label>
          <button type="submit" disabled={loading} className="w-full py-3.5 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta? <Link href="/registre" className="text-amber-400 hover:text-amber-300 font-semibold">Registre-se</Link>
        </p>
      </div>
    </div>
  )
}
