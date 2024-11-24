import axios from 'axios'

const createApiInstance = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  })
}

export { createApiInstance }
