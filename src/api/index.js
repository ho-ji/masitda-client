import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://acceptable-virgina-yeji-85400ab7.koyeb.app/api',
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
