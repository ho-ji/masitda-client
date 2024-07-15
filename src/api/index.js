import axios from 'axios'

let accessToken

export const setAuthToken = (token) => {
  accessToken = token
}

export const instance = axios.create({
  baseURL: 'https://acceptable-virgina-yeji-85400ab7.koyeb.app/api',
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
