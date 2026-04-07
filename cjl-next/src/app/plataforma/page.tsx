'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserData } from '@/lib/api'

const systems = [
  { name: 'Gestão de Condomínios', desc: 'Controle completo de condomínios', rating: 4.8, reviews: 120 },
  { name: 'Gestão de Estoque', desc: 'Controle de entradas e saídas', rating: 4.7, reviews: 95 },
  { name: 'Vendas Online', desc: 'E-commerce integrado', rating: 4.6, reviews: 78 },
  { name: 'Financeiro Pessoal', desc: 'Controle de finanças pessoais', rating: 4.9, reviews: 200 },
  { name: 'Agendamento Online', desc: 'Sistema de agendamento', rating: 4.5, reviews: 65 },
  { name: 'RH e Folha de Pagamento', desc: 'Gestão de recursos humanos', rating: 4.7, reviews: 110 },
  { name: 'Chamados Técnicos', desc: 'Help desk e suporte', rating: 4.4, reviews: 55 },
  { name: 'Gestão Escolar', desc: 'Administração de escolas', rating: 4.6, reviews: 88 },
  { name: 'Logística e Entregas', desc: 'Rastreio e gestão de entregas', rating: 4.8, reviews: 130 },
]

const services = [
  { name: 'Consultoria Estratégica', desc: 'Planejamento e roadmap tecnológico', icon: '📋' },
  { name: 'Suporte Remoto', desc: 'Assistência técnica a distância', icon: '🖥️' },
  { name: 'Gestão de TI', desc: 'Gerenciamento completo da sua TI', icon: '⚙️' },
  { name: 'Infraestrutura em Nuvem', desc: 'Cloud computing e migração', icon: '☁️' },
  { name: 'Segurança de Dados', desc: 'Proteção e compliance', icon: '🔒' },
  { name: 'Automação de Processos', desc: 'RPA e otimização', icon: '🤖' },
]

const faqs = [
  { q: 'Como funciona o suporte?', a: 'Oferecemos suporte por e-mail, WhatsApp e chat dentro da plataforma. O tempo médio de resposta é de 30 minutos.' },
  { q: 'Posso cancelar a qualquer momento?', a: 'Sim, todos os planos podem ser cancelados a qualquer momento sem multa ou fidelidade.' },
  { q: 'Os dados são seguros?', a: 'Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança da informação e LGPD.' },
]

type Section = 'home' | 'sistemas' | 'servicos' | 'perfil' | 'ajuda'

export default function PlataformaPage() {
  const router = useRouter()
  const [section, setSection] = useState<Section>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [user, setUser] = useState({ nomeCompleto: '', email: '', fotoUrl: '' })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    getUserData().then(data => {
      setUser({
        nomeCompleto: data.sobrenome ? `${data.nome} ${data.sobrenome}` : data.nome || 'Usuário',
        email: data.email || '',
        fotoUrl: data.fotoUrl || '/images/perfil.jpg',
      })
    }).catch(() => { localStorage.removeItem('token'); router.push('/login') })
  }, [router])

  function logoff() {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const menuItems: { key: Section; label: string; icon: string }[] = [
    { key: 'home', label: 'Dashboard', icon: '🏠' },
    { key: 'sistemas', label: 'Sistemas', icon: '💻' },
    { key: 'servicos', label: 'Serviços', icon: '⚙️' },
    { key: 'perfil', label: 'Perfil', icon: '👤' },
    { key: 'ajuda', label: 'Ajuda', icon: '❓' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#111] border-r border-white/[0.08] pt-20 pb-6 flex flex-col transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <img src={user.fotoUrl || '/images/perfil.jpg'} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.nomeCompleto || 'Usuário'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map(m => (
            <button key={m.key} onClick={() => { setSection(m.key); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${section === m.key ? 'bg-amber-500/10 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </nav>
        <div className="px-3 mt-4">
          <button onClick={logoff} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 pt-20 pb-10 px-6 md:px-10">
        {/* Mobile menu button */}
        <button onClick={() => setSidebarOpen(true)} className="md:hidden mb-6 px-4 py-2 rounded-lg bg-white/5 text-gray-400 text-sm">☰ Menu</button>

        {/* Dashboard Home */}
        {section === 'home' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Olá, {user.nomeCompleto?.split(' ')[0] || 'Usuário'}!</h1>
            <p className="text-gray-500 mb-8">Bem-vindo à plataforma CJL Consultoria.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[['Sistemas', systems.length.toString(), '💻'], ['Serviços', services.length.toString(), '⚙️'], ['Avaliação Média', '4.7', '⭐']].map(([label, value, icon]) => (
                <div key={label} className="bg-[#141414] border border-white/[0.08] rounded-xl p-6">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
            <h2 className="text-lg font-semibold text-white mb-4">Sistemas Disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems.slice(0, 6).map(s => (
                <div key={s.name} className="bg-[#141414] border border-white/[0.08] rounded-xl p-5 hover:border-amber-500/20 transition">
                  <h3 className="text-sm font-semibold text-white mb-1">{s.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{s.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-amber-400">⭐ {s.rating}</span>
                    <span>({s.reviews} avaliações)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sistemas */}
        {section === 'sistemas' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Sistemas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems.map(s => (
                <div key={s.name} className="bg-[#141414] border border-white/[0.08] rounded-xl p-6 hover:border-amber-500/20 transition">
                  <h3 className="text-base font-semibold text-white mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-400">⭐ {s.rating}</span>
                    <span className="text-xs text-gray-500">{s.reviews} avaliações</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Serviços */}
        {section === 'servicos' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Serviços</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.name} className="bg-[#141414] border border-white/[0.08] rounded-xl p-6 hover:border-amber-500/20 transition">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-base font-semibold text-white mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perfil */}
        {section === 'perfil' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Meu Perfil</h1>
            <div className="bg-[#141414] border border-white/[0.08] rounded-xl p-8 max-w-lg">
              <div className="flex items-center gap-4 mb-6">
                <img src={user.fotoUrl || '/images/perfil.jpg'} alt="" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h2 className="text-lg font-bold text-white">{user.nomeCompleto}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400">Para alterar seus dados, entre em contato com o suporte.</p>
            </div>
          </div>
        )}

        {/* Ajuda */}
        {section === 'ajuda' && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-6">Ajuda</h1>
            <div className="max-w-lg space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-[#141414] border border-white/[0.08] rounded-xl overflow-hidden">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-white">{f.q}</span>
                    <span className="text-gray-500">{faqOpen === i ? '−' : '+'}</span>
                  </button>
                  {faqOpen === i && <div className="px-6 pb-4 text-sm text-gray-400">{f.a}</div>}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="https://wa.me/5511940090003" target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition">Falar com suporte via WhatsApp</a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
