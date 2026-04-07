'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserData } from '@/lib/api'

const systems = [
  { name: 'Convivium', desc: 'Gestão completa de condomínios e prédios residenciais', icon: '🏢', rating: 4.8, reviews: 120, status: 'Ativo', url: 'https://convivium-front.onrender.com', features: ['Gestão de moradores', 'Controle de encomendas', 'Reclamações e denúncias', 'Comunicados', 'Dashboard financeiro'], price: 'Sob consulta' },
  { name: 'TradeLinkInvest', desc: 'Plataforma de análise e acompanhamento de investimentos', icon: '📈', rating: 4.7, reviews: 95, status: 'Ativo', url: 'https://tradelinkinvest.com.br', features: ['Dashboard de carteira', 'Análise de ativos', 'Rentabilidade real', 'Alertas personalizados'], price: 'Sob consulta' },
  { name: 'SAPLINK', desc: 'Integration Health Monitor para consultorias SAP', icon: '◆', rating: 0, reviews: 0, status: 'Em Desenvolvimento', url: '/saplink', features: ['Health Score por cliente', 'IA diagnóstica', 'Alertas WhatsApp', 'Relatórios white-label'], price: 'A partir de R$ 1.200/mês' },
  { name: 'Gestão de Estoque', desc: 'Controle de entradas, saídas e movimentações', icon: '📦', rating: 4.7, reviews: 95, status: 'Disponível', url: '#', features: ['Entradas e saídas', 'Alertas de estoque', 'Relatórios', 'Multi-filial'], price: 'R$ 99,90/mês' },
  { name: 'Vendas Online', desc: 'E-commerce integrado com gestão de pedidos', icon: '🛒', rating: 4.6, reviews: 78, status: 'Disponível', url: '#', features: ['Catálogo de produtos', 'Carrinho', 'Pagamento integrado', 'Painel admin'], price: 'R$ 149,90/mês' },
  { name: 'Financeiro Pessoal', desc: 'Controle de finanças pessoais e investimentos', icon: '💰', rating: 4.9, reviews: 200, status: 'Disponível', url: '#', features: ['Receitas e despesas', 'Metas financeiras', 'Gráficos', 'Exportação'], price: 'R$ 29,90/mês' },
  { name: 'Agendamento Online', desc: 'Sistema de agendamento para serviços', icon: '📅', rating: 4.5, reviews: 65, status: 'Disponível', url: '#', features: ['Agenda visual', 'Confirmação automática', 'Lembretes', 'Multi-profissional'], price: 'R$ 79,90/mês' },
  { name: 'RH e Folha', desc: 'Gestão de recursos humanos e folha de pagamento', icon: '👥', rating: 4.7, reviews: 110, status: 'Disponível', url: '#', features: ['Cadastro de funcionários', 'Cálculo de folha', 'Férias e 13º', 'Relatórios'], price: 'R$ 199,90/mês' },
  { name: 'Chamados Técnicos', desc: 'Help desk e suporte ao cliente', icon: '🎧', rating: 4.4, reviews: 55, status: 'Disponível', url: '#', features: ['Abertura de chamados', 'SLA', 'Base de conhecimento', 'Dashboard'], price: 'R$ 89,90/mês' },
]

const services = [
  { name: 'Consultoria Estratégica', desc: 'Planejamento e roadmap tecnológico personalizado para sua empresa.', icon: '📋', price: 'A partir de R$ 297/mês', discount: '10% na assinatura anual' },
  { name: 'Suporte Remoto', desc: 'Assistência técnica a distância com tempo de resposta de 30 minutos.', icon: '🖥️', price: 'A partir de R$ 149/mês', discount: '1º mês grátis' },
  { name: 'Gestão de TI', desc: 'Gerenciamento completo da sua infraestrutura de TI.', icon: '⚙️', price: 'A partir de R$ 997/mês', discount: '15% para clientes CJL' },
  { name: 'Infraestrutura em Nuvem', desc: 'Migração e gestão de cloud computing (AWS, Azure, GCP).', icon: '☁️', price: 'Sob consulta', discount: 'Avaliação gratuita' },
  { name: 'Segurança de Dados', desc: 'Proteção completa com firewall, backup e compliance LGPD.', icon: '🔒', price: 'A partir de R$ 499/mês', discount: '20% no pacote anual' },
  { name: 'Automação de Processos', desc: 'RPA e automação para eliminar tarefas repetitivas.', icon: '🤖', price: 'Sob consulta', discount: 'POC gratuita' },
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
  const [selectedSystem, setSelectedSystem] = useState<number | null>(null)
  const [user, setUser] = useState({ nomeCompleto: '', email: '', fotoUrl: '', roles: [] as string[] })
  const [waitlist, setWaitlist] = useState<WaitlistItem[]>([])
  const [waitlistLoading, setWaitlistLoading] = useState(false)

  const isAdmin = user.roles.includes('ROLE_ADMIN')

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

  function logoff() { localStorage.removeItem('token'); router.push('/') }

  const menuItems: { key: Section; label: string; icon: string }[] = [
    { key: 'home', label: 'Dashboard', icon: '🏠' },
    { key: 'sistemas', label: 'Sistemas', icon: '💻' },
    { key: 'servicos', label: 'Serviços', icon: '⚙️' },
    ...(isAdmin ? [{ key: 'waitlist' as Section, label: 'Lista de Espera', icon: '📋' }] : []),
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

  const statusColor = (s: string) => s === 'Ativo' ? 'text-emerald-600 bg-emerald-50' : s === 'Em Desenvolvimento' ? 'text-purple-600 bg-purple-50' : 'text-blue-600 bg-blue-50'

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-20 pb-6 flex flex-col transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <div className="w-10 h-10 rounded-full bg-[#d4a017] flex items-center justify-center text-white font-bold text-sm">
              {user.nomeCompleto?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user.nomeCompleto || 'Usuário'}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
              {isAdmin && <span className="text-[10px] font-bold text-[#d4a017] uppercase">Admin</span>}
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map(m => (
            <button key={m.key} onClick={() => { setSection(m.key); setSidebarOpen(false); setSelectedSystem(null) }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${section === m.key ? 'bg-amber-50 text-[#d4a017]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`}>
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </nav>
        <div className="px-3 mt-4">
          <button onClick={logoff} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition">
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 pt-20 pb-10 px-6 md:px-10">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden mb-6 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm">☰ Menu</button>

        {/* Dashboard */}
        {section === 'home' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Olá, {user.nomeCompleto?.split(' ')[0] || 'Usuário'}!</h1>
            <p className="text-gray-500 mb-8">Bem-vindo à plataforma CJL Consultoria.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[['Sistemas', systems.length.toString(), '💻'], ['Serviços', services.length.toString(), '⚙️'], ['Avaliação Média', '4.7', '⭐']].map(([label, value, icon]) => (
                <div key={label} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-2xl font-bold text-gray-800">{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Sistemas em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems.slice(0, 3).map((s, i) => (
                <div key={s.name} onClick={() => { setSection('sistemas'); setSelectedSystem(i) }} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#d4a017]/50 hover:shadow-md transition cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{s.icon}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor(s.status)}`}>{s.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-[#d4a017] transition">{s.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{s.desc}</p>
                  {s.rating > 0 && <div className="text-xs text-gray-400">⭐ {s.rating} ({s.reviews} avaliações)</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sistemas */}
        {section === 'sistemas' && selectedSystem === null && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Sistemas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {systems.map((s, i) => (
                <div key={s.name} onClick={() => setSelectedSystem(i)} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-[#d4a017]/50 hover:shadow-md transition cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{s.icon}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor(s.status)}`}>{s.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-[#d4a017] transition">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    {s.rating > 0 ? <span className="text-sm text-[#d4a017]">⭐ {s.rating}</span> : <span className="text-xs text-purple-500 italic">Em breve</span>}
                    <span className="text-xs text-gray-400 group-hover:text-[#d4a017] transition">Ver detalhes →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sistema Detalhe */}
        {section === 'sistemas' && selectedSystem !== null && (
          <div>
            <button onClick={() => setSelectedSystem(null)} className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1">← Voltar aos sistemas</button>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{systems[selectedSystem].icon}</span>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{systems[selectedSystem].name}</h1>
                  <p className="text-gray-500">{systems[selectedSystem].desc}</p>
                  <span className={`inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full ${statusColor(systems[selectedSystem].status)}`}>{systems[selectedSystem].status}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Funcionalidades</h3>
                  <ul className="space-y-2">
                    {systems[selectedSystem].features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-[#d4a017]">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">Preço</div>
                    <div className="text-lg font-bold text-[#d4a017]">{systems[selectedSystem].price}</div>
                  </div>
                  {systems[selectedSystem].rating > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-1">Avaliação</div>
                      <div className="text-lg font-bold text-gray-800">⭐ {systems[selectedSystem].rating} <span className="text-sm font-normal text-gray-500">({systems[selectedSystem].reviews} avaliações)</span></div>
                    </div>
                  )}
                  {systems[selectedSystem].url !== '#' && (
                    <a href={systems[selectedSystem].url} target={systems[selectedSystem].url.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="block text-center px-6 py-3 rounded-full bg-[#d4a017] text-white font-semibold hover:bg-[#b8860b] transition shadow-md">
                      {systems[selectedSystem].status === 'Em Desenvolvimento' ? 'Ver página do produto' : 'Acessar sistema'}
                    </a>
                  )}
                  <a href="https://wa.me/551152865790" target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:border-[#d4a017] hover:text-[#d4a017] transition">
                    Falar com comercial
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Serviços */}
        {section === 'servicos' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Serviços</h1>
            <p className="text-gray-500 mb-6">Contrate serviços da CJL com condições exclusivas para clientes da plataforma.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map(s => (
                <div key={s.name} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-[#d4a017]/50 transition">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="text-base font-bold text-gray-800 mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-[#d4a017]">{s.price}</span>
                  </div>
                  {s.discount && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs font-semibold text-emerald-700 mb-4">
                      🎁 {s.discount}
                    </div>
                  )}
                  <a href="https://wa.me/551152865790" target="_blank" rel="noopener noreferrer" className="block text-center px-4 py-2.5 rounded-full bg-[#d4a017] text-white text-sm font-semibold hover:bg-[#b8860b] transition">
                    Contratar
                  </a>
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
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
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
            <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-lg shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-[#d4a017] flex items-center justify-center text-white font-bold text-2xl">
                  {user.nomeCompleto?.charAt(0) || 'U'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{user.nomeCompleto}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  {isAdmin && <span className="text-xs font-bold text-[#d4a017] uppercase">Administrador</span>}
                </div>
              </div>
              <p className="text-sm text-gray-500">Para alterar seus dados, entre em contato com o suporte.</p>
            </div>
          </div>
        )}

        {/* Ajuda */}
        {section === 'ajuda' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Ajuda</h1>
            <div className="max-w-lg space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                    <span className="text-sm font-semibold text-gray-800">{f.q}</span>
                    <span className="text-gray-400">{faqOpen === i ? '−' : '+'}</span>
                  </button>
                  {faqOpen === i && <div className="px-6 pb-4 text-sm text-gray-500">{f.a}</div>}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="https://wa.me/551152865790" target="_blank" rel="noopener noreferrer" className="inline-flex px-6 py-3 rounded-full bg-[#d4a017] text-white font-semibold hover:bg-[#b8860b] transition">Falar com suporte via WhatsApp</a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
