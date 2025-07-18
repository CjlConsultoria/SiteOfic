// src/services/authService.ts
import api from './apiServices'


export const login = async (email: string, senha: string) => {
  const response = await api.post('auth/login', { email, senha })
  return response.data
}

export async function register(dados) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })

  const texto = await response.text()

  let dadosResposta = {}
  try {
    dadosResposta = texto ? JSON.parse(texto) : {}
  } catch {
    // resposta não é JSON válido
    throw new Error('Resposta inválida do servidor')
  }

  if (!response.ok) {
    throw new Error(dadosResposta.message || 'Erro ao registrar')
  }

  return dadosResposta
}
