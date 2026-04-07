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

type Section = 'home' | 'sistemas' | 'servicos' | 'waitlist' | 'perfil' | 'ajuda'

interface WaitlistItem {
  id: number; nome: string; email: string; telefone: string; empresa: string;
  cnpj: string; cargo: string; segmento: string; quantidadeClientes: number;
  mensagem: string; pessoaJuridica: boolean; criadoEm: string; status: string;
}

export default function PlataformaPage() {
  const router = useRouter()
  const [section, setSection] = useState<Section>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [user, setUser] = useState({ nomeCompleto: '', email: '', fotoUrl: '', roles: [] as string[] })
  const [waitlist, setWaitlist] = useState<WaitlistItem[]>([])
  const [waitlistLoading, setWaitlistLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { router.push('/login'); return }
    getUserData().then(data => {
      setUser({
        nomeCompleto: data.sobrenome ? `${data.nome} ${data.sobrenome}` : data.nome || 'Usuário',
        email: data.email || '',
        fotoUrl: data.fotoUrl || '/images/perfil.jpg',
        roles: data.roles || [],
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
    ...(user.roles.includes('ROLE_ADMIN') ? [{ key: 'waitlist' as Section, label: 'Lista de Espera', icon: '📋' }] : []),
    { key: 'perfil', label: 'Perfil', icon: '👤' },
    { key: 'ajuda', label: 'Ajuda', icon: '❓' },
  ]

  async function loadWaitlist() {
    setWaitlistLoading(true)
    try {
      const token = localStorage.getItem('token')
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
      const res = await fetch(`${apiUrl}/waitlist`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setWaitlist(await res.json())
    } catch { /* ignore */ }
    finally { setWaitlistLoading(false) }
  }

  async function updateWaitlistStatus(id: number, status: string) {
    const token = localStorage.getItem('token')
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'
    await fetch(`${apiUrl}/waitlist/${id}/status?status=${status}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } })
    loadWaitlist()
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-20 pb-6 flex flex-col transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <img src={user.fotoUrl || '/images/perfil.jpg'} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user.nomeCompleto || 'Usuário'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map(m => (
            <button key={m.key} onClick={() => { setSection(m.key); setSidebarOpen(false) }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${section === m.key ? 'bg-amber-50 text-[#d4a017]' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-800'}`}>
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </nav>
        <div className="px-3 mt-4">
          <button onClick={logoff} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-50 transition">
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 pt-20 pb-10 px-6 md:px-10">
        {/* Mobile menu button */}
        <button onClick={() => setSidebarOpen(true)} className="md:hidden mb-6 px-4 py-2 rounded-lg bg-gray-50 text-gray-400 text-sm">☰ Menu</button>

        {/* Dashboard Home */}
        {section === 'home' && (
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a] mb-2">Olá, {user.nomeCompleto?.split(' ')[0] || 'Usuário'}!</h1>
            <p className="text-gray-500 mb-8">Bem-vindo à plataforma CJL Consultoria.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[['Sistemas', systems.length.toString(), '💻'], ['Serviços', services.length.toString(), '⚙️'], ['Avaliação Média', '4.7', '⭐']].map(([label, value, icon]) => (
                <div key={label} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-2xl font-bold text-gray-800">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Sistemas Disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems.slice(0, 6).map(s => (
                <div key={s.name} className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:border-amber-300 transition">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{s.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{s.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-[#d4a017]">⭐ {s.rating}</span>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Sistemas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems.map(s => (
                <div key={s.name} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:border-amber-300 transition">
                  <h3 className="text-base font-semibold text-gray-800 mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#d4a017]">⭐ {s.rating}</span>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Serviços</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.name} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:border-amber-300 transition">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de Espera (Admin) */}
        {section === 'waitlist' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Lista de Espera — SAPLINK</h1>
              <button onClick={loadWaitlist} className="px-4 py-2 rounded-lg bg-[#d4a017] text-white font-semibold text-sm hover:bg-[#b8860b] transition">
                {waitlistLoading ? 'Carregando...' : 'Atualizar'}
              </button>
            </div>
            {waitlist.length === 0 && !waitlistLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum cadastro ainda. Clique em &quot;Atualizar&quot; para carregar.</p>
              </div>
            )}
            <div className="space-y-4">
              {waitlist.map(w => (
                <div key={w.id} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{w.nome}</h3>
                      <p className="text-sm text-gray-500">{w.empresa} {w.cargo && `· ${w.cargo}`}</p>
                    </div>
                    <select value={w.status} onChange={e => updateWaitlistStatus(w.id, e.target.value)} className={`text-xs font-bold px-3 py-1 rounded-full border ${w.status === 'PENDENTE' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : w.status === 'CONTATADO' ? 'bg-blue-50 text-blue-700 border-blue-200' : w.status === 'CONVERTIDO' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      <option value="PENDENTE">Pendente</option>
                      <option value="CONTATADO">Contatado</option>
                      <option value="CONVERTIDO">Convertido</option>
                      <option value="DESCARTADO">Descartado</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div><span className="text-gray-400 text-xs block">Email</span><span className="text-gray-700">{w.email}</span></div>
                    <div><span className="text-gray-400 text-xs block">Telefone</span><span className="text-gray-700">{w.telefone || '—'}</span></div>
                    <div><span className="text-gray-400 text-xs block">Segmento</span><span className="text-gray-700">{w.segmento || '—'}</span></div>
                    <div><span className="text-gray-400 text-xs block">Clientes SAP</span><span className="text-gray-700">{w.quantidadeClientes || '—'}</span></div>
                    {w.cnpj && <div><span className="text-gray-400 text-xs block">CNPJ</span><span className="text-gray-700">{w.cnpj}</span></div>}
                    <div><span className="text-gray-400 text-xs block">PJ</span><span className="text-gray-700">{w.pessoaJuridica ? 'Sim' : 'Não'}</span></div>
                    <div><span className="text-gray-400 text-xs block">Data</span><span className="text-gray-700">{new Date(w.criadoEm).toLocaleDateString('pt-BR')}</span></div>
                  </div>
                  {w.mensagem && <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 italic">&quot;{w.mensagem}&quot;</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perfil */}
        {section === 'perfil' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-8 max-w-lg">
              <div className="flex items-center gap-4 mb-6">
                <img src={user.fotoUrl || '/images/perfil.jpg'} alt="" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{user.nomeCompleto}</h2>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajuda</h1>
            <div className="max-w-lg space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-gray-800">{f.q}</span>
                    <span className="text-gray-500">{faqOpen === i ? '−' : '+'}</span>
                  </button>
                  {faqOpen === i && <div className="px-6 pb-4 text-sm text-gray-400">{f.a}</div>}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="https://wa.me/551152865790" target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3 rounded-full bg-[#d4a017] text-gray-800 font-semibold hover:bg-[#b8860b] transition">Falar com suporte via WhatsApp</a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
