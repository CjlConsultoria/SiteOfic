// src/services/authService.ts
import api from './apiServices'

// Tipagem dos dados de cadastro
type DadosCadastro = {
  nome: string
  email: string
  senha: string
  // outros campos que seu formulário enviar
}

interface DadosResposta {
  message?: string
}

// Função de login
export const login = async (email: string, senha: string) => {
  const response = await api.post('auth/login', { email, senha })
  return response.data
}

// Função de registro
export async function register(dados: DadosCadastro) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  const texto = await response.text()

  let dadosResposta: DadosResposta = {}
  try {
    dadosResposta = texto ? JSON.parse(texto) : {}
  } catch {
    throw new Error('Resposta inválida do servidor')
  }

  if (!response.ok) {
    throw new Error(dadosResposta.message || 'Erro ao registrar')
  }

  return dadosResposta
}
