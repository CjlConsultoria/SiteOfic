// src/services/api.ts
import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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


      setTimeout(() => {
        router.push('/login')
      }, 1000)
    }

    return Promise.reject(error)
  },
)

export default api
