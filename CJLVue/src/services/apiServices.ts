// src/services/api.ts
import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      sessionStorage.clear()
      delete api.defaults.headers['Authorization']

      // Exibe mensagem amigável, sem redirecionar
      // toast.error('Sessão expirada. Faça login novamente.')

      // Se quiser redirecionar manualmente em outras partes, OK.
    }

    return Promise.reject(error)
  },
)
export default api
