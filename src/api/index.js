import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:4500/api',
  withCredentials: true,
})
export const setAuthToken = (token) => {
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}
