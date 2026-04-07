import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export async function login(email: string, senha: string) {
  const response = await api.post('/auth/login', { email, senha })
  return response.data
}

export async function register(data: Record<string, unknown>) {
  const response = await api.post('/auth/register', data)
  return response.data
}

export async function getUserData() {
  const response = await api.get('/auth/dados')
  return response.data
}

export async function verificarCpf(cpf: string) {
  const response = await api.get(`/auth/verificar-cpf/${cpf}`)
  return response.data
}

export default api
