// src/services/authService.ts
import api from './apiServices'


export const login = async (email: string, senha: string) => {
  const response = await api.post('auth/login', { email, senha })
  return response.data
}
